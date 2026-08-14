import "dotenv/config";

import { createServer } from "node:http";
import { Types } from "mongoose";
import { Server } from "socket.io";

import {
  SendMessagePayload,
  SendMessageResult,
} from "@/entities/bnty/chat/model/chatSocketTypes";

import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { connectMongoDB } from "@/shared/db/mongodb";

import {
  startUpbitTickerStream,
  VC_TICKER_ROOM,
} from "../server/vc/upbitTickerStream";

import { UpbitOrderbookManager } from "../server/vc/orderbook/upbitOrderbookManger";
import { registerVcOrderbookEvents } from "../server/vc/orderbook/registerVcOrderbookEvnets";
import { registerVcOrderEvents } from "../server/vc/order/registerOrderEvent";

const port = Number(process.env.PORT ?? 3001);

const allowedOrigins = (
  process.env.SOCKET_ALLOWED_ORIGINS ??
  "http://localhost:3000"
)
  .split(",")
  .map(origin => origin.trim());

async function startServer() {
  const httpServer = createServer((req, res) => {
    // Railway 서버가 살아있는지 확인하기 위한 간단한 endpoint
    if (req.url === "/health") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          status: "ok",
        }),
      );

      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("Portfolio realtime server");
  });

  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  /**
   * VC
   * Upbit ticker stream
   */
  const vcTickerStream = startUpbitTickerStream(io);

  /**
   * VC
   * Upbit orderbook manager
   */
  const orderbookManager =
    new UpbitOrderbookManager(io);

  io.on("connection", socket => {
    console.log("소켓 연결:", socket.id);

    /**
     * =========================
     * BNTY Chat
     * =========================
     */

    socket.on(
      "join-chat-room",
      (chatRoomId: string) => {
        if (!Types.ObjectId.isValid(chatRoomId)) {
          return;
        }

        socket.join(chatRoomId);
      },
    );

    socket.on(
      "leave-chat-room",
      (chatRoomId: string) => {
        socket.leave(chatRoomId);
      },
    );

    socket.on(
      "mark-messages-read",
      async ({
        chatRoomId,
        userId,
      }: {
        chatRoomId: string;
        userId: string;
      }) => {
        try {
          if (
            !Types.ObjectId.isValid(chatRoomId) ||
            !Types.ObjectId.isValid(userId)
          ) {
            return;
          }

          await connectMongoDB();

          const userObjectId =
            new Types.ObjectId(userId);

          const chatRoom =
            await ChatRoomModel.findOne({
              _id: chatRoomId,
              $or: [
                {
                  trainerId: userObjectId,
                },
                {
                  memberId: userObjectId,
                },
              ],
            });

          if (!chatRoom) {
            return;
          }

          const unreadMessagesIds =
            chatRoom.messages
              .filter(
                message =>
                  message.senderId.toString() !==
                    userId &&
                  !message.readBy.some(
                    readUserId =>
                      readUserId.toString() ===
                      userId,
                  ),
              )
              .map(message => message._id);

          if (unreadMessagesIds.length === 0) {
            return;
          }

          await ChatRoomModel.updateOne(
            {
              _id: chatRoomId,
            },
            {
              $addToSet: {
                "messages.$[message].readBy":
                  userObjectId,
              },
            },
            {
              arrayFilters: [
                {
                  "message._id": {
                    $in: unreadMessagesIds,
                  },
                },
              ],
            },
          );

          io.to(chatRoomId).emit(
            "messages-read",
            {
              chatRoomId,
              userId,
              messageIds:
                unreadMessagesIds.map(
                  messageId =>
                    messageId.toString(),
                ),
            },
          );
        } catch (error) {
          console.error(
            "메시지 읽음 처리 실패:",
            error,
          );
        }
      },
    );

    socket.on(
      "send-msg",
      async (
        payload: SendMessagePayload,
        callback: (
          response: SendMessageResult,
        ) => void,
      ) => {
        try {
          const {
            chatRoomId,
            senderId,
            senderRole,
            message,
          } = payload;

          if (
            !Types.ObjectId.isValid(
              chatRoomId,
            ) ||
            !Types.ObjectId.isValid(senderId)
          ) {
            callback({
              success: false,
              error:
                "메시지 정보를 확인해주세요.",
            });

            return;
          }

          if (
            senderRole !== "member" &&
            senderRole !== "trainer"
          ) {
            callback({
              success: false,
              error:
                "올바른 사용자 역할이 아닙니다.",
            });

            return;
          }

          await connectMongoDB();

          const sentAt = new Date();
          const messageId =
            new Types.ObjectId();

          const newMessage = {
            _id: messageId,
            senderId:
              new Types.ObjectId(senderId),
            senderRole,
            type: "text" as const,
            message,
            data: "",
            fileName: "",
            readBy: [
              new Types.ObjectId(senderId),
            ],
            sentAt,
          };

          const participantFilter =
            senderRole === "trainer"
              ? {
                  _id: chatRoomId,
                  trainerId: senderId,
                }
              : {
                  _id: chatRoomId,
                  memberId: senderId,
                };

          const updatedChatRoom =
            await ChatRoomModel.findOneAndUpdate(
              participantFilter,
              {
                $push: {
                  messages: newMessage,
                },
                $set: {
                  lastMessage: message,
                  lastMessageAt: sentAt,
                },
              },
              {
                new: true,
              },
            );

          if (!updatedChatRoom) {
            callback({
              success: false,
              error:
                "채팅방이 없거나 참여 권한이 없습니다.",
            });

            return;
          }

          const responseMessage = {
            id: messageId.toString(),
            senderId,
            senderRole,
            type: "text" as const,
            message,
            data: "",
            fileName: "",
            readBy: [senderId],
            sentAt: sentAt.toISOString(),
          };

          io.to(chatRoomId).emit(
            "new-message",
            responseMessage,
          );

          callback({
            success: true,
            message: responseMessage,
          });
        } catch (error) {
          console.error(
            "메시지 전송 실패:",
            error,
          );

          callback({
            success: false,
            error:
              "메시지 전송에 실패했습니다.",
          });
        }
      },
    );

    /**
     * =========================
     * VC Ticker
     * =========================
     */

    socket.on(
      "vc:ticker:subscribe",
      () => {
        socket.join(VC_TICKER_ROOM);

        socket.emit(
          "vc:ticker:snapshot",
          vcTickerStream.getSnapshot(),
        );
      },
    );

    socket.on(
      "vc:ticker:unsubscribe",
      () => {
        socket.leave(VC_TICKER_ROOM);
      },
    );

    /**
     * =========================
     * VC Orderbook
     * =========================
     */

    registerVcOrderbookEvents({
      io,
      socket,
      orderbookManager,
    });

    /**
     * =========================
     * VC Orders
     * =========================
     */

    registerVcOrderEvents({
      socket,
      orderbookManager,
    });

    /**
     * =========================
     * Disconnect
     * =========================
     */

    socket.on("disconnect", () => {
      console.log(
        "소켓 연결 해제:",
        socket.id,
      );
    });
  });

  httpServer.listen(
    port,
    "0.0.0.0",
    () => {
      console.log(
        `Realtime server running on port ${port}`,
      );

      console.log(
        "Allowed origins:",
        allowedOrigins,
      );
    },
  );
}

startServer().catch(error => {
  console.error(
    "Realtime server 실행 실패:",
    error,
  );

  process.exit(1);
});
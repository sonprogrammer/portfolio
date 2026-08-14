import { randomUUID } from "crypto";

import WebSocket, {type RawData} from 'ws'
import type{ Server} from 'socket.io'
import type { VcOrderbook } from "@/entities/vc/orderbook/model/orderbookTypes";
import { VC_SOCKET_EVENTS } from "@/entities/vc/coin/model/socketEvents";

import { normalizeUpbitOrderbook, type UpbitOrderbookResponse } from "./upbitOrderbookTypes";

const UPBIT_WEBSOCKET_URL = 'wss://api.upbit.com/websocket/v1'

const ORDERBOOK_UNIT_COUNT = 5
const RECONNECT_DELAY = 2_000

interface OrderbookConnection {
  market: string;
  subscriberCount: number;

  socket: WebSocket | null;
  reconnectTimer: NodeJS.Timeout | null;

  latestOrderbook: VcOrderbook | null;
}

function createRoomName(market: string) {
  return `vc:orderbook:${market}`;
}

function isUpbitOrderbookResponse(value: unknown): value is UpbitOrderbookResponse {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false;
  }

  const data = value as Partial<UpbitOrderbookResponse>;

  return (
    data.type === 'orderbook' &&
    typeof data.code === 'string' &&
    Array.isArray(data.orderbook_units)
  );
}

export class UpbitOrderbookManager {
  private readonly connections =
    new Map<string, OrderbookConnection>();

  constructor(
    private readonly io: Server,
  ) {}

  subscribe(
    marketValue: string,
  ) {
    const market =
      marketValue.toUpperCase();

    const existingConnection =
      this.connections.get(market);

    if (existingConnection) {
      existingConnection.subscriberCount += 1;

      if (
        !existingConnection.socket ||
        existingConnection.socket.readyState ===
          WebSocket.CLOSED
      ) {
        this.connect(existingConnection);
      }

      return;
    }

    const connection: OrderbookConnection = {
      market,
      subscriberCount: 1,

      socket: null,
      reconnectTimer: null,

      latestOrderbook: null,
    };

    this.connections.set(
      market,
      connection,
    );

    this.connect(connection);
  }

  unsubscribe(
    marketValue: string,
  ) {
    const market =
      marketValue.toUpperCase();

    const connection =
      this.connections.get(market);

    if (!connection) {
      return;
    }

    connection.subscriberCount = Math.max(
      connection.subscriberCount - 1,
      0,
    );

    if (
      connection.subscriberCount > 0
    ) {
      return;
    }

    if (connection.reconnectTimer) {
      clearTimeout(
        connection.reconnectTimer,
      );

      connection.reconnectTimer = null;
    }

    connection.socket?.close();
    connection.socket = null;

    this.connections.delete(market);
  }

  getSnapshot(
    marketValue: string,
  ) {
    const market =
      marketValue.toUpperCase();

    return (
      this.connections.get(market)
        ?.latestOrderbook ?? null
    );
  }

  stopAll() {
    for (const connection of this.connections.values()) {
      if (
        connection.reconnectTimer
      ) {
        clearTimeout(
          connection.reconnectTimer,
        );
      }

      connection.socket?.close();
    }

    this.connections.clear();
  }

  private connect(
    connection: OrderbookConnection,
  ) {
    if (
      connection.subscriberCount === 0
    ) {
      return;
    }

    if (
      connection.socket?.readyState ===
        WebSocket.CONNECTING ||
      connection.socket?.readyState ===
        WebSocket.OPEN
    ) {
      return;
    }

    const socket = new WebSocket(
      UPBIT_WEBSOCKET_URL,
    );

    connection.socket = socket;

    socket.on('open', () => {
      const subscriptionMessage = [
        {
          ticket: randomUUID(),
        },
        {
          type: 'orderbook',
          codes: [
            `${connection.market}.${ORDERBOOK_UNIT_COUNT}`,
          ],
        },
        {
          format: 'DEFAULT',
        },
      ];

      socket.send(
        JSON.stringify(
          subscriptionMessage,
        ),
      );
    });

    socket.on(
      'message',
      (rawData: RawData) => {
        try {
          const parsedData = JSON.parse(
            rawData.toString(),
          ) as unknown;

          if (
            !isUpbitOrderbookResponse(
              parsedData,
            )
          ) {
            return;
          }

          const orderbook =
            normalizeUpbitOrderbook(
              parsedData,
            );

          connection.latestOrderbook =
            orderbook;

          this.io
            .to(
              createRoomName(
                connection.market,
              ),
            )
            .emit(
              VC_SOCKET_EVENTS.orderbookUpdate,
              orderbook,
            );
        } catch (error) {
          console.error(
            '[VC Orderbook] parse error',
            error,
          );
        }
      },
    );

    socket.on('error', (error) => {
      console.error(
        `[VC Orderbook] ${connection.market}`,
        error,
      );
    });

    socket.on('close', () => {
      connection.socket = null;

      if (
        connection.subscriberCount === 0
      ) {
        return;
      }

      connection.reconnectTimer =
        setTimeout(() => {
          connection.reconnectTimer =
            null;

          this.connect(connection);
        }, RECONNECT_DELAY);
    });
  }
}
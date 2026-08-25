import mongoose, { Types } from "mongoose";

import {VcGuestAccount} from "@/entities/vc/guest/model/guestSchema";
import { VcOrderModel } from "@/entities/vc/order/model/VcOrder";
import { VcHoldingModel } from "@/entities/vc/holding/model/VcHolding";


type BuyMarketOrderParams = {
  guestId: string;
  market: string;
  type: "buy";
  orderAmount: number;
  executedPrice: number;
};

type SellMarketOrderParams = {
  guestId: string;
  market: string;
  type: "sell";
  quantity: number;
  executedPrice: number;
};

export type ExecuteVcMarketOrderParams =
  | BuyMarketOrderParams
  | SellMarketOrderParams;

export interface ExecuteVcMarketOrderResult {
  orderId: string;
  market: string;
  type: "buy" | "sell";
  executedPrice: number;
  executedQuantity: number;
  executedAmount: number;
  krwBalance: number;
  holdingQuantity: number;
  averagePrice: number;
}

const COIN_DECIMAL_PLACES = 8;

function roundDownCoin(value: number): number {
  const factor = 10 ** COIN_DECIMAL_PLACES;

  return Math.floor(value * factor) / factor;
}

function validateCommonParams({
  guestId,
  market,
  executedPrice,
}: ExecuteVcMarketOrderParams) {
  if (!Types.ObjectId.isValid(guestId)) {
    throw new Error("잘못된 게스트 계정 ID입니다.");
  }

  if (!/^KRW-[A-Z0-9]+$/.test(market)) {
    throw new Error("잘못된 마켓 코드입니다.");
  }

  if (
    !Number.isFinite(executedPrice) ||
    executedPrice <= 0
  ) {
    throw new Error("유효한 체결 가격이 없습니다.");
  }
}

export async function executeMarketOrder(
  params: ExecuteVcMarketOrderParams,
): Promise<ExecuteVcMarketOrderResult> {
  validateCommonParams(params);

  const mongoSession =
    await mongoose.startSession();

  let result:
    | ExecuteVcMarketOrderResult
    | null = null;

  try {
    await mongoSession.withTransaction(
      async () => {
        const account =
          await VcGuestAccount.findById(
            params.guestId,
          ).session(mongoSession);

        if (!account) {
          throw new Error(
            "게스트 계정을 찾을 수 없습니다.",
          );
        }

        let holding =
          await VcHoldingModel.findOne({
            guestId: account._id,
            market: params.market,
          }).session(mongoSession);

        if (params.type === "buy") {
          const orderAmount =
            params.orderAmount;

          if (
            !Number.isFinite(orderAmount) ||
            orderAmount <= 0
          ) {
            throw new Error(
              "매수 금액은 0원보다 커야 합니다.",
            );
          }

          const availableKrw =
            account.krwBalance -
            account.lockedKrw;

          if (availableKrw < orderAmount) {
            throw new Error(
              "주문 가능 원화가 부족합니다.",
            );
          }

          const executedQuantity =
            roundDownCoin(
              orderAmount /
                params.executedPrice,
            );

          if (executedQuantity <= 0) {
            throw new Error(
              "매수 가능한 수량이 너무 작습니다.",
            );
          }


          const executedAmount =
            Math.floor(
              executedQuantity *
                params.executedPrice,
            );

          if (executedAmount <= 0) {
            throw new Error(
              "체결 금액이 올바르지 않습니다.",
            );
          }

          account.krwBalance -=
            executedAmount;

          await account.save({
            session: mongoSession,
          });

          if (!holding) {
            const createdHoldings =
              await VcHoldingModel.create(
                [
                  {
                    guestId: account._id,
                    market: params.market,
                    quantity:
                      executedQuantity,
                    lockedQuantity: 0,
                    averagePrice:
                      params.executedPrice,
                    totalBuyAmount:
                      executedAmount,
                  },
                ],
                {
                  session: mongoSession,
                },
              );

            holding = createdHoldings[0];
          } else {
            const nextQuantity =
              roundDownCoin(
                holding.quantity +
                  executedQuantity,
              );

            const nextTotalBuyAmount =
              holding.totalBuyAmount +
              executedAmount;

            holding.quantity =
              nextQuantity;

            holding.totalBuyAmount =
              nextTotalBuyAmount;

            holding.averagePrice =
              nextTotalBuyAmount /
              nextQuantity;

            await holding.save({
              session: mongoSession,
            });
          }

          const createdOrders =
            await VcOrderModel.create(
              [
                {
                  guestId: account._id,
                  market: params.market,
                  type: "buy",
                  orderType: "market",
                  status: "filled",

                  price:
                    params.executedPrice,
                  quantity:
                    executedQuantity,
                  orderAmount:
                    executedAmount,

                  executedPrice:
                    params.executedPrice,
                  executedQuantity,
                  executedAmount,

                  fee: 0,
                  rejectedReason: null,
                  executedAt: new Date(),
                  cancelledAt: null,
                },
              ],
              {
                session: mongoSession,
              },
            );

          const order = createdOrders[0];

          result = {
            orderId: String(order._id),
            market: params.market,
            type: "buy",
            executedPrice:
              params.executedPrice,
            executedQuantity,
            executedAmount,
            krwBalance:
              account.krwBalance,
            holdingQuantity:
              holding.quantity,
            averagePrice:
              holding.averagePrice,
          };

          return;
        }
        const sellQuantity =
          roundDownCoin(params.quantity);

        if (
          !Number.isFinite(
            sellQuantity,
          ) ||
          sellQuantity <= 0
        ) {
          throw new Error(
            "매도 수량은 0보다 커야 합니다.",
          );
        }

        if (!holding) {
          throw new Error(
            "보유하고 있는 코인이 없습니다.",
          );
        }

        const availableQuantity =
          holding.quantity -
          holding.lockedQuantity;

        if (
          availableQuantity +
            Number.EPSILON <
          sellQuantity
        ) {
          throw new Error(
            "주문 가능한 코인 수량이 부족합니다.",
          );
        }

        const executedAmount =
          Math.floor(
            sellQuantity *
              params.executedPrice,
          );

        if (executedAmount <= 0) {
          throw new Error(
            "체결 금액이 올바르지 않습니다.",
          );
        }

        const remainingQuantity =
          roundDownCoin(
            holding.quantity -
              sellQuantity,
          );

        account.krwBalance +=
          executedAmount;

        await account.save({
          session: mongoSession,
        });

        holding.quantity =
          remainingQuantity;


        if (remainingQuantity === 0) {
          holding.averagePrice = 0;
          holding.totalBuyAmount = 0;
        } else {
          holding.totalBuyAmount =
            holding.averagePrice *
            remainingQuantity;
        }

        await holding.save({
          session: mongoSession,
        });

        const createdOrders =
          await VcOrderModel.create(
            [
              {
                guestId: account._id,
                market: params.market,
                type: "sell",
                orderType: "market",
                status: "filled",

                price:
                  params.executedPrice,
                quantity: sellQuantity,
                orderAmount:
                  executedAmount,

                executedPrice:
                  params.executedPrice,
                executedQuantity:
                  sellQuantity,
                executedAmount,

                fee: 0,
                rejectedReason: null,
                executedAt: new Date(),
                cancelledAt: null,
              },
            ],
            {
              session: mongoSession,
            },
          );

        const order = createdOrders[0];

        result = {
          orderId: String(order._id),
          market: params.market,
          type: "sell",
          executedPrice:
            params.executedPrice,
          executedQuantity:
            sellQuantity,
          executedAmount,
          krwBalance:
            account.krwBalance,
          holdingQuantity:
            holding.quantity,
          averagePrice:
            holding.averagePrice,
        };
      });

    if (!result) {
      throw new Error(
        "주문 처리 결과를 생성하지 못했습니다.",
      );
    }

    return result;
  } finally {
    await mongoSession.endSession();
  }
}
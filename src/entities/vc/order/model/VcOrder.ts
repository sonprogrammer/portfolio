import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from 'mongoose';

export const VC_ORDER_SIDES = [
  'buy',
  'sell',
] as const;

export const VC_ORDER_TYPES = [
  'market',
  'limit',
] as const;

export const VC_ORDER_STATUSES = [
  'pending',
  'filled',
  'cancelled',
  'rejected',
] as const;

const vcOrderSchema = new Schema(
  {
    guestId: {
      type: Schema.Types.ObjectId,
      ref: 'VcGuestAccount',
      required: true,
      index: true,
    },

    market: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    type: {
      type: String,
      enum: VC_ORDER_SIDES,
      required: true,
    },

    orderType: {
      type: String,
      enum: VC_ORDER_TYPES,
      required: true,
    },

    status: {
      type: String,
      enum: VC_ORDER_STATUSES,
      required: true,
      default: 'pending',
      index: true,
    },

    price: {
      type: Number,
      default: null,
      min: 0,
    },

    quantity: {
      type: Number,
      default: null,
      min: 0,
    },

    orderAmount: {
      type: Number,
      default: null,
      min: 0,
    },

    executedPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    executedQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    executedAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    fee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    rejectedReason: {
      type: String,
      default: null,
    },

    executedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'vc_orders',
  },
);

vcOrderSchema.index({
  guestId: 1,
  createdAt: -1,
});

vcOrderSchema.index({
  guestId: 1,
  status: 1,
  market: 1,
});

export type VcOrderDocument =
  InferSchemaType<typeof vcOrderSchema>;

export const VcOrderModel =
  (models.VcOrder as Model<VcOrderDocument>) ??
  model<VcOrderDocument>(
    'VcOrder',
    vcOrderSchema,
  );
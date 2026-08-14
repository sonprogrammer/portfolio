import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from 'mongoose';

const vcHoldingSchema = new Schema(
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
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    lockedQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    averagePrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    totalBuyAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'vc_holdings',
  },
);

vcHoldingSchema.index(
  {
    guestId: 1,
    market: 1,
  },
  {
    unique: true,
  },
);

export type VcHoldingDocument =
  InferSchemaType<typeof vcHoldingSchema>;

export const VcHoldingModel =
  (models.VcHolding as Model<VcHoldingDocument>) ??
  model<VcHoldingDocument>(
    'VcHolding',
    vcHoldingSchema,
  );
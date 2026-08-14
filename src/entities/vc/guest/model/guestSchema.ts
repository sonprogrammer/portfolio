import {
  model,
  models,
  Schema,
  type InferSchemaType,
} from 'mongoose';

const vcGuestAccountSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    nickname: {
      type: String,
      required: true,
      trim: true,
    },

    krwBalance: {
      type: Number,
      required: true,
      default: 10_000_000,
      min: 0,
    },

    lockedKrw: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'vc_guest_accounts',
  },
);

export type VcGuestAccountDocument =
  InferSchemaType<typeof vcGuestAccountSchema>;

export const VcGuestAccount =
  models.VcGuestAccount ??
  model(
    'VcGuestAccount',
    vcGuestAccountSchema,
  );
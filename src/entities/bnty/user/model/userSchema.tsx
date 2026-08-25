import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const userSchema = new Schema(
  {
    demoSessionId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    role: {
      type: String,
      enum: ['member', 'trainer'],
      required: true,
    },

    ptCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'bnty_users',
  },
);

userSchema.index(
  {
    demoSessionId: 1,
    role: 1,
  },
  {
    unique: true,
  },
);

export type BntyUser = InferSchemaType<typeof userSchema>;

export const BntyUserModel: Model<BntyUser> =
  (mongoose.models.BntyUser as Model<BntyUser>) ??
  mongoose.model<BntyUser>('BntyUser', userSchema);
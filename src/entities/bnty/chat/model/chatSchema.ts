import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
} from 'mongoose';

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'BntyUser',
      required: true,
    },

    senderRole: {
      type: String,
      enum: ['member', 'trainer'],
      required: true,
    },

    type: {
      type: String,
      enum: ['text', 'media'],
      default: 'text',
      required: true,
    },

    message: {
      type: String,
      default: '',
    },

    data: {
      type: String,
      default: '',
    },

    fileName: {
      type: String,
      default: '',
    },

    readBy: {
      type: [Schema.Types.ObjectId],
      ref: 'BntyUser',
      default: [],
    },

    sentAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    _id: true,
  },
);

const chatRoomSchema = new Schema(
  {
    demoSessionId: {
      type: String,
      required: true,
      index: true,
    },

    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'BntyUser',
      required: true,
      index: true,
    },

    trainerName: {
      type: String,
      required: true,
      trim: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'BntyUser',
      required: true,
      index: true,
    },

    memberName: {
      type: String,
      required: true,
      trim: true,
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    lastMessage: {
      type: String,
      default: '',
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'bnty_chat_rooms',
  },
);

chatRoomSchema.index(
  {
    trainerId: 1,
    memberId: 1,
  },
  {
    unique: true,
  },
);

export type ChatRoom = InferSchemaType<typeof chatRoomSchema>;

export const ChatRoomModel: Model<ChatRoom> =
  (mongoose.models.ChatRoom as Model<ChatRoom>) ??
  mongoose.model<ChatRoom>('ChatRoom', chatRoomSchema);
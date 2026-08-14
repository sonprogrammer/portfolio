import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
} from 'mongoose';

const NoteSchema = new Schema(
  {
    demoSessionId: {
      type: String,
      required: true,
      index: true,
    },

    chatRoomId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
      index: true,
    },

    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'BntyUser',
      required: true,
      index: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'BntyUser',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    workoutDate: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

  },
  {
    timestamps: true,
    collection: 'bnty_lesson_notes',
  },
);

NoteSchema.index({
  chatRoomId: 1,
  workoutDate: -1,
});

export type LessonNote = InferSchemaType<
  typeof NoteSchema
>;

export const LessonNoteModel: Model<LessonNote> =
  (mongoose.models.LessonNote as Model<LessonNote>) ??
  mongoose.model<LessonNote>('LessonNote', NoteSchema);
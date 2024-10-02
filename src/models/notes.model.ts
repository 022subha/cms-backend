import mongoose, { Schema, Document } from "mongoose";

interface INote extends Document {
  contentId: mongoose.Schema.Types.ObjectId;
  notionId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema: Schema = new Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: [true, "Content ID is required!"],
    },
    notionId: {
      type: String,
      required: [true, "Notion ID is required!"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;

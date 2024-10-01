import mongoose, { Schema, model, Document } from "mongoose";
import { CONTENT_TYPE } from "../constants";

interface IContent extends Document {
  title: string;
  description: string;
  type: CONTENT_TYPE.FOLDER | CONTENT_TYPE.VIDEO;
  thumbnail: {
    public_id: string;
    url: string;
  };
  parentID: mongoose.Schema.Types.ObjectId;
  children: mongoose.Schema.Types.ObjectId[];
  video: mongoose.Schema.Types.ObjectId;
  duration: number;
  notes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  questions: mongoose.Schema.Types.ObjectId[];
  answers: mongoose.Schema.Types.ObjectId[];
  isPublished: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    type: {
      type: String,
      enum: [CONTENT_TYPE.FOLDER, CONTENT_TYPE.VIDEO],
      default: CONTENT_TYPE.FOLDER,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: [true, "Public ID is required!"],
      },
      url: {
        type: String,
        required: [true, "URL is required!"],
      },
    },
    parentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required!"],
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Content = model<IContent>("Content", contentSchema);

export default Content;

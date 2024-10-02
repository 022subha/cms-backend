import mongoose, { Schema, model, Document } from "mongoose";

interface IVideoProgress extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  contentId: mongoose.Schema.Types.ObjectId;
  markAsCompleted: boolean;
  lastWatched: Date;
}

const videoProgressSchema = new Schema<IVideoProgress>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required!"],
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required!"],
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: [true, "Content is required!"],
  },
  markAsCompleted: {
    type: Boolean,
    default: false,
  },
  lastWatched: {
    type: Date,
    default: Date.now,
  },
});

const VideoProgress = model<IVideoProgress>(
  "VideoProgress",
  videoProgressSchema
);

export default VideoProgress;

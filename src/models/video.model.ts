import mongoose, { Schema, Document } from "mongoose";

interface IVideoMetadata extends Document {
  contentId: number;
  video_1080p?: {
    public_id?: string;
    url?: string;
  };
  video_720p?: {
    public_id?: string;
    url?: string;
  };
  video_360p?: {
    public_id?: string;
    url?: string;
  };
  subtitles?: string;
  segments?: any;
  thumbnail_url?: {
    public_id?: string;
    url?: string;
  };
  duration?: number;
}

const VideoMetadataSchema: Schema = new Schema(
  {
    contentId: {
      type: Number,
      required: [true, "Content ID is required!"],
      unique: true,
    },
    video_1080p: {
      public_id: { type: String },
      url: { type: String },
    },
    video_720p: {
      public_id: { type: String },
      url: { type: String },
    },
    video_360p: {
      public_id: { type: String },
      url: { type: String },
    },
    subtitles: { type: String },
    segments: { type: Schema.Types.Mixed, default: {} },
    thumbnail_url: {
      public_id: { type: String },
      url: { type: String },
    },
    duration: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVideoMetadata>(
  "VideoMetadata",
  VideoMetadataSchema
);

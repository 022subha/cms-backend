import mongoose, { Schema, model, Document } from "mongoose";

interface IRatingAndReview extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const ratingAndReviewSchema = new Schema<IRatingAndReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required!"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "Review is required!"],
      trim: true,
    },
  },
  { timestamps: true }
);

const RatingAndReview = model<IRatingAndReview>(
  "RatingAndReview",
  ratingAndReviewSchema
);

export default RatingAndReview;

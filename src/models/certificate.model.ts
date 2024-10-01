import mongoose, { Schema, model, Document } from "mongoose";

interface ICertificate extends Document {
  courseId: mongoose.Schema.Types.ObjectId;
  studentId: mongoose.Schema.Types.ObjectId;
  issueDate: Date;
  certificateUrl: string;
}

const certificateSchema = new Schema<ICertificate>({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course ID is required!"],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Student ID is required!"],
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  certificateUrl: {
    type: String,
    required: true,
  },
});

certificateSchema.index({ courseId: 1, studentId: 1 }, { unique: true });

const Certificate = model<ICertificate>("Certificate", certificateSchema);

export default Certificate;

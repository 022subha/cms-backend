import mongoose, { Schema, model, Document } from "mongoose";
import { COURSE_LEVEL } from "../constants";

interface ICourse extends Document {
  title: string;
  description: string;
  duration: number;
  level:
    | COURSE_LEVEL.BEGINNER
    | COURSE_LEVEL.INTERMEDIATE
    | COURSE_LEVEL.ADVANCED;
  category: mongoose.Schema.Types.ObjectId;
  tags: string[];
  prerequisites: string[];
  thumbnail: {
    public_id: string;
    url: string;
  };
  demoVideo: {
    public_id: string;
    url: string;
  };
  price: number;
  ratingAndReviews: mongoose.Schema.Types.ObjectId[];
  courseContent: mongoose.Schema.Types.ObjectId[];
  studentsEnrolled: mongoose.Schema.Types.ObjectId[];
  rating: number;
  purchased: number;
  isPublished: boolean;
  certificate: mongoose.Schema.Types.ObjectId[];
  certificateIssued: boolean;
  createdAt: Date;
  updatedAt: Date;
  searchableKeywords: string[];
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required!"],
    },
    level: {
      type: String,
      enum: [
        COURSE_LEVEL.BEGINNER,
        COURSE_LEVEL.INTERMEDIATE,
        COURSE_LEVEL.ADVANCED,
      ],
      required: [true, "Level is required!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Category is required!"],
      ref: "Category",
    },
    tags: {
      type: [String],
      required: [true, "Tags are required!"],
    },
    prerequisites: {
      type: [String],
      required: [true, "Prerequisites are required!"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: [true, "Thumbnail public_id is required!"],
      },
      url: {
        type: String,
        required: [true, "Thumbnail url is required!"],
      },
    },
    demoVideo: {
      public_id: {
        type: String,
        required: [true, "Demo video public_id is required!"],
      },
      url: {
        type: String,
        required: [true, "Demo video url is required!"],
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    certificate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],
    certificateIssued: {
      type: Boolean,
      default: false,
    },
    searchableKeywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

courseSchema.pre<ICourse>("save", function (next) {
  const keywordsSet = new Set<string>();

  const addKeywords = (text: string) => {
    text.split(" ").forEach((word) => {
      keywordsSet.add(word.toLowerCase());
    });
  };

  addKeywords(this.title);
  addKeywords(this.description);
  this.tags.forEach(addKeywords);
  this.prerequisites.forEach(addKeywords);

  this.searchableKeywords = Array.from(keywordsSet);
  next();
});

courseSchema.pre("updateOne", function (next) {
  const keywordsSet = new Set<string>();

  const addKeywords = (text: string) => {
    text.split(" ").forEach((word) => {
      keywordsSet.add(word.toLowerCase());
    });
  };

  const update = this.getUpdate() as ICourse;

  addKeywords(update.title);
  addKeywords(update.description);
  update.tags.forEach(addKeywords);
  update.prerequisites.forEach(addKeywords);

  update.searchableKeywords = Array.from(keywordsSet);
  next();
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;

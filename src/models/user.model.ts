import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants";

interface IUser extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: ROLES.USER | ROLES.ADMIN;
  isVerified: boolean;
  active: boolean;
  additionalInfo: mongoose.Schema.Types.ObjectId;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  blogs: mongoose.Schema.Types.ObjectId[];
  blogsRead: mongoose.Schema.Types.ObjectId[];
  courses: mongoose.Schema.Types.ObjectId[];
  coursesEnrolled: mongoose.Schema.Types.ObjectId[];
  watchList: mongoose.Schema.Types.ObjectId[];
  courseProgress: mongoose.Schema.Types.ObjectId[];
  videoProgress: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  replies: mongoose.Schema.Types.ObjectId[];
  questions: mongoose.Schema.Types.ObjectId[];
  answers: mongoose.Schema.Types.ObjectId[];
  certificate: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])(?=.{8,})/;

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate: {
        validator: function (email: string) {
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      minlength: [6, "Password need to be at least 6 characters long!"],
      select: false,
      validate: {
        validator: function (password: string) {
          return strongPasswordRegex.test(password);
        },
        message: () =>
          `Password is too weak! Password must contain a lowercase letter, an uppercase letter, a number, and a special character.`,
      },
    },
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows for null values while ensuring uniqueness
    },
    avatar: {
      public_id: {
        type: String,
        default: "avatar",
      },
      url: {
        type: String,
        default: function () {
          return `https://api.dicebear.com/5.x/initials/svg?seed=${this.firstName} ${this.lastName}`;
        },
      },
    },
    role: {
      type: Schema.Types.String,
      enum: [ROLES.USER, ROLES.ADMIN],
      default: ROLES.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    additionalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdditionalInfo",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    blogsRead: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    coursesEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    watchList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
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
    certificate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.setResetPasswordToken = function (token: string) {
  this.resetPasswordToken = token;
  this.resetPasswordExpire = new Date(Date.now() + 5 * 60 * 1000);
};

userSchema.pre("save", function (next) {
  if (!this.password && !this.googleId) {
    next(new Error("Either password or googleId must be present!"));
  } else {
    next();
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre("save", function (next) {
  if (this.isModified("firstName") || this.isModified("lastName")) {
    if (this.avatar.url.slice(0, 25) === "https://api.dicebear.com/") {
      this.avatar.url = `https://api.dicebear.com/5.x/initials/svg?seed=${this.firstName} ${this.lastName}`;
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};

const User = model<IUser>("User", userSchema);

export default User;

import { Schema, model, Document } from "mongoose";

interface IProfile extends Document {
  gender?: string;
  dateOfBirth?: Date;
  about?: string;
  contactNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  { timestamps: true }
);

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;

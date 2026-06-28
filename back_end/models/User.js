import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A username is mandatory"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "An email is mandatory"],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A password is mandatory"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;

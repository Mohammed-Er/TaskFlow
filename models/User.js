import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is mandatory"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "A password is mandatory"],
    },
})

const User = mongoose.model("User", UserSchema);
export default User;
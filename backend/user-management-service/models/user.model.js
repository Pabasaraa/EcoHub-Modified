import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
    default: null,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: Schema.Types.Mixed,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

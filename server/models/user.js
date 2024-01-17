import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 8,
  },
  secret: { type: mongoose.Types.ObjectId, ref: "Secret" },
  isSecret: {type: Boolean, default:false},
  token: {type: String, default: ''},
});

export default model("User", userSchema);

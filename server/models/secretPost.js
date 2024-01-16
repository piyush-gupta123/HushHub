import mongoose, { Schema, model } from "mongoose";

const secretSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default model("Secret",secretSchema);
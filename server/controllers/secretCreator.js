import { createError } from "../error.js";
import User from "../models/user.js";
import Secret from "../models/secretPost.js";
import mongoose from "mongoose";

export const secretGet = async(req,res,next)=>{
  try{
    const secrets = await Secret.find().populate("user")
    if(!secrets){
      return res.status(404).json({Message: "No Secrets found!!"})
    }

    return res.status(200).json({secrets});
  }
  catch(err){
    next(err)
  }
}

export const secretCreate = async (req, res, next) => {
  try {
    // const userId = req.params
    const { value, user } = req.body;
    if (!value || !user) {
      return createError(422, "Please enter a secret to post!");
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return createError(404, "User does not exists!");
    }

    if (existingUser.isSecret) {
        return res.status(400).json({Message: "A user can only share one secret!"});
    } 

    const newSecret = new Secret({
        value,
        user,
      });

      const session = await mongoose.startSession();
      session.startTransaction();
      existingUser.secret=newSecret;
      existingUser.isSecret=true;
      await existingUser.save({ session });
      await newSecret.save({ session });
      session.commitTransaction();

      if (!newSecret) {
        return createError(500, "Something went wrong!!");
      }

      return res.status(201).json({ newSecret });
  } catch (err) {
    next(err);
  }
};

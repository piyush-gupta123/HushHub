import express from "express";
import { forgotPassword, getAllUsers, signInUser, signUpUser } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.get('/',getAllUsers);
userRouter.post('/signup',signUpUser);
userRouter.post('/signin',signInUser);
userRouter.post('/forgotPassword',forgotPassword)

export default userRouter; 
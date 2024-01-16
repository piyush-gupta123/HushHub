import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../error.js";
import nodemailer from "nodemailer"

const sendMail = async(name, email, token)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth:{
                user: process.env.PERSONAL_EMAIL,
                pass: process.env.PERSONAL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.PERSONAL_EMAIL,
            to: email,
            subject: "Reset Password",
            html: '<p>Hi '+name+', Please copy and visit the given link to <a href="http://127.0.0.1:5000/user/reset-password?token='+token+'"> reset your password</a>!!'
        }

        transporter.sendMail(mailOptions,function(error,information){
            if(error){
                console.log(error);
            }
            else{
                console.log("Mail has been sent:- ",information.response);
            }
        })
    }
    catch(err){
        return console.log(err)
    }
}

export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        if(!users){
            return createError(404,"No user Found!")
        }

        return res.status(200).json({users})
    }
    catch(err){
        next(err);
    }
};

export const signUpUser = async(req,res,next)=>{
    try{
        const {username, email, password} = req.body
        if(!username || !email || !password){
            return createError(404,"Enter All The Credentials!!")
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return createError(422,"User already Exists!!")
        }
        const salt=10;
        const hashedPassword = bcrypt.hashSync(password,salt);

        const newUser = new User({username, email, password: hashedPassword})
        const token = jwt.sign({id: newUser._id},process.env.SECRET_KEY,{
            expiresIn: process.env.SECRET_KEY_EXPIRY
        })

        newUser.token=token

        await newUser.save()

        return res.status(200).json({newUser})
    }
    catch(err){
        next(err)
    }
}

export const signInUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return createError(404,"Please enter all the credentials!!")
        }
        const user = await User.findOne({email});
        if(!user){
            return createError(404,"User does not exists!!")
        }

        const isPassword = bcrypt.compareSync(password, user.password)

        if(!isPassword){
            return createError(400,"Invalid Credentials!")
        }

        const token = jwt.sign({id: user._id},process.env.SECRET_KEY,{
            expiresIn: process.env.SECRET_KEY_EXPIRY
        })

        user.token=token

        return res.status(200).json({user})
    }
    catch(err){
        next(err);
    }
}

export const forgotPassword = async(req,res,next)=>{
    try{
        const { email } = req.body
        const userExists = await User.findOne({email})
        if(!userExists){
            return createError(404, "User does not exists")
        }
        sendMail(userExists.username,userExists.email,userExists.token)
        return res.status(201).json({Message: "Please check your mail inbox to reset your password!!"})
    }
    catch(err){
        next(err)
    }
}
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../error.js";
import nodemailer from "nodemailer"

const sendMail = async(email)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'gmail',
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
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing HushHub. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Koding 101 Inc</p>
                  <p>1600 Amphitheatre Parkway</p>
                  <p>California</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
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
        sendMail(userExists.email)
        return res.status(201).json({Message: "Please check your mail inbox to reset your password!!"})
    }
    catch(err){
        next(err)
    }
}
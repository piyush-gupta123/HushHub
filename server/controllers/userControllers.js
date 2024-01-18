import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const sendMail = async(name,email,token)=>{
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
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - Reset Email Template</title>
              
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HushHub</a>
                </div>
                <p style="font-size:1.1em">Hi ${name},</p>
                <p>Thank you for choosing HushHub. Use the following link to complete your Password Recovery Procedure.<a href="http://127.0.0.1:5000/user/resetPassword?token=${token}">reset your Password</a></p>
                <p style="font-size:0.9em;">Regards,<br />HushHub</p>
                <hr style="border:none;border-top:1px solid #eee" />
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
            return res.status(404).json({Message: "No user Found!"})
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
            return res.status(404).json({Message: "Please enter all the credentials!!"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(422).json({Message: "User already Exists!!"})
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
            return res.status(404).json({Message: "Please enter all the credentials!!"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({Message: "User does not exists"})
        }

        const isPassword = bcrypt.compareSync(password, user.password)

        if(!isPassword){
            return res.status(404).json({Message: "Invalid Credentials!"})
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
            return res.status(404).json({Message: "User does not exists"})
        }
        sendMail(userExists.username,userExists.email,userExists.token)
        return res.status(201).json({Message: "Please check your mail inbox to reset your password!!"})
    }
    catch(err){
        next(err)
    }
}

export const resetPassword = async(req,res,next)=>{
    try{
        const token = req.query.token
        const tokenData = await User.findOne({token: token})

        if(!token){
            return res.status(404).json({Message: "This link has been expired!"})
        }

        const password=req.body.password
        const hashedPassword =  bcrypt.hashSync(password,10)
        const userData = await User.findByIdAndUpdate({ _id: tokenData._id},{$set: {password: hashedPassword, token: ''}},{new:true})
        return res.status(200).json({Message: "User Password has been reset!!",data: userData})
    }
    catch(err){
        next(err)
    }
}
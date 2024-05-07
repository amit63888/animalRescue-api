import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
const UserSchema = require('../../model/volunteer/user');

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fname, lname, contact, email, profile, location, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: "User already exists",
        error: false,
        status: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new UserSchema({ fname, lname, contact, email, profile, location, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({
      code: 200,
      message: "User registered successfully",
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    // Find user by email
    const user = await UserSchema.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
        error: true,
        status: false,
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password",
        error: true,
        status: false,
      });
    }

    // User authenticated, generate JWT token
    const token = jwt.sign({ userId: user._id },env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      code: 200,
      message: "Login successful",
      token: token,
      user,
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const ChangePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    // Find user by email
    const user = await UserSchema.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
        error: true,
        status: false,
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Invalid password",
        error: true,
        status: false,
      });
    }

    // User authenticated, generate JWT token
    const token = jwt.sign({ userId: user._id },env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      code: 200,
      message: "Login successful",
      token: token,
      user,
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
const sendEmail = async (to:any, subject:any, text:any) => {
  try {
      const transporter = nodemailer.createTransport({
          host: env.MAIL_HOST,
          port: env.MAIL_PORT,
          secure: false,
          auth: {
                 user:env.MAIL_USERNAME,
                 pass:env.MAIL_PASSWORD
              }
      });
      const mailOptions = {
          from:env.MAIL_USERNAME ,
          to: `${to}`,
          subject: subject,
          text: " ",
          html: "<p> click below, To Reset <a href='https://techwagger.com/reset-password/" + text + "'> click here,</a></p>"
//
      };
       await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
  }
};
const generateOTP = () => {
  const otpLength = 10;
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < otpLength; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
export const forgetPassword = async (req: any, res: any) => {
  try {
      const { email } = req.body;
      const OTP = await generateOTP();
      //  const user = await Users.findOne({where:{ email }});
      //  if (!user) {
      //     return res.status(404).json({
      //         status: 200,
      //         error: false,
      //         message: "User not found",
      //         data: []
      //       });
      // }
      const otp= OTP;
     // const otpCreatedAt = new Date();
     // await Users?.update({email}, {otp, otpCreatedAt});
      await sendEmail(email,"Techwagger Password Reset",otp);
      return res.status(200).json({
          status: 200,
          error: false,
          message: "Link sent to  your mail, successfully.",
          data: {
                  email
                },
        });
  } catch (error) {
      return res.status(500).json({
          status: 500,
          error: true,
          message: "Internal Server Error",
          data: []
        });
}}






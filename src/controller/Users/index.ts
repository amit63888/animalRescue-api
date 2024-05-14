import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { generateOTP, sendEmail } from "../../utills"; 
import Users from "../../model/Users/user";
import Login from "../../model/Users/login";
import { createUserLog } from "../../utills/logCreatation";
 

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {roleId, firstName, lastName, phone,location,radius,photo,status,email,password} = req.body;
    const existingUser = await Login.findOne({ email }); 
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: "User already exists",
        error: false,
        status: false,
      });
    }
    const newUser = new Users({ roleId, firstName, lastName, phone,location,radius,photo,status });
    const registeredUser=  await newUser.save();
     const saltRounds = 10; 
  const salt = await bcrypt.genSalt(saltRounds); 
  const hashedPassword = await bcrypt.hash(password, salt);
  const newLogin = new Login({userId:registeredUser._id,email,password:hashedPassword,currentLogin:"7"});
    const registeredLogin=  await newLogin.save();
    return res.status(200).json({
      code: 200,
      message: "User registered successfully",
      data:registeredLogin,
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
    const user = await Login.findOne({ email })

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
      await createUserLog(user.userId,"login",`Login failed due to wrong password : ${password}`);
      return res.status(401).json({
        code: 401,
        message: "Invalid password",
        error: true,
        status: false,
      });
    }

    // User authenticated, generate JWT token
    const secret = process.env.JWT_SECRET ;
    const token = jwt.sign({ userId: user._id }, `${secret}`, { expiresIn: '1h' });
    await createUserLog(user.userId,"login",`Login Successful`);
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
    return res.status(200).json({
      code: 200,
      message: "Internal Server Error",
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


export const forgetPassword = async (req: any, res: any) => {
  try {
      const { email } = req.body;
      const OTP = await generateOTP();
       const user = await Users.find({ email });
       if (!user) {
          return res.status(404).json({
              status: 200,
              error: false,
              message: "User not found",
              data: []
            });
      }
      const otp= OTP;
     const otpCreatedAt = new Date();
     await Users.updateOne({ email: email }, { $set: { otp: otp, updatedAt: otpCreatedAt } }    );
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






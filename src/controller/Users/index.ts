import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { GetIp, generateOTP, loginDetailsForResponse, sendEmail } from "../../utills"; 
import Users from "../../model/Users/user";
import Login from "../../model/Users/login";
import { createUserLog } from "../../utills/logCreatation";
import { forgetPasswordMailTemplate } from "../../utills/mailTemplate";
 

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
  const newLogin = new Login({userId:registeredUser._id,email,password:hashedPassword});
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
    const user = await Login.findOne({ email }); 
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
        error: true,
        status: false,
      });
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      await createUserLog(user.userId,"login",`Login attempt failed due to wrong password : ${password}`);
      return res.status(401).json({
        code: 401,
        message: "Invalid password",
        error: true,
        status: false,
      });
    } 
    const secret = process.env.JWT_SECRET ;
    const token = jwt.sign({ userId: user._id }, `${secret}`, { expiresIn: '1h' });
    const loginDetail= await Login.findOneAndUpdate( { email },   { $set: {token,lastLogin: user?.currentLogin, lastLoginTime: user?.currentLoginTime,currentLogin: await GetIp(), updatedAt: new Date() } },  { new: true }   );  
    const userDetail=await Users.findOne({_id:user?.userId}).populate('roleId');
    const data=await loginDetailsForResponse(loginDetail,userDetail)
     await createUserLog(user.userId,"login",`Login Successfull`);

    return res.status(200).json({
      code: 200,
      message: "Login successfull", 
      data,
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

export const forgetPassword = async (req: Request, res: Response) => {
  try {
      const { email } = req.body;
      const OTP = await generateOTP();
       const user = await Login.findOne({ email });
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
     await Login.updateOne({ email: email }, { $set: { otp: otp, updatedAt: otpCreatedAt } }    );
     await sendEmail(email,"Password Reset Link",otp,forgetPasswordMailTemplate({subject:"amit chauahan",text:"reset",hyperText:"89999"}));
      await createUserLog(`${user.userId}`,"Password Reset link request",`Link sent successfully.`);
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

export const ChangePassword = async (req: Request, res: Response) => {
  try {
    const { otp,password } = req.body;
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(password, salt);
    const otpCreatedAt = new Date();
    const updatedData = await Login.findOneAndUpdate( { otp },   { $set: { password: hashedPassword, updatedAt: otpCreatedAt } },  { new: true }   );  
    await createUserLog(updatedData?.userId,"Change Password",`Password updated successfully -:${password}`);
    return res.status(200).json({
      code: 200,
      data:updatedData,
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






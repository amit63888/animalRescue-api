import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

module.exports = { registerUser, loginUser };

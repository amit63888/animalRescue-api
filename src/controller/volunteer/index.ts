import { Request, Response } from "express";
import bcrypt from "bcrypt";
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

module.exports = { registerUser };

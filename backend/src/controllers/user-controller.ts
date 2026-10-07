import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user-model";


export const getRegister = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email, and password are required",
      });
    }

    
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User with this email already exists",
      });
    }

   
    const hashedPassword =
      await bcrypt.hash(password, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accessLevel: "readonly",
    });

   
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        accessLevel: user.accessLevel,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "User created successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
      },
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};



export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

   
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

   
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message:
          "JWT_SECRET is not configured",
      });
    }

    
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        accessLevel: user.accessLevel,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
      },
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};
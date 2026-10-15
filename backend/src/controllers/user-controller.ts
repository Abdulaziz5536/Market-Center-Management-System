import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user-model";
import { Types } from "mongoose";
import { validateEmailDomain } from "../utils/validateEmail.js";


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
      name,email,password,accessLevel,} = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email, and password are required",
      });
    }

    const emailExists = await validateEmailDomain(email);

        if (!emailExists) {
          return res.status(400).json({
           message: "Invalid email.",
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
      accessLevel:accessLevel === "admin" ? "admin" : "readonly",
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


export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, email, password, accessLevel } = req.body;
    

   

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const emailExists = await validateEmailDomain(email);

    if (!emailExists) {
      return res.status(400).json({
        message: "Invalid email.",
      });
    }

 

   if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid user ID" });
}

const existingUser = await User.findOne({
  email: email.trim(),
  _id: { $ne: new Types.ObjectId(id) },
});

    if (existingUser) {
      return res.status(400).json({
        message: "This email is already in use",
      });
    }

    user.name = name.trim();
    user.email = email.trim();
    user.accessLevel =
      accessLevel === "admin" ? "admin" : "readonly";

    if (password && password.trim()) {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must contain at least 6 characters",
        });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

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
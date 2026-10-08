import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user-model";

type AccessLevel = "admin" | "readonly";

type TokenPayload = JwtPayload & {
  userId: string;
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is missing.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT secret is not configured.",
      });
    }

    const decoded = jwt.verify(token, secret) as TokenPayload;

    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    const user = await User.findById(decoded.userId).select(
      "_id name email accessLevel"
    );

    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    // Make sure the value coming from MongoDB is a valid access level
    if (
      user.accessLevel !== "admin" &&
      user.accessLevel !== "readonly"
    ) {
      return res.status(403).json({
        message: "Invalid user access level.",
      });
    }

    const accessLevel: AccessLevel = user.accessLevel;

    req.user = {
      userId: user._id.toString(),
      accessLevel: accessLevel,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  if (req.user.accessLevel !== "admin") {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  next();
};
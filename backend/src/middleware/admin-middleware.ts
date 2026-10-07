import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  accessLevel: "admin" | "readonly";
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const secret =
      process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message:
          "JWT secret is not configured",
      });
    }

    const decoded =
      jwt.verify(
        token,
        secret
      ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
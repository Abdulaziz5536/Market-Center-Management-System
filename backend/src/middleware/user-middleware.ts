import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
      return res.status(401).json({
        message: "Not authorized. No token provided.",
      });
    }

    
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Invalid token format.",
      });
    }


    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Token is missing.",});
}

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as JwtPayload;

    
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};
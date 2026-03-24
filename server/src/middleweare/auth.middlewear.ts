import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, JwtPayload } from "../types/express";

export const authMiddleWear = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token!,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

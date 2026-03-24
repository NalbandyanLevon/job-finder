import { Request } from "express";

export interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
    role: role,
  });

  res.status(201).json({
    success: true,
    message: "User created",
    data: {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ success: false });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch {
    return res.status(403).json({ success: false });
  }

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== token)
    return res.status(403).json({ success: false });

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  res.json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await User.findOneAndUpdate(
      { refreshToken: token },
      { refreshToken: null },
    );
  }
  res.clearCookie("refreshToken");
  res.json({ success: true });
});

import { Request, Response } from "express";
import { AuthRequest } from "../types/express";
import { asyncHandler } from "../utils/asyncHandler";
import { userService } from "../services/user.service";
import { Types } from "mongoose";

export const createUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  },
);

export const getAllUsers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      sucess: true,
      data: users,
    });
  },
);

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  console.log({ id });
  console.log({ path: req.path });
  // if (!req.params.id && req.pa) {

  // }

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const deleteUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;

    const deletedUser = await userService.deleteUser(userId as string);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  },
);

export const updateUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    const updatedUser = await userService.updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: updatedUser,
    });
  },
);

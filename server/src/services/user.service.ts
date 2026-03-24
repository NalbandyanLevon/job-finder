import { Types } from "mongoose";
import { IUser, User } from "../models/User";
import { Job } from "../models/Job";

type UpdateUserPayload = Partial<IUser>;

export const userService = {
  async createUser(data: Omit<IUser, "createdAt">) {
    return User.create(data);
  },

  async getAllUsers() {
    return User.find();
  },

  async getUserById(userId: string) {
    return User.findById(userId);
  },

  async deleteUser(userId: string) {
    await Job.deleteMany({ user: userId });
    return User.findByIdAndDelete(userId);
  },

  async updateUser(userId: string, data: UpdateUserPayload) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: data },
      { new: true, runValidators: true },
    );
    return updatedUser;
  },
};

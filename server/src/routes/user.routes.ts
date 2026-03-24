import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { authMiddleWear } from "../middleweare/auth.middlewear";
import { adminMiddleware } from "../middleweare/admin.middlewear";

const router = Router();

router.post("/", authMiddleWear, adminMiddleware, createUser);
router.get("/", authMiddleWear, getAllUsers);
router.get("/:id", authMiddleWear, getUserById);
router.put("/:id", authMiddleWear, updateUser);
router.delete("/:id", authMiddleWear, adminMiddleware, deleteUser);

export default router;

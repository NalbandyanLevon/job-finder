import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobs,
  getOneJob,
  updateJob,
} from "../controllers/job.controller";
import { authMiddleWear } from "../middleweare/auth.middlewear";
import { adminMiddleware } from "../middleweare/admin.middlewear";

const router = Router();

router.post("/", authMiddleWear, createJob);
router.get("/", authMiddleWear, getJobs);
router.get("/all", authMiddleWear, adminMiddleware, getAllJobs);
router.get("/:id", authMiddleWear, getOneJob);
router.put("/:id", authMiddleWear, updateJob);
router.delete("/:id", authMiddleWear, deleteJob);

export default router;

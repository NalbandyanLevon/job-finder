import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types/express";
import { jobService } from "../services/job.service";

export const createJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const job = await jobService.createJob(req.body, userId);

    res.status(201).json({
      success: true,
      data: job,
    });
  },
);

export const getJobs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const id = req.user!.id;
  const jobs = await jobService.getJobs(id);

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

export const getAllJobs = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const jobs = await jobService.getAllJobs();

    res.status(200).json({
      success: true,
      data: jobs,
    });
  },
);

export const getOneJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const job = await jobService.getOneJob(id as string, userId);

    res.status(200).json({
      success: true,
      data: job,
    });
  },
);

export const deleteJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const deletedJob = await jobService.deleteJob(id as string, userId);
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  },
);

export const updateJob = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const updatedJob = await jobService.updateJob(
      id as string,
      userId,
      req.body,
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({ success: true, data: updatedJob });
  },
);

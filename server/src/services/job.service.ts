import { IJob, Job } from "../models/Job";

export const jobService = {
  async createJob(
    data: Omit<IJob, "user" | "createdAt" | "updatedAt">,
    userId: string,
  ) {
    return Job.create({
      ...data,
      user: userId,
    });
  },

  async getJobs(userId: string) {
    return Job.find({ user: userId });
  },

  async getAllJobs() {
    return Job.find();
  },

  async getOneJob(jobId: string, userId: string) {
    return Job.findOne({ _id: jobId, user: userId });
  },

  async deleteJob(jobId: string, userId: string) {
    return Job.findOneAndDelete({ _id: jobId, user: userId });
  },

  async updateJob(jobId: string, userId: string, data: Partial<IJob>) {
    return Job.findOneAndUpdate(
      {
        _id: jobId,
        user: userId,
      },
      {
        $set: data,
      },
      { new: true, runValidators: true },
    );
  },
};

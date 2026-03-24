import { apiFetch } from "@/services/api/client";
import { IJob } from "@/entities/job/types";
import { CreateJobDto, UpdateJobDto } from "@/entities/job/dto";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getJobs = (): Promise<ApiResponse<IJob[]>> => {
  return apiFetch("/jobs/all");
};

export const getOneJob = (id: string): Promise<ApiResponse<IJob>> => {
  return apiFetch(`/jobs/${id}`);
};

export const getJobsByUser = (): Promise<ApiResponse<IJob[]>> => {
  return apiFetch(`/jobs`);
};

export const createJob = (data: CreateJobDto): Promise<ApiResponse<IJob>> => {
  return apiFetch(`/jobs`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateJob = (
  id: string,
  data: UpdateJobDto,
): Promise<ApiResponse<IJob>> => {
  return apiFetch(`/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteJob = (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  return apiFetch(`/jobs/${id}`, {
    method: "DELETE",
  });
};

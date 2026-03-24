import { JobStatus } from "./types";

export interface CreateJobDto {
  title: string;
  company: string;
  description?: string;
  status: JobStatus;
  location?: string;
}

export type UpdateJobDto = Partial<CreateJobDto>
  

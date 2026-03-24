export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export interface IJob {
  _id: string;
  user: string
  title: string;
  company: string;
  description?: string;
  status: JobStatus;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobs";

export const useGetAllJobs = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    ...options,
  });
};

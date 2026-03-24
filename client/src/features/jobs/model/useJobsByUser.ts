import { useQuery } from "@tanstack/react-query";
import { getJobsByUser } from "../api/jobs";

export const useJobsByUser = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobsByUser(),
    ...options,
  });
};

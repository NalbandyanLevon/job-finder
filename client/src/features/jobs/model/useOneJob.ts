import { useQuery } from "@tanstack/react-query";
import { getOneJob } from "../api/jobs";

export const useGetOneJob = (id: string) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getOneJob(id),
    enabled: !!id,
  });
};

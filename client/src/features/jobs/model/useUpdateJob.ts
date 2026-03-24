import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../api/jobs";
import { IJob } from "@/entities/job/types";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<IJob, "_id" | "updatedAt" | "createdAt" | "status" | "user">;
    }) => updateJob(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

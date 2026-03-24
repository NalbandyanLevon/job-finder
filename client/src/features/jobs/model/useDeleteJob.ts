import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../api/jobs";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

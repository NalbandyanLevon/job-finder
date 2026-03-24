"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/users";
import { User } from "@/entities/user/types";

type UpdateUserParams = {
  id: string;
  data: Partial<User>;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserParams) => updateUser({ id, data }),
    onSuccess: (updatedUser, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
};

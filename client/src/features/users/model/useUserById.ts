"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/users";

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

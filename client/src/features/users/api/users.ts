import { apiFetch } from "@/services/api/client";
import { User } from "@/entities/user/types";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface UpdateUserParams {
  id: string;
  data: Partial<User>;
}

export const getUsers = (): Promise<ApiResponse<User[]>> => {
  return apiFetch("/users");
};

export const getUserById = (id: string): Promise<ApiResponse<User>> => {
  return apiFetch(`/users/${id}`);
};

export const updateUser = ({ id, data }: UpdateUserParams) => {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteUser = (id: string) => {
  return apiFetch(`/users/${id}`, {
    method: "DELETE",
  });
};

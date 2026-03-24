export type TRole = "user" | "admin";

export type User = {
  _id: string;
  email: string;
  role: TRole;
  createdAt?: string;
  updatedAt?: string;
};

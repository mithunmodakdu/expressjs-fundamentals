export type TUserRole = "super_admin" | "admin" | "user";

export const USER_ROLE = {
  super_admin: "super_admin",
  admin: "admin",
  user: "user"
} as const;

export interface IUser {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  role: TUserRole;
  is_active: boolean;
}
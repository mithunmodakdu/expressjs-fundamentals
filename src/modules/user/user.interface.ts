export interface IUser {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  role: "super_admin" | "admin" | "user";
  is_active: boolean;
}
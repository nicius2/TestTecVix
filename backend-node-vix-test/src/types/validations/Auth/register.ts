import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }).min(1, "Username is required"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string({ required_error: "Confirm Password is required" }).min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TRegister = z.infer<typeof registerSchema>;

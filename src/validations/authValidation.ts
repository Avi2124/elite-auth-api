import { z } from "zod";

export const registerSchema = z.object({
    name:z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["USER", "ADMIN"])
}); 

export const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8)
});

export const verifyEmailSchema = z.object({
    email: z.email(),
    otp: z.string().length(6)
});

export const resendOTPschema = z.object({
  email: z.email(),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8)
});

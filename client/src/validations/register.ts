import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8).max(100).refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
  }, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
})

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type LoginSchemaType = z.infer<typeof LoginSchema>;
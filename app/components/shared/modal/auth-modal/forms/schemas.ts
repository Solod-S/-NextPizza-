import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Please enter the correct password" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Enter your first and last name" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine(data => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;

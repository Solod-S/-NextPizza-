import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "The name must contain at least two characters." }),
  lastName: z
    .string()
    .min(2, { message: "The last name must contain at least two characters." }),
  email: z.string().email({ message: "Please enter the valid email." }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address",
  }),
  comment: z.string().optional(),
});

export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>;

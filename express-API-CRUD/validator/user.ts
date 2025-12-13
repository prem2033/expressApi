import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Name is required"),

  email: z.email("Invalid email format"),

  userName: z
    .string()
    .min(3, { message: "userId must be at least 3 characters" })
    .max(10, { message: "userId must not exceed 10 characters" }),

  phone: z.string().regex(/^(?:\+?\d{1,3}[- ]?)?\d{7,15}$/, {
    message: "Invalid phone number",
  }),

  address: z.string().min(1, "Address is required"),
});

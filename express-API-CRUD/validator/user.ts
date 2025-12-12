import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.email("Invalid email format"),

  phone: z.string().regex(/^(?:\+?\d{1,3}[- ]?)?\d{7,15}$/, {
    message: "Invalid phone number",
  }),

  address: z.string().min(1, "Address is required"),
});

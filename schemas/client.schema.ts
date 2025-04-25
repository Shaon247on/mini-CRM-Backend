import { z } from "zod";

export const clientSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Client name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" }),
  company: z.string().optional(),
  notes: z.string().optional(),
  creatorId: z.number().int({ message: "Creator ID must be an integer" }).min(1, { message: "Creator ID is required" }),
});
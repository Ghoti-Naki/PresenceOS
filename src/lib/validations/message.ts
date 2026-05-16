import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  body: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message too long"),
});

export type MessageInput = z.infer<typeof messageSchema>;

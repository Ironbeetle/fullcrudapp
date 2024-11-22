import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  language: z.string().optional(),
  category: z.string().optional(),
  demographic: z.string().optional(),
  topic: z.string().optional(),
  context: z.string().optional(),
  comment: z.string().optional(),
  vidurl: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbimg: z.string().optional(),
  nation: z.string().optional(),
});

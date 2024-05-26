import { z } from "zod";

export const formSchema = z.object({
    summary: z.string().min(2).max(100),
    description: z.string().min(2).max(250),
    due: z.date({
        required_error: "A due date is required.",
    }),
    id: z.string().optional(),
});

export type PlannerItem = z.infer<typeof formSchema>;

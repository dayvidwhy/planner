import { z } from "zod";

export const formSchema = z.object({
    summary: z.string().min(1, {
        message: "Please provide a summary.",
    }).max(100, {
        message: "Summary must be at most 100 characters long."
    }),
    description: z.string().min(1, {
        message: "Please provide a description.",
    }).max(250, {
        message: "Description must be at most 250 characters long."
    }),
    due: z.date({
        required_error: "A due date is required.",
    }),
    id: z.string().optional(),
});

export type PlannerItem = z.infer<typeof formSchema>;

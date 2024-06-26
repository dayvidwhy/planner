"use client";

// libs
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

// local libs
import { cn } from "@/lib/utils";
import type { PlannerItem } from "@/lib/validators";
import { formSchema } from "@/lib/validators";

// UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PlannerForm({ 
    createPlannedItem 
}: { 
    createPlannedItem: (values: PlannerItem) => Promise<void>; 
}) {
    // define form
    const form = useForm<PlannerItem>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summary: "",
            description: "",
        },
    });
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        if (hasErrors) {
            // throw error for error boundary to catch
            throw new Error("Failed to create planned item");
        }
    }, [hasErrors]);
    
    // form action
    const onSubmit = async (values: PlannerItem) => {
        try {
            await createPlannedItem(values);
            setHasErrors(false);
            form.reset();
        } catch (e) {
            setHasErrors(true);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Add a Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>Summary</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter summary.." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What has to get done?"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mb-4">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal w-full",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

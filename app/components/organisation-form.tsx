"use client";

// libs
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// local libs
import type { OrganisationSchema } from "@/lib/validators";
import { organisationSchema } from "@/lib/validators";

// UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

export default function OrganisationForm({ 
    createOrganisation 
}: { 
    createOrganisation: (values: OrganisationSchema) => Promise<void>; 
}) {
    // define form
    const form = useForm<OrganisationSchema>({
        resolver: zodResolver(organisationSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        if (hasErrors) {
            // throw error for error boundary to catch
            throw new Error("Failed to create organisation");
        }
    }, [hasErrors]);
    
    // form action
    const onSubmit = async (values: OrganisationSchema) => {
        try {
            await createOrganisation(values);
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
                        <CardTitle>Choose a name and description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Organisation name.." {...field} />
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
                                            placeholder="Organisation description.."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
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

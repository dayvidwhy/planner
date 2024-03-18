"use client";

// libs
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

// local libs
import type { PlannerItem } from "@/app/components/planner-form";

// UI Components
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlannerItemsProps {
    plannedItems: PlannerItem[] | null | undefined;
    deletePlannedItem: (id: string) => void;
};

export default function PlannerItems({ plannedItems, deletePlannedItem }: PlannerItemsProps): JSX.Element {
    console.log("Component got ", plannedItems);
    const router = useRouter();
    return (
        <div className="flex min-h-screen flex-col items-center">
            {plannedItems?.map((item, index) => (
                <div key={index} className="mb-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.summary}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <p>Planned for {format(item.due, "PP")}</p>
                            <Button
                                className="w-full"
                                onClick={async () => {
                                    await deletePlannedItem(item.id || "");
                                    router.refresh();
                                }}  
                            >
                                <Trash className="mr-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}

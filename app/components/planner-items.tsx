"use client";

// libs
import { X } from "lucide-react";

// local libs
import type { PlannerItem } from "@/lib/validators";
import { formatDateForDisplay } from "@/lib/utils";

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
    return (
        <div className="flex flex-wrap items-center [&>*:nth-child(odd)]:pr-2 [&>*:nth-child(even)]:pl-2">
            {plannedItems?.map((item, index) => (
                <div key={index} className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 pb-4">
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle>{item.summary}</CardTitle>
                            <Button variant="outline" type="button" data-testid="delete-button"
                                onClick={async () => {
                                    await deletePlannedItem(item.id || "");
                                }}  
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <p>{`Planned for ${formatDateForDisplay(item.due)}`}</p>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}

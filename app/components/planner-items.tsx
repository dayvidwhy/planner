// libs
import { format } from "date-fns";

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

interface PlannerItemsProps {
    plannedItems: PlannerItem[] | null | undefined;
};

export default function PlannerItems({ plannedItems }: PlannerItemsProps): JSX.Element {
    console.error("Component got ", plannedItems);
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
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}

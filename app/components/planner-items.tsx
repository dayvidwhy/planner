import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { format } from "date-fns";

export default function PlannerItems({ plannedItems }) {
    console.error("Component got ", plannedItems);
    return (
        <div className="flex min-h-screen flex-col items-center">
            {plannedItems.map((item, index) => (
                <div key={index} className="mb-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.summary}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <p>Planned for {format(new Date(item.due), "PP")}</p>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}

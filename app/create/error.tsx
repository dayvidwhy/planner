"use client"; // Error components must be Client Components
 
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Error({
    error,
    reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
 
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
            <p className="text-muted-foreground">
                Try again or contact support if the problem persists.
            </p>
            <Separator className="my-4" />
            <Button
                variant="outline"
                onClick={reset}
            >
                Try again
            </Button>
        </div>
    );
};

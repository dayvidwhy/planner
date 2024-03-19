import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <main className="min-h-screen text-center">
            <div className="mt-6 mb-6">
                <h1 className="text-5xl font-bold tracking-tight" role="heading">
                    Plan anything collaboratively
                </h1>
                <h2 className="text-4xl font-bold tracking-tight text-muted-foreground mt-4">
                    Work with others to cross off the list
                </h2>
            </div>
            <Separator className="my-4" />
        </main>
    );
}

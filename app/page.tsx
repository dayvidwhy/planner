import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <main className="text-center">
            <div className="my-48 mx-auto w-3/4 text-left">
                <h1 className="text-7xl font-bold tracking-tight" role="heading">
                    Plan anything <span className="underline hover:text-slate-600">collaboratively</span> with others
                </h1>
                <h2 className="text-3xl tracking-tight text-muted-foreground mt-4">
                    Work with others to cross off the list
                </h2>
            </div>
            <Separator className="my-4" />
        </main>
    );
}

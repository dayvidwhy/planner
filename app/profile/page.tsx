import { auth } from "../auth";

export default async function Profile() {
    // null or a user object from github
    const session = await auth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {JSON.stringify(session)}
        </main>
    );
};

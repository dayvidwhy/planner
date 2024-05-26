"use client";

import Link from "next/link";
import { Github } from "lucide-react";

import { usePathname } from "next/navigation";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Navigation({
    loggedIn, signIn, signOut
}: { 
    loggedIn: boolean
    signIn: () => void
    signOut: () => void
}) {
    const pathname = usePathname();
    const menuItems: {
        label: string; 
        href: string;
        active: boolean;
    }[] = [
        {
            label: "Home",
            href: "/",
            active: pathname === "/",
        },
        {
            label: "Planner",
            href: "/planner",
            active: pathname === "/planner",
        },
        {
            label: "Profile",
            href: "/profile",
            active: pathname === "/profile",
        }
    ];
    
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href} className={item.active ? "" : "text-muted-foreground" }>
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {item.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
                {
                    loggedIn ? (
                        <NavigationMenuItem>
                            <Button variant="outline" type="button" onClick={() => signOut()}>
                                Log out
                            </Button>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <Button variant="outline" type="button" onClick={() => signIn()}>
                                <Github className="mr-2 h-4 w-4" />
                                Login with Github
                            </Button>
                        </NavigationMenuItem>
                    )
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
};

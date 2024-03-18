"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

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
    const menuItems: { label: string; href: string }[] = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Planner",
            href: "/planner",
        },
        {
            label: "Profile",
            href: "/profile",
        }
    ];
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
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
                            <Button variant="outline" type="button" onClick={async () => {
                                await signOut();
                            }}>
                                Log out
                            </Button>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <Button variant="outline" type="button" onClick={async () => {
                                await signIn();
                            }}>
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

"use client";

import * as React from "react";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navigation({ loggedIn }: { loggedIn: boolean }) {
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
        },
        {
            label: loggedIn ? "Logout" : "Login",
            href: `/api/auth/${loggedIn ? "signout" : "signin"}`,
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
            </NavigationMenuList>
        </NavigationMenu>
    );
};

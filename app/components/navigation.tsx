"use client";

import Link from "next/link";
import { User, LogOut, LogIn, Home, Book } from "lucide-react";

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
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }[] = [
        {
            label: "Home",
            href: "/",
            active: pathname === "/",
            icon: Home
        },
        {
            label: "Planner",
            href: "/planner",
            active: pathname === "/planner",
            icon: Book
        },
        {
            label: "Profile",
            href: "/profile",
            active: pathname === "/profile",
            icon: User
        }
    ];
    
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href} className={item.active ? "" : "text-muted-foreground" }>
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
                {
                    loggedIn ? (
                        <NavigationMenuItem>
                            <Button variant="outline" type="button" onClick={() => signOut()}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </Button>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <Button variant="outline" type="button" onClick={() => signIn()}>
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </NavigationMenuItem>
                    )
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
};

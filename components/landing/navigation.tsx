"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Navigation() {
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary"></div>
                        <span className="font-bold text-xl">Statpulse</span>
                    </Link>

                    {/* Navigation Menu */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* Products Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <Link
                                                href="#"
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Statpulse Screenshot Generator
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Effortlessly create stunning screenshots for your SaaS projects with Statpulse.
                                                </p>
                                            </Link>
                                        </li>
                                        <ListItem href="#" title="For SaaS Teams">
                                            Streamlined tools to automate visuals for your applications.
                                        </ListItem>
                                        <ListItem href="#" title="Statpulse Embed">
                                            Seamlessly integrate your visuals into your platform with our embedding solutions.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* Pricing */}
                            <NavigationMenuItem>
                                <a href="#pricing-section" className={navigationMenuTriggerStyle()}>
                                    Pricing
                                </a>
                            </NavigationMenuItem>

                            {/* Resources - Disabled */}
                            <NavigationMenuItem>
                                <span
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "cursor-not-allowed text-muted-foreground"
                                    )}
                                    title="Coming Soon"
                                >
                                    Resources
                                </span>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button size="sm">Early Access</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </li>
    )
})
ListItem.displayName = "ListItem"

function navigationMenuTriggerStyle() {
    return cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    )
}
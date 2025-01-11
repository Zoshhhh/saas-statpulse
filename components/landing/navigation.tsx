"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Navigation() {
    return (
        <div className="flex justify-center w-full py-4">
            <nav className="rounded-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg mx-4 my-2 w-full max-w-6xl z-50">
                <div className="flex h-16 items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo_purple.png"
                            alt="Statpulse Logo"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <span className="font-bold text-xl text-purple-800">Statpulse</span>
                    </Link>

                    {/* Navigation Menu */}
                    <NavigationMenu className="z-50">
                        <NavigationMenuList>
                            {/* Products Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-purple-800 hover:text-purple-600">
                                    Products
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                                        <li className="col-span-2">
                                            <Link
                                                href="#"
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-purple-100 to-purple-50 p-6 no-underline outline-none focus:shadow-md"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium text-purple-800">
                                                    Statpulse Screenshot Generator
                                                </div>
                                                <p className="text-sm leading-tight text-purple-600">
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
                                <Link href="#pricing-section" className={navigationMenuTriggerStyle()}>
                                    Pricing
                                </Link>
                            </NavigationMenuItem>

                            {/* Resources - Disabled */}
                            <NavigationMenuItem>
                                <span
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "cursor-not-allowed text-purple-300"
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
                                <Button variant="ghost" size="sm" className="text-purple-800 hover:text-purple-600">
                                    Login
                                </Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Early Access
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" className="text-purple-800 hover:text-purple-600 font-medium mr-4">
                                Dashboard
                            </Link>
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
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-50 hover:text-purple-800 focus:bg-purple-50 focus:text-purple-800",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none text-purple-800">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-purple-600">
                    {children}
                </p>
            </a>
        </li>
    )
})
ListItem.displayName = "ListItem"

function navigationMenuTriggerStyle() {
    return cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-50 hover:text-purple-800 focus:bg-purple-50 focus:text-purple-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-purple-100/50 data-[state=open]:bg-purple-100/50 text-purple-800"
    )
}


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'

export function Pricing() {
    return (
        <div className="container px-4 md:px-6 py-12 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
                {/* Twitter-like Testimonial Card */}
                <Card className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <CardContent className="p-0 space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/icon.png"
                                alt="kevinweb3 avatar"
                                width={48}
                                height={48}
                                className="rounded-full"
                                priority
                            />
                            <div>
                                <p className="font-bold">kevinweb3</p>
                                <p className="text-sm text-gray-500">@kevinweb3</p>
                            </div>
                        </div>
                        <p className="text-lg">
                            🚀 we&apos;re getting closer to the launch of StatPulse!
                            Exciting news: it will be free for the first week.

                            Get ready to turn your data into stunning visuals.
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                            <span>2:50 PM · Jan 10, 2025</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-purple-800">Auto-generate Beautiful Screenshots</h2>
                    <p className="text-gray-600">
                        Save hours of effort by automating the creation of your screenshots and mockups from templates.
                    </p>
                    <p className="text-gray-600">
                        Statpulse turns your code into beautiful screenshots with just a few clicks, perfect for documentation and social media.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-purple-100 p-6 rounded-xl text-center transition-all duration-300 hover:bg-purple-200 hover:shadow-md">
                            <div className="text-3xl mb-2">🎨</div>
                            <h3 className="text-sm font-medium text-purple-800">Custom Templates</h3>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-xl text-center transition-all duration-300 hover:bg-purple-200 hover:shadow-md">
                            <div className="text-3xl mb-2">⚡️</div>
                            <h3 className="text-sm font-medium text-purple-800">Auto Generation</h3>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-xl text-center transition-all duration-300 hover:bg-purple-200 hover:shadow-md">
                            <div className="text-3xl mb-2">🖼️</div>
                            <h3 className="text-sm font-medium text-purple-800">Customizable Frames</h3>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-xl text-center transition-all duration-300 hover:bg-purple-200 hover:shadow-md">
                            <div className="text-3xl mb-2">🎭</div>
                            <h3 className="text-sm font-medium text-purple-800">Multiple Themes</h3>
                        </div>
                    </div>
                </div>

                {/* Pricing Card */}
                <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0">
                    <CardContent className="p-6">
                        <div className="inline-block bg-purple-800 text-white text-sm px-3 py-1 rounded-full mb-6">
                            Limited Time Offer
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-purple-900">Get lifetime access for only</h3>
                        <div className="text-5xl font-bold mb-6 text-purple-800">$9</div>
                        <ul className="space-y-4 mb-6">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                                <span>Unlimited screenshot generation</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                                <span>All premium features included:</span>
                            </li>
                            <ul className="pl-7 space-y-2 mb-2">
                                <li className="text-sm">• GIF export</li>
                                <li className="text-sm">• Custom backgrounds</li>
                                <li className="text-sm">• Advanced settings</li>
                                <li className="text-sm">• Priority support</li>
                            </ul>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                                <span>Early access to new features</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-purple-800 text-white hover:bg-purple-900">
                            Get Early Access →
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


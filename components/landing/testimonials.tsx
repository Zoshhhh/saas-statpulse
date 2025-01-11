"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { motion } from "framer-motion"

export function Testimonials() {
    return (
        <div className="bg-gradient-to-b from-white via-purple-50 to-white py-16">
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold text-center mb-4 text-purple-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Join Our Community
                </motion.h2>
                <motion.p
                    className="text-center text-purple-600 mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Share your Statpulse creations on X and you might be featured here!
                </motion.p>
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center px-6 py-3 rounded-full">
                        <span className="mr-2 text-lg font-semibold">Share on</span>
                        <Image src="/x.png" alt="X logo" width={32} height={32} />
                    </Button>
                </motion.div>
                <div className="grid gap-6 md:grid-cols-3 mx-auto">
                    {potentialTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                        >
                            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-[200px] border border-purple-100">
                                <CardContent className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <Avatar className="h-10 w-10 mr-3 border-2 border-purple-200">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback className="bg-purple-100 text-purple-800">{testimonial.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-semibold text-purple-800">{testimonial.name}</p>
                                                <p className="text-xs text-purple-600">{testimonial.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const potentialTestimonials = [
    {
        quote: "This could be your Statpulse success story! Share your experience and get featured.",
        name: "Your Name",
        title: "Your Role",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        quote: "Imagine your creative screenshots showcased right here. Share and shine!",
        name: "Future Star",
        title: "Statpulse User",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        quote: "Your unique use of Statpulse could inspire others. Don't miss this chance to be featured!",
        name: "Next Featured",
        title: "Creative Professional",
        avatar: "/placeholder.svg?height=40&width=40"
    }
]


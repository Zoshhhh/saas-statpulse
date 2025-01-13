'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from 'lucide-react'
import Image from 'next/image'
import logoPurple from '@/public/logo_purple.png'

const features = [
    {
        title: "App Development",
        description: "Core application functionality developed and launched.",
        completed: true,
        publishDate: "13/01/2025",
        details: [
            "Background Settings",
            "Card Settings",
            "Border Settings",
            "Shadow Settings",
            "Icon Settings",
            "Text Settings",
            "Animation"
        ]
    },
    {
        title: "PNG Export",
        description: "Export your designed card as a high-quality PNG image.",
        completed: true,
        publishDate: "13/01/2025",
        details: [
            "One-click export functionality",
            "High-resolution PNG output",
            "Transparent background support",
            "Instant download option"
        ]
    },
    {
        title: "GIF Export",
        description: "Export your card design as an animated GIF.",
        completed: false,
        publishDate: "20/01/2025",
        details: [
            "Convert card design to animated GIF",
            "Customizable animation duration",
            "Loop settings for GIF playback",
            "Optimized file size for web sharing"
        ]
    },
    {
        title: "Visual Poll Creator",
        description: "Create visually appealing poll designs for engagement.",
        completed: false,
        publishDate: "27/01/2025",
        details: [
            "Design customizable poll templates",
            "Add animated elements to polls",
            "Create multi-option poll layouts",
            "Implement visual results display"
        ]
    },
    {
        title: "Community Templates",
        description: "Create and share design templates within the community.",
        completed: false,
        publishDate: "03/02/2025",
        details: [
            "Develop template sharing platform",
            "Implement user-friendly template browser",
            "Create rating and feedback system for templates",
            "Enable easy template customization and use"
        ]
    },
]

export function Roadmap() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const completedCount = features.filter(f => f.completed).length
    const nextFeatureIndex = completedCount

    return (
        <section className="py-20 bg-gradient-to-b from-purple-300 via-purple-100 to-white rounded-3xl overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-purple-800 mb-12 flex items-center justify-center">
                    <Image src={logoPurple} alt="LOGO" width={48} height={48} className="mr-4" />
                    <span>Roadmap</span>
                </h2>
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <motion.div
                            className="absolute left-4 top-0 bottom-0 w-1 bg-purple-600"
                            initial={{ height: `${(completedCount / features.length) * 100}%` }}
                            animate={{ height: `${((completedCount + 0.5) / features.length) * 100}%` }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-200" />
                        <Accordion
                            type="single"
                            collapsible
                            value={activeIndex !== null ? activeIndex.toString() : undefined}
                            onValueChange={(value) => setActiveIndex(value ? parseInt(value) : null)}
                            className="space-y-6"
                        >
                            {features.map((feature, index) => (
                                <AccordionItem key={index} value={index.toString()} className="border-none">
                                    <motion.div
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div
                                            className={`absolute left-0 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                                                feature.completed ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-600'
                                            }`}
                                        >
                                            {feature.completed ? <Check size={20} /> : index + 1}
                                        </div>
                                        <Card
                                            className={`ml-12 transition-all duration-300 ${
                                                feature.completed ? 'bg-purple-100 border-purple-500' : 'bg-white hover:bg-purple-50'
                                            } ${activeIndex === index ? 'ring-2 ring-purple-600' : ''}`}
                                        >
                                            <AccordionTrigger className="hover:no-underline w-full [&>svg]:text-purple-500 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:group-hover:text-purple-700">
                                                <CardHeader className="flex flex-row items-center justify-between p-4 cursor-pointer w-full group">
                                                    <div className="flex-grow">
                                                        <CardTitle className={`text-lg ${feature.completed ? 'text-purple-900' : 'text-gray-900'} group-hover:text-purple-700 transition-colors duration-200`}>
                                                            {feature.title}
                                                        </CardTitle>
                                                        <CardDescription className={`${feature.completed ? 'text-purple-700' : 'text-gray-700'} group-hover:text-purple-600 transition-colors duration-200`}>
                                                            {feature.description}
                                                        </CardDescription>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {feature.completed ? `Online since ${feature.publishDate}` : `Estimated: ${feature.publishDate}`}
                                                        </p>
                                                    </div>
                                                    {index === nextFeatureIndex && (
                                                        <motion.div
                                                            className="w-3 h-3 rounded-full bg-purple-600 flex-shrink-0"
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    )}
                                                </CardHeader>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <CardContent className="pt-4">
                                                            <ul className="list-disc pl-5 space-y-2">
                                                                {feature.details.map((detail, detailIndex) => (
                                                                    <motion.li
                                                                        key={detailIndex}
                                                                        className="text-sm text-gray-700"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: detailIndex * 0.1 }}
                                                                    >
                                                                        {detail}
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </CardContent>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </AccordionContent>
                                        </Card>
                                    </motion.div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}


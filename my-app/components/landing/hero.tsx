import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from 'lucide-react'

export function Hero() {
    return (
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="relative flex flex-col items-center gap-12 py-16 md:py-24 text-center">
                <div className="space-y-8 max-w-3xl">
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                        ✨ New: Create beautiful code screenshots
                    </Badge>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            Auto-generate screenshots
                            <span className="block mt-2">for your SaaS</span>
                        </h1>
                        <p className="max-w-[600px] text-gray-500 md:text-xl mx-auto">
                            Save hours of effort by automating the creation of your screenshots and mockups from templates
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row justify-center">
                        <Link href="/signup">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8">
                                Start for free →
                            </Button>
                        </Link>
                        <Link href="#demo">
                            <Button variant="outline" size="lg" className="font-medium px-8">
                                See demo
                            </Button>
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 justify-center">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Vidéo intégrée */}
                <div className="w-full max-w-3xl aspect-video bg-gray-200 rounded-xl shadow-2xl overflow-hidden">
                    <video
                        className="w-full h-full rounded-xl"
                        controls
                        poster="/poster.png" 
                    >
                        <source src="/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/30 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>
        </div>
    )
}

const features = [
    "20+ Screenshot API and Editor templates",
    "Zapier and other integrations",
    "SDKs for Node.js, Python, PHP and Ruby",
    "Top-notch support",
    "Cancel anytime",
]
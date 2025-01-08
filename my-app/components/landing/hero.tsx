import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Image, Type, Palette, Layers, Download } from 'lucide-react'

export function Hero() {
    return (
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="relative flex flex-col items-center gap-12 py-16 md:py-24 text-center">
                <div className="space-y-8 max-w-3xl">
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                        ✨ New: Create stunning screenshots in seconds
                    </Badge>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            Transform Your Ideas
                            <span className="block mt-2">Into Visual Masterpieces</span>
                        </h1>
                        <p className="max-w-[600px] text-gray-500 md:text-xl mx-auto">
                            Craft beautiful, customizable screenshots for your projects with our powerful and intuitive tools
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row justify-center">
                        <Link href="/signup">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8">
                                Start creating <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="font-medium px-8">
                                Explore features
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-full max-w-4xl aspect-[16/9] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center p-8">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Image className="h-5 w-5" />
                                    <span>Background: Solid, Gradient, or Presets</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Type className="h-5 w-5" />
                                    <span>Custom Text Size and Alignment</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Palette className="h-5 w-5" />
                                    <span>Border Color and Style Options</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Layers className="h-5 w-5" />
                                    <span>Adjustable Shadow Intensity</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Download className="h-5 w-5" />
                                    <span>Export as PNG or GIF</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Image className="h-5 w-5" />
                                    <span>Custom Icon Upload</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

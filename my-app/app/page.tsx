import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full">
                <Navigation />
            </div>
            <div className="w-full max-w-6xl mx-auto">
                <Hero />
                <Testimonials />
                <Pricing />
            </div>
        </main>
    )
}


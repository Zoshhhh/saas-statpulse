import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Twitter } from 'lucide-react'

export function Testimonials(props: any) {
    return (
        <div className="container px-4 md:px-6 py-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Join Our Community</h2>
            <p className="text-center text-muted-foreground mb-8">Share your Statpulse creations on X and you might be featured here!</p>
            <div className="flex justify-center mb-12">
                <Button size="lg" className="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white">
                    <Twitter className="mr-2 h-5 w-5" />
                    Share on X
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3 mx-auto">
                {potentialTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-background">
                        <CardContent className="p-4">
                            <p className="text-sm mb-4">{testimonial.quote}</p>
                            <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold">{testimonial.name}</p>
                                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

const potentialTestimonials = [
    {
        quote: "This could be your Statpulse success story! Share your experience and get featured.",
        name: "Your Name",
        title: "Your Role",
        avatar: "/placeholder.svg?height=32&width=32"
    },
    {
        quote: "Imagine your creative screenshots showcased right here. Share and shine!",
        name: "Future Star",
        title: "Statpulse User",
        avatar: "/placeholder.svg?height=32&width=32"
    },
    {
        quote: "Your unique use of Statpulse could inspire others. Don't miss this chance to be featured!",
        name: "Next Featured",
        title: "Creative Professional",
        avatar: "/placeholder.svg?height=32&width=32"
    }
]
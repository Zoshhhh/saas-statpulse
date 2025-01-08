import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
    return (
        <div className="container px-4 md:px-6 py-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What our users say</h2>
            <div className="grid gap-6 md:grid-cols-3 mx-auto">
                {testimonials.map((testimonial, index) => (
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

const testimonials = [
    {
        quote: "Statpulse has converted me from any other screenshot tool I used before. Absolutely love it!",
        name: "Caleb Leigh",
        title: "Head of Marketplace, Elgato",
        avatar: "/placeholder.svg?height=32&width=32"
    },
    {
        quote: "Big time saver for us with beautiful results. Statpulse is now an essential part of our workflow.",
        name: "Chris Evans",
        title: "Founder, Incident.io",
        avatar: "/placeholder.svg?height=32&width=32"
    },
    {
        quote: "As a freelance designer working with many agencies, Statpulse has become indispensable for my projects.",
        name: "Ashley Swanson",
        title: "Freelance Web Designer",
        avatar: "/placeholder.svg?height=32&width=32"
    }
]


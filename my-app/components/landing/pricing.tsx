import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, X } from 'lucide-react'

export function Pricing() {
    return (
        <div className="container px-4 md:px-6 py-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Powerful features, simple pricing</h2>
            <p className="text-xl text-center text-muted-foreground mb-12">Choose the plan that fits your screenshot needs</p>
            <div className="grid gap-8 md:grid-cols-3 mx-auto">
                {pricingPlans.map((plan, index) => (
                    <Card key={index} className={plan.name === 'Pro' ? 'border-primary' : ''}>
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold mb-6">${plan.price}<span className="text-xl text-muted-foreground">/mo</span></p>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        {feature.included ? (
                                            <CheckCircle className="h-5 w-5 text-primary mr-2" />
                                        ) : (
                                            <X className="h-5 w-5 text-muted-foreground mr-2" />
                                        )}
                                        <span className="text-sm">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className={`w-full ${plan.name === 'Pro' ? 'bg-primary text-primary-foreground' : ''}`}>
                                {plan.name === 'Pro' ? 'Start free trial' : 'Get started'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

const pricingPlans = [
    {
        name: 'Basic',
        price: 4,
        features: [
            { text: 'Up to 800x300px screenshots', included: true },
            { text: 'Solid background', included: true },
            { text: 'Basic border settings', included: true },
            { text: 'Simple shadow effects', included: true },
            { text: 'Text customization', included: true },
            { text: 'PNG export', included: true },
            { text: 'Gradient backgrounds', included: false },
            { text: 'Custom icon upload', included: false },
            { text: 'GIF export', included: false },
            { text: 'Remove watermark', included: false },
        ]
    },
    {
        name: 'Pro',
        price: 9,
        features: [
            { text: 'Everything in Basic', included: true },
            { text: 'Unlimited screenshot size', included: true },
            { text: 'Gradient & preset backgrounds', included: true },
            { text: 'Advanced border settings', included: true },
            { text: 'Custom icon upload', included: true },
            { text: 'GIF export', included: true },
            { text: 'Remove watermark', included: true },
            { text: 'Add counters and pools', included: true },
            { text: 'Priority support', included: true },
            { text: 'API access', included: false },
        ]
    },
    {
        name: 'Enterprise',
        price: 49,
        features: [
            { text: 'Everything in Pro', included: true },
            { text: 'Unlimited team members', included: true },
            { text: 'Advanced animation settings', included: true },
            { text: 'Custom templates', included: true },
            { text: 'API access', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: 'Custom integrations', included: true },
            { text: 'SLA', included: true },
            { text: 'On-premise deployment', included: true },
            { text: 'Brand customization', included: true },
        ]
    }
]


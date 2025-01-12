import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Statpulse - Auto-generate screenshots for SaaS',
    description: 'Save hours of efforts designing and automating beautiful screenshots and mockups from templates',
    icons: {
        icon: './logo_purple.png',
        apple: './logo_purple.png',
    },
    openGraph: {
        title: 'Statpulse - Auto-generate screenshots for SaaS',
        description: 'Save hours of efforts designing and automating beautiful screenshots and mockups from templates',
        images: [
            {
                url: './logo_purple.png',
                width: 800,
                height: 600,
                alt: 'Statpulse Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Statpulse - Auto-generate screenshots for SaaS',
        description: 'Save hours of efforts designing and automating beautiful screenshots and mockups from templates',
        images: ['./logo_purple.png'],
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <head>
                <link rel="icon" href="./logo_purple.png" />
            </head>
            <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    )
}


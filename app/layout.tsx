import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Statpulse - Auto-generate screenshots for SaaS',
    description: 'Save hours of efforts designing and automating beautiful screenshots and mockups from templates',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    )
}
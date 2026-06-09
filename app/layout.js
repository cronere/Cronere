import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Cronere — AI Workflow Automation for CPA & Accounting Firms',
  description: 'Cronere builds and maintains AI-powered workflows that eliminate the manual back-office tasks eating your firm\'s time. Built for CPA and accounting firms.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  )
}

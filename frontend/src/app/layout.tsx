import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navbar/navbar' // Import the Navbar component
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sentience - The Sphere',
  description: 'Created by Team Sphere',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Other head elements */}
      </head>

      <AuthProvider>
        <body className={inter.className}>
          <Navbar /> {/* Include the Navbar component */}
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
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

function getTitle(metadata: Metadata): string {
  if (typeof metadata.title === 'string') {
    return metadata.title;
  } else if (metadata.title && 'default' in metadata.title) {
    return metadata.title.default;
  } else {
    return 'Default Title';
  }
}

function getDescription(metadata: Metadata): string {
  if (typeof metadata.description === 'string') {
    return metadata.description;
  } else {
    return 'Default Description';
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{getTitle(metadata)}</title>
        <meta name="description" content={getDescription(metadata)} />
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
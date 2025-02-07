'use client'
import Link from 'next/link'
import { Camera } from 'lucide-react'

const galleries = [
  { name: 'College Sports', href: '/gallery/college-sports' },
  { name: 'Professional Sports', href: '/gallery/professional-sports' },
  { name: 'Portraits', href: '/gallery/portraits' },
]

export function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:h-16">
          <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start mb-4 sm:mb-0">
            <Link href="/" className="flex items-center text-lg font-semibold">
              <Camera className="h-6 w-6 mr-2" />
              <span>Olivia Frzop Photos</span>
            </Link>
          </div>
          <nav className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-end">
            {galleries.map((gallery) => (
              <Link
                key={gallery.name}
                href={gallery.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {gallery.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

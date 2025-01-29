'use client'

import { useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { VisuallyHidden } from './visually-hidden'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface MasonryGalleryProps {
  images: GalleryImage[]
  title: string
}

export function MasonryGallery({ images, title }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{title} Gallery</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((image, index) => (
            <div key={index} className="mb-4">
              <Dialog
                open={selectedImage === image}
                onOpenChange={(open) => {
                  if (!open) setSelectedImage(null)
                  setIsLoading(true)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 w-full h-auto"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto object-cover rounded-lg transition-transform hover:scale-105"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
                  <VisuallyHidden>
                    <DialogTitle>{image.alt}</DialogTitle>
                  </VisuallyHidden>
                  <div className="relative w-full h-full">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                    )}
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className="object-contain"
                      quality={100}
                      onLoadingComplete={() => setIsLoading(false)}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  )
}

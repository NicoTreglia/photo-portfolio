import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { listS3Objects } from '@/utils/s3'

const galleryPreviews = [
  {
    title: 'College Sports',
    prefix: 'college-sports/',
    href: '/gallery/college-sports',
  },
  {
    title: 'Professional Sport',
    prefix: 'professional-sports/',
    href: '/gallery/professional-sports',
  },
  { title: 'Portraits', prefix: 'portraits/', href: '/gallery/portraits' },
]

export async function GalleryPreview() {
  const previewsWithUrls = await Promise.all(
    galleryPreviews.map(async (preview) => {
      const objects = await listS3Objects(preview.prefix)
      const firstImage = objects[0]
      return {
        ...preview,
        image: firstImage ? firstImage.url : '/placeholder.svg',
        alt: firstImage
          ? firstImage.key.split('/').pop() || 'Gallery Preview'
          : 'Placeholder',
      }
    })
  )

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Galleries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewsWithUrls.map((gallery) => (
            <Card key={gallery.title} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={gallery.image || '/placeholder.svg'}
                    alt={gallery.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="text-xl font-semibold mb-2">{gallery.title}</h3>
                <Button asChild>
                  <Link href={gallery.href}>View Gallery</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

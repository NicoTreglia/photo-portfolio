import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const galleryPreviews = [
    {
        title: 'College Sports',
        image: '/assets/cover-image.png',
        alt: 'Beautiful landscape',
        href: '/gallery/nature',
    },
    {
        title: 'Professional Sports',
        image: '/assets/cover-image.png',
        alt: 'Stunning portrait',
        href: '/gallery/portraits',
    },
    {
        title: 'Portraits',
        image: '/assets/cover-image.png',
        alt: 'City skyline',
        href: '/gallery/urban',
    },
]

export function GalleryPreview() {
    return (
        <section className="py-8 bg-background mx-auto">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Featured Galleries
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryPreviews.map((gallery) => (
                        <Card key={gallery.title} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/2] w-full">
                                    <Image
                                        src={
                                            gallery.image || '/placeholder.svg'
                                        }
                                        alt={gallery.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start p-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {gallery.title}
                                </h3>
                                <Button asChild>
                                    <Link href={gallery.href}>
                                        View Gallery
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

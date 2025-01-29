import { MasonryGallery } from '@/components/ui-created/masonry-gallery'
import { listS3Objects } from '@/utils/s3'

const galleryData = {
  'college-sports': {
    title: 'College Sports',
    prefix: 'college-sports/',
  },
  'professional-sports': {
    title: 'Professional Sport',
    prefix: 'professional-sports/',
  },
  portraits: { title: 'Portraits', prefix: 'portraits/' },
}

export default async function GalleryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = await params

  const galleryKey = category as keyof typeof galleryData
  const gallery = galleryData[galleryKey]

  if (!gallery) {
    return <div>Gallery not found</div>
  }

  const s3Objects = await listS3Objects(gallery.prefix)

  const images = s3Objects.map((object) => ({
    src: object.url || '/placeholder.svg',
    alt: object.key.split('/').pop() || 'Image',
    width: 300,
    height: 400,
  }))

  return (
    <>
      <MasonryGallery images={images} title={gallery.title} />
    </>
  )
}

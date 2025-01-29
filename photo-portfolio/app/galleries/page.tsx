import Link from "next/link"

const galleries = [
  { name: "Nature", href: "/gallery/nature" },
  { name: "Portraits", href: "/gallery/portraits" },
  { name: "Urban", href: "/gallery/urban" },
  { name: "Events", href: "/gallery/events" },
]

export default function GalleriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Galleries</h1>
      <ul className="space-y-2">
        {galleries.map((gallery) => (
          <li key={gallery.name}>
            <Link href={gallery.href} className="text-lg text-primary hover:underline">
              {gallery.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


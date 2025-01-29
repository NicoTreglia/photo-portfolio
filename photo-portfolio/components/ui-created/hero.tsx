import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-background py-8 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4]">
            <Image
              src="/assets/cover-image.png"
              alt="Olivia Frzop's featured photograph"
              fill
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="lg:order-last">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {"Capturing Life's Beautiful Moments"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {
                "Welcome to Olivia Frzop's photography portfolio.  With an eye for detail and a passion for storytelling, Olivia creates stunning images that capture the essence of life's most precious moments. From breathtaking landscapes to intimate portraits, each photograph is a work of art that speaks to the soul."
              }
            </p>
            <div className="mt-8">
              <Button asChild>
                <a href="#galleries">Explore Galleries</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

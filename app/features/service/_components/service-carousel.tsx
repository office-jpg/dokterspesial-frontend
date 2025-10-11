import { type ServiceProps } from '~/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/atoms/carousel'
import ServiceList from './service-list'

interface ServiceCarouselProps {
  services: ServiceProps[]
  customWidth?: string
}

function ServiceCarousel({
  services,
  customWidth,
}: ServiceCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        skipSnaps: false,
        dragFree: true,
      }}
      className='w-full max-w-full'
    >
      <CarouselContent className='-ml-2 md:-ml-4 py-4'>
        {services.map((service, index) => (
          <CarouselItem
            key={service.slug}
            className={`pl-2 md:pl-4 min-w-0 ${customWidth ? 'basis-auto' : 'basis-[95%] md:basis-[45%]'}`}
          >
            <ServiceList service={service} index={index} customWidth={customWidth} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex justify-center mt-6 gap-4'>
        <CarouselPrevious className='relative translate-y-0 left-0 transition-all duration-200' />
        <CarouselNext className='relative translate-y-0 right-0 transition-all duration-200' />
      </div>
    </Carousel>
  )
}

export default ServiceCarousel

import { Skeleton } from '~/components/atoms/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/atoms/carousel'

interface ServiceCarouselSkeletonProps {
  count?: number
  customWidth?: string
}

export function ServiceCarouselSkeleton({
  count = 3,
  customWidth,
}: ServiceCarouselSkeletonProps) {
  return (
    <>
      <div className='block md:hidden w-full'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            dragFree: true,
          }}
          className='w-full max-w-full'
        >
          <CarouselContent className='-ml-2'>
            {Array.from({ length: count }).map((_, index) => (
              <CarouselItem
                key={index}
                className='pl-2 basis-[95%] min-w-0'
              >
                <div className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 p-6 ${customWidth || 'w-full'}`}>
                  <div className='flex flex-col items-start justify-center gap-6'>
                    <div className='flex gap-3'>
                      <div className='flex-shrink-0'>
                        <Skeleton className='size-16 rounded-xl bg-gray-300/80 dark:bg-gray-800/80' />
                      </div>

                      <div className='flex flex-col justify-between'>
                        <div className='space-y-3'>
                          <Skeleton className='h-5 w-48 bg-gray-300/80 dark:bg-gray-600/80' />
                          
                          <div className='flex flex-col gap-2 text-sm'>
                            <div className='flex items-center gap-2'>
                              <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                              <div className='flex items-center gap-1'>
                                <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                                <Skeleton className='h-3 w-2 bg-gray-300/80 dark:bg-gray-600/80' />
                                <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                              </div>
                            </div>
                            
                            <div className='flex items-center gap-2'>
                              <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                              <div className='flex items-center gap-1'>
                                <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                                <Skeleton className='h-3 w-2 bg-gray-300/80 dark:bg-gray-600/80' />
                                <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                      <div className='flex flex-row items-center justify-between w-full'>
                        <div className='flex flex-row items-center justify-start'>
                          <Skeleton className='h-6 w-20 bg-gray-300/80 dark:bg-gray-600/80' />
                        </div>

                        <div className='flex items-center gap-1.5'>
                          <div className='flex gap-1'>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Skeleton key={i} className='size-3 bg-gray-300/80 dark:bg-gray-600/80' />
                            ))}
                          </div>
                          <Skeleton className='h-4 w-8 bg-gray-300/80 dark:bg-gray-600/80' />
                        </div>
                      </div>

                      <div className='flex items-center w-full justify-between pt-2 border-t border-gray-200 dark:border-gray-600'>
                        <div className='flex flex-row gap-3 items-center justify-center w-full max-w-48'>
                          <Skeleton className='size-8 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                          <div className='flex-1 min-w-0'>
                            <Skeleton className='h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80' />
                          </div>
                        </div>

                        <Skeleton className='h-8 w-14 rounded bg-gray-300/80 dark:bg-gray-600/80' />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex justify-center mt-6 gap-4'>
            <Skeleton className='size-10 rounded-md bg-gray-300/80 dark:bg-gray-600/80' />
            <Skeleton className='size-10 rounded-md bg-gray-300/80 dark:bg-gray-600/80' />
          </div>
        </Carousel>
      </div>

      <div className='hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 w-full'>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className='group relative h-full max-h-none overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-slate-900 rounded-lg'
          >
            <div className='relative h-48 overflow-hidden'>
              <Skeleton className='h-full w-full bg-gray-300/80 dark:bg-gray-800/80' />
              <div className='absolute top-4 right-4'>
                <Skeleton className='h-6 w-16 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
              </div>
            </div>

            <div className='p-6'>
              <div className='mb-4'>
                <Skeleton className='h-6 w-3/4 bg-gray-300/80 dark:bg-gray-600/80' />
              </div>

              <div className='mb-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                  <Skeleton className='h-4 w-20 bg-gray-300/80 dark:bg-gray-600/80' />
                </div>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                  <div className='flex w-full items-center justify-between'>
                    <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='size-2 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                  <div className='flex w-full items-center justify-between'>
                    <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='size-2 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                  <Skeleton className='h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80' />
                </div>
              </div>

              <div className='mb-4 flex items-center gap-2'>
                <div className='flex gap-1'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                  ))}
                </div>
                <Skeleton className='h-4 w-8 bg-gray-300/80 dark:bg-gray-600/80' />
              </div>

              <div className='mb-4'>
                <Skeleton className='h-px w-full bg-gray-300/80 dark:bg-gray-600/80' />
              </div>

              <div className='mb-4 flex items-center gap-3'>
                <Skeleton className='size-8 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                <div className='min-w-0 flex-1'>
                  <Skeleton className='h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80' />
                </div>
              </div>

              <div className='mb-4'>
                <Skeleton className='h-px w-full bg-gray-300/80 dark:bg-gray-600/80' />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                  <Skeleton className='h-6 w-20 bg-gray-300/80 dark:bg-gray-600/80' />
                </div>
                <Skeleton className='h-10 w-20 rounded bg-gray-300/80 dark:bg-gray-600/80' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

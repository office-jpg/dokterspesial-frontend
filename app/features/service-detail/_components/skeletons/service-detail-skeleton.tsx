import { Skeleton } from '~/components/atoms/skeleton'
import MaxWidthWrapper from '~/components/atoms/max-width-wrapper'
import { ServiceDetailImageSkeleton } from './service-detail-image-skeleton'
import { ServiceDetailSidebarSkeleton } from './service-detail-sidebar-skeleton'

function ServiceDetailSkeleton() {
  return (
    <section id="detail-service" className="relative pt-8 pb-8 md:pt-32 md:pb-16">
      <MaxWidthWrapper className="py-8">
        
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Skeleton className="h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80" />
          <Skeleton className="size-4 rounded bg-gray-300/80 dark:bg-gray-600/80" />
          <Skeleton className="h-4 w-32 bg-gray-300/80 dark:bg-gray-600/80" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            
            <div className="overflow-hidden rounded-none bg-background shadow-sm aspect-square">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <ServiceDetailImageSkeleton />
              </div>
            </div>

            
            <div className="rounded-none bg-background p-8 shadow-sm space-y-8">
              
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="bg-gray-300/40 h-px w-12"></div>
                  <Skeleton className="h-4 w-20 bg-gray-300/80 dark:bg-gray-600/80" />
                </div>
                <Skeleton className="h-12 w-full mb-4 bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-6 w-3/4 bg-gray-300/60 dark:bg-gray-600/60" />
              </div>

              
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Skeleton className="h-6 w-24 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-6 w-20 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-6 w-16 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
              </div>

              
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 rounded-none bg-gray-50 dark:bg-gray-800 p-4">
                    <Skeleton className="size-10 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80" />
                      <Skeleton className="h-4 w-24 bg-gray-300/60 dark:bg-gray-600/60" />
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="mb-8 rounded-none border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="size-4 rounded bg-gray-300/80 dark:bg-gray-600/80" />
                      ))}
                    </div>
                    <Skeleton className="h-6 w-8 bg-gray-300/80 dark:bg-gray-600/80" />
                    <Skeleton className="h-4 w-20 bg-gray-300/60 dark:bg-gray-600/60" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                </div>
              </div>

              
              <div className="mb-8">
                <Skeleton className="h-6 w-32 mb-4 bg-gray-300/80 dark:bg-gray-600/80" />
                <div className="flex items-center space-x-4 rounded-none border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
                  <Skeleton className="size-16 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 bg-gray-300/80 dark:bg-gray-600/80" />
                    <Skeleton className="h-4 w-32 bg-gray-300/60 dark:bg-gray-600/60" />
                    <Skeleton className="h-5 w-24 rounded-full bg-gray-300/60 dark:bg-gray-600/60" />
                  </div>
                </div>
              </div>

              
              <div>
                <Skeleton className="h-6 w-32 mb-4 bg-gray-300/80 dark:bg-gray-600/80" />
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="rounded-none border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-8 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80" />
                            <Skeleton className="h-3 w-20 bg-gray-300/60 dark:bg-gray-600/60" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Skeleton key={starIndex} className="size-4 rounded bg-gray-300/80 dark:bg-gray-600/80" />
                          ))}
                          <Skeleton className="h-4 w-6 ml-1 bg-gray-300/80 dark:bg-gray-600/80" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-300/60 dark:bg-gray-600/60" />
                        <Skeleton className="h-4 w-3/4 bg-gray-300/60 dark:bg-gray-600/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ServiceDetailSidebarSkeleton />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export { ServiceDetailSkeleton }

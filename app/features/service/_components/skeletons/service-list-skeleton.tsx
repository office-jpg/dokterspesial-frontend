import { Skeleton } from '~/components/atoms/skeleton'
import { Card } from '~/components/atoms/card'
import { AspectRatio } from '~/components/atoms/aspect-ratio'

export function ServiceListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="group border-secondary bg-background cursor-pointer rounded-none border p-4 transition-all duration-300 sm:p-6 w-full"
        >
          <div className="flex flex-col items-start justify-center gap-4 sm:gap-6">
            <div className="flex w-full gap-3">
              <div className="flex-shrink-0">
                <div className="w-20 sm:w-24 md:w-28">
                  <AspectRatio
                    ratio={1}
                    className="bg-background overflow-hidden rounded-none shadow-sm"
                  >
                    <Skeleton className="h-full w-full bg-gray-300/80 dark:bg-gray-800/80" />
                  </AspectRatio>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex h-full w-full flex-col justify-start gap-2">
                  {/* Title Skeleton */}
                  <Skeleton className="h-5 w-full max-w-64 bg-gray-300/80 dark:bg-gray-600/80" />

                  {/* Price Skeleton */}
                  <div className="flex flex-row items-center justify-start">
                    <Skeleton className="h-6 w-20 bg-gray-300/80 dark:bg-gray-600/80" />
                  </div>

                  {/* Grid badges (2x2) */}
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-2">
                    {/* Types badge */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-3 bg-gray-300/80 dark:bg-gray-600/80" />
                      <div className="min-w-0 lg:max-w-full">
                        <Skeleton className="h-6 w-full rounded-none bg-gray-300/80 dark:bg-gray-600/80" />
                      </div>
                    </div>

                    {/* Categories badge */}
                    <div className="flex items-center gap-1">
                      <Skeleton className="size-3 bg-gray-300/80 dark:bg-gray-600/80" />
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-6 w-16 rounded-none bg-gray-300/80 dark:bg-gray-600/80" />
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-3 bg-gray-300/80 dark:bg-gray-600/80" />
                      <Skeleton className="h-6 w-20 rounded-none bg-gray-300/80 dark:bg-gray-600/80" />
                    </div>

                    {/* Specialist badge */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-3 bg-gray-300/80 dark:bg-gray-600/80" />
                      <div className="min-w-0 lg:max-w-full">
                        <Skeleton className="h-6 w-full rounded-none bg-gray-300/80 dark:bg-gray-600/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              {/* Description skeleton */}
              <div className="w-full">
                <Skeleton className="h-4 w-full bg-gray-300/60 dark:bg-gray-600/60 mb-1" />
                <Skeleton className="h-4 w-3/4 bg-gray-300/60 dark:bg-gray-600/60" />
              </div>

              <div className="flex flex-col items-start justify-center gap-3">
                <div className="flex w-full items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-600">
                  {/* Presenter section */}
                  <div className="flex w-full flex-1 flex-row items-center justify-center gap-2 sm:gap-3">
                    <div className="flex items-center -space-x-1 sm:-space-x-2">
                      <Skeleton className="size-7 sm:size-8 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-24 mb-1 bg-gray-300/80 dark:bg-gray-600/80" />
                      <Skeleton className="h-3 w-20 bg-gray-300/60 dark:bg-gray-600/60" />
                    </div>
                  </div>

                  {/* Detail button */}
                  <Skeleton className="h-8 w-16 rounded-none bg-gray-300/80 dark:bg-gray-600/80 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

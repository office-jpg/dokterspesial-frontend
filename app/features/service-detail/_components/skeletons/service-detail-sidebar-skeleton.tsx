import { Skeleton } from '~/components/atoms/skeleton'

function ServiceDetailSidebarSkeleton() {
  return (
    <div className="border-secondary sticky top-20 space-y-6 border-2 rounded-none p-6 bg-background">
      
      <div className="border-b pb-6 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-8 w-32 bg-gray-300/80 dark:bg-gray-600/80" />
            <Skeleton className="h-6 w-12 rounded-full bg-gray-300/80 dark:bg-gray-600/80" />
          </div>
          <Skeleton className="h-4 w-24 mx-auto bg-gray-300/60 dark:bg-gray-600/60" />
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="h-11 w-full bg-gray-300/80 dark:bg-gray-600/80 rounded" />
          <Skeleton className="h-11 w-full bg-gray-300/80 dark:bg-gray-600/80 rounded" />
        </div>
      </div>

      
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 bg-gray-300/80 dark:bg-gray-600/80" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton className="h-4 w-16 bg-gray-300/60 dark:bg-gray-600/60" />
              <Skeleton className="h-4 w-20 bg-gray-300/80 dark:bg-gray-600/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ServiceDetailSidebarSkeleton }

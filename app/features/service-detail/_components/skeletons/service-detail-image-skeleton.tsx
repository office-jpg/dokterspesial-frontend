import { Skeleton } from '~/components/atoms/skeleton'

function ServiceDetailImageSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Skeleton className="w-full h-full bg-gray-300/80 dark:bg-gray-600/80" />
    </div>
  )
}

export { ServiceDetailImageSkeleton }

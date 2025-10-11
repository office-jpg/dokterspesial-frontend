import { Skeleton } from '~/components/atoms/skeleton'

export function BlogDetailSidebarSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='flex gap-3 animate-pulse'>
          <Skeleton className='w-16 h-16 rounded-lg flex-shrink-0 bg-gray-200 dark:bg-gray-800' />

          <div className='flex-1 min-w-0 space-y-2'>
            <Skeleton className='h-4 w-full bg-gray-200 dark:bg-gray-800' />
            <Skeleton className='h-3 w-3/4 bg-gray-200 dark:bg-gray-800' />
          </div>
        </div>
      ))}
    </div>
  )
}

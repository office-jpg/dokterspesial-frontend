import { cn } from '~/lib/utils'

interface MentorSearchSkeletonProps {
  className?: string
}

export function MentorSearchSkeleton({ className }: MentorSearchSkeletonProps) {
  return (
    <div className={cn('relative w-full max-w-lg', className)}>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <div className='size-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse' />
      </div>

      <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 animate-pulse pl-10 pr-4'>
        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mt-3 animate-pulse' />
      </div>
    </div>
  )
}

export function MentorSearchWithCounterSkeleton({
  className,
}: MentorSearchSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center w-full text-start gap-4',
        className
      )}
    >
      <MentorSearchSkeleton />

      <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse' />
    </div>
  )
}

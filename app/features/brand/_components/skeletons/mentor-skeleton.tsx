import { cn } from '~/lib/utils'

interface MentorSkeletonProps {
  count?: number
  className?: string
}

export function MentorSkeleton({ count = 6, className }: MentorSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'relative max-w-sm w-full',
            className
          )}
        >
          <div className="w-full h-80 bg-muted animate-pulse rounded-lg shadow-md" />
          
          <div className="absolute w-full px-4 -mt-24">
            <div className="bg-background border border-border p-6 rounded-lg shadow-lg space-y-3">
              
              <div className="flex items-baseline gap-2">
                <div className="bg-teal-200/50 dark:bg-teal-800/50 h-5 w-16 rounded animate-pulse flex items-center gap-1 px-2 py-0.5">
                  <div className="h-3 w-3 bg-teal-600/30 dark:bg-teal-400/30 rounded" />
                  <div className="h-3 bg-teal-600/30 dark:bg-teal-400/30 rounded w-8" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-20" />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-5 bg-muted animate-pulse rounded w-32" />
              </div>
              
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-24" />
              </div>
              
              <div className="flex items-start gap-1">
                <div className="h-3 w-3 bg-muted animate-pulse rounded mt-0.5" />
                <div className="h-4 bg-muted animate-pulse rounded w-40" />
              </div>
              
              <div className="pt-1">
                <div className="h-4 bg-muted animate-pulse rounded w-28" />
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export function LoadMoreSkeleton() {
  return (
    <div className='col-span-full flex justify-center py-8'>
      <div className='flex items-center space-x-2'>
        <div className='size-2 bg-primary/80 dark:bg-primary rounded-full animate-bounce [animation-delay:-0.3s]' />
        <div className='size-2 bg-primary/80 dark:bg-primary rounded-full animate-bounce [animation-delay:-0.15s]' />
        <div className='size-2 bg-primary/80 dark:bg-primary rounded-full animate-bounce' />
      </div>
    </div>
  )
}

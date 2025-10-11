import { Skeleton } from '~/components/atoms/skeleton'
import { Card, CardContent } from '~/components/atoms/card'

interface BlogListSkeletonProps {
  count?: number
}

export function BlogListSkeleton({ count = 6 }: BlogListSkeletonProps) {
  return (
    <div className='space-y-4'>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className='p-3 rounded-lg flex group shadow-none border hover:shadow-md transition-all duration-300 bg-background backdrop-blur-lg'
        >
          <div className='bg-muted relative h-[160px] w-[200px] min-w-[200px] hidden lg:flex rounded-lg items-center justify-center overflow-hidden flex-shrink-0'>
            <Skeleton className='h-[160px] w-[200px] bg-muted-foreground/20' />
            
            {index % 3 === 0 && (
              <div className='absolute top-3 right-3'>
                <Skeleton className='h-5 w-16 rounded bg-muted-foreground/30' />
              </div>
            )}
          </div>

          <div className='flex flex-col flex-1 w-full md:gap-0 gap-3'>
            <div className='flex items-center gap-2 sm:gap-4 text-xs mb-2 flex-wrap'>
              <Skeleton className='h-5 w-16 rounded bg-muted-foreground/30' />
              
              {index % 3 === 0 && (
                <div className='lg:hidden'>
                  <Skeleton className='h-5 w-20 rounded bg-muted-foreground/30' />
                </div>
              )}
              
              <div className='flex items-center gap-1'>
                <Skeleton className='size-3 bg-muted-foreground/20' />
                <Skeleton className='h-3 w-20 bg-muted-foreground/20' />
              </div>
            </div>

            <div className='flex-1'>
              <div className='pb-2'>
                <Skeleton className='h-5 w-full mb-1 bg-muted-foreground/40' />
                <Skeleton className='h-5 w-3/4 bg-muted-foreground/30' />
              </div>

              <div className='pb-4'>
                <Skeleton className='h-4 w-full mb-1 bg-muted-foreground/20' />
                <Skeleton className='h-4 w-full mb-1 bg-muted-foreground/20' />
                <Skeleton className='h-4 w-2/3 bg-muted-foreground/20' />
              </div>
            </div>

            <CardContent className='flex items-center justify-between gap-2 border-t border-border px-0 pb-0 pt-3'>
              <div className='flex items-center gap-3 min-w-0 flex-1 w-full max-w-48 overflow-hidden'>
                <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted-foreground/30" />
                <Skeleton className="h-4 w-16 bg-muted-foreground/30" />
              </div>

              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-8 bg-muted-foreground/30' />
                <Skeleton className='w-4 h-4 bg-muted-foreground/30' />
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}

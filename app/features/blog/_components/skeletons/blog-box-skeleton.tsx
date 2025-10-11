import { Skeleton } from '~/components/atoms/skeleton'
import { Card, CardContent, CardHeader } from '~/components/atoms/card'

interface BlogBoxSkeletonProps {
  count?: number
}

export function BlogBoxSkeleton({ count = 3 }: BlogBoxSkeletonProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className='group overflow-hidden p-0 transition-all duration-300 hover:shadow-lg gap-0 bg-background'
        >
          <CardHeader className="gap-0 relative p-0">
            <div className="bg-muted flex h-48 w-full items-center justify-center">
              <Skeleton className='h-48 w-full bg-muted-foreground/20' />
            </div>

            <div className="absolute inset-x-0 top-auto bottom-0">
              <div className="bg-background inline-block max-w-44 w-full p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full bg-muted-foreground/30" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1 bg-muted-foreground/30" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="size-3 bg-muted-foreground/20" />
                      <Skeleton className="h-3 w-20 bg-muted-foreground/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="gap-0 flex h-fit flex-col p-6">
            <div className="mb-4 flex items-center gap-4">
              <Skeleton className="w-10 h-[2px] bg-muted-foreground/30" />
              <Skeleton className="h-5 w-16 rounded bg-muted-foreground/30" />
            </div>
            
            <div className="flex flex-1 flex-col">
              <div className="mb-3 h-14">
                <Skeleton className="h-6 w-full mb-2 bg-muted-foreground/40" />
                <Skeleton className="h-6 w-3/4 bg-muted-foreground/30" />
              </div>
              
              <div className="mb-6 h-16">
                <Skeleton className="h-4 w-full mb-1 bg-muted-foreground/20" />
                <Skeleton className="h-4 w-full mb-1 bg-muted-foreground/20" />
                <Skeleton className="h-4 w-2/3 bg-muted-foreground/20" />
              </div>
              
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32 bg-muted-foreground/30" />
                <Skeleton className="size-5 bg-muted-foreground/30" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

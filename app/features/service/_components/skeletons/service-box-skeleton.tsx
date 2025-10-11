import { Skeleton } from '~/components/atoms/skeleton'

interface ServiceBoxSkeletonProps {
  count?: number
  showPresenter?: boolean
  showDaftarButton?: boolean
  cardHeight?: string
  contentHeight?: string
  buttonLayout?: 'row' | 'col'
}

export function ServiceBoxSkeleton({
  count = 6,
  showPresenter = true,
  showDaftarButton = true,
  cardHeight = 'h-[23.5rem]',
  contentHeight = 'h-40',
  buttonLayout = 'row',
}: ServiceBoxSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='block w-full max-w-md mx-auto md:max-w-full lg:max-w-full'
        >
          <div
            className={`group overflow-hidden border-2 border-secondary bg-background/60 backdrop-blur-lg ${cardHeight} w-full transition-all duration-300 ease-out shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:hover:shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.15)] rounded-lg`}
          >
            <div className='relative aspect-video overflow-hidden'>
              <Skeleton className='w-full h-full bg-gray-300/80 dark:bg-gray-800/80' />

              <div className='absolute bottom-4 right-4'>
                <Skeleton className='size-12 rounded-xl bg-gray-300/80 dark:bg-gray-600/80' />
              </div>
            </div>

            <div
              className={`w-full ${contentHeight} bg-background/60 backdrop-blur-lg p-6 pb-0 flex flex-col`}
            >
              <div className='flex flex-col gap-y-2 flex-grow'>
                <Skeleton className='h-6 w-3/4 bg-gray-300/80 dark:bg-gray-600/80' />

                <div className='space-y-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center justify-start max-w-24 w-full'>
                      <Skeleton className='size-4 mr-2 rounded bg-gray-300/80 dark:bg-gray-600/80' />
                      <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                    </div>
                    <Skeleton className='h-6 w-16 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>

                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex w-full flex-col gap-2'>
                      <div className='flex w-full items-center gap-2'>
                        <Skeleton className='size-4 rounded bg-gray-300/80 dark:bg-gray-600/80' />
                        <div className='flex w-full items-center justify-between'>
                          <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                          <Skeleton className='h-3 w-2 bg-gray-300/80 dark:bg-gray-600/80' />
                          <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        <Skeleton className='size-4 rounded bg-gray-300/80 dark:bg-gray-600/80' />
                        <div className='flex w-full items-center justify-between'>
                          <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                          <Skeleton className='size-4 bg-gray-300/80 dark:bg-gray-600/80' />
                          <Skeleton className='h-4 w-12 bg-gray-300/80 dark:bg-gray-600/80' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-start max-w-full w-full'>
                    <Skeleton className='size-4 mr-2 rounded bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>
                </div>

                {showPresenter && (
                  <div className='flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-600'>
                    <Skeleton className='size-8 rounded-full bg-gray-300/80 dark:bg-gray-600/80' />
                    <div className='flex-1 min-w-0'>
                      <Skeleton className='h-4 w-24 bg-gray-300/80 dark:bg-gray-600/80' />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`flex h-fit bg-background/60 backdrop-blur-lg ${buttonLayout === 'col' ? 'flex-col gap-2' : 'items-center justify-between'} px-6 py-4 border-t border-gray-200 dark:border-gray-700`}
            >
              <div
                className={
                  buttonLayout === 'col'
                    ? 'text-center w-full'
                    : 'flex flex-col justify-center min-h-[40px]'
                }
              >
                {buttonLayout === 'col' ? (
                  <div className='flex flex-row items-center justify-center gap-2'>
                    <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='h-6 w-20 bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>
                ) : (
                  <div className='flex flex-col items-start gap-1'>
                    <Skeleton className='h-4 w-16 bg-gray-300/80 dark:bg-gray-600/80' />
                    <Skeleton className='h-6 w-20 bg-gray-300/80 dark:bg-gray-600/80' />
                  </div>
                )}
              </div>

              {showDaftarButton && (
                <Skeleton
                  className={`${buttonLayout === 'col' ? 'w-full h-10' : 'h-10 w-20'} rounded-md bg-gray-300/80 dark:bg-gray-600/80`}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

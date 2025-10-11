import { Skeleton } from '~/components/atoms/skeleton'

export function BlogDetailImageSkeleton() {
  return (
    <div className='relative mb-8'>
      <Skeleton className='h-[400px] w-full rounded-lg bg-gray-200 dark:bg-gray-800' />
    </div>
  )
}

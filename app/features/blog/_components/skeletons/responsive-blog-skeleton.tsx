import { BlogBoxSkeleton } from './blog-box-skeleton'
import { BlogListSkeleton } from './blog-list-skeleton'

interface ResponsiveBlogSkeletonProps {
  count?: number
}

export function ResponsiveBlogSkeleton({ count = 6 }: ResponsiveBlogSkeletonProps) {
  return (
    <>
      <div className='hidden md:block w-full'>
        <BlogBoxSkeleton count={count} />
      </div>

      <div className='block md:hidden w-full'>
        <BlogListSkeleton count={count} />
      </div>
    </>
  )
}

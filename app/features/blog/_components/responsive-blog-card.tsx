import type { BlogProps } from '~/types'
import BlogBox from './blog-box'
import BlogList from './blog-list'

interface ResponsiveBlogCardProps {
  post: BlogProps
  index: number
}

function ResponsiveBlogCard({
  post,
  index,
}: ResponsiveBlogCardProps) {
  return (
    <>
      <div className='hidden md:block'>
        <BlogBox post={post} index={index} />
      </div>

      <div className='block md:hidden'>
        <BlogList post={post} index={index} />
      </div>
    </>
  )
}

export default ResponsiveBlogCard

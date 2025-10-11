import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback } from '~/components/atoms/avatar'
import { Badge } from '~/components/atoms/badge'
import { Button } from '~/components/atoms/button'
import { Card, CardContent } from '~/components/atoms/card'
import { Icon } from '~/components/atoms/icon'
import type { BlogProps } from '~/types'

interface BlogListProps {
  post: BlogProps
  index: number
}

const BlogList = ({ post, index }: BlogListProps) => {
  const [imageError, setImageError] = useState(false)

  const displayTitle = post.title
  const displayExcerpt = post.excerpt
  const displayDate = post.publishedAt || post.date
  const hasValidImage = post.image && post.image.trim() !== '' && !imageError

  const formatDate = (date: string) => {
    return {
      formattedDate: new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
    >
      <Card className='p-3 rounded-lg flex group shadow-none border hover:shadow-md transition-all duration-300 bg-background backdrop-blur-lg'>
        <Link
          to={`/blog/${post.slug}`}
          className='relative h-[160px] w-[200px] min-w-[200px] hidden lg:flex rounded-lg items-center justify-center overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          {!hasValidImage ? (
            <div className='h-[160px] w-[200px] bg-muted flex items-center justify-center'>
              <div className='text-center'>
                <Icon
                  icon='lucide:image-off'
                  className='w-8 h-8 text-muted-foreground mx-auto mb-2'
                />
                <p className='text-xs text-muted-foreground'>
                  Image unavailable
                </p>
              </div>
            </div>
          ) : (
            <img
              src={post.image!}
              alt={displayTitle || 'Blog image'}
              className='h-[160px] w-[200px] object-cover transition-all duration-300 group-hover:scale-105'
              loading='lazy'
              onError={() => setImageError(true)}
            />
          )}

          {post.featured && (
            <Badge className='bg-primary text-primary-foreground font-bold text-xs absolute top-3 right-3'>
              Featured
            </Badge>
          )}
        </Link>

        <div className='flex flex-col flex-1 w-full md:gap-0 gap-3'>
          <div className='flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-2 flex-wrap'>
            <Badge className='bg-primary text-primary-foreground font-bold text-xs'>
              {post.category || 'Artikel'}
            </Badge>
            {post.featured && (
              <div className='lg:hidden'>
                <Badge className='bg-primary text-primary-foreground font-bold text-xs'>
                  Featured
                </Badge>
              </div>
            )}
            <div className='flex items-center gap-1'>
              <Icon icon='lucide:calendar' className='w-3 h-3' />
              <span className='truncate overflow-hidden whitespace-nowrap'>
                {formatDate(displayDate).formattedDate}
              </span>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className='cursor-pointer flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded'
          >
            <h3 className='text-foreground text-base sm:text-lg font-semibold md:line-clamp-1 line-clamp-2 pb-2 group-hover:text-primary transition-colors duration-200'>
              {displayTitle}
            </h3>

            <p className='text-muted-foreground text-xs sm:text-sm font-normal line-clamp-2 sm:line-clamp-3 pb-4'>
              {displayExcerpt}
            </p>
          </Link>

          <CardContent className='flex items-center justify-between gap-2 border-t border-border px-0 pb-0 pt-3'>
            <div className='flex items-center gap-3 min-w-0 flex-1 w-full max-w-48 overflow-hidden'>
              <Avatar className='w-6 h-6 sm:w-8 sm:h-8'>
                <AvatarFallback className='bg-foreground text-background text-xs font-semibold'>
                  {(post.author || 'Anonymous')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className='text-xs sm:text-sm font-bold text-foreground truncate overflow-hidden whitespace-nowrap'>
                {post.author || 'Anonymous'}
              </span>
            </div>

            <Button
              variant='ghost'
              size='sm'
              className='text-foreground hover:text-primary hover:bg-muted px-2 sm:px-4 py-2 flex-shrink-0'
              asChild
            >
              <Link to={`/blog/${post.slug}`}>
                <span className='text-sm'>Baca</span>
                <Icon icon='lucide:arrow-right' className='w-4 h-4 sm:ml-1' />
              </Link>
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

export default BlogList

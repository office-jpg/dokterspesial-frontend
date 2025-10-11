import React from 'react'
import { cn } from '~/lib/utils'

interface Props extends React.ComponentPropsWithRef<'div'> {
  className?: string
  children: React.ReactNode
}

const MaxWidthWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto h-full w-full max-w-full px-4 md:max-w-7xl md:px-12 lg:px-20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MaxWidthWrapper.displayName = 'MaxWidthWrapper'

export default MaxWidthWrapper
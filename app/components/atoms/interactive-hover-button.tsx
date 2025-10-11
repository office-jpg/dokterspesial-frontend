import React from 'react'
import { cn } from '~/lib/utils'
import { Icon } from '~/components/atoms/icon'
import type { LucideIcon } from 'lucide-react'

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: LucideIcon
  iconName?: string
  buttonColor?: string
  decorColor?: string
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', icon, iconName = 'lucide:chevron-right', buttonColor, decorColor, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'group relative cursor-pointer h-11 md:h-12 w-fit flex items-center justify-center py-2 md:py-3 px-4 md:px-6 rounded-md overflow-hidden border-0 text-primary-foreground shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.2),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.05)] dark:hover:shadow-[12px_12px_24px_rgba(0,0,0,0.5),-12px_-12px_24px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02]',
        buttonColor || 'bg-primary hover:bg-primary/90',
        className
      )}
      {...props}
    >
      {/* Desktop version - shows text by default, icon on hover */}
      <span className='hidden md:inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0 text-sm md:text-base font-medium'>
        {text}
      </span>
      <div className='hidden md:flex absolute top-0 z-10 h-full w-full translate-x-8 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
        <p className='text-primary-foreground group-hover:text-primary-foreground text-sm md:text-base font-medium'>{text}</p>
        {icon ? (
          React.createElement(icon, {
            className: 'size-3 md:size-4 text-primary-foreground group-hover:text-primary-foreground'
          })
        ) : (
          <Icon
            icon={iconName}
            className='size-3 md:size-4 text-primary-foreground group-hover:text-primary-foreground'
          />
        )}
      </div>
      
      {/* Mobile version - always shows text with icon */}
      <div className='flex md:hidden items-center justify-center gap-2'>
        <p className='text-primary-foreground text-sm font-medium'>{text}</p>
        {icon ? (
          React.createElement(icon, {
            className: 'size-3 md:size-4 text-primary-foreground'
          })
        ) : (
          <Icon
            icon={iconName}
            className='size-3 md:size-4 text-primary-foreground'
          />
        )}
      </div>
      
      <div className={cn(
        'absolute lg:left-[5%] md:left-[10%] left-[30%] top-[40%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]',
        decorColor || 'bg-primary-foreground/20 group-hover:bg-primary-foreground/10'
      )} />
    </button>
  )
})

InteractiveHoverButton.displayName = 'InteractiveHoverButton'

export default InteractiveHoverButton

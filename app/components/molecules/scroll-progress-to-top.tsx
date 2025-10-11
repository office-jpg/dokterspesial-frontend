import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ArrowUp, MessageCircle, Sun, Moon } from 'lucide-react'
import { cn } from '~/lib/utils'
import { useWhatsAppUrl } from '~/hooks/use-whatsapp'
import { getCurrentTheme, applyTheme } from '~/lib/theme'

interface ScrollProgressToTopProps {
  className?: string
  showOffset?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'gradient'
  showTopProgress?: boolean
  showWhatsApp?: boolean
  showThemeToggle?: boolean
}

export function ScrollProgressToTop({
  className,
  showOffset = 300,
  size = 'md',
  variant = 'default',
  showTopProgress = true,
  showWhatsApp = true,
  showThemeToggle = false,
}: ScrollProgressToTopProps) {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)
  const { scrollYProgress } = useScroll()
  
  const whatsappUrl = useWhatsAppUrl(
    'Halo, saya ingin menghubungi tim DokterSpesial untuk konsultasi. Mohon dibantu untuk informasi lebih lanjut. Terima kasih!'
  )

  useLayoutEffect(() => {
    setTheme(getCurrentTheme())
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        setIsScrollButtonVisible(window.pageYOffset > showOffset)
      }
    }

    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showOffset])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleThemeToggle = () => {
    if (!theme) return
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  const sizeClasses = {
    sm: 'size-10',
    md: 'size-12',
    lg: 'size-14',
  }

  const iconSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }

  const variantClasses = {
    default:
      'bg-secondary backdrop-blur-md hover:bg-accent text-foreground hover:text-primary border-0',
    outline:
      'bg-white/80 backdrop-blur-md hover:bg-white/70 text-primary hover:text-primary border-2 border-primary/20 hover:border-primary/30 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:bg-gray-800/50 dark:backdrop-blur-md dark:hover:bg-gray-700/70 dark:text-primary dark:hover:text-primary dark:border-primary/30 dark:hover:border-primary/50 dark:shadow-[4px_4px_12px_#1e293b,-4px_-4px_12px_#334155] dark:hover:shadow-[8px_8px_16px_#0f172a,-8px_-8px_16px_#475569]',
    gradient:
      'bg-gradient-to-br from-primary/90 to-primary/80 backdrop-blur-md hover:from-primary hover:to-primary text-white border-0 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(0,0,0,0.1)]',
  }

  return (
    <>
      {showTopProgress && (
        <motion.section
          id='scroll-progress'
          className='fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-primary/60 via-primary to-primary/80'
          style={{
            scaleX: scrollYProgress,
          }}
        />
      )}

      <AnimatePresence>
        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={cn('fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3', className)}
          >
            <motion.a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                sizeClasses[size],
                'cursor-pointer transition-all duration-300 flex items-center justify-center',
                'bg-primary hover:bg-primary/80 text-white border-0'
              )}
              aria-label='Contact via WhatsApp'
            >
              <MessageCircle className={iconSizes[size]} />
            </motion.a>

            {showThemeToggle && (
              <motion.button
                onClick={handleThemeToggle}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className={cn(
                  sizeClasses[size],
                  'md:hidden cursor-pointer transition-all duration-300 flex items-center justify-center',
                  variantClasses[variant]
                )}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                type='button'
              >
                {theme === 'light' ? (
                  <Sun className={iconSizes[size]} />
                ) : (
                  <Moon className={iconSizes[size]} />
                )}
              </motion.button>
            )}

            <AnimatePresence>
              {isScrollButtonVisible && (
                <motion.button
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    sizeClasses[size],
                    'cursor-pointer transition-all duration-300 flex items-center justify-center',
                    variantClasses[variant]
                  )}
                  aria-label='Scroll to top'
                  type='button'
                >
                  <ArrowUp className={iconSizes[size]} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

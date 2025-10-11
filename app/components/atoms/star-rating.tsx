 

import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '~/lib/utils'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  className?: string
  iconSize?: number
  maxStars?: number
  readOnly?: boolean
  color?: string
  showRatingText?: boolean
  showMaxRating?: boolean
  variant?: 'default' | 'single' | 'compact' | 'fixed-single'
  responsive?: boolean
  mobileStars?: number
  desktopStars?: number
  allowPartialFill?: boolean
  hideRatingTextOnMobile?: boolean
  responsiveConfig?: {
    mobile: {
      stars: number
      variant?: 'default' | 'single' | 'compact' | 'fixed-single'
      color?: string
    }
    desktop: {
      stars: number
      variant?: 'default' | 'single' | 'compact' | 'fixed-single'
      color?: string
    }
  }
}

const StarIcon = React.memo(
  ({
    iconSize,
    index,
    isInteractive,
    onClick,
    onMouseEnter,
    style,
  }: {
    index: number
    style: React.CSSProperties & {
      gradientId?: string
      fillPercentage?: number
    }
    iconSize: number
    onClick: () => void
    onMouseEnter: () => void
    isInteractive: boolean
  }) => {
    const hasGradient =
      style.gradientId && typeof style.fillPercentage === 'number'

    return (
      <div className='relative inline-block'>
        {hasGradient && (
          <svg width='0' height='0' style={{ position: 'absolute' }}>
            <defs>
              <linearGradient
                id={style.gradientId}
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop
                  offset={`${(style.fillPercentage || 0) * 100}%`}
                  stopColor={style.color}
                />
                <stop
                  offset={`${(style.fillPercentage || 0) * 100}%`}
                  stopColor='transparent'
                />
              </linearGradient>
            </defs>
          </svg>
        )}
        <Star
          key={index}
          size={iconSize}
          fill={style.fill}
          color={style.color}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          className={cn(
            'transition-colors duration-200',
            isInteractive && 'cursor-pointer hover:scale-110'
          )}
          style={
            hasGradient
              ? { ...style, fill: `url(#${style.gradientId})` }
              : style
          }
        />
      </div>
    )
  }
)
StarIcon.displayName = 'StarIcon'

interface ResponsiveStarsProps {
  value: number
  config: {
    stars: number
    variant?: 'default' | 'single' | 'compact' | 'fixed-single'
    color?: string
  }
  iconSize: number
  allowPartialFill: boolean
  readOnly: boolean
  onChange?: (value: number) => void
  hoverRating: number | null
  setHoverRating: (rating: number | null) => void
  defaultColor: string
}

const ResponsiveStars = ({
  value,
  config,
  iconSize,
  allowPartialFill,
  readOnly,
  onChange,
  hoverRating,
  setHoverRating,
  defaultColor,
}: ResponsiveStarsProps) => {
  const currentRating = hoverRating !== null ? hoverRating : value
  const effectiveVariant = config.variant || 'default'
  const effectiveColor = config.color || defaultColor

  if (effectiveVariant === 'fixed-single') {
    return (
      <StarIcon
        index={0}
        style={{
          fill: effectiveColor,
          fillPercentage: 100,
        }}
        iconSize={iconSize}
        onClick={() => {}}
        onMouseEnter={() => {}}
        isInteractive={false}
      />
    )
  }

  return (
    <>
      {Array.from({ length: config.stars }, (_, index) => {
        const starValue = index + 1
        const fillPercentage = allowPartialFill
          ? Math.max(0, Math.min(100, (currentRating - index) * 100))
          : currentRating >= starValue
          ? 100
          : 0

        return (
          <StarIcon
            key={index}
            index={index}
            style={{
              fill: effectiveColor,
              fillPercentage: fillPercentage,
            }}
            iconSize={iconSize}
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            isInteractive={!readOnly}
          />
        )
      })}
    </>
  )
}

const StarRating = ({
  className,
  color = '#e4c616',
  iconSize = 24,
  maxStars = 5,
  onChange,
  readOnly = false,
  value,
  showRatingText = false,
  showMaxRating = false,
  variant = 'default',
  responsive = false,
  mobileStars = 1,
  desktopStars = 5,
  allowPartialFill = true,
  hideRatingTextOnMobile = false,
  responsiveConfig,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)

  const mobileConfig = responsiveConfig?.mobile || {
    stars: mobileStars,
    variant: variant as any,
    color: color,
  }
  
  const desktopConfig = responsiveConfig?.desktop || {
    stars: desktopStars,
    variant: variant as any,
    color: color,
  }

  if (responsiveConfig) {
    return (
      <div className={cn('flex items-center gap-x-0.5', className)}>
        <div className="md:hidden">
          <ResponsiveStars
            value={value}
            config={mobileConfig}
            iconSize={iconSize}
            allowPartialFill={allowPartialFill}
            readOnly={readOnly}
            onChange={onChange}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            defaultColor={color}
          />
        </div>
        
        <div className="hidden md:flex items-center gap-x-0.5">
          <ResponsiveStars
            value={value}
            config={desktopConfig}
            iconSize={iconSize}
            allowPartialFill={allowPartialFill}
            readOnly={readOnly}
            onChange={onChange}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            defaultColor={color}
          />
        </div>
        
        {showRatingText && (
          <span
            className={cn(
              'ml-1 text-sm text-foreground font-medium',
              hideRatingTextOnMobile && 'hidden md:inline'
            )}
          >
            {value}
            {showMaxRating && `/${Math.max(mobileConfig.stars, desktopConfig.stars)}`}
          </span>
        )}
      </div>
    )
  }

  const starsToShow = React.useMemo(() => {
    if (responsive) {
      return maxStars
    }

    switch (variant) {
      case 'single':
        return 1
      case 'fixed-single':
        return 1
      case 'compact':
        return Math.min(3, maxStars)
      case 'default':
      default:
        return maxStars
    }
  }, [variant, maxStars, responsive])

  const handleStarClick = React.useCallback(
    (index: number) => {
      if (readOnly || !onChange) return
      const newRating = index + 1
      onChange(newRating)
    },
    [readOnly, onChange]
  )

  const handleStarHover = React.useCallback(
    (index: number) => {
      if (!readOnly) {
        setHoverRating(index + 1)
      }
    },
    [readOnly]
  )

  const handleMouseLeave = React.useCallback(() => {
    if (!readOnly) {
      setHoverRating(null)
    }
  }, [readOnly])

  const getStarStyle = React.useCallback(
    (index: number) => {
      const ratingToUse =
        !readOnly && hoverRating !== null ? hoverRating : value

      if (variant === 'fixed-single') {
        return {
          color: color,
          fill: ratingToUse > 0 ? color : 'transparent',
        } as React.CSSProperties
      }

      if (!allowPartialFill) {
        return {
          color: ratingToUse > index ? color : 'gray',
          fill: ratingToUse > index ? color : 'transparent',
        } as React.CSSProperties
      }

      const fillPercentage = Math.max(0, Math.min(1, ratingToUse - index))

      if (fillPercentage === 0) {
        return {
          color: 'gray',
          fill: 'transparent',
        } as React.CSSProperties
      } else if (fillPercentage === 1) {
        return {
          color: color,
          fill: color,
        } as React.CSSProperties
      } else {
        const gradientId = `gradient-${index}-${Math.round(fillPercentage * 100)}`
        return {
          color: color,
          fill: `url(#${gradientId})`,
          gradientId,
          fillPercentage,
        } as React.CSSProperties & {
          gradientId: string
          fillPercentage: number
        }
      }
    },
    [readOnly, hoverRating, value, color, allowPartialFill, variant]
  )

  const stars = React.useMemo(() => {
    return Array.from({ length: starsToShow }).map((_, index) => {
      const style = getStarStyle(index)

      let starClasses = ''
      if (responsive && variant !== 'fixed-single') {
        if (mobileStars === 0) {
          starClasses = 'hidden md:inline-block'
        } else if (index < mobileStars) {
          starClasses = ''
        } else if (index < desktopStars) {
          starClasses = 'hidden md:inline-block'
        } else {
          starClasses = 'hidden'
        }
      }

      return (
        <div key={index} className={starClasses}>
          <StarIcon
            index={index}
            style={style}
            iconSize={iconSize}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            isInteractive={!readOnly}
          />
        </div>
      )
    })
  }, [
    starsToShow,
    getStarStyle,
    iconSize,
    handleStarClick,
    handleStarHover,
    readOnly,
    responsive,
    mobileStars,
    desktopStars,
    variant,
  ])

  return (
    <div
      className={cn('flex items-center gap-x-0.5', className)}
      onMouseLeave={handleMouseLeave}
    >
      {stars}
      {showRatingText && (
        <span
          className={cn(
            'ml-1 text-sm text-froreground font-medium',
            hideRatingTextOnMobile && responsive && 'hidden md:inline'
          )}
        >
          {value}
          {showMaxRating && `/${maxStars}`}
        </span>
      )}
    </div>
  )
}

export default StarRating

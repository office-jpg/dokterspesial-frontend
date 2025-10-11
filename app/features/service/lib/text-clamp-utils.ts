import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Utility function to check if a text element is clamped
 * @param element - The HTML element to check
 * @param maxLines - Maximum number of lines (default: 1)
 * @returns boolean indicating if text is clamped
 */
export const checkElementTextClamp = (
  element: HTMLElement,
  maxLines: number = 1
): boolean => {
  try {
    const computedStyle = window.getComputedStyle(element)
    const lineHeight = parseFloat(computedStyle.lineHeight) || 24

    const expectedClampedHeight = lineHeight * maxLines

    const clone = element.cloneNode(true) as HTMLElement
    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    clone.style.height = 'auto'
    clone.style.width = element.offsetWidth + 'px'
    clone.style.webkitLineClamp = 'none'
    clone.style.display = 'block'
    clone.style.overflow = 'visible'

    element.parentNode?.appendChild(clone)
    const fullHeight = clone.scrollHeight
    element.parentNode?.removeChild(clone)

    return fullHeight > expectedClampedHeight + 4
  } catch (error) {
    console.warn('Error checking text clamp:', error)
    return false
  }
}

/**
 * Hook for text clamp detection without pagination (for home section)
 * @param elements - Array of events/items to check
 * @param selectedType - Current selected type for dependency tracking
 * @param maxLines - Maximum number of lines (default: 1)
 * @returns Object with isTextClamped state and refs
 */
export const useSimpleTextClampDetection = <T>(
  elements: T[],
  selectedType: string,
  maxLines: number = 1
) => {
  const [isTextClamped, setIsTextClamped] = useState<Record<number, boolean>>(
    {}
  )
  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({})
  const isCheckingRef = useRef(false)
  const lastElementCountRef = useRef<number>(0)

  const checkTextClamp = useCallback(() => {
    if (isCheckingRef.current) return
    isCheckingRef.current = true

    const clampedStatus: Record<number, boolean> = {}

    elements.forEach((_, index) => {
      const elementKey = `1-${index}`
      const element = titleRefs.current[elementKey]

      if (!element) {
        clampedStatus[index] = false
        return
      }

      clampedStatus[index] = checkElementTextClamp(element, maxLines)
    })

    setIsTextClamped((prev) => {
      const hasChanges = Object.keys(clampedStatus).some(
        (key) => clampedStatus[Number(key)] !== prev[Number(key)]
      )
      return hasChanges ? { ...prev, ...clampedStatus } : prev
    })

    isCheckingRef.current = false
  }, [elements, maxLines])

  useEffect(() => {
    if (elements.length !== lastElementCountRef.current) {
      setIsTextClamped({})
      lastElementCountRef.current = elements.length
    }

    const timer = setTimeout(() => {
      checkTextClamp()
    }, 300)

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsTextClamped({})
        checkTextClamp()
      }, 500)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [checkTextClamp, elements, selectedType])

  return {
    isTextClamped,
    titleRefs,
    isCheckingRef,
    lastElementCountRef,
  }
}

/**
 * Hook for text clamp detection with pagination support (for main event section)
 * @param elements - Array of events/items to check
 * @param currentPage - Current page number for generating unique keys
 * @param maxLines - Maximum number of lines (default: 1)
 * @returns Object with isTextClamped state and refs
 */
export const usePaginatedTextClampDetection = <T>(
  elements: T[],
  currentPage: number,
  maxLines: number = 1
) => {
  const [isTextClamped, setIsTextClamped] = useState<Record<number, boolean>>(
    {}
  )
  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({})
  const lastEventCountRef = useRef<number>(0)

  const checkTextClamp = useCallback(() => {
    const clampedStatus: Record<number, boolean> = {}

    elements.forEach((_, index) => {
      const elementKey = `${currentPage}-${index}`
      const element = titleRefs.current[elementKey]

      if (!element) {
        clampedStatus[index] = false
        return
      }

      clampedStatus[index] = checkElementTextClamp(element, maxLines)
    })

    setIsTextClamped((prev) => {
      const hasChanges = Object.keys(clampedStatus).some(
        (key) => clampedStatus[Number(key)] !== prev[Number(key)]
      )
      return hasChanges ? { ...prev, ...clampedStatus } : prev
    })
  }, [currentPage, elements, maxLines])

  useEffect(() => {
    if (elements.length !== lastEventCountRef.current) {
      setIsTextClamped({})
      lastEventCountRef.current = elements.length
    }

    const timer = setTimeout(() => {
      checkTextClamp()
    }, 300)

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsTextClamped({})
        checkTextClamp()
      }, 500)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentPage, elements, checkTextClamp])

  return {
    isTextClamped,
    titleRefs,
    lastEventCountRef,
  }
}

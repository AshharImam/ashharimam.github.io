import { useEffect, useRef, useCallback } from 'react'

const useCarouselScroll = (containerRef, projectsCount, setActiveIndex) => {
  const scrollTimeoutRef = useRef(null)
  const targetScrollRef = useRef(0)
  const currentScrollRef = useRef(0)
  const isScrollingRef = useRef(false)
  const animationFrameRef = useRef(null)
  const isWheelingRef = useRef(false)
  const wheelEndTimeoutRef = useRef(null)

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const snapToNearest = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const currentScrollPos = containerRef.current.scrollLeft

    let nearestIndex = 0
    let minDistance = Math.abs(currentScrollPos)

    for (let i = 0; i < projectsCount; i++) {
      const cardPosition = i * containerWidth
      const distance = Math.abs(currentScrollPos - cardPosition)

      if (distance < minDistance) {
        minDistance = distance
        nearestIndex = i
      }
    }

    const targetPosition = nearestIndex * containerWidth

    if (Math.abs(currentScrollPos - targetPosition) > 20) {
      targetScrollRef.current = targetPosition
      currentScrollRef.current = currentScrollPos

      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        animateScroll()
      }
    }

    setActiveIndex(nearestIndex)
  }, [containerRef, projectsCount, setActiveIndex])

  const animateScroll = useCallback(() => {
    const diff = targetScrollRef.current - currentScrollRef.current
    
    if (Math.abs(diff) > 0.5) {
      const easeFactor = 0.12
      currentScrollRef.current += diff * easeFactor
      
      if (containerRef.current) {
        containerRef.current.scrollLeft = currentScrollRef.current
      }
      
      animationFrameRef.current = requestAnimationFrame(animateScroll)
    } else {
      currentScrollRef.current = targetScrollRef.current
      
      if (containerRef.current) {
        containerRef.current.scrollLeft = targetScrollRef.current
      }
      
      isScrollingRef.current = false
      animationFrameRef.current = null

      if (!isWheelingRef.current && !wheelEndTimeoutRef.current) {
        snapToNearest()
      }
    }
  }, [containerRef, snapToNearest])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        e.stopPropagation()

        isWheelingRef.current = true

        if (wheelEndTimeoutRef.current) {
          clearTimeout(wheelEndTimeoutRef.current)
        }

        const scrollAmount = e.deltaY * 1.8

        targetScrollRef.current = Math.max(
          0,
          Math.min(
            container.scrollWidth - container.clientWidth,
            targetScrollRef.current + scrollAmount
          )
        )

        if (!isScrollingRef.current) {
          isScrollingRef.current = true
          animateScroll()
        }

        wheelEndTimeoutRef.current = setTimeout(() => {
          isWheelingRef.current = false
          wheelEndTimeoutRef.current = null
        }, 150)

        return false
      }
    }

    // Touch handlers
    let touchStartX = 0
    let touchStartY = 0
    let touchStartScrollLeft = 0
    let isDragging = false

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchStartScrollLeft = container.scrollLeft
      isDragging = false

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      isScrollingRef.current = false
    }

    const handleTouchMove = (e) => {
      if (!touchStartX || !touchStartY) return

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const deltaX = touchStartX - touchX
      const deltaY = touchStartY - touchY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDragging = true
        container.scrollLeft = touchStartScrollLeft + deltaX

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }

    const handleTouchEnd = () => {
      if (!isDragging) {
        touchStartX = 0
        touchStartY = 0
        return
      }

      scrollTimeoutRef.current = setTimeout(() => {
        snapToNearest()
      }, 150)

      touchStartX = 0
      touchStartY = 0
      isDragging = false
    }

    const handleScroll = () => {
      if (!isWheelingRef.current && !isScrollingRef.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          snapToNearest()
        }, 200)
      }
    }

    // Initialize
    currentScrollRef.current = container.scrollLeft
    targetScrollRef.current = container.scrollLeft

    // Attach listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', handleScroll, { passive: true })

    if (isTouchDevice) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: true })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', handleScroll)

      if (isTouchDevice) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      if (wheelEndTimeoutRef.current) {
        clearTimeout(wheelEndTimeoutRef.current)
      }
    }
  }, [containerRef, animateScroll, snapToNearest, isTouchDevice])

  return null
}

export default useCarouselScroll


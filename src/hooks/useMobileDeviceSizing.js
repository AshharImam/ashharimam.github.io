import { useEffect } from 'react'

const useMobileDeviceSizing = () => {
  useEffect(() => {
    if (window.innerWidth <= 767) {
      const updateDeviceSize = () => {
        const vh = window.innerHeight
        const vw = window.innerWidth
        const deviceAspectRatio = 880 / 1832 // Width / Height

        let deviceWidth, deviceHeight

        // Calculate device size to fit viewport perfectly
        const viewportAspectRatio = vw / vh

        if (viewportAspectRatio > deviceAspectRatio) {
          // Viewport is wider, fit by height
          deviceHeight = vh
          deviceWidth = deviceHeight * deviceAspectRatio
        } else {
          // Viewport is taller, fit by width
          deviceWidth = vw
          deviceHeight = deviceWidth / deviceAspectRatio
        }

        // Update mockup containers
        const mockupContainers = document.querySelectorAll('.mockup-container')
        mockupContainers.forEach(container => {
          container.style.width = `${deviceWidth}px`
          container.style.height = `${deviceHeight}px`
        })

        // Calculate screen area (inside bezel)
        // Based on bezel SVG: screen starts at ~2.3% from top, 4.3% from left
        // Screen is ~91.5% width, ~95.5% height
        const screenTop = deviceHeight * 0.023
        const screenLeft = deviceWidth * 0.043
        const screenWidth = deviceWidth * 0.915
        const screenHeight = deviceHeight * 0.955
        const screenBorderRadius = deviceWidth * 0.065

        // Update screen images
        const screenImages = document.querySelectorAll('.screen-img')
        screenImages.forEach(screen => {
          screen.style.top = `${screenTop}px`
          screen.style.left = `${screenLeft}px`
          screen.style.width = `${screenWidth}px`
          screen.style.height = `${screenHeight}px`
          screen.style.borderRadius = `${screenBorderRadius}px`
        })

        // Update detail containers (content overlay)
        const detailContainers = document.querySelectorAll('.project-details.mobile')
        detailContainers.forEach(details => {
          details.style.top = `${screenTop}px`
          details.style.left = `${screenLeft}px`
          details.style.width = `${screenWidth}px`
          details.style.height = `${screenHeight}px`
          details.style.borderRadius = `${screenBorderRadius}px`
        })
      }

      // Initial calculation
      updateDeviceSize()

      // Update on resize with debounce
      let resizeTimeout
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(updateDeviceSize, 150)
      }

      // Update on orientation change
      const handleOrientationChange = () => {
        setTimeout(updateDeviceSize, 400)
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('orientationchange', handleOrientationChange)

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('orientationchange', handleOrientationChange)
        if (resizeTimeout) clearTimeout(resizeTimeout)
      }
    }
  }, [])
}

export default useMobileDeviceSizing


import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './DeviceBezel.css'

const DeviceBezel = ({ screenshot, title, children }) => {
  const mockupRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 767) {
      const mockup = mockupRef.current
      if (!mockup) return

      const handleMouseMove = (e) => {
        const rect = mockup.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateY = ((x - centerX) / centerX) * 8
        const rotateX = ((centerY - y) / centerY) * 8

        mockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }

      const handleMouseLeave = () => {
        mockup.style.transform = 'perspective(1000px) rotateY(-10deg)'
      }

      const parent = mockup.closest('.project-card')
      if (parent) {
        parent.addEventListener('mousemove', handleMouseMove)
        parent.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          parent.removeEventListener('mousemove', handleMouseMove)
          parent.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [])

  return (
    <motion.div
      ref={mockupRef}
      className="mockup-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.img
        src="/assets/bezel.svg"
        className="bezel-img"
        alt="Device Bezel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.img
        src={screenshot}
        alt={`${title} Screenshot`}
        className="screen-img"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      />
      {children}
    </motion.div>
  )
}

export default DeviceBezel


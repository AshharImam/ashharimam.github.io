import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import NavigationArrows from './NavigationArrows'
import useCarouselScroll from '../hooks/useCarouselScroll'
import useMobileDeviceSizing from '../hooks/useMobileDeviceSizing'
import './ProjectsCarousel.css'

const ProjectsCarousel = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const isMobile = window.innerWidth <= 767

  // Setup carousel scrolling
  useCarouselScroll(containerRef, projects.length, setActiveIndex)
  
  // Setup mobile device sizing
  useMobileDeviceSizing()

  // Update orb colors based on active project
  useEffect(() => {
    if (projects[activeIndex]?.colors) {
      const colors = projects[activeIndex].colors
      const event = new CustomEvent('orbColorChange', {
        detail: {
          c1: colors[0] || '#00f2ff',
          c2: colors[1] || '#a855f7',
          c3: colors[2] || colors[0] || '#ff00ff'
        }
      })
      window.dispatchEvent(event)
      
      // Also update CSS variables
      document.documentElement.style.setProperty('--orb-c1', colors[0] || '#00f2ff')
      document.documentElement.style.setProperty('--orb-c2', colors[1] || '#a855f7')
      document.documentElement.style.setProperty('--orb-c3', colors[2] || colors[0] || '#ff00ff')
    }
  }, [activeIndex, projects])

  const handlePrevious = useCallback(() => {
    if (containerRef.current && activeIndex > 0) {
      containerRef.current.scrollBy({
        left: -window.innerWidth,
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  const handleNext = useCallback(() => {
    if (containerRef.current && activeIndex < projects.length - 1) {
      containerRef.current.scrollBy({
        left: window.innerWidth,
        behavior: 'smooth'
      })
    }
  }, [activeIndex, projects.length])

  return (
    <section id="projects">
      <NavigationArrows
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={activeIndex > 0}
        showNext={activeIndex < projects.length - 1}
      />

      <div ref={containerRef} className="projects-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-section-wrapper ${index === activeIndex ? 'active' : ''}`}
            data-colors={JSON.stringify(project.colors || [])}
          >
            <div
              className="bg-icon"
              style={{ color: getAccentColor(project.id) }}
              dangerouslySetInnerHTML={{ __html: project.projectIcon }}
            />

            <ProjectCard
              project={project}
              accentColor={getAccentColor(project.id)}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

const getAccentColor = (id) => {
  const colors = ['#00f2ff', '#a855f7', '#ff00ff', '#ff6b00']
  return colors[(id - 1) % colors.length]
}

export default ProjectsCarousel


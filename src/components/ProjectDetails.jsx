import { motion } from 'framer-motion'
import TechStack from './TechStack'
import Stats from './Stats'
import './ProjectDetails.css'
import './ViewButton.css'

const ProjectDetails = ({ project, accentColor, isMobile }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    }
  }

  const mobileContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      className={`project-details ${isMobile ? 'mobile' : 'desktop'}`}
      variants={isMobile ? mobileContainerVariants : containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="project-title"
        style={{ '--accent': accentColor }}
        variants={isMobile ? mobileItemVariants : itemVariants}
      >
        {project.title}
      </motion.h2>

      <motion.p 
        className="project-desc" 
        variants={isMobile ? mobileItemVariants : itemVariants}
      >
        {project.description}
      </motion.p>

      <motion.div variants={isMobile ? mobileItemVariants : itemVariants}>
        <TechStack techStack={project.techStack || []} />
      </motion.div>

      <motion.div variants={isMobile ? mobileItemVariants : itemVariants}>
        <Stats stats={project.stats || {}} accentColor={accentColor} />
      </motion.div>

      <motion.a
        href="#"
        className="view-btn"
        style={{
          borderColor: accentColor,
          color: accentColor
        }}
        variants={isMobile ? mobileItemVariants : itemVariants}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        View Details
      </motion.a>
    </motion.div>
  )
}

export default ProjectDetails


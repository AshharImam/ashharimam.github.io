import { motion } from 'framer-motion'
import DeviceBezel from './DeviceBezel'
import ProjectDetails from './ProjectDetails'
import './ProjectCard.css'

const ProjectCard = ({ project, accentColor, isMobile }) => {
  if (isMobile) {
    return (
      <motion.div
        className="project-card mobile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="project-mockup">
          <DeviceBezel
            screenshot={project.mobileScreenshot}
            title={project.title}
          >
            <ProjectDetails
              project={project}
              accentColor={accentColor}
              isMobile={true}
            />
          </DeviceBezel>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="project-card desktop"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="project-mockup">
        <DeviceBezel
          screenshot={project.mobileScreenshot}
          title={project.title}
        />
      </div>

      <ProjectDetails
        project={project}
        accentColor={accentColor}
        isMobile={false}
      />
    </motion.div>
  )
}

export default ProjectCard


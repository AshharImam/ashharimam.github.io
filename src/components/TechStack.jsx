import { motion } from 'framer-motion'
import './TechStack.css'

const TechStack = ({ techStack }) => {
  return (
    <div className="tech-stack">
      {techStack.map((tech, index) => (
        <motion.div
          key={index}
          className="tech-icon"
          data-tooltip={tech.name}
          whileHover={{ y: -2, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: 'spring',
            stiffness: 400,
            damping: 17
          }}
        >
          <img src={tech.icon} alt={tech.name} className="tech-svg" />
        </motion.div>
      ))}
    </div>
  )
}

export default TechStack


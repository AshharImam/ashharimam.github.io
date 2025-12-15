import { motion } from 'framer-motion'
import './Stats.css'

const Stats = ({ stats, accentColor }) => {
  return (
    <div className="stats-container">
      {Object.entries(stats).map(([key, value], index) => (
        <motion.div
          key={index}
          className="stat-item"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: 'spring',
            stiffness: 400,
            damping: 17
          }}
        >
          <span className="stat-label">{key}:</span>
          <span className="stat-value" style={{ color: accentColor }}>
            {value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default Stats


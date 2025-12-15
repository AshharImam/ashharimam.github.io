import { motion } from 'framer-motion'
import './Loader.css'

const Loader = () => {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, visibility: 'hidden' }}
      transition={{ duration: 1 }}
    >
      <div className="loader-content">
        <motion.h1
          className="loader-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ashhar Imam
        </motion.h1>
        <motion.p
          className="loader-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mobile App Expert | Full Stack Developer
        </motion.p>
      </div>
      
      <motion.div
        className="loader-orb"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.8, 0.4],
          filter: ['blur(25px)', 'blur(15px)', 'blur(25px)']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  )
}

export default Loader


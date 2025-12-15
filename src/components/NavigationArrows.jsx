import { motion, AnimatePresence } from 'framer-motion'
import './NavigationArrows.css'

const NavigationArrows = ({ onPrevious, onNext, showPrevious, showNext }) => {
  return (
    <>
      <AnimatePresence>
        {showPrevious && (
          <motion.button
            className="nav-arrow nav-prev glass"
            onClick={onPrevious}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 19L8 12L15 5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNext && (
          <motion.button
            className="nav-arrow nav-next glass"
            onClick={onNext}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 5L16 12L9 19"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavigationArrows


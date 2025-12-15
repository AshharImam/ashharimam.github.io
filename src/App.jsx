import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import ProjectsCarousel from './components/ProjectsCarousel'
import BackgroundOrbs from './components/BackgroundOrbs'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Simulate loader duration
    const loadData = async () => {
      try {
        const response = await fetch('/projects.json')
        const data = await response.json()
        setProjects(data)
        
        // 7.5 second loader as requested
        setTimeout(() => {
          setIsLoading(false)
        }, 7500)
      } catch (error) {
        console.error('Failed to load projects:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <>
      <BackgroundOrbs />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <ProjectsCarousel projects={projects} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App


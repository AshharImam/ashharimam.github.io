import { useEffect, useState } from 'react'
import './BackgroundOrbs.css'

const BackgroundOrbs = () => {
  const [colors, setColors] = useState({
    c1: '#00f2ff',
    c2: '#a855f7',
    c3: '#ff00ff'
  })

  useEffect(() => {
    const handleColorChange = (event) => {
      if (event.detail) {
        setColors(event.detail)
      }
    }

    window.addEventListener('orbColorChange', handleColorChange)
    return () => window.removeEventListener('orbColorChange', handleColorChange)
  }, [])

  return (
    <>
      <div 
        className="bg-orb orb-1"
        style={{
          background: `radial-gradient(circle, ${colors.c1}, ${colors.c2}, ${colors.c3})`
        }}
      />
      <div 
        className="bg-orb orb-2"
        style={{
          background: `radial-gradient(circle, ${colors.c3}, ${colors.c2})`
        }}
      />
    </>
  )
}

export default BackgroundOrbs


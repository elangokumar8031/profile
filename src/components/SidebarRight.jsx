import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll } from 'framer-motion'
import './SidebarRight.css'

/**
 * SidebarRight — Global fixed section navigation indicator
 * Tracks scroll position to highlight the active section.
 */
function SidebarRight({ sections = ['hero', 'about', 'services'] }) {
  const [activeSection, setActiveSection] = useState(sections[0])
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Offset triggers the active state when the section reaches 1/3 down the screen
      const scrollPosition = latest + window.innerHeight / 3

      // Loop backwards to find the deepest section we have scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          if (el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    })
  }, [sections, scrollY])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sidebarContent = (
    <aside 
      className="sidebar-right global-nav"
    >
      <div className="section-numbers">
        {sections.map((id, index) => {
          const isActive = id === activeSection
          return (
            <motion.span
              key={id}
              onClick={() => scrollToSection(id)}
              className="section-num"
              animate={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                scale: isActive ? 1.4 : 1,
                opacity: isActive ? 1 : 0.6,
                textShadow: isActive ? '0px 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ 
                scale: 1.5, 
                color: 'var(--text-primary)', 
                opacity: 1,
                textShadow: '0px 6px 16px rgba(0,0,0,0.2)'
              }}
            >
              {String(index).padStart(2, '0')}
            </motion.span>
          )
        })}
      </div>
    </aside>
  )

  if (typeof document !== 'undefined') {
    return createPortal(sidebarContent, document.body)
  }
  
  return null
}

export default SidebarRight

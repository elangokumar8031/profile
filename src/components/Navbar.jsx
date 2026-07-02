import { useState, useEffect } from 'react'
import { useScroll } from 'framer-motion'
import { PanelLeft, X } from 'lucide-react'
import GooeyNav from './GooeyNav'
import { AnimatedThemeToggler } from './AnimatedThemeToggler'
import './Navbar.css'

/**
 * Navbar — Top navigation bar
 * Props:
 *   name        {string} — Display name (e.g. "Your Name")
 *   subtitle    {string} — Subtitle below name (e.g. "Portfolio")
 *   initial     {string} — Single letter shown in avatar circle
 *   openToWork  {boolean} — Controls green dot + button label
 */
function Navbar({ name = 'Your Name', subtitle = 'Portfolio', initial = 'Y', openToWork = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
  }, [scrollY])

  const navLinks = [
    { label: 'Home',      href: '#hero' },
    { label: 'About',     href: '#about' },
    { label: 'Services',  href: '#services'  },
    { label: 'Skills',    href: '#skills'  },
    { label: 'Education', href: '#experience' },
    { label: 'Projects',  href: '#projects'  },
    { label: 'Contacts',   href: '#contact'   },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Brand */}
      <div className="navbar-brand">
        <div className="brand-name">
          {name}
          <span>{subtitle}</span>
        </div>
      </div>

      {/* Nav Links */}
      <GooeyNav items={navLinks} initialActiveIndex={0} />

      {/* Theme Toggler */}
      <AnimatedThemeToggler className="navbar-theme-toggler" />

      {/* Mobile Menu Button */}
      <button 
        className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <PanelLeft size={20} />}
      </button>

      {/* Mobile Dropdown */}
      <div className={`mobile-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link, idx) => (
          <a 
            key={idx} 
            href={link.href} 
            className="mobile-dropdown-link"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
              const targetId = link.href.replace('#', '')
              const element = document.getElementById(targetId)
              if (element) {
                setTimeout(() => {
                  element.scrollIntoView({ behavior: 'smooth' })
                }, 150)
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Open to Work Button */}
      <button className="btn-open-to-work" id="btn-open-to-work">
        {openToWork && <span className="status-dot" />}
        Open to work
      </button>
    </nav>
  )
}

export default Navbar

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarLeft  from './SidebarLeft'
import HeroText     from './HeroText'
import TextPressure from './TextPressure'
import { Particles } from './Particles'
import './HeroSection.css'

/**
 * HeroSection — 3-column grid: sidebars + center content
 * Props:
 *   name        {string}  — Full name displayed as main heading
 *   title       {string}  — Job title shown via TextPressure (e.g. "Front End Engineer")
 *   description {string}  — Bio paragraph
 *   socials     {array}   — Override social links (passed to SidebarLeft)
 *   onCta       {fn}      — "Get in touch" click handler
 */
function HeroSection({ name, title, description, socials, onCta }) {
  // Intro overlay — plays only once per browser session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('introPlayed')
  })

  // Delay the TextPressure sweep until the intro curtain has lifted
  const animationDelay = showIntro ? 2400 : 200

  const [isDark,    setIsDark]    = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem('introPlayed', 'true')
  }

  return (
    <section className="hero-section" id="hero">

      {/* Particle field in dark mode */}
      {isDark && (
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
      )}

      {/* ── Intro curtain overlay ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          9999,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              backgroundColor: '#0a0a0c',
              pointerEvents:   isMobile ? 'none' : 'auto',
            }}
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 1.3 }}
            onAnimationComplete={handleIntroComplete}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30, filter: 'blur(8px)' }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale:   [0.8, 1, 1, 1.15],
                y:       [30, 0, 0, -35],
                filter:  ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
              }}
              transition={{
                times:    [0, 0.25, 0.75, 1],
                duration: 1.6,
                ease:     'easeInOut',
                delay:    0.1,
              }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize:   'clamp(140px, 25vw, 320px)',
                fontWeight: 900,
                color:      '#f0f0ec',
                lineHeight: 1,
                textShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
            >
              Hii
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SidebarLeft socials={socials} />

      {/* ── Center column ── */}
      <main className="hero-center">

        {/* Name */}
        <div className="hero-name-container">
          <h1 className="hero-name-display">{name}</h1>
        </div>

        {/* Job title — interactive variable-font TextPressure */}
        <div className="hero-title-pressure">
          <TextPressure
            text={title}
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="var(--text-primary)"
            strokeColor="#5227FF"
            minFontSize={22}
            animationDelay={animationDelay}
          />
        </div>

        {/* Description + CTA */}
        <HeroText description={description} onCta={onCta} />

      </main>

      {/* SidebarRight is rendered globally from App */}
    </section>
  )
}

export default HeroSection

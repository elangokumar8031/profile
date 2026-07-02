import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarLeft from './SidebarLeft'
import HeroText from './HeroText'
import { Particles } from './Particles'
import './HeroSection.css'

/**
 * HeroSection — 3-column grid: sidebars + center content
 * Props:
 *   photoSrc    {string}  — Pass your photo path here, e.g. "/me.png"
 *   title       {string}  — Job title headline
 *   description {string}  — Bio paragraph
 *   bubble      {string}  — Speech bubble text
 *   socials     {array}   — Override social links (passed to SidebarLeft)
 *   onCta       {fn}      — "Get in touch" click handler
 */
function HeroSection({ name, description, socials, onCta }) {
  // Ensure animation plays only once per session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('introPlayed')
  })

  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introPlayed', 'true');
  };

  return (
    <section className="hero-section" id="hero">
      {isDark && (
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
      )}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0c', // Obsidian theme background
              pointerEvents: isMobile ? 'none' : 'auto' // Block all user clicks while animation is running on desktop, but allow interaction on mobile to prevent the scrolling bug
            }}
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 0.9,
              ease: [0.85, 0, 0.15, 1], // Premium cubic-bezier curtain reveal
              delay: 1.3
            }}
            onAnimationComplete={handleIntroComplete}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30, filter: 'blur(8px)' }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 1.15],
                y: [30, 0, 0, -35],
                filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
              }}
              transition={{
                times: [0, 0.25, 0.75, 1],
                duration: 1.6, // Fades in, dwells, and exits gracefully
                ease: 'easeInOut',
                delay: 0.1
              }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(140px, 25vw, 320px)',
                fontWeight: 900,
                color: '#f0f0ec',
                lineHeight: 1,
                textShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              Hii
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SidebarLeft socials={socials} />

      <main className="hero-center">
        <div className="hero-name-container">
          <h1 className="hero-name-display">
            {name}
          </h1>
        </div>
        <HeroText description={description} onCta={onCta} />
      </main>

      {/* SidebarRight removed to become a global component */}
    </section>
  )
}

export default HeroSection

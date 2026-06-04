import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.png'
import './AboutSection.css'
import { motion } from 'framer-motion'
import { PixelImage } from './PixelImage'

const bgTextVariants = {
  hidden: { opacity: 0, x: "-50%", y: 0, filter: "blur(12px)" },
  visible: {
    opacity: [0, 0.12, 0.02],
    filter: ["blur(12px)", "blur(0px)", "blur(8px)"],
    transition: { duration: 2.5, times: [0, 0.3, 1], ease: "easeInOut" }
  }
}

const textColVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
  }
}

/**
 * AboutSection — Elegant two-column layout
 * Left : large portrait photo
 * Right: name in a classy display font + subtle tagline
 */
function AboutSection({ name = 'Your Name', photoSrc = profileImg }) {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)

  const [initialX, setInitialX] = useState(500)
  const [initialY, setInitialY] = useState(-500)
  const [isPositioned, setIsPositioned] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(() => {
    if (typeof window !== 'undefined') {
      const alreadyAnimated = sessionStorage.getItem('portfolio_about_image_animated') === 'true'
      const isMobileWidth = window.innerWidth <= 900
      return alreadyAnimated || isMobileWidth
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyAnimated = sessionStorage.getItem('portfolio_about_image_animated') === 'true'
      const isScrolledDown = window.scrollY > 100
      const isMobileWidth = window.innerWidth <= 900
      
      // If the user already animated the image in this session,
      // if the page refreshed and is already scrolled down, or if we are on mobile, skip the animation:
      if (alreadyAnimated || isScrolledDown || isMobileWidth) {
        setSkipAnimation(true)
      }
    }
  }, [])

  useEffect(() => {
    const calculatePositions = () => {
      if (frameRef.current) {
        const rect = frameRef.current.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        
        const absoluteLeft = rect.left + scrollLeft
        
        // Calculate the translation offsets required to place the image
        // at the top-right corner of the viewport (off-screen):
        // X starting point = window.innerWidth + rect.width (off-screen right)
        // Y starting point = -window.innerHeight - rect.height (off-screen top)
        setInitialX(window.innerWidth - absoluteLeft + rect.width)
        setInitialY(-window.innerHeight - rect.height)
        setIsPositioned(true)

        // If window is resized to mobile, make sure we skip animation:
        if (window.innerWidth <= 900) {
          setSkipAnimation(true)
        }
      }
    }
    
    // Short timeout to guarantee layout calculations run after rendering
    const timer = setTimeout(calculatePositions, 150)
    
    window.addEventListener('resize', calculatePositions)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculatePositions)
    }
  }, [])

  // Variants to control the fly-in transition from the top-right viewport corner.
  // If skipAnimation is true, the image is rendered immediately in its final place.
  const photoFrameVariants = {
    hidden: (custom) => ({
      x: skipAnimation ? 0 : (custom?.initialX ?? 500),
      y: skipAnimation ? 0 : (custom?.initialY ?? -500),
      opacity: skipAnimation ? 1 : 0
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: skipAnimation ? { duration: 0 } : {
        type: "spring",
        stiffness: 55,
        damping: 18,
        restDelta: 0.001
      }
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="about-section" 
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div className="about-bg-text" variants={bgTextVariants}>
        ABOUT
      </motion.div>

      <div className="about-inner">

        {/* ── Photo column ── */}
        <div className="about-photo-col">
          <motion.div 
            ref={frameRef}
            className="about-photo-frame"
            custom={{ initialX, initialY }}
            variants={photoFrameVariants}
            style={{ opacity: (skipAnimation || isPositioned) ? undefined : 0 }}
            onAnimationComplete={(definition) => {
              if (definition === 'visible' && !skipAnimation) {
                sessionStorage.setItem('portfolio_about_image_animated', 'true')
                setSkipAnimation(true)
              }
            }}
          >
            <PixelImage
              src={photoSrc}
              alt={name}
              customGrid={{ rows: 4, cols: 6 }}
              grayscaleAnimation
            />
          </motion.div>
        </div>

        {/* ── Text column ── */}
        <motion.div className="about-text-col" variants={textColVariants}>

          

          <span className="about-label">About me</span>

          <div className="about-divider" />

          <p className="about-role">Front End Engineer</p>

          <p className="about-bio">
            Crafting seamless digital experiences at the intersection of design
            and code. I bring ideas to life with precision, performance, and a
            relentless eye for detail.
          </p>

        </motion.div>
      </div>
    </motion.section>
  )
}

export default AboutSection

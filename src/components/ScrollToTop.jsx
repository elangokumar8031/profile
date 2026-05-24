import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY

      // Show button after scrolling down 200px
      if (currentScroll > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once initially to capture state
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Circle path mathematics
  const radius = 18.5
  const strokeWidth = 2.5
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="scroll-to-top fixed bottom-[40px] right-[26px] z-[9999] inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(240,240,236,0.8)] dark:bg-white backdrop-blur-md border border-[var(--border)] dark:border-[#fff] text-black dark:text-black shadow-sm hover:bg-[var(--border)] dark:hover:bg-white transition-colors duration-200"
          aria-label="Scroll to top"
        >
          {/* Radial progress circle */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 40 40">
            {/* Background circle outline */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active progress outline */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>
          
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Globe, ArrowRight } from 'lucide-react'
import project1 from '../assets/project1.mp4'
import project2 from '../assets/project2.mp4'
import project3 from '../assets/project3.mp4'
import project4 from '../assets/project4.mp4'
import project5 from '../assets/project5.mp4'
import { Android } from './Android'

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const projects = [
  {
    id: 1,
    title: 'VVS Kadalai Muttai',
    date: 'Jan 2024 - Feb 2024',
    description: 'A premium full-stack South Indian sweets & savouries e-commerce platform. Features multi-step verification, pincode-based address lookup, secure admin portal, and phone number OTP verification.',
    video: project1,
    isAndroid: true,
    links: [
      { label: 'Source', url: 'https://github.com/elangokumar8031/vvskadalaimuttai-frontend', icon: GithubIcon }
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'Fast2SMS OTP']
  },
  {
    id: 2,
    title: 'NEMESIS AI',
    date: 'June 2023 - Present',
    description: 'Built a chrome extension that allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
    video: project2,
    links: [

      { label: 'Source', url: '#', icon: GithubIcon }
    ],
    tech: ['Next.js', 'Typescript', 'PostgreSQL', 'Prisma', 'TailwindCSS', 'Stripe']
  },
  {
    id: 3,
    title: 'WE Watch',
    date: 'May 2026',
    description: 'An immersive product showcase for the WE Watch premium smartwatch. Features a high-fidelity smartwatch mockup that dynamically rotates, scales, and repositions via GSAP ScrollTrigger timeline animations as the user scrolls.',
    video: project5,
    isLaptop: true,
    links: [
      { label: 'Source', url: 'https://github.com/elangokumar8031/WeWatch-premium-collection', icon: GithubIcon }
    ],
    tech: ['React', 'Vite', 'GSAP', 'Lenis Scroll', 'Framer Motion', 'TailwindCSS']
  },
  {
    id: 4,
    title: 'India News & Market Hub',
    date: 'May 2026',
    description: 'A premium Flutter Android app that delivers real-time news integrated with live financial widgets. Features an automated scrolling ticker for stock indices (Nifty, Sensex) and commodity rates (Gold, Silver in INR).',
    video: project4,
    isAndroid: true,
    links: [
      { label: 'Source', url: 'https://github.com/elangokumar8031/demo', icon: GithubIcon }
    ],
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'REST APIs', 'Text-to-Speech', 'Google Translate API', 'Shared Preferences']
  },
  {
    id: 5,
    title: 'Stactic Porfolio',
    date: 'Mar 2023 - M3',
    description: 'A comprehensive financial dashboard providing real-time analytics, transaction tracking, and interactive charts for personal finance management.',
    video: project3,
    links: [
      { label: 'Source', url: 'https://github.com/elangokumar8031/portfolio', icon: GithubIcon }
    ],
    tech: ['HTML', 'CSS', 'Java Script', 'Bootstrap']
  }
]

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const cardRefs = useRef([])

  // IntersectionObserver — the professional, bulletproof way to track visible cards
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1
        let bestRatio = 0

        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIdx = Number(entry.target.dataset.index)
          }
        })

        if (bestIdx >= 0 && bestRatio > 0.5) {
          setActiveIndex(bestIdx)
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((index) => {
    const card = cardRefs.current[index]
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }, [])

  return (
    <section id="projects" className="w-full pt-20 pb-8 px-6 md:px-16 lg:px-24 bg-[#f9f9f9] dark:bg-[#111] relative z-10">

      {/* Header */}
      <div className="flex items-center justify-center mb-12 md:mb-16 w-full max-w-4xl mx-auto">
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/20"></div>
        <h2 className="mx-4 sm:mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
          My <span>Projects</span>
        </h2>
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/20"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Intro text */}
        <p className="text-center text-[#666] dark:text-[#aaa] text-lg md:text-xl max-w-2xl mb-12" style={{ fontFamily: '"Inter", sans-serif' }}>
          I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
        </p>

        {/* Right Arrow for Mobile View */}
        <div className="flex justify-end w-full mb-4 md:hidden pr-4">
          <button
            onClick={() => {
              const nextIndex = (activeIndex + 1) % projects.length
              scrollTo(nextIndex)
            }}
            className="flex items-center justify-center p-3 rounded-full bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] shadow-sm active:scale-90 transition-transform text-black dark:text-white pointer-events-auto"
            aria-label="Next projects"
            style={{ cursor: 'pointer' }}
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="w-full relative">

          {/* Carousel scroll area */}
          <div
            ref={carouselRef}
            className="projects-carousel flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-index={idx}
                className="snap-start shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] flex flex-col bg-white dark:bg-[#222] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#333] shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Video Header */}
                <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  {project.isMobile ? (
                    <div className="relative h-[190px] w-[105px] overflow-hidden rounded-[1.8rem] border-[4px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl transition-transform duration-500 group-hover:scale-110">
                      {/* Notch / Dynamic Island */}
                      <div className="absolute top-[2px] left-1/2 z-10 h-[6px] w-[25px] -translate-x-1/2 rounded-full bg-[#1a1a1a]"></div>

                      {/* Video */}
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />

                      {/* Home Indicator */}
                      <div className="absolute bottom-[3px] left-1/2 z-10 h-[2px] w-[15px] -translate-x-1/2 rounded-full bg-white/20"></div>
                    </div>
                  ) : project.isLaptop ? (
                    <div className="flex flex-col items-center justify-center w-[85%] max-w-[280px] transition-transform duration-500 group-hover:scale-105">
                      {/* Laptop Screen / Lid */}
                      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl border-[6px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl">
                        {/* Webcam */}
                        <div className="absolute top-[2px] left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#333]"></div>

                        {/* Video */}
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-fill bg-black"
                        />
                      </div>

                      {/* Laptop Base (Keyboard Deck) */}
                      <div className="relative w-[112%] h-[8px] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-b-md shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex justify-center">
                        {/* Opening Notch */}
                        <div className="w-[30px] h-[3px] bg-gray-600/30 rounded-b-sm"></div>
                      </div>
                    </div>
                  ) : project.isTablet ? (
                    <div className="flex flex-col items-center justify-center w-[75%] max-w-[240px] transition-transform duration-500 group-hover:scale-105">
                      {/* Tablet Screen */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border-[5px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl">
                        {/* Webcam (portrait top bezel / landscape side bezel) */}
                        <div className="absolute top-[2.5px] left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#333]"></div>

                        {/* Video */}
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-fill bg-black"
                        />

                        {/* Home Indicator */}
                        <div className="absolute bottom-[3px] left-1/2 z-10 h-[2px] w-[20px] -translate-x-1/2 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                  ) : project.isAndroid ? (
                    <div className="relative h-[190px] aspect-[433/882] transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                      <Android
                        videoSrc={project.video}
                        className="h-full w-full drop-shadow-2xl"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full p-[3px] transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="relative w-full h-full overflow-hidden rounded-xl border-[4px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl">
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-contain bg-black"
                        />
                      </div>
                    </div>
                  )}

                  {/* Floating Links inside video */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.links.map((link, i) => {
                      const Icon = link.icon
                      return (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md transition-colors"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          <Icon size={14} />
                          {link.label}
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">

                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[22px] font-bold text-black dark:text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {project.title}
                    </h3>
                    <ArrowUpRight size={20} className="text-gray-400" />
                  </div>

                  <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-4 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {project.date}
                  </p>

                  <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {project.description}
                  </p>

                  {/* Badges - pushed to bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[12px] font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-[#333] px-2.5 py-1 rounded-md border border-gray-200 dark:border-[#444]"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}

            {/* Spacer to prevent last card from colliding with SidebarRight */}
            <div className="shrink-0 w-8 md:w-20 lg:w-32" aria-hidden="true"></div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`transition-all duration-300 rounded-full ${activeIndex === idx
                ? 'w-8 h-2.5 bg-black dark:bg-white'
                : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

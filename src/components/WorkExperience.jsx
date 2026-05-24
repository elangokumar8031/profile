import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import milifestyleLogo from '../assets/milifestyle.jpg'
import rtcLogo from '../assets/rtclogo.png'
import srnmLogo from '../assets/srnmlogo.png'
import freelancerLogo from '../assets/freelanceerlogo.png'
import ieeePdf from '../assets/IEEE certificate.jpg'
import nptelImg from '../assets/NPTEL certifications.jpeg'
import { Eye, X, ExternalLink } from 'lucide-react'

const LogoContainer = ({ bgColor, children }) => (
  <div className="w-[60px] h-[60px] rounded-full border-[3px] border-white dark:border-[#222] flex items-center justify-center bg-white dark:bg-[#111] p-1 flex-shrink-0 relative z-10 shadow-sm transition-all duration-500 group-hover:border-purple-200 dark:group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
    <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center text-white ${bgColor}`}>
      {children}
    </div>
  </div>
)

const experiences = [
  {
    company: 'Freelancer',
    role: 'Self Employed',
    date: '2024 - now',
    logo: (
      <LogoContainer bgColor="bg-white">
        <img src={freelancerLogo} alt="Freelancer" className="w-full h-full object-contain rounded-full" />
      </LogoContainer>
    )
  },
  {
    company: 'Master Of Computer Application',
    role: 'Rathinam Technical Campus, Coimbatore',
    date: '2024 - 2026',
    logo: (
      <LogoContainer bgColor="bg-white">
        <img src={rtcLogo} alt="RTC" className="w-full h-full object-contain rounded-full" />
      </LogoContainer>
    )
  },
  {
    company: 'MiLifestyle',
    role: 'Product Distibutor',
    date: '2022 - 2024',
    logo: (
      <LogoContainer bgColor="bg-white">
        <img src={milifestyleLogo} alt="MiLifestyle" className="w-full h-full object-cover rounded-full" />
      </LogoContainer>
    )
  },
  {
    company: 'B.Com with Computer Application',
    role: 'Ramasamy Naidu Memorial College, Sattur',
    date: '2022 - 2024',
    logo: (
      <LogoContainer bgColor="bg-white">
        <img src={srnmLogo} alt="SRNM" className="w-full h-full object-contain rounded-full" />
      </LogoContainer>
    )
  }
]

const certificates = [
  {
    title: 'IEEE Certificate',
    issuer: 'IEEE Conference',
    type: 'PDF Document',
    file: ieeePdf,
    isPdf: false
  },
  {
    title: 'NPTEL Certification',
    issuer: 'NPTEL / IIT',
    type: 'E-Certificate',
    file: nptelImg,
    isPdf: false
  }
]

export default function WorkExperience() {
  const ref = useRef(null)
  const [selectedCert, setSelectedCert] = useState(null)
  
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCert])
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="experience" className={`w-full flex flex-col items-center justify-center pt-20 pb-24 px-8 md:px-20 lg:px-32 bg-transparent relative ${selectedCert ? 'z-[150]' : 'z-10'}`} ref={ref}>
      
      {/* Header */}
      <div className="flex items-center justify-center mb-12 md:mb-16 w-full max-w-4xl mx-auto">
        <div className="flex-1 h-[1px] bg-black/10"></div>
        <h2 className="mx-4 sm:mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
          Education & Experience
        </h2>
        <div className="flex-1 h-[1px] bg-black/10"></div>
      </div>

      <div className="flex flex-col w-full max-w-2xl mx-auto">

        {/* Timeline Container */}
        <div className="relative w-full">
          
          {/* Static Background Line */}
          <div className="absolute left-[11px] md:left-[23px] top-2 bottom-2 w-[2px] bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-[11px] md:left-[23px] top-2 bottom-2 w-[2px] bg-black dark:bg-white origin-top z-10 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            style={{ scaleY }}
          />

          {/* List */}
          <div className="flex flex-col gap-8 md:gap-10 w-full">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative w-full pl-[40px] md:pl-[64px]">
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
                  whileInView={{ backgroundColor: 'var(--dark)', borderColor: 'var(--dark)', boxShadow: '0px 0px 15px var(--border)' }}
                  viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-[4px] md:left-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full border-[3px] z-20" 
                />

                {/* Experience Card */}
                <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between w-full gap-5 sm:gap-0 p-5 md:p-6 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] shadow-sm hover:shadow-xl hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1">
                  
                  {/* Left Side: Logo & Info */}
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="group-hover:scale-105 transition-transform duration-500">
                      {exp.logo}
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className="text-[19px] md:text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-500" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {exp.company}
                      </h3>
                      <span className="text-[14px] md:text-[16px] text-gray-600 dark:text-gray-400 mt-1 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                        {exp.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Side: Date Badge */}
                  <div className="sm:ml-auto flex sm:block mt-2 sm:mt-0">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-[13px] md:text-[14px] font-bold text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/5 shadow-inner group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-500 tracking-wider" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {exp.date}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Sub-Header */}
      <div className="flex items-center justify-center mt-16 mb-8 w-full max-w-2xl mx-auto">
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10"></div>
        <h3 className="mx-4 text-2xl font-light tracking-wide text-black dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          Certifications
        </h3>
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10"></div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
        {certificates.map((cert, index) => (
          <div 
            key={index}
            className="group relative flex items-start justify-between p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] shadow-sm hover:shadow-xl hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 select-none"
          >
            <div className="flex flex-col">
              <h4 
                className="text-[17px] md:text-[19px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-500"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {cert.title}
              </h4>
              <span 
                className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 font-medium"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {cert.issuer}
              </span>
              <span 
                className="inline-flex self-start mt-2 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-bold text-gray-600 dark:text-gray-400 tracking-wider uppercase"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {cert.type}
              </span>
            </div>
            
            {/* Eye Button Icon */}
            <button 
              onClick={() => setSelectedCert(cert)}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-all duration-300 hover:scale-110 shadow-sm flex-shrink-0"
            >
              <Eye size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Certificate Modal Dialog */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f5f5f5] dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-[24px] max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02]">
              <div>
                <h4 className="text-[18px] md:text-[20px] font-bold text-black dark:text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {selectedCert.title}
                </h4>
                <span className="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400">
                  {selectedCert.issuer}
                </span>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3">
                <a 
                  href={selectedCert.file} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 w-full h-full bg-black/[0.02] dark:bg-black/30 overflow-auto flex items-center justify-center">
              {selectedCert.isPdf ? (
                <iframe 
                  src={selectedCert.file} 
                  className="w-full h-full border-0" 
                  title={selectedCert.title}
                />
              ) : (
                <img 
                  src={selectedCert.file} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-full object-contain p-4 rounded-[12px]" 
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
      
    </section>
  )
}

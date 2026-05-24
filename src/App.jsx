import React, { useState } from 'react'
import './index.css'
import profileImg from './assets/profile.png'
import Navbar          from './components/Navbar'
import HeroSection     from './components/HeroSection'
import AboutSection    from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import SkillsSection   from './components/SkillsSection'
import WorkExperience  from './components/WorkExperience'
import ProjectsSection from './components/ProjectsSection'
import ContactSection  from './components/ContactSection'
import SidebarRight    from './components/SidebarRight'
import Footer          from './components/Footer'
import { SmoothCursor }  from './components/SmoothCursor'
import ScrollToTop     from './components/ScrollToTop'

/**
 * ╔══════════════════════════════════════════╗
 * ║           CUSTOMIZE YOUR PORTFOLIO        ║
 * ╚══════════════════════════════════════════╝
 *
 * 1. Add your photo to /public/me.png  →  set photoSrc="/me.png"
 * 2. Change name, title, description below
 * 3. Add your real social links in HeroSection's `socials` prop
 */
const CONFIG = {
  name:        'ELANGO K',
  subtitle:    'Portfolio',
  initial:     'E',          // shown in nav avatar
  title:       'Front End Engineer',
  description: 'Focused on building scalable and efficient architectures that empower businesses to run reliable systems. My expertise lies in databases, APIs, and performance optimization to deliver smooth user experiences.',
  bubble:      'hello!',
  photoSrc:    profileImg,   // ← your photo from src/assets/profile.webp
  openToWork:  true,
}

function App() {
  const [serviceRequest, setServiceRequest] = useState(null)

  const handleCta = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectService = (serviceTitle) => {
    setServiceRequest(serviceTitle)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page w-full">
      <SmoothCursor />
      <Navbar
        name={CONFIG.name}
        subtitle={CONFIG.subtitle}
        initial={CONFIG.initial}
        openToWork={CONFIG.openToWork}
      />

      <SidebarRight sections={['hero', 'about', 'services', 'skills', 'experience', 'projects', 'contact']} />

      <HeroSection
        name={CONFIG.name}
        photoSrc={CONFIG.photoSrc}
        title={CONFIG.title}
        description={CONFIG.description}
        bubble={CONFIG.bubble}
        onCta={handleCta}
      />

      <AboutSection
        name={CONFIG.name}
        photoSrc={CONFIG.photoSrc}
      />

      <ServicesSection onSelectService={handleSelectService} />
      
      <SkillsSection />
      
      <WorkExperience />
      
      <ProjectsSection />
      
      <ContactSection initialRequest={serviceRequest} onClearRequest={() => setServiceRequest(null)} />
      
      <Footer />
      
      <ScrollToTop />
    </div>
  )
}

export default App

import React from 'react'
import { IconInstagram, IconWhatsApp, IconFacebook, IconX } from './icons/Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 px-6 border-t border-black/5 dark:border-white/5 bg-[#f0f0ec] dark:bg-[#111] z-10 relative mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Left Side: Social Things */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-[13px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Inter", sans-serif' }}>
            Social Things:
          </span>
          <div className="flex gap-4 items-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 dark:text-gray-400 hover:text-[#e1306c] hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a 
              href="https://wa.me/919751582693" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 dark:text-gray-400 hover:text-[#25d366] hover:scale-110 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <IconWhatsApp />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 dark:text-gray-400 hover:text-[#1877f2] hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <IconX />
            </a>
          </div>
        </div>

        {/* Right Side: Copyright & Policies */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
            &copy; {currentYear} Elango K.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" style={{ fontFamily: '"Inter", sans-serif' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" style={{ fontFamily: '"Inter", sans-serif' }}>
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

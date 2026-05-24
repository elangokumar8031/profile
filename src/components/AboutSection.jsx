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
    transition: { duration: 1.2, delay: 1.1, ease: "easeOut" }
  }
}

/**
 * AboutSection — Elegant two-column layout
 * Left : large portrait photo
 * Right: name in a classy display font + subtle tagline
 */
function AboutSection({ name = 'Your Name', photoSrc = profileImg }) {
  return (
    <motion.section 
      className="about-section" 
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="about-bg-text" variants={bgTextVariants}>
        ABOUT
      </motion.div>

      <div className="about-inner">

        {/* ── Photo column ── */}
        <div className="about-photo-col">
          <div className="about-photo-frame">
            <PixelImage
              src={photoSrc}
              alt={name}
              customGrid={{ rows: 4, cols: 6 }}
              grayscaleAnimation
            />
          </div>
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

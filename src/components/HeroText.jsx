import { IconChevronUp, IconChevronDown } from './icons/Icons'
import TextPressure from './TextPressure'
import './HeroText.css'

/**
 * HeroText — Title, description, scroll arrows, and CTA button
 * Props:
 *   title       {string} — Job title headline
 *   description {string} — Short bio paragraph
 *   ctaLabel    {string} — CTA button text (default: "Get in touch")
 *   onCta       {fn}     — CTA click handler
 */
function HeroText({
  description = 'Focused on building scalable and efficient architectures that empower businesses to run reliable systems. My expertise lies in databases, APIs, and performance optimization to deliver smooth user experiences.',
  ctaLabel    = 'Get in touch',
  onCta,
}) {
  const handleScroll = (direction) => {
    window.scrollBy({ top: direction === 'down' ? 300 : -300, behavior: 'smooth' })
  }

  return (
    <div className="hero-text">
      {/* ── Interactive TextPressure title ── */}
      <div className="hero-title-pressure">
        <TextPressure
          text="Front End Engineer"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          scale={true}
          textColor="var(--text-primary)"
          strokeColor="#5227FF"
          minFontSize={18}
        />
      </div>
      <p className="hero-desc">{description}</p>

      {/* CTA */}
      <button className="btn-cta" id="btn-get-in-touch" onClick={onCta}>
        {ctaLabel}
      </button>
    </div>
  )
}

export default HeroText

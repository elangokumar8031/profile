import './HeroText.css'

/**
 * HeroText — Description paragraph and CTA button.
 * The job title is now rendered directly in HeroSection via TextPressure.
 *
 * Props:
 *   description {string} — Short bio paragraph
 *   ctaLabel    {string} — CTA button text (default: "Get in touch")
 *   onCta       {fn}     — CTA click handler
 */
function HeroText({
  description = 'Focused on building scalable and efficient architectures that empower businesses to run reliable systems. My expertise lies in databases, APIs, and performance optimization to deliver smooth user experiences.',
  ctaLabel    = 'Get in touch',
  onCta,
}) {
  return (
    <div className="hero-text">
      <p className="hero-desc">{description}</p>

      {/* CTA */}
      <button className="btn-cta" id="btn-get-in-touch" onClick={onCta}>
        {ctaLabel}
      </button>
    </div>
  )
}

export default HeroText

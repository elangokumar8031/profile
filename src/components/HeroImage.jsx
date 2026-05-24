import { IconUser } from './icons/Icons'
import LightRays   from './LightRays'
import './HeroImage.css'

/**
 * HeroImage — Floating person photo + animated speech bubble + WebGL spotlight
 * Props:
 *   src     {string} — Path to your photo (leave undefined to show placeholder)
 *   alt     {string} — Alt text for the image
 *   bubble  {string} — Text shown in the speech bubble (default: "hello!")
 */
function HeroImage({ src, alt = 'Profile photo', bubble = 'hello!' }) {
  return (
    <div className="hero-image-wrapper">

      {/* ── Image frame (black pill) ── */}
      <div className="hero-image-frame">

        {src ? (
          <img src={src} alt={alt} className="hero-photo" />
        ) : (
          /* ── Placeholder: pass src="/your-photo.png" to replace ── */
          <div className="hero-placeholder">
            <div className="placeholder-icon">
              <IconUser />
            </div>
            <p className="placeholder-label">
              Your Photo<br />Goes Here
            </p>
          </div>
        )}

        {/* ── WebGL light rays overlay (sits above image, blends via mix-blend-mode) ── */}
        <div className="lightrays-overlay">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.6}
            lightSpread={1.2}
            rayLength={4}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            fadeDistance={2}
            saturation={1.2}
          />
        </div>
      </div>

      {/* ── Speech bubble ── */}
      <div className="speech-bubble">{bubble}</div>
    </div>
  )
}

export default HeroImage

import { IconMail, IconGithub, IconLinkedIn } from './icons/Icons'
import './SidebarLeft.css'

const SOCIAL_LINKS = [
  { icon: IconMail,     href: 'https://gmail.com/elagokumar8031@gmail.com', id: 'social-mail',      label: 'Gmail'    },
  { icon: IconGithub,   href: 'https://github.com/elangokumar8031',            id: 'social-github',    label: 'GitHub'   },
  { icon: IconLinkedIn, href: 'https://linkedin.com/in/elangokumark',          id: 'social-linkedin',  label: 'LinkedIn' },
]

/**
 * SidebarLeft — Vertical lines + dock-style social icons
 * Props:
 *   socials {array} — override the default links
 */
function SidebarLeft({ socials }) {
  const links = socials ?? SOCIAL_LINKS

  return (
    <aside className="sidebar-left">
      <div className="sidebar-line sidebar-line--top" />

      {/* Dock container */}
      <div className="dock">
        {links.map(({ icon: Icon, href, id, label }) => (
          <div
            key={id}
            className="dock-item-wrapper"
          >
            <a
              href={href}
              id={id}
              className="dock-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          </div>
        ))}
      </div>

      <div className="sidebar-line sidebar-line--bottom" />
    </aside>
  )
}

export default SidebarLeft

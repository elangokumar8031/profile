import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function AnimatedThemeToggler({ className = "", style = {} }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // If this is a new session (opened fresh), reset localStorage to light mode
    if (!sessionStorage.getItem('portfolio_session_initialized')) {
      sessionStorage.setItem('portfolio_session_initialized', 'true');
      localStorage.setItem('theme', 'light');
    }

    const isDark = localStorage.theme === 'dark';
    
    if (isDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (e) => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    
    setTheme(nextTheme);
    localStorage.theme = nextTheme;

    // Fallback if View Transitions API is not supported
    if (!document.startViewTransition) {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return;
    }

    // Get click position for the transition origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    document.documentElement.style.setProperty('--zoom-x', `${x}px`);
    document.documentElement.style.setProperty('--zoom-y', `${y}px`);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Animated view transition
    const transition = document.startViewTransition(() => {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(240,240,236,0.8)] dark:bg-white backdrop-blur-md border border-[var(--border)] dark:border-[#fff] text-black dark:text-black shadow-sm hover:bg-[var(--border)] dark:hover:bg-white transition-colors duration-200 z-[9999] ${className}`}
      style={style}
      aria-label="Toggle theme"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? -90 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun size={20} strokeWidth={1.5} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 90
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon size={20} strokeWidth={1.5} />
        </motion.div>
      </div>
    </button>
  );
}

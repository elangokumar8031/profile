import React, { useState, useEffect } from 'react'

const ViteLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[28px] h-[28px]" viewBox="0 0 410 404" fill="none">
    <path d="M399.641 49.8055L216.593 392.179C212.872 399.138 202.915 399.138 199.195 392.179L16.1466 49.8055C11.9688 41.993 19.3878 33.1593 27.5028 36.2166L207.894 104.225L388.285 36.2166C396.4 33.1593 403.819 41.993 399.641 49.8055Z" fill="url(#paint0_linear)"/>
    <path d="M285.344 19.4623L207.894 104.225L130.444 19.4623C125.751 14.321 117.472 15.3413 114.153 21.4646L63.3182 115.228L204.184 378.694C205.801 381.717 209.987 381.717 211.604 378.694L352.469 115.228L301.635 21.4646C298.316 15.3413 290.036 14.321 285.344 19.4623Z" fill="url(#paint1_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41D1FF"/>
        <stop offset="1" stopColor="#BD34FE"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="194.001" y1="14" x2="216" y2="390" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFEA83"/>
        <stop offset="0.0833333" stopColor="#FFDD35"/>
        <stop offset="1" stopColor="#FFA800"/>
      </linearGradient>
    </defs>
  </svg>
)

const categories = [
  {
    title: 'Front-End',
    direction: 'up',
    skills: [
      { icon: 'bxl-html5 text-orange-500', name: 'HTML' },
      { icon: 'bxl-css3 text-blue-500', name: 'CSS' },
      { icon: 'bxl-tailwind-css text-sky-400', name: 'Tailwind CSS' },
      { icon: 'bxl-javascript text-yellow-400', name: 'JavaScript' },
      { icon: 'bxl-react text-cyan-400', name: 'React JS' },
      { icon: 'bx-layer text-purple-500', name: 'Chakra UI' }
    ]
  },
  {
    title: 'Programming',
    direction: 'down',
    skills: [
      { icon: 'bxl-java text-red-500', name: 'Java' },
      { icon: 'bx-code-curly text-blue-600', name: 'C' },
      { icon: 'bxl-python text-yellow-500', name: 'Python' }
    ]
  },
 
  {
    title: 'Tools & Others',
    direction: 'up',
    skills: [
      { icon: 'bxl-git text-orange-600', name: 'Git' },
      { icon: 'bxl-github text-black dark:text-white', name: 'GitHub' },
      { icon: 'bxl-redux text-purple-600', name: 'Redux' },
      { customIcon: <ViteLogo />, name: 'Vite' },
      { icon: 'bx-globe text-blue-500', name: 'APIs' }
    ]
  }
]

export default function SkillsSection() {
  useEffect(() => {
    let targetRate = 1;
    let currentRate = 1;
    let lastScrollY = window.scrollY;
    let animationFrameId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      
      // Spike the target rate based on scroll speed (highly responsive)
      targetRate = 1 + (delta * 0.8);
      if (targetRate > 30) targetRate = 30; // Cap maximum speed higher for dramatic effect
    };

    const loop = () => {
      // Smoothly interpolate current rate towards target rate (faster reaction)
      currentRate += (targetRate - currentRate) * 0.15;
      
      // Decay target rate back to normal (1) slowly
      targetRate += (1 - targetRate) * 0.02;

      // Apply to all marquee elements
      document.querySelectorAll('.js-marquee').forEach(el => {
         el.getAnimations().forEach(anim => {
            anim.playbackRate = Math.max(1, currentRate);
         });
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    loop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="w-full flex flex-col items-center justify-center pt-16 pb-4 px-6 md:px-16 lg:px-24 bg-transparent relative z-10">
      
      {/* Header */}
      <div className="flex items-center justify-center mb-12 md:mb-16 w-full max-w-4xl mx-auto">
        <div className="flex-1 h-[1px] bg-black/10"></div>
        <h2 className="mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          My <span>Skills</span>
        </h2>
        <div className="flex-1 h-[1px] bg-black/10"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-6xl w-full text-center mx-auto">
        {categories.map((category) => (
          <div key={category.title}>
            <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
              {category.title}
            </h3>
            
            <div className="mask-gradient-x sm:mask-gradient overflow-hidden h-20 sm:h-64 relative bg-transparent backdrop-blur-md rounded-2xl shadow-md px-4 py-2 sm:p-4 group">
              <div className={`js-marquee flex flex-row sm:flex-col items-center flex-nowrap gap-6 h-full sm:h-max ${category.skills.length > 1 ? (category.direction === 'up' ? 'w-max sm:w-full justify-start sm:justify-center animate-marquee-left sm:animate-marquee-up' : 'w-max sm:w-full justify-start sm:justify-center animate-marquee-right sm:animate-marquee-down') : 'w-full justify-center'} group-hover:[animation-play-state:paused]`}>
                {/* 3 identical copies to allow infinite scrolling cleanly, or 1 if not scrolling */}
                {(category.skills.length > 1 ? [0, 1, 2] : [0]).map((chunkIndex) => (
                  <React.Fragment key={chunkIndex}>
                    {category.skills.map((skill, index) => (
                      <div key={`${chunkIndex}-${index}`} className="flex items-center justify-center gap-2 shrink-0 text-black dark:text-white font-semibold text-[17px]" style={{ fontFamily: '"Inter", sans-serif' }}>
                        {skill.customIcon ? skill.customIcon : <i className={`bx ${skill.icon} text-[28px]`}></i>}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

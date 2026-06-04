import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Smartphone, TrendingUp, Lightbulb, ArrowUpRight } from 'lucide-react'

const services = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Code2,
    description: 'Responsive modern websites\nFull-stack web applications\nFast and scalable architecture',
    tags: ['#React', '#Frontend', '#Backend'],
    tools: ['Visual Studio', 'Bootstrap', 'Node.js']
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Cross-platform mobile apps\nSmooth user experience\nOptimized mobile performance',
    tags: ['#Flutter', '#Android', '#iOS'],
    tools: ['Android Studio', 'Flutter', 'Xcode']
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    icon: TrendingUp,
    description: 'Brand growth strategies\nSocial media optimization\nSEO and audience engagement',
    tags: ['#SEO', '#Marketing', '#Branding'],
    tools: ['Google Analytics', 'SEO Suite', 'Meta Ads']
  },
  {
    id: 'ideas',
    title: 'Ideas to Solution',
    icon: Lightbulb,
    description: 'Transforming concepts into products\nPlanning scalable solutions\nCreative problem solving',
    tags: ['#Innovation', '#Strategy', '#Solutions'],
    tools: ['Figma Design', 'Miro Board', 'Jira Platform']
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeOut" }
  }
}

function ServicesSection({ onSelectService }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 4000)
  }

  return (
    <section className="bg-[#f5f5f5] dark:bg-[#111] w-full pt-20 pb-12 px-[50px] md:px-16 lg:px-24 relative z-10" id="services">
      <div className="max-w-4xl lg:max-w-6xl mx-auto">
        
        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Header Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            {/* Centered header for mobile/tablet */}
            <div className="flex lg:hidden items-center justify-center mb-12 md:mb-16">
              <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/20"></div>
              <h2 className="mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Services
              </h2>
              <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/20"></div>
            </div>

            {/* Left-aligned header for laptop/desktop */}
            <div className="hidden lg:flex flex-col items-start">
              <h2 className="text-5xl font-light tracking-wide text-black dark:text-white mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                Services
              </h2>
              <div className="w-16 h-[2px] bg-black/20 dark:bg-white/20 mb-8"></div>
              <p className="text-[#666666] dark:text-[#aaa] text-[15px] leading-relaxed max-w-[240px]" style={{ fontFamily: '"Inter", sans-serif' }}>
                Specialized in building high-quality, modern digital solutions tailored to your unique requirements.
              </p>
            </div>
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-2">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-x-12 lg:gap-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {services.map((service, index) => {
                const formattedNumber = `/${String(index + 1).padStart(2, '0')}`
                
                return (
                  <motion.div 
                    key={service.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onSelectService?.(service.title)}
                    className="group relative flex flex-col cursor-pointer select-none transition-colors duration-500 w-full
                               bg-transparent border-none shadow-none backdrop-blur-none rounded-none p-0"
                  >
                    {/* Slash-Number */}
                    <div className="text-xl font-light text-neutral-400 dark:text-neutral-500 mb-4 font-sans group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                      {formattedNumber}
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-light text-black dark:text-white tracking-tight group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300" style={{ fontFamily: '"Inter", sans-serif' }}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Tools Used Label */}
                    <div className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500"></span>
                      Tools Used
                    </div>

                    {/* Tools List */}
                    <div className="flex flex-col mt-1">
                      {service.tools.map((tool, idx) => (
                        <div 
                          key={idx} 
                          className="py-1.5 text-base font-light text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>

        {/* Centered Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="text-center mt-20 md:mt-24 flex flex-col items-center justify-center select-none group/cta cursor-default"
        >
          <h4 
            className="text-4xl md:text-5xl lg:text-6xl font-light italic tracking-wide text-black dark:text-white mb-2 transition-transform duration-500 group-hover/cta:scale-[1.03]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Reach Me Today
          </h4>
          <p 
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 group-hover/cta:text-red-500 transition-colors duration-300 mb-6"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Your friend for work
          </p>

          {/* Email Subscription Form */}
          <form onSubmit={handleSubscribe} className="w-full max-w-sm mx-auto px-4 relative z-20">
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-emerald-500 dark:text-emerald-400 font-medium text-sm py-2 text-center"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                ✓ Subscribed successfully!
              </motion.div>
            ) : (
              <div className="flex items-center bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-full p-1.5 pl-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none focus-within:border-black/35 dark:focus-within:border-white/35 transition-all duration-300 w-full">
                <input 
                  type="email" 
                  required
                  placeholder="Drop your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm flex-grow min-w-0 pr-2 py-2 pointer-events-auto cursor-text"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                />
                <button 
                  type="submit" 
                  className="bg-black dark:bg-white text-white dark:text-black rounded-full py-2.5 px-6 text-sm font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all pointer-events-auto cursor-pointer"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black"></span>
                  Submit
                </button>
              </div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  )
}

export default ServicesSection

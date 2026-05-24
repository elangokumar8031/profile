import { motion } from 'framer-motion'
import { Code2, Smartphone, TrendingUp, Lightbulb, ArrowUpRight } from 'lucide-react'

const services = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Code2,
    description: 'Responsive modern websites\nFull-stack web applications\nFast and scalable architecture',
    tags: ['#React', '#Frontend', '#Backend']
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Cross-platform mobile apps\nSmooth user experience\nOptimized mobile performance',
    tags: ['#Flutter', '#Android', '#iOS']
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    icon: TrendingUp,
    description: 'Brand growth strategies\nSocial media optimization\nSEO and audience engagement',
    tags: ['#SEO', '#Marketing', '#Branding']
  },
  {
    id: 'ideas',
    title: 'Ideas to Solution',
    icon: Lightbulb,
    description: 'Transforming concepts into products\nPlanning scalable solutions\nCreative problem solving',
    tags: ['#Innovation', '#Strategy', '#Solutions']
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
    transition: { duration: 0.4, ease: "easeOut" }
  },
  tap: {
    scale: 0.95,
    rotate: 1.7,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

function ServicesSection({ onSelectService }) {
  return (
    <section className="bg-[#f5f5f5] dark:bg-[#111] w-full pt-16 pb-8 px-[50px] md:px-16 lg:px-24 relative z-10" id="services">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-12 md:mb-16">
          <div className="flex-1 h-[1px] bg-black/10"></div>
          <h2 className="mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
            Services
          </h2>
          <div className="flex-1 h-[1px] bg-black/10"></div>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative flex flex-col bg-[rgba(217,217,217,0.58)] dark:bg-[#222] border border-white dark:border-[#333] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] p-5 md:p-6 cursor-default overflow-hidden transition-colors duration-500 hover:border-black dark:hover:border-white select-none"
              >
                {/* Top Arrow - Trigger interaction only here */}
                <motion.div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService?.(service.title);
                  }}
                  className="absolute top-6 right-6 text-black/30 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-all duration-300 cursor-pointer p-2 hover:scale-110"
                >
                  <ArrowUpRight strokeWidth={1.5} size={28} />
                </motion.div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300">
                  <Icon strokeWidth={1.5} size={24} className="text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium text-black dark:text-white mb-4 tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {service.title}
                </h3>

                {/* Description */}
                <div className="text-[#666666] dark:text-[#aaa] leading-relaxed mb-6 text-[15px] space-y-1" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {service.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[11px] font-semibold tracking-wider uppercase text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Centered Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="text-center mt-16 md:mt-20 flex flex-col items-center justify-center select-none group/cta cursor-default"
        >
          <h4 
            className="text-4xl md:text-5xl lg:text-6xl font-light italic tracking-wide text-black dark:text-white mb-2 transition-transform duration-500 group-hover/cta:scale-[1.03]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Reach Me Today
          </h4>
          <p 
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40 dark:text-white/40 group-hover/cta:text-red-500 transition-colors duration-300"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Your friend for work
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default ServicesSection

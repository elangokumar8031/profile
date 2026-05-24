import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Send, Check, Mail, User, MessageSquare } from 'lucide-react'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function ContactSection({ initialRequest, onClearRequest }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Handle auto-populating from ServicesSection clicks
  useEffect(() => {
    if (initialRequest) {
      setFormData(prev => ({
        ...prev,
        message: `Hey, I'd like to talk to you about your ${initialRequest} services.`
      }))
      onClearRequest()
    }
  }, [initialRequest, onClearRequest])

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSending(true)
    setError('')

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      title: 'Portfolio Contact Message'
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('EmailJS Success!', response.status, response.text)
        setSuccess(true)
        setFormData({ name: '', email: '', message: '' })
      })
      .catch((err) => {
        console.error('EmailJS failed to send:', err)
        setError(`Failed to send message: ${err.text || err.message || JSON.stringify(err)}`)
      })
      .finally(() => {
        setSending(false)
      })
  }

  return (
    <section id="contact" className="w-full min-h-auto md:min-h-screen pt-20 pb-10 md:pb-24 px-6 md:px-16 lg:px-24 bg-transparent relative z-10 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="flex items-center justify-center mb-12 md:mb-16 w-full max-w-4xl mx-auto">
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10"></div>
        <h2 className="mx-4 sm:mx-8 text-4xl md:text-5xl font-light tracking-wide text-black dark:text-white text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
          Contact <span>Me</span>
        </h2>
        <div className="flex-1 h-[1px] bg-black/10 dark:bg-white/10"></div>
      </div>

      {/* Contact Form Card */}
      <div className="w-full max-w-lg bg-white/80 dark:bg-[#1c1c1e]/85 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]" style={{ fontFamily: '"Inter", sans-serif' }}>
        
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center leading-relaxed">
            Have a project in mind or want to work together? Drop me a line below!
          </p>

          {/* Name Input */}
          <div className="flex items-center bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-black/30 dark:focus-within:border-white/30 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/5 transition-all duration-300">
            <User className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-transparent text-black dark:text-white text-sm border-none outline-none placeholder-gray-400 dark:placeholder-gray-500"
              required
              disabled={sending}
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-black/30 dark:focus-within:border-white/30 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/5 transition-all duration-300">
            <Mail className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-transparent text-black dark:text-white text-sm border-none outline-none placeholder-gray-400 dark:placeholder-gray-500"
              required
              disabled={sending}
            />
          </div>

          {/* Message Textarea */}
          <div className="flex items-start bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-black/30 dark:focus-within:border-white/30 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/5 transition-all duration-300">
            <MessageSquare className="w-5 h-5 text-gray-400 mr-4 mt-1 shrink-0" />
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full bg-transparent text-black dark:text-white text-sm border-none outline-none resize-none placeholder-gray-400 dark:placeholder-gray-500"
              required
              disabled={sending}
            ></textarea>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs rounded-lg text-center border border-red-100 dark:border-red-900/20">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={sending}
            className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-medium py-3 rounded-lg hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs rounded-lg text-center border border-green-100 dark:border-green-900/20 animate-fade-in">
              Message sent successfully!
            </div>
          )}
        </form>

      </div>
    </section>
  )
}

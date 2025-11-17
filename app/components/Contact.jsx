"use client";

import { useState } from "react";
import { Mail, Linkedin, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (status.type) {
      setStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error details:');
        console.error('Message:', error.message);
        console.error('Details:', error.details);
        console.error('Hint:', error.hint);
        console.error('Code:', error.code);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        let errorMsg = error.message || 'Failed to submit message.';
        if (error.code === '42P01') {
          errorMsg = 'Database table not found. Please run the SQL setup script in Supabase.';
        } else if (error.code === '42501') {
          errorMsg = 'Permission denied. Please check Row Level Security policies in Supabase.';
        }
        throw new Error(errorMsg);
      }

      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.message) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Network error: Unable to connect to server. Please check your internet connection and try again. If the problem persists, the Supabase configuration may be incorrect.';
        } else if (error.message.includes('Supabase is not configured')) {
          errorMessage = 'Configuration error: Supabase environment variables are missing. Please contact the site administrator.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ritumurug@gmail.com',
      href: 'mailto:ritumurug@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '773-930-2475',
      href: 'tel:773-930-2475'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/rithishmurugan',
      href: 'https://linkedin.com/in/rithishmurugan'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'USA',
      href: null
    }
  ];

  return (
    <section id="contact" className="px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 max-w-6xl mx-auto bg-white scroll-mt-20">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-3 py-1 mb-3 sm:mb-4">
          <span className="text-blue-700 font-medium text-xs sm:text-sm">Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 px-4">
          <span className="text-slate-900">Let's</span>{" "}
          <span className="text-blue-600">Connect</span>
        </h2>
        <div className="h-1 w-20 sm:w-24 mx-auto mb-2 sm:mb-3 bg-blue-600 rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          I'm always interested in discussing new opportunities, AI projects, or potential collaborations. Feel free to reach out!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact Information */}
          <div className="bg-slate-100 rounded-lg p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Contact Information</h3>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-500">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-blue-600">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-900 font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
                return <div key={i}>{content}</div>;
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-slate-100 rounded-lg p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Availability</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-slate-900 font-medium">Monday - Friday</p>
                <p className="text-slate-600 text-sm">9:00 AM - 6:00 PM CST</p>
              </div>
              <div>
                <p className="text-slate-900 font-medium">Weekend</p>
                <p className="text-slate-600 text-sm">Available for urgent matters</p>
              </div>
              <div className="pt-2 border-t border-slate-300">
                <p className="text-slate-600 text-sm">Usually responds within 24hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Send me a message form */}
        <div>
          <div className="bg-slate-100 rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Send me a message</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-4 sm:mb-6">
              Have a project in mind? Let's discuss how we can work together.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Status Message */}
              {status.type && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  status.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${
                    status.type === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {status.message}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project, requirements, or any questions you have..."
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



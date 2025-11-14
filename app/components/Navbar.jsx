"use client";
import { useState, useEffect } from "react";
import { User, Briefcase, FolderOpen, Brain, GraduationCap, Mail } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { name: "About", icon: User, href: "#about" },
    { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Projects", icon: FolderOpen, href: "#projects" },
    { name: "Skills", icon: Brain, href: "#skills" },
    { name: "Education", icon: GraduationCap, href: "#education" },
    { name: "Contact", icon: Mail, href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the hero section (approximately viewport height)
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav className={`fixed w-full py-3 px-4 sm:py-4 sm:px-8 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Logo - Square with rounded corners, gradient when scrolled, solid blue when on hero */}
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
            scrolled ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-blue-500'
          }`}>
            <span className="text-white text-lg sm:text-xl font-bold">&lt;/&gt;</span>
          </div>
          <h1 className={`text-base sm:text-xl font-semibold transition-colors duration-300 ${
            scrolled ? 'text-slate-800' : 'text-white'
          }`}>Rithish Murugan</h1>
        </div>
        <ul className={`hidden md:flex space-x-4 lg:space-x-6 text-sm font-medium transition-colors duration-300 ${
          scrolled ? 'text-slate-700' : 'text-white'
        }`}>
          {links.map(link => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`flex items-center gap-2 transition-colors ${
                    scrolled ? 'hover:text-blue-600' : 'hover:text-blue-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <button 
          className={`md:hidden transition-colors duration-300 text-2xl ${
            scrolled ? 'text-slate-700' : 'text-white'
          }`} 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>
          <div className={`absolute top-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
            scrolled ? '' : 'bg-white'
          }`}>
            <ul className="py-4 px-4 space-y-2">
              {links.map(link => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <Icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

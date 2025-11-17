"use client";

import { Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#0a1628] via-[#0d1b3d] to-[#1a2f5c] text-white py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 items-start">
          {/* Left Column - Personal Introduction */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">&lt;/&gt;</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Rithish Murugan</h3>
                <p className="text-slate-400 text-sm">AI Engineer</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Software Engineer specializing in Agentic AI, RAG pipelines, and backend automation—building scalable, intelligent systems that drive real impact.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/RithishMurugan" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/rithishmurugan" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:ritumurug@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold mb-4 text-white text-center">Quick Links</h4>
            <ul className="space-y-2 text-center">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Get in Touch */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold mb-4 text-white text-center">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-center">
              <li>
                <span className="text-slate-300">Email</span>
                <br />
                <a href="mailto:ritumurug@gmail.com" className="text-white hover:text-blue-300 transition-colors">
                  ritumurug@gmail.com
                </a>
              </li>
              <li>
                <span className="text-slate-300">Phone</span>
                <br />
                <a href="tel:773-930-2475" className="text-white hover:text-blue-300 transition-colors">
                  773-930-2475
                </a>
              </li>
              <li>
                <span className="text-slate-300">Location</span>
                <br />
                <span className="text-white">USA</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          © 2025 Rithish Murugan — Designed with ❤️ for innovation and AI.
        </div>
      </div>
    </footer>
  );
}




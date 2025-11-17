"use client";
import { useState, useEffect } from "react";
import { Mail, Linkedin, MapPin, Phone, Star, Github } from "lucide-react";

export default function Hero() {
  const nameText = "Rithish Murugan";
  const [displayedName, setDisplayedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  
  const titleText = "Software Engineer";
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  // Name typewriter effect
  useEffect(() => {
    if (nameIndex < nameText.length) {
      const timer = setTimeout(() => {
        setDisplayedName(nameText.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, nameText]);

  // Title typewriter effect - starts after name completes
  useEffect(() => {
    if (nameIndex >= nameText.length && titleIndex < titleText.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, titleIndex, titleText, nameText.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-r from-[#0a1628] via-[#0d1b3d] to-[#1a2f5c] text-white"
    >
      {/* Glowing circles - responsive sizes */}
      <div className="pointer-events-none absolute top-10 left-10 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-800/25 rounded-full blur-[80px] sm:blur-[120px]"></div>
      <div className="pointer-events-none absolute top-[200px] right-10 sm:right-[150px] w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-700/30 rounded-full blur-[90px] sm:blur-[130px]"></div>
      <div className="pointer-events-none absolute bottom-[100px] left-10 sm:left-[200px] w-36 h-36 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-cyan-700/20 rounded-full blur-[100px] sm:blur-[140px]"></div>
      <div className="pointer-events-none absolute bottom-[50px] right-10 sm:right-[250px] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-indigo-700/25 rounded-full blur-[110px] sm:blur-[150px]"></div>
      <div className="pointer-events-none absolute bottom-[0px] left-[50%] -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-900/20 rounded-full blur-[120px] sm:blur-[160px]"></div>

      {/* Minimal circular patterns - hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block pointer-events-none absolute top-[15%] left-[12%] w-8 h-8 md:w-12 md:h-12 bg-blue-400/15 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[25%] left-[35%] w-6 h-6 md:w-10 md:h-10 bg-cyan-400/12 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute top-[18%] left-[58%] w-10 h-10 md:w-14 md:h-14 bg-blue-300/18 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[22%] right-[25%] w-7 h-7 md:w-11 md:h-11 bg-indigo-400/14 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[30%] right-[12%] w-9 h-9 md:w-13 md:h-13 bg-blue-500/16 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[8%] right-[8%] w-8 h-8 md:w-12 md:h-12 bg-cyan-400/15 rounded-full"></div>
      
      <div className="hidden sm:block pointer-events-none absolute top-[42%] left-[15%] w-6 h-6 md:w-10 md:h-10 bg-cyan-500/13 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[48%] left-[42%] w-8 h-8 md:w-12 md:h-12 bg-blue-400/15 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute top-[45%] left-[68%] w-7 h-7 md:w-9 md:h-9 bg-indigo-300/12 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[50%] right-[20%] w-7 h-7 md:w-11 md:h-11 bg-blue-300/14 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute top-[55%] right-[8%] w-9 h-9 md:w-13 md:h-13 bg-cyan-400/16 rounded-full"></div>
      
      <div className="hidden sm:block pointer-events-none absolute bottom-[35%] left-[10%] w-8 h-8 md:w-12 md:h-12 bg-blue-500/15 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute bottom-[30%] left-[38%] w-6 h-6 md:w-10 md:h-10 bg-indigo-400/13 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute bottom-[38%] left-[62%] w-10 h-10 md:w-14 md:h-14 bg-cyan-500/17 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute bottom-[32%] right-[18%] w-7 h-7 md:w-11 md:h-11 bg-blue-400/14 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute bottom-[40%] right-[32%] w-7 h-7 md:w-9 md:h-9 bg-indigo-300/12 rounded-full"></div>
      
      <div className="hidden sm:block pointer-events-none absolute bottom-[20%] left-[22%] w-9 h-9 md:w-13 md:h-13 bg-blue-400/16 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute bottom-[15%] left-[48%] w-7 h-7 md:w-11 md:h-11 bg-cyan-400/14 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute bottom-[25%] left-[72%] w-6 h-6 md:w-10 md:h-10 bg-indigo-500/13 rounded-full"></div>
      <div className="hidden sm:block pointer-events-none absolute bottom-[18%] right-[15%] w-8 h-8 md:w-12 md:h-12 bg-blue-300/15 rounded-full"></div>
      <div className="hidden md:block pointer-events-none absolute bottom-[12%] right-[38%] w-7 h-7 md:w-9 md:h-9 bg-cyan-300/12 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-20">
        {/* Welcome tag with star icon */}
        <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm text-white border border-slate-700/50">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          <span>Welcome to my portfolio</span>
        </div>

        {/* Hi, I'm text */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-4">
          Hi, I'm
        </h2>

        {/* Name with blue-to-cyan gradient - animated letter by letter */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 px-4">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {displayedName}
            {nameIndex < nameText.length && <span className="animate-pulse">|</span>}
          </span>
        </h1>

        {/* Title with typewriter effect */}
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 px-4">
          <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {displayedTitle}
            {titleIndex < titleText.length && <span className="animate-pulse">|</span>}
          </span>
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-200 leading-relaxed mb-4 sm:mb-6 px-4">
          Building scalable, production-ready AI systems with a focus on Agentic AI, RAG pipelines, and seamless ML integrations — delivering automation that actually moves the business forward.
        </p>

        {/* Contact Information */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 text-blue-200 text-xs sm:text-sm px-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-blue-300" />
            <span>USA</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Phone size={16} className="sm:w-[18px] sm:h-[18px] text-blue-300" />
            <span className="hidden sm:inline">773-930-2475</span>
            <span className="sm:hidden">773-930-2475</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-blue-300" />
            <a href="mailto:ritumurug@gmail.com" className="hover:text-blue-300 transition-colors break-all">
              <span className="hidden sm:inline">ritumurug@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 w-full sm:w-auto">
          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base shadow-lg shadow-blue-900/30 transition-all duration-300 text-center"
          >
            Explore My Work
          </a>
          <a
            href="/RITHISH_MURUGAN_SoftwareEngineer_Resume.pdf"
            download
            className="border border-blue-400 hover:bg-blue-500/10 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base text-blue-200 transition-all duration-300 text-center"
          >
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <a
            href="https://linkedin.com/in/rithishmurugan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/RithishMurugan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:ritumurug@gmail.com"
            className="text-blue-300 hover:text-blue-200 transition-colors"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import {
  Briefcase,
  FolderOpen,
  Brain,
  GraduationCap,
  Mail,
  User,
  FileText,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { name: "About", icon: User, href: "#about" },
    { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Skills", icon: Brain, href: "#skills" },
    { name: "Projects", icon: FolderOpen, href: "#projects" },
    { name: "Education", icon: GraduationCap, href: "#education" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.72);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = scrolled
    ? "text-slate-700 hover:text-blue-600"
    : "text-white hover:text-blue-200";

  return (
    <>
      <nav
        className={`fixed w-full py-3 px-4 sm:py-3.5 sm:px-6 flex justify-between items-center z-50 transition-all duration-300 left-0 right-0 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md shadow-sm border-b border-slate-200/90"
            : "bg-transparent"
        }`}
        style={{
          paddingLeft: "max(1rem, calc(1rem + env(safe-area-inset-left)))",
          paddingRight: "max(1rem, calc(1rem + env(safe-area-inset-right)))",
        }}
      >
        <a href="#home" className="flex items-center gap-2 sm:gap-3 min-h-[44px] touch-manipulation">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              scrolled ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-blue-500"
            }`}
          >
            <span className="text-white text-lg sm:text-xl font-bold">&lt;/&gt;</span>
          </div>
          <div className="text-left">
            <p
              className={`text-base sm:text-lg font-bold leading-tight transition-colors ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Rithish Murugan
            </p>
            <p
              className={`hidden sm:block text-[11px] font-medium uppercase tracking-wide transition-colors ${
                scrolled ? "text-slate-500" : "text-blue-200/90"
              }`}
            >
              Software Engineer
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1 xl:gap-2">
          <ul className={`flex items-center gap-1 xl:gap-2 text-sm font-medium transition-colors`}>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 transition-colors ${navLinkClass}`}
                  >
                    <Icon size={17} aria-hidden />
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="/Rithish%20Murugan%20Resume.pdf"
            download
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition hover:bg-blue-700 active:bg-blue-800"
          >
            <FileText size={17} aria-hidden />
            Resume
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <a
            href="/Rithish%20Murugan%20Resume.pdf"
            download
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              scrolled
                ? "bg-blue-600 text-white"
                : "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
            }`}
          >
            <FileText size={16} aria-hidden />
            <span>Resume</span>
          </a>
          <button
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors text-2xl leading-none active:scale-95 ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            type="button"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ paddingTop: "max(4rem, calc(4rem + env(safe-area-inset-top)))" }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-0 right-0 border-b border-slate-200 bg-white shadow-xl"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <ul className="max-h-[min(70vh,520px)] overflow-y-auto py-2 px-3">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 min-h-[48px] text-slate-800 hover:bg-blue-50 active:bg-blue-100 rounded-xl transition-colors touch-manipulation"
                    >
                      <Icon size={20} aria-hidden />
                      <span className="font-medium">{link.name}</span>
                    </a>
                  </li>
                );
              })}
              <li className="px-3 pt-2 pb-3">
                <a
                  href="/Rithish%20Murugan%20Resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  <FileText size={18} aria-hidden />
                  Download resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

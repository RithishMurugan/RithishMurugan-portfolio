"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Github,
} from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, viewportOnce } from "../lib/motion";

const RESUME_PATH = "/Rithish_Murugan_Resume.pdf";
const EMAIL = "rithishmurugan52@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch(
        typeof window !== "undefined"
          ? new URL("/api/contact", window.location.origin).toString()
          : "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(formData),
        }
      );

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(payload.error || "Failed to submit message.");

      setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again later.";
      if (error.message?.includes("Failed to fetch")) {
        errorMessage = "Could not reach the server. Try again or email me directly.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: "Phone", value: "+1 (773) 930-2475", href: "tel:+17739302475" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rithishmurugan",
      href: "https://linkedin.com/in/rithishmurugan",
    },
    { icon: MapPin, label: "Location", value: "USA", href: null },
  ];

  return (
    <section id="contact" className="px-4 sm:px-6 py-16 sm:py-20 md:py-28 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeader
        badge="Hiring & collaborations"
        title="Let's"
        titleAccent="talk"
        subtitle="Open to backend, platform, healthcare, and AI/LLM engineering roles. I typically respond within a day."
      />

      <motion.div
        className="mb-8 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <a
          href={RESUME_PATH}
          download
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
        >
          <FileText className="h-4 w-4" />
          Download resume
        </a>
        <a
          href="https://linkedin.com/in/rithishmurugan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/RithishMurugan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        <motion.div
          className="space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-500" />
                    <motion.div>
                      <p className="text-sm text-slate-500">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-medium text-slate-900 hover:text-blue-600 transition"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium text-slate-900">{info.value}</p>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <motion.div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Availability</h3>
            </motion.div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">Monday – Friday</p>
                <p className="text-slate-600">9:00 AM – 6:00 PM CST</p>
              </div>
              <p className="text-slate-600 border-t border-slate-100 pt-3">Usually responds within 24 hours</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          custom={0.1}
        >
          <div className="card p-6 sm:p-7">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Send me a message</h3>
            <p className="text-slate-600 text-sm mb-5">Have a role or project in mind? Let&apos;s connect.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-3 rounded-xl p-4 ${
                      status.type === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <p
                      className={`text-sm ${
                        status.type === "success" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {status.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {["name", "email", "subject"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-slate-700 mb-1.5 capitalize">
                    {field === "email" ? "Email Address" : field === "name" ? "Your Name" : "Subject"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              ))}

              <motion.div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Tell me about the role, project, or how we can work together..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

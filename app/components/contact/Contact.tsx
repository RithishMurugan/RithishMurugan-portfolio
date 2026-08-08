"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, AlertCircle, FileText, Github } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SITE } from "@/lib/data/site";
import { submitContactForm } from "@/lib/contact-form";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      await submitContactForm(formData);
      setStatus({ type: "success", message: "Thank you! Your message was saved successfully." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\D/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/rithishmurugan", href: SITE.linkedin },
    { icon: MapPin, label: "Location", value: SITE.location, href: null },
  ];

  return (
    <section id="contact" className="relative overflow-x-hidden safe-bottom">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cta/5 to-cta/10" />
      <div className="section-shell relative">
        <SectionHeader
          badge="Connect"
          title="Let's build"
          titleAccent="something remarkable"
          subtitle="Open to AI Full Stack, healthcare AI, and platform engineering roles. I typically respond within a day."
        />

      <motion.div className="mb-8 flex flex-wrap justify-center gap-3" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
        <a href={SITE.resumePath} download className="btn-primary inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 text-sm">
          <FileText className="h-4 w-4" />
          Download resume
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 text-sm">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 text-sm">
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </motion.div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <motion.div className="space-y-5" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-cta" />
              <h3 className="text-lg font-bold text-foreground">Contact Information</h3>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-all font-medium text-foreground transition hover:text-cta">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-cta" />
              <h3 className="text-lg font-bold text-foreground">Availability</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Monday – Friday</p>
                <p className="text-muted-foreground">9:00 AM – 6:00 PM CST</p>
              </div>
              <p className="border-t border-border pt-3 text-muted-foreground">Usually responds within 24 hours</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} custom={0.1}>
          <div className="card p-6 sm:p-7">
            <h3 className="mb-1 text-xl font-bold text-foreground">Send me a message</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Have a role or project in mind? Send a message — it&apos;s saved directly to my spreadsheet.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-3 rounded-xl p-4 ${status.type === "success" ? "border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30" : "border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"}`}
                    role="alert"
                  >
                    {status.type === "success" ? <CheckCircle className="h-5 w-5 shrink-0 text-green-600" /> : <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />}
                    <p className={`text-sm ${status.type === "success" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>{status.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {(["name", "email", "subject"] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="mb-1.5 block text-sm font-medium text-foreground capitalize">
                    {field === "email" ? "Email Address" : field === "name" ? "Your Name" : "Subject"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cta"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Tell me about the role, project, or how we can work together..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cta"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cta to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cta/25 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
      </div>
    </section>
  );
}

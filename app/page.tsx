import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import SkipLink from "@/components/layout/SkipLink";
import SectionBackground from "@/components/layout/SectionBackground";
import Hero from "@/components/hero/Hero";
import WhatIBuild from "@/components/philosophy/WhatIBuild";
import FlagshipCaseStudy from "@/components/projects/FlagshipCaseStudy";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import ScrollReveal from "@/components/effects/ScrollReveal";
import CareerNetwork from "@/components/experience/CareerNetwork";
import SkillConstellation from "@/components/skills/SkillConstellation";
import AboutBrief from "@/components/about/AboutBrief";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <MotionProvider>
      <SmoothScrollProvider>
        <ScrollProgress />
        <SkipLink />
        <Navbar />
        <main id="main-content" className="min-h-screen w-full overflow-x-hidden">
          <Hero />
          <SectionBackground variant="grid">
            <WhatIBuild />
          </SectionBackground>
          <FlagshipCaseStudy />
          <ScrollReveal>
            <ProjectShowcase />
          </ScrollReveal>
          <SectionBackground variant="muted">
            <CareerNetwork />
          </SectionBackground>
          <SkillConstellation />
          <SectionBackground variant="grid">
            <AboutBrief />
          </SectionBackground>
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionProvider>
  );
}

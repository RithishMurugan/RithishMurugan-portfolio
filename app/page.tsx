import MotionProvider from "@/components/providers/MotionProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import SkipLink from "@/components/layout/SkipLink";
import CustomCursor from "@/components/layout/CustomCursor";
import StatsBanner from "@/components/layout/StatsBanner";
import TechMarquee from "@/components/layout/TechMarquee";
import SectionBackground from "@/components/layout/SectionBackground";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import SkillsGrid from "@/components/skills/SkillsGrid";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Education from "@/components/education/Education";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <MotionProvider>
        <ScrollProgress />
        <CustomCursor />
        <SkipLink />
        <Navbar />
        <main id="main-content" className="min-h-screen w-full overflow-x-hidden">
          <Hero />
          <StatsBanner />
          <TechMarquee />
          <SectionBackground variant="grid">
            <About />
          </SectionBackground>
          <SectionBackground variant="muted">
            <ExperienceTimeline />
          </SectionBackground>
          <SkillsGrid />
          <SectionBackground variant="grid">
            <ProjectsSection />
          </SectionBackground>
          <SectionBackground variant="muted">
            <Education />
          </SectionBackground>
          <Contact />
        </main>
        <Footer />
    </MotionProvider>
  );
}

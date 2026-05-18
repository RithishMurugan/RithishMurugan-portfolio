import MotionProvider from "./components/MotionProvider";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import SkipLink from "./components/SkipLink";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CareerProgression from "./components/CareerProgression";

export default function Page() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <SkipLink />
      <Navbar />
      <main id="main-content" className="min-h-screen w-full overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <CareerProgression />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}

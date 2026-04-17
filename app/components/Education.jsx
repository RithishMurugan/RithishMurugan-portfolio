"use client";

import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";

export default function Education() {
  const coursework = [
    "Machine Learning",
    "Deep Learning",
    "Data Structures",
    "Algorithms",
    "AI Ethics",
    "Software Engineering",
  ];

  const academicHighlights = [
    {
      icon: GraduationCap,
      title: "Master of Science in Computer Science",
      desc: "Graduate program at Illinois Institute of Technology, Chicago, IL",
    },
    {
      icon: BookOpen,
      title: "Technical depth",
      desc: "Coursework spanning ML, systems, and software engineering practice",
    },
    {
      icon: Award,
      title: "Strong CS foundation",
      desc: "Built on algorithms, AI/ML, and rigorous engineering fundamentals",
    },
  ];

  return (
    <section id="education" className="section-fade-in px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50 scroll-mt-20 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-3 py-1 mb-3 sm:mb-4">
          <span className="text-blue-700 font-medium text-xs sm:text-sm">Education</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3">
          <span className="text-slate-900">Academic</span>{" "}
          <span className="text-blue-600">Background</span>
        </h2>
        <div className="h-1 w-24 sm:w-32 mx-auto mb-2 sm:mb-3 bg-blue-600 rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 max-w-2xl mx-auto leading-relaxed">
          Master&apos;s in Computer Science (Aug 2023 – May 2025) — complements full-time experience in production systems and AI platforms.
        </p>
      </div>

      {/* First Row: Master's and Academic Highlights */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {/* Left: Master's in Computer Science */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Master of Science in Computer Science</h3>
            <span className="bg-blue-500 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold self-start sm:self-auto">
              Master&apos;s
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-blue-600">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Illinois Institute of Technology</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Aug 2023 – May 2025</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Chicago, IL</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-slate-900 mb-3">Key Coursework</h4>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course, i) => (
                <span key={i} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Graduate studies in computer science with emphasis on artificial intelligence, machine learning, and building reliable software systems.
          </p>
        </div>

        {/* Right: Academic Highlights */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-slate-200">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5 md:mb-6">Academic Highlights</h3>
          <div className="space-y-6">
            {academicHighlights.map((highlight, i) => {
              const Icon = highlight.icon;
              return (
                <div key={i} className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{highlight.title}</h4>
                      <p className="text-slate-600 text-sm">{highlight.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

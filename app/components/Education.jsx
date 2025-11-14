"use client";

import { GraduationCap, Calendar, MapPin, BookOpen, Award, Crown } from "lucide-react";

export default function Education() {
  const coursework = [
    'Machine Learning',
    'Deep Learning',
    'Data Structures',
    'Algorithms',
    'AI Ethics',
    'Software Engineering'
  ];

  const foundationStudies = [
    'Computer Science',
    'Mathematics',
    'Programming',
    'Database Systems',
    'Web Development',
    'Software Design'
  ];

  const academicHighlights = [
    {
      icon: GraduationCap,
      title: "Master's in Computer Science",
      desc: "Advanced coursework in AI/ML, Data Structures, and Software Engineering"
    },
    {
      icon: BookOpen,
      title: "Research Focus",
      desc: "User-Centered Design and AI Usability Research"
    },
    {
      icon: Award,
      title: "Academic Excellence",
      desc: "Strong foundation in computer science fundamentals"
    }
  ];

  const leadershipAchievements = [
    "Led 150 active members with 10-member core leadership team",
    "Organized hackathons, symposiums, guest lectures, and seminars",
    "Introduced coding challenges and design sprints",
    "Increased chapter participation by 30%",
    "Delivered technical seminars and collaborated with industry experts",
    "Created meaningful learning opportunities for peers"
  ];

  const leadershipSkills = [
    { name: "Leadership", color: "bg-blue-500" },
    { name: "Event Management", color: "bg-green-500" },
    { name: "Team Coordination", color: "bg-purple-500" },
    { name: "30% Growth", color: "bg-orange-500" }
  ];

  return (
    <section id="education" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50 scroll-mt-20">
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
        <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4">Strong academic foundation in computer science with specialized focus on AI and machine learning</p>
      </div>

      {/* First Row: Master's and Academic Highlights */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {/* Left: Master's in Computer Science */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Master's in Computer Science</h3>
            <span className="bg-blue-500 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold self-start sm:self-auto">Master's</span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-blue-600">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Illinois Institute of Technology</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>May 2025</span>
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
            Advanced graduate program focusing on artificial intelligence, machine learning, and software systems. Currently working on research in user-centered AI design and usability testing.
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

          {/* Second Row: Bachelor's and Leadership Experience */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {/* Left: Bachelor of Engineering */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Bachelor of Engineering</h3>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Bachelor's</span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-blue-600">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">St. Joseph's College of Engineering</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>May 2023</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Chennai, India</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-slate-900 mb-3">Foundation Studies</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {foundationStudies.map((study, i) => (
                <span key={i} className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                  {study}
                </span>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Comprehensive undergraduate program providing strong foundation in computer science principles, programming languages, and software development methodologies.
            </p>
          </div>
        </div>

            {/* Right: Leadership Experience */}
            <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-slate-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Leadership Experience</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900">OPTICA Student Chapter President</h4>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">President</span>
          </div>
          
          <div className="mb-4">
            <p className="text-blue-600 font-medium mb-3">St. Joseph's College Of Engineering</p>
            <p className="text-slate-600 text-sm mb-4">Aug 2022 - May 2023</p>
            
            <h4 className="font-bold text-slate-900 mb-3">Key Achievements:</h4>
            <ul className="list-none space-y-2 mb-4">
              {leadershipAchievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {leadershipSkills.map((skill, i) => (
                <span key={i} className={`${skill.color} text-white px-3 py-1 rounded-md text-xs font-medium`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



import React, { useRef, useState, useEffect } from "react";
import benStudioVideo from "../images/ben_studio_demo.mp4";
import studio1 from "../images/studio1.png";
import studio2 from "../images/studio2.png";
import studio3 from "../images/studio3.png";
import loginImg from "../images/login.png";
import genderImg from "../images/gender.png";
import faceImg from "../images/face.png";
import bodyImg from "../images/body.png";
import personaImg from "../images/persona.png";
import finalImg from "../images/final.png";
import genEditImg from "../images/genedit.png";
import advEditImg from "../images/advedit.png";
import Footer from "./Footer";

const BenStudio = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      setScrollOffset((prev) =>
        Math.max(-50, Math.min(50, prev + delta * 0.15))
      );
      lastScrollY.current = currentScrollY;

      // Intersection Observer for scroll animations
      const sections = document.querySelectorAll(".animate-on-scroll");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          section.classList.add("is-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackToHome = (e) => {
    e.preventDefault();
    if (window.navigateWithSplash) {
      window.navigateWithSplash("/", "Home");
    } else {
      window.location.href = "/";
    }
  };

  // Technology stack with colors
  const techStack = [
    { name: "React.js", color: "#61DAFB" },
    { name: "Unity WebGL", color: "#000000" },
    { name: "OAuth 2.0", color: "#EB5424" },
    { name: "React Query", color: "#FF4154" },
    { name: "Figma", color: "#61DAFB" },
    { name: "Tailwind CSS", color: "#F7DF1E" },
  ];

  // Gallery images with actual image imports
  const galleryImages = [
    { id: 1, label: "Login Flow", color: "#232323", image: loginImg },
    { id: 2, label: "Gender Select", color: "#232323", image: genderImg },
    { id: 3, label: "Face Presets", color: "#232323", image: faceImg },
    { id: 4, label: "Body & Outfit", color: "#232323", image: bodyImg },
    { id: 5, label: "Persona", color: "#232323", image: personaImg },
    { id: 6, label: "Final Avatar", color: "#232323", image: finalImg },
    { id: 7, label: "General Edit", color: "#232323", image: genEditImg },
    { id: 8, label: "Advanced Edit", color: "#232323", image: advEditImg },
  ];

  const row1 = galleryImages.slice(0, 4);
  const row2 = galleryImages.slice(4, 8);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 {
          transition-delay: 0.1s;
        }
        
        .stagger-2 {
          transition-delay: 0.2s;
        }
        
        .stagger-3 {
          transition-delay: 0.3s;
        }
        
        .stagger-4 {
          transition-delay: 0.4s;
        }
      `}</style>

      {/* Header */}
      <div className="p-6 md:p-12">
        <a
          href="/"
          onClick={handleBackToHome}
          className="inline-flex items-center text-gray-900 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </a>
      </div>

      {/* Hero Title Section */}
      <div className="min-h-[60vh] flex items-center justify-center px-6 md:px-16 py-20">
        <div className="max-w-7xl w-full">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-light text-gray-900 mb-0 leading-none tracking-tight">
            Ben Studio
          </h1>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Role */}
            <div className="animate-on-scroll stagger-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                ROLE
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg text-gray-900 leading-relaxed">
                  UX/UI Designer & Frontend Developer
                </p>
              </div>
            </div>

            {/* Ownership */}
            <div className="animate-on-scroll stagger-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                Ownership
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg text-gray-900 leading-relaxed mb-2">
                  Discovery → Delivery
                </p>
              </div>
            </div>

            {/* Platform */}
            <div className="animate-on-scroll stagger-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                Platform
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg text-gray-900 leading-relaxed">Web App</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio1 Image - After Role Section */}
      <div className="bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <img
            src={studio1}
            alt="Ben Studio Interface"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Project Description */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
            A comprehensive full-stack application enabling users to create
            fully customized 3D avatars through an intuitive step-by-step
            interface.
          </h2>
        </div>
      </div>

      {/* Challenge Section */}
      <div className="bg-[#00A990] py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-white uppercase tracking-widest mb-6">
            THE CHALLENGE
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
            Complex Problem Space
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              Creating a seamless avatar customization experience required
              solving several interconnected technical challenges.
            </p>
            <ul className="space-y-4 text-lg text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-900 mr-3">→</span>
                <span>
                  Managing complex state across 15+ selection screens while
                  maintaining real-time visual feedback in 3D
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3">→</span>
                <span>
                  Orchestrating communication between React UI, Unity 3D engine,
                  and backend APIs
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3">→</span>
                <span>
                  Implementing persistent data storage that survives page
                  refreshes
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3">→</span>
                <span>
                  Optimizing performance for 3D rendering and large asset
                  loading
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3">→</span>
                <span>
                  Creating a secure authentication pipeline with token refresh
                  mechanisms
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Journey Section */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
            USER JOURNEY
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-12 leading-tight">
            A guided 10-step process from authentication to final avatar
            creation
          </h2>

          {/* Grid Layout - 4 columns, wraps to multiple rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Authentication", desc: "SSO/OAuth Login" },
              { num: "02", title: "Email/Code", desc: "Verification Flow" },
              { num: "03", title: "Gender Select", desc: "Avatar Base Type" },
              { num: "04", title: "Face Presets", desc: "Facial Structure" },
              { num: "05", title: "Skin Tone", desc: "Color Selection" },
              { num: "06", title: "Eye Color", desc: "Color Selection" },
              { num: "07", title: "Hair Style", desc: "Style & Color" },
              {
                num: "08",
                title: "Outfit",
                desc: "Choose Clothing & Accessories",
              },
              { num: "09", title: "Personality", desc: "Voice & Traits" },
              { num: "10", title: "Finish", desc: "Name & Save" },
              {
                num: "11",
                title: "General Edit",
                desc: "Quick Appearance Changes",
              },
              {
                num: "12",
                title: "Advanced Edit",
                desc: "Fine-Tune Every Detail",
              },
            ].map((step, idx) => (
              <div
                key={step.num}
                className="bg-[#00A990] rounded-xl p-6 animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="text-white text-sm font-semibold mb-2">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-white">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio2 Image - After Visual Showcase */}
      <div className="bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <img
            src={studio2}
            alt="Ben Studio Customization"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Scrolling Gallery */}
      <div className="w-full bg-[#00A990] py-12 md:py-20 overflow-hidden animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12">
          <p className="text-s text-white uppercase tracking-widest mb-6">
            VISUAL SHOWCASE
          </p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden px-4">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {galleryImages.map((img) => (
              <div key={img.id} className="w-full animate-on-scroll">
                <div
                  className="w-full rounded-xl shadow-lg overflow-hidden h-64"
                  style={{ backgroundColor: img.color }}
                >
                  {img.image ? (
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-semibold text-white">
                        {img.label}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-white text-center mt-3 text-lg font-medium">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="max-w-[1900px] mx-auto px-8">
            <div className="mb-10 flex gap-10 justify-center">
              {row1.map((img) => (
                <div
                  key={img.id}
                  className="transition-transform duration-100 ease-out w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0"
                  style={{ transform: `translateX(${scrollOffset}px)` }}
                >
                  <div
                    className="w-full rounded-2xl shadow-lg overflow-hidden h-80"
                    style={{ backgroundColor: img.color }}
                  >
                    {img.image ? (
                      <img
                        src={img.image}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-semibold text-white">
                          {img.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-center mt-4 text-xl font-medium">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-10 justify-center">
              {row2.map((img) => (
                <div
                  key={img.id}
                  className="transition-transform duration-100 ease-out w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0"
                  style={{ transform: `translateX(${-scrollOffset}px)` }}
                >
                  <div
                    className="w-full rounded-2xl shadow-lg overflow-hidden h-80"
                    style={{ backgroundColor: img.color }}
                  >
                    {img.image ? (
                      <img
                        src={img.image}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-semibold text-white">
                          {img.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-center mt-4 text-xl font-medium">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Solution Section */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
            TECHNICAL SOLUTION
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-16 leading-tight">
            Architecture & Implementation
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🔄",
                title: "State Management",
                desc: "Implemented React Context API combined with localStorage for persistent state across 15+ customization screens. User selections survive page refreshes and browser sessions while maintaining synchronization between UI and 3D rendering.",
              },
              {
                icon: "🎮",
                title: "Unity Integration",
                desc: "Developed bidirectional JSON messaging system between React and Unity WebGL. Real-time communication enables instant avatar updates as users make appearance selections, and with screenshot capture for final rendering.",
              },
              {
                icon: "🔐",
                title: "Authentication Flow",
                desc: "Built complete OAuth 2.0/SSO authentication pipeline with secure token management, automatic refresh mechanisms, and protected route handling.",
              },
              {
                icon: "⚡",
                title: "Performance Optimization",
                desc: "Implemented strategic asset preloading, React Query for efficient API data fetching with caching, and lazy loading for Unity WebGL components. Optimized for smooth 60fps 3D interactions.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-8 hover:border-gray-400 transition-colors animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="bg-[#00A990] py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-white uppercase tracking-widest mb-6">
            TECHNOLOGY STACK
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-12 leading-tight">
            Modern tools powering the experience
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl flex items-center justify-center p-6 border border-gray-200 hover:border-gray-400 transition-colors bg-white animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <span className="text-gray-900 font-semibold text-center text-sm md:text-base">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio3 Image - After Technology Stack */}
      <div className="bg-white pt-20 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <img
            src={studio3}
            alt="Ben Studio Avatar Result"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
            PROJECT IMPACT
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "15+", label: "Customization Screens" },
              { number: "100%", label: "Real-time Sync" },
              { number: "3D", label: "Live Rendering" },
              { number: "60fps", label: "Performance" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl md:text-7xl font-light text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            The platform delivers a comprehensive avatar creation experience
            that rivals professional 3D character creators. Users can create
            fully personalized avatars with real-time visual feedback,
            persistent data across sessions, and seamless integration with
            backend services.
          </p>
        </div>
      </div>

      {/* Key Learnings Section */}
      <div className="bg-[#00A990] py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-xs text-white uppercase tracking-widest mb-6">
            KEY LEARNINGS
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-12 leading-tight">
            Technical Insights & Growth
          </h2>

          <div className="space-y-8">
            {[
              {
                title: "Real-time Integration Complexity",
                desc: "Working with Unity WebGL taught me the intricacies of bridging web technologies with game engines. Managing asynchronous communication, handling message serialization, and ensuring state consistency across platforms required deep architectural planning.",
              },
              {
                title: "State Management at Scale",
                desc: "Building a state management solution for 15+ interconnected screens reinforced the importance of choosing the right abstraction level. React Context combined with localStorage provided the perfect balance of simplicity and functionality.",
              },
              {
                title: "Performance Optimization Strategies",
                desc: "Optimizing 3D web applications pushed me to master techniques like asset preloading, lazy loading, and efficient render cycles. Understanding the Unity-React performance bottlenecks was crucial for achieving 60fps interactions.",
              },
            ].map((learning, idx) => (
              <div
                key={idx}
                className="border-l-4 border-white pl-6 animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {learning.title}
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  {learning.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section - Now at the bottom before Footer */}
      <div className="flex items-center justify-center px-6 md:px-16 py-16 md:py-24 bg-white animate-on-scroll">
        <div className="max-w-6xl w-full">
          <div className="mb-8 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              DEMO VIDEO
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Ben Studio in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch the full avatar creation flow
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              className="w-full h-auto"
              controls
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={benStudioVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 bg-[#00A990] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-12 h-12 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BenStudio;

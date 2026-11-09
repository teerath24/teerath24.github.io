import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import heroVideo from "./hero.mp4";
import manilaVideo from "../images/manilaa.mp4";
import hanoiVideo from "../images/hanoi.MP4";
import seoulBg from "../images/seoul.png";

import benStudioImg from "../images/ben_studio.png";
import VGImg from "../images/vg.png";
import benWebsiteImg from "../images/ben_website.png";
import img3dworld from "../images/3dworld.png";
import imgKobeShoes from "../images/kobe_shoes.png";
import imgXwing from "../images/xwing.png";
import imgDexter from "../images/dexter.png";
import imgDodgers from "../images/dodgersapp.png";
import imgPokeball from "../images/pokeball.png";
import imgBridge from "../images/bridge.png";
import imgShrooms from "../images/shrooms.png";
import useScrollReveal from "../hooks/useScrollReveal";

// --- More Work Button ---
const MoreWorkButton = ({ text, href }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (ref.current) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setXY({ x: (x / rect.width) * 10, y: (y / rect.height) * 10 });
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (window.navigateWithSplash) {
      window.navigateWithSplash(href, "Work");
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setXY({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="relative block w-40 h-14 sm:w-48 sm:h-16 md:w-56 md:h-16 rounded-full overflow-hidden will-change-transform"
      style={{ transform: `translate(${xy.x}px, ${xy.y}px)` }}
    >
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
        />
        <span className="relative z-10 text-lg md:text-xl font-medium text-white">
          {text}
        </span>
      </div>
    </a>
  );
};

// --- Interactive Circle Button ---
const InteractiveCircleButton = ({ text, href }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (ref.current) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setXY({ x: (x / rect.width) * 15, y: (y / rect.height) * 15 });
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (window.navigateWithSplash) {
      window.navigateWithSplash(href, "About");
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setXY({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="relative block w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden will-change-transform"
      style={{ transform: `translate(${xy.x}px, ${xy.y}px)` }}
    >
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
        />
        <span className="relative z-10 text-xl sm:text-2xl md:text-3xl font-light text-white">
          {text}
        </span>
      </div>
    </a>
  );
};

// --- Project Card ---
const ProjectCard = ({
  title,
  category,
  link,
  isHovered,
  onHover,
  onLeave,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else if (window.navigateWithSplash) {
      window.navigateWithSplash(link, title);
    }
  };

  return (
    <a
      href={link}
      onClick={handleClick}
      className="block relative border-t border-gray-300 py-6 sm:py-8 md:py-12 cursor-pointer transition-all duration-300 hover:border-[#1E90FF] hover:scale-[1.02]"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 relative z-10">
        <h3
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold transition-all duration-300 ${
            isHovered ? "text-[#1E90FF] opacity-100" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <span
          className={`text-sm sm:text-base md:text-lg transition-colors duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-500"
          }`}
        >
          {category}
        </span>
      </div>
    </a>
  );
};

// --- Parallax Video Showcase Section ---
const ParallaxVideoShowcase = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(window.scrollY - sectionRef.current.offsetTop);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const videos = [
    { title: "SEOUL, SOUTH KOREA", src: heroVideo },
    { title: "MANILA, PHILIPPINES", src: manilaVideo },
    { title: "HANOI, VIETNAM", src: hanoiVideo },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 overflow-hidden border-none outline-none m-0 p-0"
    >
      {/* 🏙️ RESTORED PARALLAX BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10 h-full scale-110 transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${seoulBg})`,
          transform: `translateY(${scrollY * 0.2}px) scale(1.1)`,
        }}
      />

      <div className="w-full max-w-[1450px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Title Block with Black "VIEW ALL WORK →" link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-black">
              Video Work
            </h2>
          </div>
          <a
            href="/work"
            onClick={(e) => {
              e.preventDefault();
              if (window.navigateWithSplash) {
                window.navigateWithSplash("/work", "Work");
              }
            }}
            className="text-xs sm:text-sm font-mono text-black font-medium uppercase tracking-widest hover:text-[#1E90FF] transition-colors"
          >
            VIEW ALL WORK →
          </a>
        </div>

        {/* 🎬 3 WIDESCREEN VIDEO SHOWCASE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {videos.map((vid, idx) => (
            <a
              key={idx}
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                if (window.navigateWithSplash) {
                  window.navigateWithSplash("/work", "Work");
                }
              }}
              className="group relative block rounded-2xl overflow-hidden bg-black border-0 shadow-2xl transition-all duration-500 hover:scale-[1.03]"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <video
                  src={vid.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Video Title Overlay Only */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {vid.title}
                  </h3>

                  <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1E90FF] group-hover:scale-110">
                    <svg
                      className="w-4 h-4 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Scrolling Gallery ---
const ScrollingGallery = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!isMobile) {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        setScrollOffset((prev) =>
          Math.max(-50, Math.min(50, prev + delta * 0.15)),
        );
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const row1 = [img3dworld, imgKobeShoes, imgXwing, imgDexter];
  const row2 = [imgBridge, imgPokeball, imgDodgers, imgShrooms];

  return (
    <div className="w-full bg-white py-12 md:py-20 overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden px-4">
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {[...row1, ...row2].map((img, idx) => (
            <div key={idx} className="w-full">
              <div className="w-full bg-gray-200 rounded-xl p-2 shadow-lg">
                <img
                  src={img}
                  alt={`Project ${idx + 1}`}
                  className="w-full h-auto aspect-[4/3] object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-[1900px] mx-auto px-8">
          <div className="mb-10 flex gap-10 justify-center">
            {row1.map((img, idx) => (
              <div
                key={idx}
                className="transition-transform duration-100 ease-out w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0"
                style={{ transform: `translateX(${scrollOffset}px)` }}
              >
                <div className="w-full bg-gray-200 rounded-2xl p-3 shadow-lg">
                  <img
                    src={img}
                    alt={`Project ${idx + 1}`}
                    className="w-full h-auto aspect-[4/3] object-contain rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-10 justify-center">
            {row2.map((img, idx) => (
              <div
                key={idx}
                className="transition-transform duration-100 ease-out w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0"
                style={{ transform: `translateX(${-scrollOffset}px)` }}
              >
                <div className="w-full bg-gray-200 rounded-2xl p-3 shadow-lg">
                  <img
                    src={img}
                    alt={`Project ${idx + 5}`}
                    className="w-full h-auto aspect-[4/3] object-contain rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Home Component ---
const Home = () => {
  useScrollReveal();

  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

  useEffect(() => {
    let rafId;
    const handleMouse = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "VirtuoGrowth",
      category: "Design & Development",
      image: VGImg,
      link: "https://www.virtuogrowth.com/",
    },
    {
      id: 2,
      title: "Ben Studio",
      category: "Design & Development",
      image: benStudioImg,
      link: "/ben-studio",
    },
    {
      id: 3,
      title: "Ben Website",
      category: "Design & Development",
      image: benWebsiteImg,
      link: "/ben-website",
    },
  ];

  const currentProject = projects.find((p) => p.id === hoveredProject);

  return (
    <div
      id="home"
      className="min-h-screen bg-[#070709] pt-16 md:pt-20 pb-12 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-center select-none"
    >
      {/* 🎞️ MAIN FILM CANOPY CONTAINER */}
      <div className="relative w-full max-w-[1600px] rounded-[2.5rem] bg-[#0f0f13] border border-white/15 overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col md:flex-row items-stretch">
        {/* 🎬 FULL HEIGHT SPROCKET HOLE STRIP */}
        <div className="relative w-full md:w-28 bg-[#0a0a0d] border-b md:border-b-0 md:border-r border-white/20 flex md:flex-col items-center justify-between p-4 md:py-8 z-30 flex-shrink-0">
          <span className="hidden md:block font-mono text-[11px] font-semibold tracking-[0.35em] text-gray-400 transform -rotate-90 whitespace-nowrap my-auto opacity-80">
            KODAK 7219 · ISO 400
          </span>

          <div className="w-full h-20 md:h-full flex md:flex-col items-center justify-around overflow-hidden py-2">
            <div className="flex md:flex-col gap-8 items-center animate-[sprocketScroll_25s_linear_infinite]">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-6 md:w-11 md:h-14 bg-[#050507] rounded-xl border-2 border-white/30 shadow-[inset_0_0_10px_rgba(0,0,0,1),0_0_12px_rgba(255,255,255,0.08)] flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🎞️ RIGHT MAIN FILM FRAME VIEWPORT */}
        <div className="relative flex-1 bg-black overflow-hidden rounded-[2rem] m-2 md:m-3 border border-red-950/20 shadow-[inset_0_0_60px_rgba(180,30,30,0.15)] flex flex-col">
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(40,10,10,0.4)] rounded-[2rem]" />

          {/* 🚀 PAGE CONTENT WRAPPER */}
          <div className="relative z-10 overflow-y-auto flex-1 flex flex-col">
            {/* 🎬 HERO SECTION */}
            <div className="relative w-full h-[720px] sm:h-[800px] lg:h-[850px] flex flex-col justify-between bg-zinc-950">
              {/* TOP CAMERA HUD METADATA BAR */}
              <div className="bg-black/90 text-white font-mono text-xs px-6 py-4 sm:px-10 flex justify-between items-center border-b border-white/10 tracking-widest uppercase z-30">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-red-500 font-bold">REC</span>
                  <span className="text-gray-400 font-mono hidden sm:inline">
                    TC: 00:01:24:08
                  </span>
                </div>
                <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-xs">
                  <span className="font-semibold text-[#1E90FF]">ISO 400</span>
                  <span className="text-gray-400">24.00 FPS</span>
                  <span className="hidden md:inline text-gray-400">
                    WB 5600K
                  </span>
                  <span className="hidden lg:inline text-gray-400">
                    PRORES 422 HQ
                  </span>
                </div>
              </div>
              {/* VIDEO BACKGROUND CONTAINER */}
              <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
                <video
                  ref={videoRef}
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />
              </div>
              {/* CENTER HEADLINE OVERLAY */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none px-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
                  Teerath Bajaj
                </h1>
                <p className="mt-3 text-sm sm:text-lg text-gray-300 font-mono tracking-widest uppercase drop-shadow">
                  Video Editor • UI/UX Designer • Frontend Developer
                </p>
              </div>
              {/* BOTTOM HUD TIMELINE BAR */}
              <div className="absolute bottom-0 left-0 right-0 z-30 px-6 py-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-center text-[11px] font-mono text-gray-400">
                <span className="text-[#1E90FF] font-semibold tracking-wider">
                  John 3:16
                </span>
                <span>STATUS: PLAYING</span>
              </div>
            </div>

            {/* Light Mode Work Section */}
            <div className="min-h-screen bg-white relative py-12 sm:py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
                <>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 md:mb-16 gap-8 md:gap-12 animate-on-scroll">
                    <div className="flex-1">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 max-w-2xl leading-tight">
                        Building digital experiences with intention, clarity,
                        and impact. Let's create work that resonates.
                      </h2>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-4 md:gap-6 w-full lg:w-auto">
                      <p className="text-sm sm:text-base text-gray-700 max-w-xs text-left lg:text-right">
                        I am a versatile individual with a passion for blending
                        creativity and technology. As a designer and developer.
                        With a keen eye for design aesthetics and a deep
                        understanding of development.
                      </p>
                      <div className="self-center lg:self-end">
                        <InteractiveCircleButton
                          text="About me"
                          href="/about"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-3xl text-gray-500 uppercase tracking-wider mb-4 md:mb-6 animate-on-scroll">
                    RECENT WORK
                  </p>

                  <div className="mt-12 md:mt-16">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`animate-on-scroll stagger-${index + 1}`}
                      >
                        <ProjectCard
                          title={project.title}
                          category={project.category}
                          link={project.link}
                          isHovered={hoveredProject === project.id}
                          onHover={() => setHoveredProject(project.id)}
                          onLeave={() => setHoveredProject(null)}
                        />
                      </div>
                    ))}

                    <div className="flex justify-center mt-12 md:mt-16 animate-on-scroll">
                      <MoreWorkButton text="See More" href="/work" />
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* 🌇 PARALLAX VIDEO SHOWCASE SECTION */}
            <ParallaxVideoShowcase />

            <ScrollingGallery />
            <Footer />

            {/* Film Footer Camera HUD Bar */}
            <div className="bg-black text-gray-400 font-mono text-xs px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 gap-2">
              <span>FRAME: 01924</span>
              <div className="flex items-center gap-4">
                <span>AUDIO: 48KHZ STEREO</span>
                <span className="text-[#1E90FF] font-semibold">SYNC: OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Image Preview */}
      {currentProject && (
        <div
          className="fixed top-0 left-0 w-full h-full z-[9999]"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="absolute will-change-transform"
            style={{
              left: `${mousePosition.x + 20}px`,
              top: `${mousePosition.y + 20}px`,
            }}
          >
            <div className="relative w-64 h-48 sm:w-80 sm:h-64 md:w-96 md:h-72 overflow-hidden rounded-lg shadow-2xl">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Keyframes for Sprocket Movement */}
      <style>{`
        @keyframes sprocketScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;

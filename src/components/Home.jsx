import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import ausImage from "../images/aus.jpg";
import benStudioImg from "../images/ben_studio.png";
import benWebsiteImg from "../images/ben_website.png";
import img3dworld from "../images/3dworld.png";
import imgLacasa from "../images/lacasa.png";
import imgXwing from "../images/xwing.png";
import imgDexter from "../images/dexter.png";
import imgDodgers from "../images/dodgersapp.png";
import imgPokeball from "../images/pokeball.png";
import imgLakers from "../images/lakersapp.jpeg";
import imgShrooms from "../images/shrooms.png";

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
      className="
        relative 
        block 
        w-40 h-14        
        sm:w-48 sm:h-16 
        md:w-56 md:h-16
        rounded-full 
        overflow-hidden 
        will-change-transform
      "
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
    // Check if it's an external link
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

// --- Scrolling Gallery ---
const ScrollingGallery = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!isMobile) {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        // Increased multiplier from 0.05 to 0.15 for more movement
        setScrollOffset((prev) =>
          Math.max(-50, Math.min(50, prev + delta * 0.15))
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

  const row1 = [img3dworld, imgLacasa, imgXwing, imgDexter];
  const row2 = [imgLakers, imgPokeball, imgDodgers, imgShrooms];

  return (
    <div className="w-full bg-white py-12 md:py-20 overflow-hidden">
      {/* Mobile View - Single Column */}
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

      {/* Desktop View - Scrolling Gallery centered */}
      <div className="hidden md:block">
        <div className="max-w-[1900px] mx-auto px-8">
          {/* Row 1 */}
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
          {/* Row 2 */}
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
  const name = "Teerath Bajaj";
  const [scrollDirection, setScrollDirection] = useState("down");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Ben Studio",
      category: "Design & Development",
      image: benStudioImg,
      link: "/ben-studio",
    },
    {
      id: 2,
      title: "Ben Website",
      category: "Design & Development",
      image: benWebsiteImg,
      link: "https://beninc.ai/",
    },
  ];

  const currentProject = projects.find((p) => p.id === hoveredProject);

  return (
    <div id="home" className="relative bg-gray-900">
      {/* Hero Section */}
      <div className="h-screen relative flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ausImage})`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90" />

        <div className="fixed top-1/2 right-4 sm:right-8 md:right-16 -translate-y-1/2 transform z-10">
          <p className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-light text-white tracking-wide text-right leading-tight">
            <span className="block lg:inline">Designer & </span>
            <span className="block lg:inline">Developer</span>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
          <div className="whitespace-nowrap py-4 sm:py-6 md:py-10">
            <div
              className={`inline-block transition-none ${
                scrollDirection === "down"
                  ? "animate-marquee-left"
                  : "animate-marquee-right"
              }`}
              key={scrollDirection}
            >
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tight text-white px-4 sm:px-8 md:px-16 inline-block"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {name} —
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white relative py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          {/* Wrap the content below in a React Fragment (<> ... </>) */}
          <>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 md:mb-16 gap-8 md:gap-12">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 max-w-2xl leading-tight">
                  Building digital experiences with intention, clarity, and
                  impact. Let's create work that resonates.
                </h2>
                {/* REMOVED P tag from here */}
              </div>
              <div className="flex flex-col items-start lg:items-end gap-4 md:gap-6 w-full lg:w-auto">
                <p className="text-sm sm:text-base text-gray-700 max-w-xs text-left lg:text-right">
                  I am a versatile individual with a passion for blending
                  creativity and technology. As a designer and developer. With a
                  keen eye for design aesthetics and a deep understanding of
                  development.
                </p>
                <div className="self-center lg:self-end">
                  <InteractiveCircleButton text="About me" href="/about" />
                </div>
              </div>
            </div>

            {/* NEW LOCATION: This P tag is now placed correctly in the document flow */}
            <p className="text-3xl text-gray-500 uppercase tracking-wider mb-4 md:mb-6">
              RECENT WORK
            </p>

            <div className="mt-12 md:mt-16">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  category={project.category}
                  link={project.link}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              ))}
              <div className="flex justify-center mt-12 md:mt-16">
                <MoreWorkButton text="See More" href="/work" />
              </div>
            </div>
          </>
          {/* Close the React Fragment */}
        </div>
      </div>

      <ScrollingGallery />
      <Footer />

      {/* Image Preview */}
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
    </div>
  );
};

export default Home;

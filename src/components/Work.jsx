import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import benStudioImg from "../images/ben_studio.png";
import benWebsiteImg from "../images/ben_website.png";
import flickFlowImg from "../images/flick_flow.jpg";
import JenniImg from "../images/jenni.jpg";
import NKImg from "../images/NK.png";

// --- Project Card Component (List View) ---
const ProjectCard = ({
  title,
  location,
  services,
  year,
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
      className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center border-t border-gray-300 py-8 md:py-12 cursor-pointer transition-all duration-300 hover:border-[#1E90FF] hover:scale-[1.01]"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project Title */}
      <div className="md:col-span-1">
        <h3
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold transition-all duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
      </div>

      {/* Location */}
      <div className="md:col-span-1">
        <p
          className={`text-sm sm:text-base md:text-lg transition-colors duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-600"
          }`}
        >
          {location}
        </p>
      </div>

      {/* Services */}
      <div className="md:col-span-1">
        <p
          className={`text-sm sm:text-base md:text-lg transition-colors duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-600"
          }`}
        >
          {services}
        </p>
      </div>

      {/* Year */}
      <div className="md:col-span-1 md:text-right">
        <p
          className={`text-sm sm:text-base md:text-lg transition-colors duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-600"
          }`}
        >
          {year}
        </p>
      </div>
    </a>
  );
};

// --- Project Grid Card Component (Grid View) ---
const ProjectGridCard = ({
  title,
  services,
  year,
  link,
  image,
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
      className="block cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Project Info */}
      <div className="pt-4">
        <h3
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 transition-colors duration-300 ${
            isHovered ? "text-[#1E90FF]" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <p
              className={`text-sm sm:text-base transition-colors duration-300 ${
                isHovered ? "text-[#1E90FF]" : "text-gray-600"
              }`}
            >
              {services}
            </p>
            <p
              className={`text-sm sm:text-base transition-colors duration-300 ${
                isHovered ? "text-[#1E90FF]" : "text-gray-600"
              }`}
            >
              {year}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Filter Button Component ---
const FilterButton = ({ text, count, isActive, onClick }) => {
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
        setXY({ x: (x / rect.width) * 8, y: (y / rect.height) * 8 });
      });
    }
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setXY({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 overflow-hidden focus:outline-none focus:ring-0 focus-visible:ring-0 ${
        isActive
          ? "bg-black text-white"
          : "bg-white text-gray-700 border border-gray-300"
      }`}
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div
        className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
        style={{
          transform:
            isHovered && !isActive ? "translateY(0%)" : "translateY(100%)",
        }}
      />
      <span className="relative z-10">
        {text} <span className="text-xs">{count}</span>
      </span>
    </button>
  );
};

// --- View Toggle Button ---
const ViewToggle = ({ view, onToggle }) => {
  const [listXY, setListXY] = useState({ x: 0, y: 0 });
  const [gridXY, setGridXY] = useState({ x: 0, y: 0 });
  const [listHovered, setListHovered] = useState(false);
  const [gridHovered, setGridHovered] = useState(false);
  const listRef = useRef(null);
  const gridRef = useRef(null);
  const rafId = useRef(null);

  const handleListMouseMove = (e) => {
    if (listRef.current) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = listRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setListXY({ x: (x / rect.width) * 8, y: (y / rect.height) * 8 });
      });
    }
  };

  const handleGridMouseMove = (e) => {
    if (gridRef.current) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setGridXY({ x: (x / rect.width) * 8, y: (y / rect.height) * 8 });
      });
    }
  };

  return (
    <div className="flex gap-2">
      <button
        ref={listRef}
        onClick={() => onToggle("list")}
        onMouseMove={handleListMouseMove}
        onMouseEnter={() => setListHovered(true)}
        onMouseLeave={() => {
          setListXY({ x: 0, y: 0 });
          setListHovered(false);
        }}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden focus:outline-none focus:ring-0 focus-visible:ring-0 ${
          view === "list"
            ? "bg-black text-white"
            : "bg-white text-gray-700 border border-gray-300"
        }`}
        style={{
          transform: `translate(${listXY.x}px, ${listXY.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
          style={{
            transform:
              listHovered && view !== "list"
                ? "translateY(0%)"
                : "translateY(100%)",
          }}
        />
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <button
        ref={gridRef}
        onClick={() => onToggle("grid")}
        onMouseMove={handleGridMouseMove}
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => {
          setGridXY({ x: 0, y: 0 });
          setGridHovered(false);
        }}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden focus:outline-none focus:ring-0 focus-visible:ring-0 ${
          view === "grid"
            ? "bg-black text-white"
            : "bg-white text-gray-700 border border-gray-300"
        }`}
        style={{
          transform: `translate(${gridXY.x}px, ${gridXY.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
          style={{
            transform:
              gridHovered && view !== "grid"
                ? "translateY(0%)"
                : "translateY(100%)",
          }}
        />
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      </button>
    </div>
  );
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [view, setView] = useState("list");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      location: "United States",
      services: "Design & Development",
      year: "2025",
      category: "development",
      link: "/ben-studio",
      image: benStudioImg,
    },
    {
      id: 2,
      title: "Ben Website",
      location: "United States",
      services: "Design & Development",
      year: "2025",
      category: "both",
      link: "https://beninc.ai/",
      image: benWebsiteImg,
    },
    {
      id: 3,
      title: "FlickFlow",
      location: "South Korea",
      services: "Design & Development",
      year: "2023",
      category: "both",
      link: "https://teerath24.github.io/FlickFlow/",
      image: flickFlowImg,
    },
    {
      id: 4,
      title: "JenniAI",
      location: " South Korea",
      services: "Design",
      year: "2023",
      category: "design",
      link: "https://www.figma.com/proto/fNMQL9vlVANKRd3JlyDVX1/Jenni?page-id=26%3A441&node-id=107-883&starting-point-node-id=107%3A883&mode=design&t=pRrqVW4XP6KT509U-1",
      image: JenniImg,
    },
    {
      id: 5,
      title: "PSCORE",
      location: "South Korea",
      services: "Design",
      year: "2023",
      category: "design",
      link: "https://www.figma.com/proto/LPJ1hOQCvGtd3mchw3lwFa/PSCORE?page-id=61%3A139&node-id=143-378&starting-point-node-id=143%3A378&mode=design&t=18cBmsynNFBt3FjZ-1",
      image: NKImg,
    },
    // {
    //   id: 6,
    //   title: "AVVR",
    //   location: "The Netherlands",
    //   services: "Design & Development",
    //   year: "2023",
    //   category: "both",
    //   link: "#",
    //   image:
    //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    // },
    // {
    //   id: 7,
    //   title: "GraphicHunters",
    //   location: "The Netherlands",
    //   services: "Design & Development",
    //   year: "2022",
    //   category: "both",
    //   link: "#",
    //   image:
    //     "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    // },
  ];

  const filterCounts = {
    all: projects.length,
    design: projects.filter(
      (p) => p.category === "design" || p.category === "both"
    ).length,
    development: projects.filter(
      (p) => p.category === "development" || p.category === "both"
    ).length,
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter || project.category === "both";
  });

  const currentProject = projects.find((p) => p.id === hoveredProject);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Header />

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-tight mb-12">
              Elevating ideas into
              <br />
              digital realities
            </h1>

            {/* Filter and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3">
                <FilterButton
                  text="All"
                  count={filterCounts.all}
                  isActive={activeFilter === "all"}
                  onClick={() => setActiveFilter("all")}
                />
                <FilterButton
                  text="Design"
                  count={filterCounts.design}
                  isActive={activeFilter === "design"}
                  onClick={() => setActiveFilter("design")}
                />
                <FilterButton
                  text="Development"
                  count={filterCounts.development}
                  isActive={activeFilter === "development"}
                  onClick={() => setActiveFilter("development")}
                />
              </div>

              {/* View Toggle */}
              <ViewToggle view={view} onToggle={setView} />
            </div>

            {/* Column Headers - Only show in list view */}
            {view === "list" && (
              <div className="hidden md:grid md:grid-cols-4 gap-8 border-b border-gray-300 pb-4 mb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  CLIENT
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  LOCATION
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  SERVICES
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider text-right">
                  YEAR
                </p>
              </div>
            )}
          </div>

          {/* Projects Display */}
          {view === "list" ? (
            // List View
            <div>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  location={project.location}
                  services={project.services}
                  year={project.year}
                  link={project.link}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              ))}
            </div>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
              {filteredProjects.map((project) => (
                <ProjectGridCard
                  key={project.id}
                  title={project.title}
                  services={project.services}
                  year={project.year}
                  link={project.link}
                  image={project.image}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Image Preview on Hover - Only in List View */}
      {view === "list" && currentProject && (
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

      {/* View Button Circle - Only in Grid View */}
      {view === "grid" && hoveredProject && (
        <div
          className="fixed top-0 left-0 w-full h-full z-[9999]"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="absolute will-change-transform"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#1E90FF] flex items-center justify-center shadow-2xl">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                View
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;

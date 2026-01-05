import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import aiImage from "../images/ai.jpg";
import benweb1 from "../images/benweb1.png";
import benweb2 from "../images/benweb2.png";
import benweb3 from "../images/benweb3.png";
import benweb4 from "../images/benweb4.png";
import useScrollReveal from "../hooks/useScrollReveal";

// Interactive Circle Button Component
const LiveSiteButton = ({ text, href }) => {
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
    window.open(href, "_blank", "noopener,noreferrer");
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
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-xl sm:text-2xl md:text-3xl font-light text-white">
            {text}
          </span>

          <svg
            width="32"
            height="32"
            viewBox="0 0 60 60"
            fill="none"
            className="text-white transform -rotate-90"
          >
            <path
              d="M10 10 L50 50 M50 50 L50 30 M50 50 L30 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

const BenWebsite = () => {
  const [imageOffset, setImageOffset] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const imageContainerRef = useRef(null);
  const lastScrollY = useRef(0);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setScrollOffset((prev) =>
        Math.max(-50, Math.min(50, prev + delta * 0.15))
      );
      lastScrollY.current = currentScrollY;

      // Parallax effect for AI image
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrollProgress = 1 - rect.top / windowHeight;
        const offset = Math.max(-30, Math.min(0, scrollProgress * 50 - 30));
        setImageOffset(offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToHome = (e) => {
    e.preventDefault();
    if (window.navigateWithSplash) {
      window.navigateWithSplash("/", "Home");
    } else {
      window.location.href = "/";
    }
  };

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

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
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
            Ben Website
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
                <p className="text-lg text-gray-900 leading-relaxed">Website</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Live Site Button Section */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="relative">
            {/* Image Container with Parallax Effect */}
            <div
              ref={imageContainerRef}
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl"
            >
              <img
                src={aiImage}
                alt="AI Technology"
                className="w-full h-[120%] object-cover transition-transform duration-300 ease-out"
                style={{
                  transform: `translateY(${imageOffset}%)`,
                  objectPosition: "center",
                }}
              />
            </div>

            {/* Live Site Button - Positioned to overlap on the right */}
            <div className="absolute bottom-[28rem] right-8 md:bottom-20 md:right-12 lg:bottom-[38rem] lg:right-16 animate-on-scroll">
              {" "}
              <LiveSiteButton
                text="Live Site"
                href="https://brandengagementnetwork.com/"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Purple Section with Images */}
      <div className="w-full bg-[#35358C] py-16 md:py-24 animate-on-scroll overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          {/* First Image - Full Width */}
          <div className="mb-16 animate-on-scroll">
            <img
              src={benweb1}
              alt="Ben Website Overview"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          {/* Three Images with Vertical Scroll Animation */}
          <div>
            {/* Mobile View - Stacked Vertically */}
            <div className="md:hidden flex flex-col gap-8">
              <div className="animate-on-scroll">
                <img
                  src={benweb2}
                  alt="Ben Website Feature 1"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="animate-on-scroll">
                <img
                  src={benweb3}
                  alt="Ben Website Feature 2"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="animate-on-scroll">
                <img
                  src={benweb4}
                  alt="Ben Website Feature 3"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>

            {/* Desktop View - Horizontal with Vertical Scroll - BIGGER IMAGES */}
            <div className="hidden md:flex gap-12 lg:gap-16 py-20 justify-center items-start">
              {/* First Image - Moves Down */}
              <div
                className="flex-shrink-0 w-80 lg:w-96 xl:w-[28rem] transition-transform duration-100 ease-out"
                //          ^^^^^^^^^^^ ^^^^ ^^^^^^^ ^^^^^^^^^^^
                //          CHANGE THESE WIDTH VALUES
                style={{
                  transform: `translateY(${Math.max(
                    -100,
                    Math.min(100, scrollOffset)
                  )}px)`,
                }}
              >
                <img
                  src={benweb2}
                  alt="Ben Website Feature 1"
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Second Image - Moves Up */}
              <div
                className="flex-shrink-0 w-80 lg:w-96 xl:w-[28rem] transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(${Math.max(
                    -100,
                    Math.min(100, -scrollOffset)
                  )}px)`,
                }}
              >
                <img
                  src={benweb3}
                  alt="Ben Website Feature 2"
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Third Image - Moves Down */}
              <div
                className="flex-shrink-0 w-80 lg:w-96 xl:w-[28rem] transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(${Math.max(
                    -100,
                    Math.min(100, scrollOffset)
                  )}px)`,
                }}
              >
                <img
                  src={benweb4}
                  alt="Ben Website Feature 3"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Site Button Section - Before Footer */}
      <div className="bg-white py-16 md:py-24 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-center">
          <LiveSiteButton
            text="Live Site"
            href="https://brandengagementnetwork.com/"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BenWebsite;

import React, { useState, useRef } from "react";
import ausImage from "../images/aus.jpg";

const Footer = () => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const ref = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const rafId = useRef(null);
  const emailRafId = useRef(null);
  const phoneRafId = useRef(null);
  const hoverThreshold = 12;

  const handleMouseMove = (e) => {
    if (ref.current) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setXY({
          x: (x / rect.width) * hoverThreshold,
          y: (y / rect.height) * hoverThreshold,
        });
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setXY({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Email button handlers
  const [emailXY, setEmailXY] = useState({ x: 0, y: 0 });
  const handleEmailMouseMove = (e) => {
    if (emailRef.current) {
      if (emailRafId.current) {
        cancelAnimationFrame(emailRafId.current);
      }

      emailRafId.current = requestAnimationFrame(() => {
        const rect = emailRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setEmailXY({
          x: (x / rect.width) * 8,
          y: (y / rect.height) * 8,
        });
      });
    }
  };

  // Phone button handlers
  const [phoneXY, setPhoneXY] = useState({ x: 0, y: 0 });
  const handlePhoneMouseMove = (e) => {
    if (phoneRef.current) {
      if (phoneRafId.current) {
        cancelAnimationFrame(phoneRafId.current);
      }

      phoneRafId.current = requestAnimationFrame(() => {
        const rect = phoneRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPhoneXY({
          x: (x / rect.width) * 8,
          y: (y / rect.height) * 8,
        });
      });
    }
  };

  return (
    <footer className="w-full bg-[#222] text-white min-h-screen relative overflow-hidden flex items-center">
      <div className="w-full max-w-[1900px] mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20 mb-20 lg:mb-32">
          {/* Left - Profile and Text */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
              <img
                src={ausImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-2">
                Let's work
              </h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
                t o g e t h e r
              </h2>
            </div>
          </div>

          {/* Right - Button with Arrow */}
          <div className="relative w-full lg:w-auto flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Arrow pointing at button */}
            <div className="hidden xl:block absolute right-[160px] top-[-80px]">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="text-gray-400"
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

            {/* Get in touch button - smaller size */}
            <a
              ref={ref}
              href="/contact" // Changed from #contact to /contact
              onClick={(e) => {
                e.preventDefault();
                if (window.navigateWithSplash) {
                  window.navigateWithSplash("/contact", "Contact"); // Changed path
                } else {
                  window.location.href = "/contact"; // Changed fallback
                }
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative block w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden will-change-transform"
              style={{
                transform: `translate(${xy.x}px, ${xy.y}px)`,
              }}
            >
              <div className="absolute inset-0 bg-[#1E90FF] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-[#57acff] transition-all duration-700 ease-out"
                  style={{
                    transform: isHovered
                      ? "translateY(0%)"
                      : "translateY(100%)",
                  }}
                />
                <span className="relative z-10 text-base md:text-lg lg:text-xl font-medium text-white px-6 text-center">
                  Get in touch
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mb-12 lg:mb-16"></div>

        {/* Bottom - Contact and Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a
              ref={emailRef}
              href="mailto:teerath.bajaj24@gmail.com"
              onMouseMove={handleEmailMouseMove}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => {
                setEmailXY({ x: 0, y: 0 });
                setEmailHovered(false);
              }}
              className="relative px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-gray-600 text-white text-sm md:text-lg whitespace-nowrap inline-block text-center overflow-hidden"
              style={{
                transform: `translate(${emailXY.x}px, ${emailXY.y}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  backgroundColor: "#1E90FF",
                  transform: emailHovered
                    ? "translateY(0%)"
                    : "translateY(100%)",
                }}
              />
              <span className="relative z-10">teerath.bajaj24@gmail.com</span>
            </a>
            <a
              ref={phoneRef}
              href="tel:+821031721663"
              onMouseMove={handlePhoneMouseMove}
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => {
                setPhoneXY({ x: 0, y: 0 });
                setPhoneHovered(false);
              }}
              className="relative px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-gray-600 text-white text-sm md:text-lg whitespace-nowrap inline-block text-center overflow-hidden"
              style={{
                transform: `translate(${phoneXY.x}px, ${phoneXY.y}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  backgroundColor: "#1E90FF",
                  transform: phoneHovered
                    ? "translateY(0%)"
                    : "translateY(100%)",
                }}
              />
              <span className="relative z-10">+82 10 3172 1663</span>
            </a>
          </div>

          {/* Social Links - Bottom Right with SOCIALS label */}
          <div className="flex flex-col items-start lg:items-end gap-3 lg:ml-auto">
            <p className="text-gray-500 text-sm tracking-wider">SOCIALS</p>
            <div className="flex gap-6 md:gap-10 text-base md:text-xl">
              <a
                href="https://www.instagram.com/teerathbajaj/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1E90FF] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/teerath-bajaj-82358b1a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1E90FF] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

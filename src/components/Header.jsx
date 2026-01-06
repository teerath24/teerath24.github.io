import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import myLogo from "../images/my_logo.png";

// --- NavItem Component ---
const NavItemWithHoverEffect = ({ item, activeLink, onClick, isDarkMode }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const hoverThreshold = 10;

  const handleMouseMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setXY({
        x: (x / rect.width) * hoverThreshold,
        y: (y / rect.height) * hoverThreshold,
      });
    }
  };

  const handleMouseLeave = () => {
    setXY({ x: 0, y: 0 });
  };

  const isActive = activeLink === item.href;
  const linkColorClasses = isActive
    ? "text-[#1E90FF] font-semibold"
    : isDarkMode
    ? "text-[#000000] hover:text-[#1E90FF]"
    : "text-white hover:text-[#1E90FF]";

  const commonClasses = `
    block relative overflow-hidden group 
    p-3 md:p-1.5 lg:p-3
    transition-colors duration-300
    ${linkColorClasses}
    after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 
    after:w-[6px] after:h-[6px] after:bg-current after:rounded-full
    after:transition-transform after:duration-300 after:opacity-0 
    hover:after:transform-['translateX(-50%)_scale(1)'] hover:after:opacity-100
    ${
      isActive
        ? "after:transform-['translateX(-50%)_scale(1)'] after:opacity-100"
        : "after:transform-['translateX(-50%)_scale(0)']"
    }
  `;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(item.href);

    // Determine navigation text based on href
    let navText = "Home";
    if (item.href === "/work") navText = "Work";
    else if (item.href === "/about") navText = "About";
    else if (item.href === "/contact") navText = "Contact";

    if (window.navigateWithSplash) {
      window.navigateWithSplash(item.href, navText);
    } else {
      // Fallback to regular navigation
      window.location.href = item.href;
    }
  };

  return (
    <a
      ref={ref}
      href={item.href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={commonClasses}
    >
      <span
        style={{
          transform: `translate(${xy.x}px, ${xy.y}px)`,
          display: "block",
          transition: "transform 0.1s ease-out",
          whiteSpace: "nowrap",
        }}
      >
        {item.name}
      </span>
    </a>
  );
};

// --- Hamburger Menu Button Component with Animated X ---
const HamburgerButton = ({ isScrolled, isMenuOpen, onClick }) => {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const hoverThreshold = 8;

  const handleMouseMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setXY({
        x: (x / rect.width) * hoverThreshold,
        y: (y / rect.height) * hoverThreshold,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setXY({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-8 right-8 z-[60] w-20 h-20 rounded-full bg-[#222] border border-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none focus:ring-0 focus-visible:ring-0 opacity-100 pointer-events-auto ${
        isScrolled ? "" : "md:opacity-0 md:pointer-events-none"
      }`}
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition: "transform 0.1s ease-out, opacity 0.3s, scale 0.3s",
      }}
      aria-label="Toggle menu"
    >
      {/* Water fill effect */}
      <div
        className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? "translateY(0%)" : "translateY(100%)",
        }}
      />

      {/* Animated Hamburger/X icon */}
      <div className="relative z-10 w-10 h-10 flex flex-col items-center justify-center">
        {/* Top Line */}
        <span
          className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "rotate-45 translate-y-[1px]" : "-translate-y-1.5"
          }`}
        />
        {/* Bottom Line */}
        <span
          className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "-rotate-45 -translate-y-[1px]" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  );
};

// --- Main Header Component ---
const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Get current active link from location
  const activeLink = location.pathname;

  // Determine if we should use dark mode (black text) based on current page
  const isDarkMode = activeLink === "/work" || activeLink === "/about";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.navigateWithSplash) {
      window.navigateWithSplash("/", "Home");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Desktop Navigation - Transparent, No Background */}
      <header
        className={`p-4 md:px-20 lg:px-32 w-full fixed top-0 left-0 flex justify-between items-center z-50 transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a href="/" className="logo" onClick={handleLogoClick}>
          <img src={myLogo} alt="Logo" className="w-14" />
        </a>

        <nav className="hidden md:flex md:items-center">
          <ul className="flex flex-row gap-8">
            {navItems.map((item) => (
              <li key={item.name} className="m-0 text-base">
                <NavItemWithHoverEffect
                  item={item}
                  activeLink={activeLink}
                  onClick={handleNavClick}
                  isDarkMode={isDarkMode}
                />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hamburger Menu Button with Animated X */}
      <HamburgerButton
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        onClick={toggleMenu}
      />

      {/* Full-Screen Side Menu with Arched Left Edge Animation */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#222] z-50 transform transition-transform duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderTopLeftRadius: isMenuOpen ? "0px" : "50%",
          borderBottomLeftRadius: isMenuOpen ? "0px" : "50%",
          transition:
            "transform 0.5s ease-in-out, border-radius 0.5s ease-in-out",
          backgroundColor: activeLink === "/contact" ? "#fff" : undefined,
        }}
      >
        <div className="flex flex-col h-full justify-between p-12 md:p-16">
          {/* Navigation */}
          <div className="flex-grow flex flex-col justify-center">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">
              Navigation
            </p>
            <nav>
              <ul className="space-y-4">
                {navItems.map((item) => {
                  const isActive = activeLink === item.href;
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick();

                          let navText = item.name;
                          if (window.navigateWithSplash) {
                            window.navigateWithSplash(item.href, navText);
                          } else {
                            window.location.href = item.href;
                          }
                        }}
                        className={`text-5xl md:text-6xl font-light transition-colors duration-300 block ${
                          isActive
                            ? "text-[#1E90FF]"
                            : activeLink === "/contact"
                            ? "text-[#222] hover:text-[#1E90FF]"
                            : "text-white hover:text-[#1E90FF]"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="mt-auto">
            <p className="text-gray-500 text-sm tracking-wider mb-4">SOCIALS</p>
            <div className="flex gap-6 text-white">
              <a
                href="https://www.instagram.com/teerathbajaj/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-[#1E90FF] ${
                  activeLink === "/contact" ? "text-[#222]" : "text-white"
                }`}
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/teerath-bajaj-82358b1a7/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-[#1E90FF] ${
                  activeLink === "/contact" ? "text-[#222222]" : "text-white"
                }`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} />
      )}
    </>
  );
};

export default Header;

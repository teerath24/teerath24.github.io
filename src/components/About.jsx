import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import meImg from "../images/me.jpeg";

// Animated Ellipses Component
const AnimatedEllipsis = () => {
  return (
    <span className="inline-block">
      <span className="animate-ellipsis-1">.</span>
      <span className="animate-ellipsis-2">.</span>
      <span className="animate-ellipsis-3">.</span>
      <style jsx>{`
        @keyframes ellipsis {
          0%,
          100% {
            opacity: 0;
          }
          33% {
            opacity: 1;
          }
        }
        .animate-ellipsis-1 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 0s;
        }
        .animate-ellipsis-2 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 0.5s;
        }
        .animate-ellipsis-3 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 1s;
        }
      `}</style>
    </span>
  );
};

// Interactive Circle Button Component
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
      window.navigateWithSplash(href, "Contact");
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
      className="relative block w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden will-change-transform"
      style={{ transform: `translate(${xy.x}px, ${xy.y}px)` }}
    >
      <div className="absolute inset-0 bg-[#000000] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#1E90FF] transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
        />
        <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-light text-white">
          {text}
        </span>
      </div>
    </a>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Header />

      <style jsx>{`
        @keyframes ellipsis {
          0%,
          100% {
            opacity: 0;
          }
          33% {
            opacity: 1;
          }
        }
        .animate-ellipsis-1 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 0s;
        }
        .animate-ellipsis-2 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 0.5s;
        }
        .animate-ellipsis-3 {
          animation: ellipsis 1.5s infinite;
          animation-delay: 1s;
        }
      `}</style>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
          {/* Title Section - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-light leading-tight mb-8">
              Empowering brands to thrive
              <br />
              in the digital landspace
            </h1>

            {/* Horizontal line with circle icon - Moved to Right */}
            <div className="relative w-full max-w-6xl mx-auto">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -translate-y-1/2"></div>
              <div className="relative flex justify-end pr-16 md:pr-24 lg:pr-32">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#5A67D8] flex items-center justify-center flex-shrink-0 relative z-10">
                  <div>
                    <p className="text-8xl">🤙🏽</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Text and Image Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-32 items-start">
            {/* Left - Text Content */}
            <div className="flex flex-col justify-start">
              <div className="flex items-start gap-4 mb-8">
                <div className="text-2xl sm:text-3xl mt-1 flex-shrink-0">↘</div>
                <div>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                    I’m passionate about improving the lives of others by
                    designing and developing. I am constantly looking to learn
                    new things daily and be better than I was yesterday.
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 italic">
                    Always learning
                    <AnimatedEllipsis />
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-[800px] sm:h-[900px] lg:h-[1000px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                SRC={meImg}
                alt="City view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-32">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light mb-16">
              I can help you with <AnimatedEllipsis />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Design */}
              <div className="border-t border-gray-300 pt-8">
                <p className="text-sm text-gray-400 mb-4">01</p>
                <h3 className="text-3xl sm:text-4xl font-semibold mb-6">
                  Design
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Elevate your product with a user experience that feels
                  effortless and refined. I design intuitive interfaces that
                  captivate users and drive meaningful engagement. Together,
                  we’ll create a standout experience in a crowded digital world.
                </p>
              </div>

              {/* Development */}
              <div className="border-t border-gray-300 pt-8">
                <p className="text-sm text-gray-400 mb-4">02</p>
                <h3 className="text-3xl sm:text-4xl font-semibold mb-6">
                  Development
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Looking for a beautiful, user-friendly website that
                  strengthens your online presence? I craft custom web solutions
                  that reflect your brand and drive real impact. Enhance your
                  digital experience with professional, thoughtful development.
                </p>
              </div>

              {/* The Full Package */}
              <div className="border-t border-gray-300 pt-8">
                <p className="text-sm text-gray-400 mb-4">03</p>
                <h3 className="text-3xl sm:text-4xl font-semibold mb-6 flex items-center gap-2">
                  <span>✦</span> The full package
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  I handle the entire process, from initial concept to full
                  implementation. With strong design instincts and solid
                  development skills, I deliver work that makes an impact.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center justify-center text-center py-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12 max-w-3xl leading-tight">
              Ready to create something amazing together?
            </h2>
            <InteractiveCircleButton text="Get in touch" href="/contact" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

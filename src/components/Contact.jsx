import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import hanoiImg from "../images/hanoi.JPG";
import Header from "./Header";
import useScrollReveal from "../hooks/useScrollReveal";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-down ${
        type === "success" ? "bg-[#1E90FF]" : "bg-[#FF0000]"
      }`}
    >
      <span className="text-white text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const [buttonXY, setButtonXY] = useState({ x: 0, y: 0 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const buttonRef = useRef(null);

  useScrollReveal();

  const EMAILJS_SERVICE_ID = "service_wu0t4wm";
  const EMAILJS_TEMPLATE_ID = "template_dlo2pyh";
  const EMAILJS_PUBLIC_KEY = "qC84ybhIChErppYDC";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setButtonXY({
        x: (x / rect.width) * 12,
        y: (y / rect.height) * 12,
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          organization: formData.organization || "Not provided",
          services: formData.services || "Not specified",
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setToast({ message: "Your email has been sent!", type: "success" });

      setFormData({
        name: "",
        email: "",
        organization: "",
        services: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setToast({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] pt-16 md:pt-20 pb-12 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-center text-black">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Header />

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
                  className="
                    w-8 h-6 md:w-11 md:h-14 
                    bg-[#050507] 
                    rounded-xl 
                    border-2 border-white/30 
                    shadow-[inset_0_0_10px_rgba(0,0,0,1),0_0_12px_rgba(255,255,255,0.08)] 
                    flex-shrink-0
                  "
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🎞️ RIGHT MAIN FILM FRAME VIEWPORT */}
        <div className="relative flex-1 bg-[#1a1a1a] text-white overflow-hidden rounded-[2rem] m-2 md:m-3 border border-red-950/20 shadow-[inset_0_0_60px_rgba(180,30,30,0.15)] flex flex-col">
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(40,10,10,0.4)] rounded-[2rem]" />
          <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-25 bg-[radial-gradient(circle_at_center,rgba(255,100,100,0.15)_0%,rgba(0,0,0,0.6)_100%)]" />

          {/* 🚀 PAGE CONTENT WRAPPER */}
          <div className="relative z-10 overflow-y-auto flex-1 flex flex-col justify-between">
            <div>
              {/* Top Camera Status HUD Bar */}
              <div className="bg-black/90 text-white font-mono text-xs px-6 py-4 sm:px-10 flex justify-between items-center border-b border-white/10 tracking-widest uppercase">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-red-500 font-bold">REC</span>
                  <span className="text-gray-400 font-mono hidden sm:inline">
                    CONTACT_FORM.MP4
                  </span>
                </div>
                <div className="flex gap-4 sm:gap-8 text-gray-400 text-[11px] sm:text-xs">
                  <span className="text-gray-400">ISO 400</span>
                  <span className="text-gray-400">24.00 FPS</span>
                  <span className="hidden md:inline text-gray-400">
                    WB 5600K
                  </span>
                  <span className="hidden lg:inline font-semibold text-[#1E90FF]">
                    PRORES 422 HQ
                  </span>
                </div>
              </div>

              {/* Main Form & Info Content */}
              <div className="flex-1 flex items-center justify-center w-full py-16 md:py-24 animate-on-scroll">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24">
                    {/* Right Side - Contact Info */}
                    <div className="w-full lg:pl-8 xl:pl-16 order-1 lg:order-2">
                      <div className="mb-10 md:mb-12 flex items-center gap-6 md:gap-8">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                          <img
                            src={hanoiImg}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className="text-4xl sm:text-5xl md:text-6xl md:ml-16 md:mt-6"
                          style={{
                            transform: "rotate(72deg)",
                            display: "inline-block",
                          }}
                        >
                          ↘
                        </div>
                      </div>

                      <div className="mb-10 md:mb-12">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                          CONTACT DETAILS
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg mb-2 break-all">
                          teerath.bajaj24@gmail.com
                        </p>
                        <p className="text-sm sm:text-base md:text-lg">
                          +82 10 3172 1663
                        </p>
                      </div>

                      <div className="mb-10 md:mb-12">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                          BUSINESS DETAILS
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg">
                          Teerath Bajaj
                        </p>
                        <p className="text-sm sm:text-base md:text-lg">
                          Location: South Korea
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                          SOCIALS
                        </h3>
                        <div className="space-y-2">
                          <a
                            href="https://www.instagram.com/l4tebl00mr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm sm:text-base md:text-lg hover:text-[#1E90FF] transition-colors"
                          >
                            Instagram
                          </a>
                          <a
                            href="https://www.linkedin.com/in/teerath-bajaj-82358b1a7/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm sm:text-base md:text-lg hover:text-[#1E90FF] transition-colors"
                          >
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Left Side - Form */}
                    <div className="w-full order-2 lg:order-1 animate-on-scroll">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-12 md:mb-16 leading-tight animate-on-scroll">
                        Let's work
                        <br />t o g e t h e r
                      </h1>

                      <div className="space-y-8 md:space-y-12">
                        <div className="border-b border-gray-700 pb-6 md:pb-8">
                          <label className="block mb-3 md:mb-4">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              01
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                              What's your name?
                            </span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Joe Shmo *"
                            className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600"
                          />
                        </div>

                        <div className="border-b border-gray-700 pb-6 md:pb-8">
                          <label className="block mb-3 md:mb-4">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              02
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                              What's your email?
                            </span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="joe@shmo.com *"
                            className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600"
                          />
                        </div>

                        <div className="border-b border-gray-700 pb-6 md:pb-8">
                          <label className="block mb-3 md:mb-4">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              03
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                              What's the name of your organization?
                            </span>
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Joe & Shmo ®"
                            className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600"
                          />
                        </div>

                        <div className="border-b border-gray-700 pb-6 md:pb-8">
                          <label className="block mb-3 md:mb-4">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              04
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                              What services are you looking for?
                            </span>
                          </label>
                          <input
                            type="text"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            placeholder="Video Edit, Web Design, Web Development ..."
                            className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600"
                          />
                        </div>

                        <div className="border-b border-gray-700 pb-6 md:pb-8">
                          <label className="block mb-3 md:mb-4">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              05
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                              Your message
                            </span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Hello, can you help me with ... *"
                            rows="3"
                            className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600 resize-none"
                          />
                        </div>

                        <div className="flex justify-center pt-6 md:pt-8 animate-on-scroll">
                          <button
                            ref={buttonRef}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            onMouseMove={handleButtonMove}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => {
                              setButtonXY({ x: 0, y: 0 });
                              setIsButtonHovered(false);
                            }}
                            className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden transition-transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              transform: `translate(${buttonXY.x}px, ${buttonXY.y}px)`,
                            }}
                          >
                            <div className="absolute inset-0 bg-[#1E90FF] flex items-center justify-center">
                              <div
                                className="absolute inset-0 bg-[#57acff] transition-all duration-700 ease-out"
                                style={{
                                  transform: isButtonHovered
                                    ? "translateY(0%)"
                                    : "translateY(100%)",
                                }}
                              />
                              <span className="relative z-10 text-lg md:text-xl font-medium text-white focus:outline-none focus:ring-0 focus-visible:ring-0">
                                {isSubmitting ? "Sending..." : "Send it!"}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Original Custom Contact Footer + Camera HUD Footer Bar */}
            <div>
              <footer className="w-full py-6 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 text-xs sm:text-sm text-gray-500 border-t border-white/10">
                <div>
                  <p className="text-xs sm:text-sm">🤙🏽🤙🏽🤙🏽</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs">LOCAL TIME</p>
                  <p className="text-xs sm:text-sm">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className="flex gap-4 sm:gap-6 md:gap-8">
                  <a
                    href="https://www.instagram.com/l4tebl00mr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1E90FF] transition-colors text-xs sm:text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/teerath-bajaj-82358b1a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1E90FF] transition-colors text-xs sm:text-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </footer>

              {/* Bottom Camera HUD Bar */}
              <div className="bg-black text-gray-400 font-mono text-xs px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 gap-2">
                <span>FRAME: 01924</span>
                <div className="flex items-center gap-4">
                  <span>AUDIO: 48KHZ STEREO</span>
                  <span className="text-emerald-400 font-semibold">
                    SYNC: OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        @keyframes sprocketScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Contact;

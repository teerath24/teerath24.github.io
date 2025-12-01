import React, { useState, useRef } from "react";
import ausImage from "../images/aus.jpg";
import Header from "./Header";

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
  const [submitStatus, setSubmitStatus] = useState("");
  const buttonRef = useRef(null);

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

  const handleSubmit = () => {
    // Create mailto link with form data
    const subject = encodeURIComponent(
      `New Contact Form Submission from ${formData.name || "Website"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n\n` +
        `Email: ${formData.email}\n\n` +
        `Organization: ${formData.organization}\n\n` +
        `Services: ${formData.services}\n\n` +
        `Message:\n${formData.message}`
    );

    const mailtoLink = `mailto:teerath.bajaj24@gmail.com?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    setSubmitStatus("Opening email client...");

    // Clear form after a delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        organization: "",
        services: "",
        message: "",
      });
      setSubmitStatus("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      <Header />
      {/* Main Content - Fully Centered */}
      <div className="flex-1 flex items-center justify-center w-full py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24">
            {/* Right Side - Contact Info (Shows first on mobile) */}
            <div className="w-full lg:pl-8 xl:pl-16 order-1 lg:order-2">
              {/* Profile Image */}
              <div className="mb-10 md:mb-12 flex items-center gap-6 md:gap-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                  <img
                    src={ausImage}
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

              {/* Contact Details */}
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

              {/* Business Details */}
              <div className="mb-10 md:mb-12">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                  BUSINESS DETAILS
                </h3>
                <p className="text-sm sm:text-base md:text-lg">Teerath Bajaj</p>
                <p className="text-sm sm:text-base md:text-lg">
                  Location: South Korea
                </p>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 md:mb-4">
                  SOCIALS
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://www.instagram.com/teerathbajaj/"
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

            {/* Left Side - Form (Shows second on mobile) */}
            <div className="w-full order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-12 md:mb-16 leading-tight">
                Let's work
                <br />t o g e t h e r
              </h1>

              <div className="space-y-8 md:space-y-12">
                {/* Question 1 */}
                <div className="border-b border-gray-700 pb-6 md:pb-8">
                  <label className="block mb-3 md:mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm">01</span>
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

                {/* Question 2 */}
                <div className="border-b border-gray-700 pb-6 md:pb-8">
                  <label className="block mb-3 md:mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm">02</span>
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

                {/* Question 3 */}
                <div className="border-b border-gray-700 pb-6 md:pb-8">
                  <label className="block mb-3 md:mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm">03</span>
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

                {/* Question 4 */}
                <div className="border-b border-gray-700 pb-6 md:pb-8">
                  <label className="block mb-3 md:mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm">04</span>
                    <span className="block text-lg sm:text-xl md:text-2xl mt-2">
                      What services are you looking for?
                    </span>
                  </label>
                  <input
                    type="text"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    placeholder="Web Design, Web Development ..."
                    className="w-full bg-transparent border-none outline-none text-gray-400 text-base sm:text-lg placeholder-gray-600"
                  />
                </div>

                {/* Question 5 */}
                <div className="border-b border-gray-700 pb-6 md:pb-8">
                  <label className="block mb-3 md:mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm">05</span>
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

                {/* Submit Button - Dodger Blue */}
                <div className="flex justify-center pt-6 md:pt-8">
                  <button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    onMouseMove={handleButtonMove}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => {
                      setButtonXY({ x: 0, y: 0 });
                      setIsButtonHovered(false);
                    }}
                    className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden transition-transform duration-100"
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
                        Send it!
                      </span>
                    </div>
                  </button>
                </div>

                {/* Submit Status Message */}
                {submitStatus && (
                  <div className="text-center text-sm text-gray-400">
                    {submitStatus}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 text-xs sm:text-sm text-gray-500">
        <div>
          <p className="text-xs sm:text-sm">🤙🏾🤙🏾🤙🏾</p>
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
            href="https://www.instagram.com/teerathbajaj/"
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
    </div>
  );
};

export default Contact;

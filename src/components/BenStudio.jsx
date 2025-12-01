import React, { useRef, useState } from "react";
import benStudioVideo from "../images/ben_studio_demo.mov";

const BenStudio = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="md:p-12">
        <a
          href="/"
          onClick={handleBackToHome}
          className="inline-flex items-center text-white hover:text-cyan-400 transition-colors"
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

      {/* Video Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-6xl w-full">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Ben Studio
            </h1>
            <p className="text-xl text-gray-400">Interaction & Development</p>
          </div>

          {/* Video Player */}
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

            {/* Custom Play Button Overlay (shows when paused) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-12 h-12 text-gray-900 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mt-8 text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default BenStudio;

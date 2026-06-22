import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import clockedOutImg from "../images/clockedout.png";

// 1. FIXED: Wrapped the times in quotes so they are valid strings
const videos = [
  {
    id: 1,
    youtubeId: "xpywNV_1w_I",
    band: "PlanetShakers",
    song: "Come Right Now",
    time: "3:27",
  },
  {
    id: 2,
    youtubeId: "K5PkTZhT_KI",
    band: "Paramore",
    song: "Misery Business",
    time: "3:26",
  },
  {
    id: 3,
    youtubeId: "3y-eoHwDTOU",
    band: "Twenty One Pilots",
    song: "Ride",
    time: "3:38",
  },
];

const VideoCard = ({ video, index }) => {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  return (
    <div
      className="animate-on-scroll"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Video Container */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={embedUrl}
            band={video.band}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt={video.band}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hovered ? "opacity-30" : "opacity-20"
              }`}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hovered ? "bg-[#1E90FF] scale-110" : "bg-white/20"
                }`}
              >
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Card Info */}
      <div className="pt-6 border-b border-gray-300 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h3
              className={`text-3xl sm:text-4xl font-semibold transition-colors duration-300 ${
                hovered ? "text-[#1E90FF]" : "text-gray-900"
              }`}
            >
              {video.band}
            </h3>
            <p className="text-gray-500 text-base mt-1">{video.song}</p>
          </div>
          <p className="text-gray-400 text-sm">{video.time}</p>
        </div>
      </div>
    </div>
  );
};

const Drums = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
          {/* Hero */}
          <div className="mb-8 animate-on-scroll">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-tight mb-6">
              I also play
              <br />
              the drums
            </h1>
            <p className="text-gray-500 text-lg sm:text-xl max-w-xl">
              A highly effective method for ensuring my neighbors never ask me
              for favors.
            </p>
          </div>

          {/* Divider with clockedout image circle */}
          <div className="flex items-center gap-6 mb-16 animate-on-scroll">
            <p className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
              Sessions
            </p>
            <div className="flex-1 h-px bg-gray-300 relative">
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 z-10">
                <img
                  src={clockedOutImg}
                  alt="Clocked Out"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mt-24">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>

          {/* Divider hanglooooose */}
          <div className="mt-32 flex items-center mb-16 animate-on-scroll">
            <div className="w-full h-px bg-gray-300 relative">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#1E90FF] flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-6xl sm:text-7xl md:text-8xl select-none">
                  🤙🏽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Drums;

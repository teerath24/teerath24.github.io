import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import clockedOutImg from "../images/clockedout.png";

const videos = [
  {
    id: 1,
    youtubeId: "RzDWJeEl8-g",
    band: "MONTREAL Vlog",
    time: "12:53",
  },
  {
    id: 2,
    youtubeId: "gWJpJ3KstTA",
    band: "NYC Vlog",
    time: "13:20",
  },
  {
    id: 3,
    youtubeId: "W042glN63pE",
    band: "MANILA Vlog",
    time: "13:31",
  },
  {
    id: 4,
    youtubeId: "zlVTNveri5A",
    band: "PHILADEPHIA Vlog",
    time: "07:57",
  },
  {
    id: 5,
    youtubeId: "RMS3RHASDE8",
    band: "5 STAR HOTEL Vlog",
    song: "Living in a 5 Star Hotel in Vietnam",
    time: "19:03",
  },
  {
    id: 6,
    youtubeId: "xpywNV_1w_I",
    band: "PlanetShakers",
    song: "Come Right Now",
    time: "3:27",
  },
  {
    id: 7,
    youtubeId: "K5PkTZhT_KI",
    band: "Paramore",
    song: "Misery Business",
    time: "3:26",
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
            title={video.band}
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

const Videos = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#070709] pt-16 md:pt-20 pb-12 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-center text-black">
      <Header />

      {/* 🎞️ MAIN FILM CANOPY CONTAINER */}
      <div className="relative w-full max-w-[1600px] rounded-[2.5rem] bg-[#0f0f13] border border-white/15 overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col md:flex-row items-stretch">
        {/* 🎬 FULL HEIGHT SPROCKET HOLE STRIP */}
        <div className="relative w-full md:w-28 bg-[#0a0a0d] border-b md:border-b-0 md:border-r border-white/20 flex md:flex-col items-center justify-between p-4 md:py-8 z-30 flex-shrink-0">
          {/* Vertical Kodak Film Stock Stamp */}
          <span className="hidden md:block font-mono text-[11px] font-semibold tracking-[0.35em] text-gray-400 transform -rotate-90 whitespace-nowrap my-auto opacity-80">
            KODAK 7219 · ISO 400
          </span>

          {/* Slow Continuous Animated Sprocket Holes */}
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
        <div className="relative flex-1 bg-[#f5f5f5] overflow-hidden rounded-[2rem] m-2 md:m-3 border border-red-950/20 shadow-[inset_0_0_60px_rgba(180,30,30,0.15)] flex flex-col">
          {/* Super 8 Lens Halation & Glow Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(40,10,10,0.4)] rounded-[2rem]" />

          {/* Subtle Grain & Halation Effect */}
          <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-25 bg-[radial-gradient(circle_at_center,rgba(255,100,100,0.15)_0%,rgba(0,0,0,0.6)_100%)]" />

          {/* 🚀 PAGE CONTENT WRAPPER */}
          <div className="relative z-10 overflow-y-auto flex-1">
            {/* Top Camera Status HUD Bar */}
            <div className="bg-black/90 text-white font-mono text-xs px-6 py-4 sm:px-10 flex justify-between items-center border-b border-white/10 tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-red-500 font-bold">REC</span>
                <span className="text-gray-400 font-mono hidden sm:inline">
                  VIDEOS_REEL.MP4
                </span>
              </div>
              <div className="flex gap-4 sm:gap-8 text-gray-400 text-[11px] sm:text-xs">
                <span className=" font-semibold">ISO 400</span>
                <span>24.00 FPS</span>
                <span className="hidden md:inline">WB 5600K</span>
                <span className="hidden lg:inline">35MM ANAMORPHIC</span>
              </div>
            </div>

            <div className="py-16 md:py-20">
              <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
                {/* Hero */}
                <div className="mb-8 animate-on-scroll">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-tight mb-6">
                    I create
                    <br />
                    videos
                  </h1>
                  <p className="text-gray-500 text-4xl sm:text-5xl max-w-xl font-mono mt-4">
                    {"<> 🎬 </>"}
                  </p>
                </div>

                {/* Divider with clockedout image circle */}
                <div className="flex items-center gap-6 mb-16 animate-on-scroll">
                  <p className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    clips
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
                <div className="mt-32 flex items-center gap-6 mb-16 animate-on-scroll">
                  <div className="flex-1 h-px bg-gray-300 relative">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#1E90FF] flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-6xl sm:text-7xl md:text-8xl select-none">
                        🤙🏽
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    edits
                  </p>
                </div>
              </div>
            </div>

            <Footer />

            {/* Film Footer Camera HUD Bar */}
            <div className="bg-black text-gray-400 font-mono text-xs px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 gap-2">
              <span>FRAME: 01924</span>
              <div className="flex items-center gap-4">
                <span>AUDIO: 48KHZ STEREO</span>
                <span className="text-emerald-400 font-semibold">SYNC: OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for Sprocket Movement */}
      <style>{`
        @keyframes sprocketScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Videos;

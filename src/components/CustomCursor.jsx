import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Crisp Center Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-[#1E90FF] rounded-full transition-[width,height,scale] duration-200 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          scale: isClicking ? 0.75 : 1,
        }}
      />

      {/* Outer Ring — Expands automatically whenever ANY link or clickable item is hovered */}
      <div
        id="custom-cursor-ring"
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-[#1E90FF]/60 transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isClicking ? "scale-90 border-[#1E90FF]" : ""
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Global CSS to make the ring expand instantly via CSS when hovering interactives */}
      <style>{`
        body:has(a:hover, button:hover, [role="button"]:hover, .cursor-pointer:hover) #custom-cursor-ring {
          width: 64px !important;
          height: 64px !important;
          border-color: #1E90FF !important;
          background-color: rgba(30, 144, 255, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;

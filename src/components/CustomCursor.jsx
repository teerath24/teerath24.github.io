import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track when hovering over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.onclick ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Crisp Center Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 bg-[#1E90FF] rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isClicking ? "scale-75" : "scale-100"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Fast & Snappy Outer Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#1E90FF]/60 transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? "w-12 h-12 border-[#1E90FF] bg-[#1E90FF]/10 scale-110"
            : isClicking
              ? "w-8 h-8 border-[#1E90FF] scale-90"
              : "w-9 h-9"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};

export default CustomCursor;

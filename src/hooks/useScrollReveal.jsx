import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".animate-on-scroll");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
          section.classList.add("is-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useScrollReveal;

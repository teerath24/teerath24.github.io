import React, { useState, useEffect } from "react";

const WelcomeSplash = ({
  onComplete,
  text = "Hello",
  isInitialLoad = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(
    isInitialLoad ? "show" : "enter"
  ); // enter, show, exit

  const greetings = [
    "Hello",
    "你好",
    "Hola",
    "안녕하세요",
    "Xin chào",
    "Olá",
    "السلام عليكم",
    "नमस्ते",
    "Bonjour",
    "こんにちは",
    "Ciao",
    "สวัสดี",
  ];

  useEffect(() => {
    // If it's not the initial load, use scroll animation
    if (!isInitialLoad) {
      // Start at "enter" position, then trigger animation
      const startTimer = setTimeout(() => {
        setAnimationPhase("show");

        const showTimer = setTimeout(() => {
          setAnimationPhase("exit");

          const exitTimer = setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 800);

          return () => clearTimeout(exitTimer);
        }, 800);

        return () => clearTimeout(showTimer);
      }, 100); // Small delay to ensure enter state is set

      return () => clearTimeout(startTimer);
    }

    // Initial load: cycle through greetings, then exit
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === greetings.length - 1) {
          const exitTimer = setTimeout(() => {
            setAnimationPhase("exit");

            const completeTimer = setTimeout(() => {
              setIsVisible(false);
              onComplete();
            }, 800);

            return () => clearTimeout(completeTimer);
          }, 0);

          clearInterval(interval);
          return () => clearTimeout(exitTimer);
        }

        setFade(false);

        setTimeout(() => {
          setFade(true);
        }, 120);

        return prev + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isInitialLoad, onComplete]);

  // Determine transform based on animation phase
  const getTransform = () => {
    if (animationPhase === "enter") {
      return "translateY(100%)"; // Start below viewport
    } else if (animationPhase === "show") {
      return "translateY(0%)"; // Center in viewport
    } else if (animationPhase === "exit") {
      return "translateY(-100%)"; // Exit upward to reveal page below
    }
    return "translateY(0%)";
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black flex items-center justify-center
        transition-transform duration-[800ms] ease-in-out z-50
        ${!isVisible ? "opacity-0" : "opacity-100"}
      `}
      style={{
        transform: getTransform(),
      }}
    >
      <h1
        className={`
          text-4xl md:text-5xl font-bold text-[#1E90FF]
          transition-opacity duration-200
          ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        {isInitialLoad ? greetings[index] : text}
      </h1>
    </div>
  );
};

export default WelcomeSplash;

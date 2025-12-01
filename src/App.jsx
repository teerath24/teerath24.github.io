import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import About from "./components/About";
import Work from "./components/Work";
import WelcomeSplash from "./components/WelcomeSplash";
import Home from "./components/Home";
import BenStudio from "./components/BenStudio";
import "./index.css";

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashText, setSplashText] = useState("Hello");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsInitialLoad(false);
  };

  const handleNavigation = (path, text) => {
    setSplashText(text);
    setShowSplash(true);

    setTimeout(() => {
      navigate(path);
      setTimeout(() => {
        setShowSplash(false);
      }, 800);
    }, 100);
  };

  // Expose navigation function globally for components to use
  React.useEffect(() => {
    window.navigateWithSplash = handleNavigation;
  }, []);

  return (
    <div className="App bg-gray-900 min-h-screen">
      {showSplash ? (
        <WelcomeSplash
          onComplete={handleSplashComplete}
          text={splashText}
          isInitialLoad={isInitialLoad}
        />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <main>
                  <Home />
                </main>
              </>
            }
          />
          <Route path="/ben-studio" element={<BenStudio />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import DefaultDisplay from "../../components/defaultdisplay/DefaultDisplay";
import StopwatchDisplay from "../../components/stopwatchdisplay/StopwatchDisplay";
import "./Home.css";

function Home() {
  const [mode, setMode] = useState("default");

  // Initialize from localStorage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [showButtons, setShowButtons] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const showButtonGroup = () => {
    setShowButtons(true);

    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    const timeout = setTimeout(() => {
      setShowButtons(false);
    }, 5000);

    setHideTimeout(timeout);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleTap = (e) => {
      if (e.target.closest(".button-group")) return;
      showButtonGroup();
    };

    document.addEventListener("click", handleTap);

    return () => {
      document.removeEventListener("click", handleTap);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const renderContent = () => {
    switch (mode) {
      case "default":
        return <DefaultDisplay />;
      case "stopwatch":
        return <StopwatchDisplay />;
      default:
        return null;
    }
  };

  return (
    <div className={`home ${theme}`}>
      <div className={`button-group ${showButtons ? "visible" : "hidden"}`}>
        <button onClick={() => setMode("default")}>Default</button>
        <button onClick={() => setMode("stopwatch")}>Stopwatch</button>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
      <div className="page-content">{renderContent()}</div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import DefaultDisplay from "../../components/defaultdisplay/DefaultDisplay";
import StopwatchDisplay from "../../components/stopwatchdisplay/StopwatchDisplay";
import "./Home.css";

function Home() {
  const [mode, setMode] = useState("default"); // 'default' or 'stopwatch'
  const [showButtons, setShowButtons] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  // Handle displaying buttons on tap
  const showButtonGroup = () => {
    setShowButtons(true);

    // Clear previous timeout if any
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    // Set timeout to hide buttons after 3 seconds
    const timeout = setTimeout(() => {
      setShowButtons(false);
    }, 5000);

    setHideTimeout(timeout);
  };

  // Set up tap listener
useEffect(() => {
  const handleTap = (e) => {
    // If the tap is inside the button-group, ignore it
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

  // Render the appropriate component
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
    <div className="home">
      <div className={`button-group ${showButtons ? "visible" : "hidden"}`}>
        <button onClick={() => setMode("default")}>Default</button>
        <button onClick={() => setMode("stopwatch")}>Stopwatch</button>
      </div>
      <div className="page-content">{renderContent()}</div>
    </div>
  );
}

export default Home;
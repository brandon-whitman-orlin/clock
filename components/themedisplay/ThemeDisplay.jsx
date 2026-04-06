import React from "react";
import "./ThemeDisplay.css";

function ThemeDisplay({ theme, setTheme }) {
  return (
    <div className="default-display theme-display">
      <p className="title">Theme</p>

      <div className="secondary theme-buttons">
        <button
          className={theme === "light" ? "active" : ""}
          onClick={() => setTheme("light")}
        >
          Light
        </button>

        <button
          className={theme === "dark" ? "active" : ""}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>

        <button
          className={theme === "system" ? "active" : ""}
          onClick={() => setTheme("system")}
        >
          System
        </button>
      </div>
    </div>
  );
}

export default ThemeDisplay;
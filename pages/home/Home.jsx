import React, { useState, useEffect } from "react";
import DefaultDisplay from "../../components/defaultdisplay/DefaultDisplay";
import StopwatchDisplay from "../../components/stopwatchdisplay/StopwatchDisplay";
import ThemeDisplay from "../../components/themedisplay/ThemeDisplay";
import "./Home.css";

function Home() {
  // Theme state: "light" | "dark" | "system"
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return "system";
  });

  // Track system preference (for "system" mode)
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  // Listen for OS theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e) => {
      setSystemPrefersDark(e.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Resolve actual theme applied to UI
  const resolvedTheme =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`home ${resolvedTheme} ${theme === "system" ? "system" : ""}`}
    >
      {" "}
      <div className="page-content">
        <section className="page-section">
          <DefaultDisplay />
        </section>

        <section className="page-section">
          <StopwatchDisplay />
        </section>

        <section className="page-section">
          <ThemeDisplay theme={theme} setTheme={setTheme} />
        </section>
      </div>
    </div>
  );
}

export default Home;

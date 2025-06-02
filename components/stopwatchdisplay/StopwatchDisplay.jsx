import React, { useState, useEffect, useRef } from "react";
import "./StopwatchDisplay.css"; // Keep this for custom styles

function StopwatchDisplay() {
  const [elapsed, setElapsed] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 10); // update every 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="default-display"> {/* same class as Clock for consistency */}
      <p className="clock stopwatch">{formatTime(elapsed)}</p>
      <div className="secondary stopwatch-buttons">
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Stop</button>
        )}
        <button
          onClick={() => {
            setElapsed(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopwatchDisplay;

import React, { useState, useEffect, useRef } from "react";
import "./TimerDisplay.css"; // optional

function TimerDisplay() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-display">
      <p className="timer">{formatTime(elapsed)}</p>
      <div className="timer-buttons">
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

export default TimerDisplay;

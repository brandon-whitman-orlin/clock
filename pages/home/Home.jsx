import React, { useState } from "react";
import DefaultDisplay from "../../components/defaultdisplay/DefaultDisplay";
import TimerDisplay from "../../components/timerdisplay/TimerDisplay";
import "./Home.css";

function Home() {
  const [mode, setMode] = useState("default"); // 'default' or 'timer'

  const renderContent = () => {
    switch (mode) {
      case "default":
        return <DefaultDisplay />;
      case "timer":
        return <TimerDisplay />;
      default:
        return null;
    }
  };

  return (
    <div className="home">
      {/* <div className="button-group">
        <button onClick={() => setMode("default")}>Default</button>
        <button onClick={() => setMode("timer")}>Timer</button>
      </div> */}
      <div className="page-content">{renderContent()}</div>
    </div>
  );
}

export default Home;

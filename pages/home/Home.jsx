import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <p>Current Width: {windowSize.width}px</p>
      <p>Current Height: {windowSize.height}px</p>
    </div>
  );
}

export default Home;

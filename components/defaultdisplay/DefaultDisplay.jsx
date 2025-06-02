import React, { useState, useEffect } from "react";
import "./DefaultDisplay.css";

// Weather icons
import { ReactComponent as ClearDay } from "../../assets/icons/clear-day.svg";
import { ReactComponent as ClearNight } from "../../assets/icons/clear-night.svg";
import { ReactComponent as CloudyDay } from "../../assets/icons/cloudy-day.svg";
import { ReactComponent as CloudyNight } from "../../assets/icons/cloudy-night.svg";
import { ReactComponent as Fog } from "../../assets/icons/fog.svg";
import { ReactComponent as Drizzle } from "../../assets/icons/drizzle.svg";
import { ReactComponent as Rain } from "../../assets/icons/rain.svg";
import { ReactComponent as Snow } from "../../assets/icons/snow.svg";
import { ReactComponent as Thunderstorm } from "../../assets/icons/thunderstorm.svg";

// Simplified weather categories
const simplifiedWeatherMap = {
  Clear: [0],
  Cloudy: [1, 2, 3],
  Fog: [45, 48],
  Drizzle: [51, 53, 55, 56, 57],
  Rain: [61, 63, 65, 66, 67, 80, 81, 82],
  Snow: [71, 73, 75, 77, 85, 86],
  Thunderstorm: [95, 96, 99],
};

// Get label from weather code
const getSimplifiedCondition = (code) => {
  for (const [label, codes] of Object.entries(simplifiedWeatherMap)) {
    if (codes.includes(code)) return label;
  }
  return "Unknown";
};

// Determine if it's day or night based on hours (basic logic)
const isDaytime = (date) => {
  const hour = date.getHours();
  return hour >= 6 && hour < 18; // 6 AM to 6 PM is day
};

// Choose the appropriate icon based on condition and time
const getWeatherIcon = (condition, time) => {
  const daytime = isDaytime(time);

  switch (condition) {
    case "Clear":
      return daytime ? <ClearDay /> : <ClearNight />;
    case "Cloudy":
      return daytime ? <CloudyDay /> : <CloudyNight />;
    case "Fog":
      return <Fog />;
    case "Drizzle":
      return <Drizzle />;
    case "Rain":
      return <Rain />;
    case "Snow":
      return <Snow />;
    case "Thunderstorm":
      return <Thunderstorm />;
    default:
      return null;
  }
};

function DefaultDisplay() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: null,
    condition: "",
  });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const tempC = data.current_weather.temperature;
        const weatherCode = data.current_weather.weathercode;
        const condition = getSimplifiedCondition(weatherCode);

        setWeather({
          temperature: Math.round((tempC * 9) / 5 + 32),
          condition,
        });
      } catch (error) {
        console.error("Weather fetch failed:", error);
        setWeather({
          temperature: null,
          condition: "",
        });
      }
    };

    const getLocationAndFetch = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.warn("Geolocation error:", error);
            setLocationError("Location access denied");
          }
        );
      } else {
        setLocationError("Geolocation not supported");
      }
    };

    getLocationAndFetch();
    const intervalId = setInterval(getLocationAndFetch, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date) => date.toLocaleDateString();

  return (
    <div className="default-display">
      <p className="clock">{formatTime(time)}</p>
      <div className="secondary">
        <p className="date">{formatDate(time)}</p>
        <p className="weather">
          {locationError ? (
            locationError
          ) : weather.temperature !== null ? (
            <>
              {weather.temperature}°F
              <span className="weather-icon">
                {getWeatherIcon(weather.condition, time)}
              </span>
              {weather.condition}
            </>
          ) : (
            "Loading..."
          )}
        </p>
      </div>
    </div>
  );
}

export default DefaultDisplay;

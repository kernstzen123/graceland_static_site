import { useEffect, useState } from "react";
import "./WeatherWidget.css";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Paarl coordinates: -33.7242, 18.9558
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.7242&longitude=18.9558&current_weather=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        }
      })
      .catch((err) => console.error("Weather fetch failed", err));
  }, []);

  if (!weather) return null;

  const temp = Math.round(weather.temperature);
  const speed = Math.round(weather.windspeed);
  
  // WMO weather interpretation codes
  const code = weather.weathercode;
  let condition = "Clear";
  if (code === 0) condition = "Clear";
  else if (code <= 3) condition = "Cloudy";
  else if (code <= 48) condition = "Foggy";
  else if (code <= 67) condition = "Rain";
  else if (code >= 95) condition = "Storm";

  return (
    <div className="weather-widget">
      <div className="weather-widget-top">
        <span className="weather-widget-live"></span>
        <span className="weather-widget-title">LIVE IN PAARL</span>
      </div>
      <div className="weather-widget-main">
        <div className="weather-widget-temp">{temp}°</div>
        <div className="weather-widget-details">
          <div>{condition.toUpperCase()}</div>
          <div>WIND {speed} KM/H</div>
        </div>
      </div>
    </div>
  );
}

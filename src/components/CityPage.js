import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloud, WiNightClear, WiDayCloudy } from "react-icons/wi";
import { FaLongArrowAltUp, FaLongArrowAltDown, FaArrowLeft } from "react-icons/fa";
import "./CityPage.css";

function CityPage() {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const apiKey = "124f44d28d6a4fefa27132448241505";
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch city weather");
        }
        const data = await response.json();
        const cityData = {
          name: data.location.name.toUpperCase(),
          weather: data.current.condition.text.toUpperCase(),
          temperature: data.current.temp_c,
          weatherIcon: data.current.condition.icon,
        };
        setCity(cityData);
      } catch (error) {
        console.error("Error fetching city weather:", error);
      }
    };

    fetchCityWeather();
  }, [cityName]);

  if (!city) {
    return <div>Loading...</div>;
  }

  let weatherClass = "";

  if (typeof city.temperature === 'number') {
    if (city.temperature > 25) {
      weatherClass = "weather-hot";
    } else if (city.temperature > 15) {
      weatherClass = "weather-warm";
    } else if (city.temperature >= 5) {
      weatherClass = "weather-mild";
    } else {
      weatherClass = "weather-cold";
    }
  } else {
    console.error("Temperature is not a valid number:", city.temperature);
  }

  const maxTemp = city.temperature + 5;
  const minTemp = city.temperature - 5;

  return (
    <div className={`city-page ${weatherClass}`}>
      <h1>{city.name}</h1>
      <div className="weather-info">
        <p>{city.weather}</p>
        <div className="temperature-info">
          <div className="current-temp">
            <p>{city.temperature}</p>
          </div>
          <div className="temp-info">
            <p>°C</p>
            <div>
              <FaLongArrowAltUp size={20} /> {maxTemp}
            </div>
            <div>
              <FaLongArrowAltDown size={20} /> {minTemp}
            </div>
          </div>
        </div>
        <img src={city.weatherIcon} alt="Weather Icon" />
      </div>
      <div className="time-info">
        <div>
          <p>dawn</p>
          <WiDayCloudy size={50} />
          <p>{city.temperature - 3}°C</p>
        </div>
        <div>
          <p>morning</p>
          <WiDaySunny size={50} />
          <p>{city.temperature + 5}°C</p>
        </div>
        <div>
          <p>afternoon</p>
          <WiDayCloudy size={50} />
          <p>{city.temperature - 4}°C</p>
        </div>
        <div>
          <p>night</p>
          <WiNightClear size={50} />
          <p>{city.temperature - 2}°C</p>
        </div>
      </div>
    </div>
  );
}

export default CityPage;

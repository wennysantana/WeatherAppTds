import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEarthSharp  } from "react-icons/io5";
import '../components/HomePage.css'; 



function HomePage() {
    const navigate = useNavigate();
  
    const handleCityClick = (cityName) => {
      navigate(`/city/${cityName}`);
    };
  
    return (
      <div className="homepage">
        <div className="weather-heading">
          <p>
            <span className="weather-text">WEATHER</span><br />
            <span className="city-text">select a city</span>
          </p>
        </div>
        <IoEarthSharp  className="custom-icon" size={220} />
        <div className="city-list">
          <button onClick={() => handleCityClick('Dallol')}>Dallol</button>
          <button onClick={() => handleCityClick('Fairbanks')}>Fairbanks</button>
          <button onClick={() => handleCityClick('Londres')}>Londres</button>
          <button onClick={() => handleCityClick('Recife')}>Recife</button>
          <button onClick={() => handleCityClick('Vancouver')}>Vancouver</button>
          <button onClick={() => handleCityClick('Yakutsk')}>Yakutsk</button>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  
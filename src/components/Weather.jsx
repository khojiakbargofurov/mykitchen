import React, { useEffect, useState } from "react";

const API_KEY = "dad6e6f3f14055c518035d58be7f4331";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const getWeather = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ob havo ma'lumotlari yuklanmadi");
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    };

    const location = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolokatsiya topilmadi");
      }
    };

    location();
  }, []);
 
  console.log(weather);
  
  return (
    <div className="sm:flex hidden">
      <div>
        {error ? (
          <div id="weather">{error}</div>
        ) : weather ? (
          <div id="weather" className="flex items-center justify-center">
            <div className="font-bold ">{weather.name}:</div>
            <div>
              {weather.main?.temp}°C <br />
            </div>
          </div>
        ) : (
          <div id="weather">Yuklanmoqda...</div>
        )}
      </div>
    </div>
  );
}

export default Weather;
import React, { useEffect, useState } from 'react';
import './weatherPage.css';

function WeatherPage() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const lat = 10.762622;
  const lon = 106.660172;
  const apiKey = '3484882c3c67bfac004337c69b2748cf';

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data.list.slice(0, 7)); 
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu thời tiết:', error);
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);
  const getDayName = (dt) => {
    const date = new Date(dt * 1000);
    const dayIndex = date.getDay();
    const days = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'];
    return days[dayIndex];
  };

  if (loading) {
    return <div>Đang tải dữ liệu thời tiết...</div>;
  }

  return (
    <div className="weather-container">
      <h1 className="weather-title">THỜI TIẾT</h1>
      <div className="weather-forecast">
        {forecast.map((day, index) => {
          const dayName = getDayName(day.dt);
          const humidity = day.humidity;
          const minTemp = Math.round(day.temp.min);
          const maxTemp = Math.round(day.temp.max);
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          const description = day.weather[0].description;

          return (
            <div key={index} className="weather-day">
              <div className="weather-day-name">{dayName}</div>
              <img 
                src={iconUrl} 
                alt={description} 
                className="weather-icon"
              />
              <div className="weather-humidity">Độ ẩm: {humidity}%</div>
              <div className="weather-temp">{maxTemp}° / {minTemp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherPage;

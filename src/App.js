import React, { useState } from "react";

const api = {
  key: process.env.REACT_APP_api.key,
  base: "https://api.openweathermap.org/data/2.5/"
};

const formDate = date => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let week_day = week_days[date.getDay()]; // getDay() returns a value bw 0 & 6

  let month_day = date.getDate();

  let month = months[date.getMonth()]; // getMonth() returns a value bw 0 & 11

  let year = date.getFullYear();

  return `${week_day} ${month_day} ${month} ${year}`;
};

export default function App() {
  const [place, setPlace] = useState("");

  const [weather, setWeather] = useState({});

  const getWeather = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(data => {
          setWeather(data);

          setPlace("");

          console.log(data);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className={typeof weather.main !== "undefined" ? (weather.main.temp > 20 ? "app hot" : "app") : "app"}>
      <main>
        <div className="search">
          <input type="text" className="search-input" placeholder="city/country...." onChange={e => setPlace(e.target.value)} value={place} onKeyPress={getWeather} />
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="place-date">
              <div className="place">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{formDate(new Date())}</div>
            </div>

            <div className="weather">
              <div className="temperature">{Math.round(weather.main.temp)} °C</div>
              <div className="weather-condition">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

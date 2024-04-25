import { useEffect } from "react";
import { useState } from "react";
import { API_KEY, GET_CITY_WEATHER } from "../utils";
import WeatherCard from "./WeatherCard";

const Body = () => {
  const [myLocation, setMyLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getCurrentLocationWeather();
  }, [myLocation]);

  const getLocation = async () => {
    try {
      const url = await fetch("https://geolocation-db.com/json/");
      const data = await url.json();
      setMyLocation(data);
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const getCurrentLocationWeather = async () => {
    try {
      if (myLocation) {
        const weatherApiUrl = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation?.latitude}&lon=${myLocation?.longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await weatherApiUrl.json();
        setWeatherData(data);
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const handleInpChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setShowAlert(true);
      return;
    }
    getCityWeather(inputValue);
  };

  const getCityWeather = async (city) => {
    try {
      const url = await fetch(GET_CITY_WEATHER + city);

      if (!url.ok) {
        if (url.status === 404) {
          console.log("Please input a valid city.");
        } else {
          throw new Error("Something went wrong.");
        }
      }
      const data = await url.json();
      setSearchData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex justify-between py-4  items-center px-4 md:px-8 border-b">
        <h2 className="text-2xl font-bold">
          Trip<span className="text-yellow-500">Easy</span>
        </h2>
        {weatherData && (
          <div className="text-sm flex items-center gap-2 justify-end">
            <span className="font-medium text-gray-600 hidden md:block">
              Current location
            </span>
            <span className=" text-blue-600">
              {weatherData?.name + ", " + weatherData?.sys?.country}
            </span>
            <i className="fa-solid fa-location-dot text-blue-600"></i>{" "}
          </div>
        )}
      </div>
      <div className="flex md:justify-end justify-center md:px-8 ">
        <form
          action=""
          className=" rounded-md flex flex-col gap-2"
          onSubmit={handleFormSubmit}
        >
          <div className="flex gap-2 items-center">
            <div className="border rounded-md flex flex-row whitespace-nowrap">
              <input
                placeholder="input city name"
                type="text"
                value={inputValue}
                onChange={handleInpChange}
                className=" p-2 rounded-md md:w-72 w-auto outline-none"
              />
              <button
                type="submit"
                className=" py-2 rounded-md bg-blue-600 text-white px-4"
              >
                Get weather
              </button>
            </div>
          </div>
          {showAlert && inputValue === "" && (
            <p className="text-red-400 text-xs">Please input valid city name</p>
          )}
          {searchData?.cod === "404" && inputValue !== "" && (
            <p className="text-red-400 text-xs">City not found</p>
          )}
        </form>
      </div>
      <div className="flex gap-6  justify-between px-3 md:px-8">
        {searchData?.name && (
          <WeatherCard weatherData={searchData} isSearch={true} />
        )}
      </div>
      {weatherData && (
        <div className="flex gap-6  justify-between px-3 md:px-8">
          <WeatherCard weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default Body;

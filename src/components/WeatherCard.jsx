import PropTypes from "prop-types";
import clearSkyImg from "../assets/clear-sky.png";
import sky from "../assets/clouds.png";

const WeatherCard = ({ weatherData, isSearch }) => {
  console.log(weatherData);
  return (
    <div
      className={
        !isSearch
          ? "flex gap-6 items-center text-sm  rounded-md w-full justify-around m-auto p-8 bg-gray-100"
          : weatherData.main.temp >= 15 && weatherData.main.temp <= 25
          ? "flex gap-6 items-center text-sm  rounded-md w-full justify-around m-auto p-8 bg-green-100"
          : "flex gap-6 items-center text-sm  rounded-md w-full justify-around m-auto p-8 bg-gray-100"
      }
    >
      <div className="w-52 flex justify-center items-center flex-col gap-4">
        <img
          src={
            weatherData?.weather?.length > 0 &&
            weatherData?.weather[0]?.main === "Clear"
              ? clearSkyImg
              : sky
          }
          alt=""
          className="w-36 h-36"
        />
        <span className="text-base">
          {weatherData &&
          weatherData.main &&
          weatherData.main.temp !== undefined ? (
            weatherData.main.temp >= 15 && weatherData.main.temp <= 25 ? (
              <span className="text-nowrap">Good weather for vacation ✅</span>
            ) : weatherData.main.temp < 15 ? (
              <span className="text-nowrap">Weather is too cold ❄️</span>
            ) : (
              <span className="text-nowrap">Weather is too hot 🔥</span>
            )
          ) : (
            "Loading..."
          )}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className=" font-medium mb-4 text-xl">
          {isSearch ? (
            <span className="text-gray-500 flex gap-2 items-center">
              Search result for{" "}
              <i className="fa-solid text-sm fa-location-dot text-blue-600"></i>{" "}
              <span className="text-black font-semibold">
                {weatherData?.name}{" "}
              </span>
            </span>
          ) : (
            <span>Current weather</span>
          )}
        </h2>
        <span className="flex items-center gap-2">
          <span className="w-40"> Weather condition </span>
          <span className="text-gray-500">
            {weatherData?.weather && weatherData?.weather[0]?.main}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-40">Temperature </span>
          <span className="text-gray-500">
            {weatherData?.main?.temp + " ℃"}
          </span>
          <div className="text-xs ml-2">
            ({" "}
            <span className="text-xs text text-orange-300">
              Max {weatherData?.main?.temp_max + " ℃ , "}
            </span>
            <span className="text-xs text-green-400">
              Min {weatherData?.main?.temp_min + " ℃"}
            </span>{" "}
            )
          </div>
        </span>

        <span className="flex items-center gap-2">
          <span className="w-40">Feels like </span>
          <span className="text-gray-500">
            {weatherData?.main?.feels_like + " ℃"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-40"> Humidity </span>

          <span className="text-gray-500">
            {weatherData?.main?.humidity + " ℃"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-40"> Visibility </span>

          <span className="text-gray-500">
            {weatherData?.visibility && weatherData?.visibility / 1000 + " km"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-40">Wind speed </span>
          <span className="text-gray-500">
            {weatherData?.wind ? weatherData?.wind?.speed + " kmph" : "N/A"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-40">Sea level </span>
          <span className="text-gray-500">
            {weatherData?.main?.grnd_level
              ? weatherData?.main?.grnd_level + " m"
              : "N/A"}
          </span>
        </span>
        <div className="flex gap-8">
          <span className="flex items-center gap-2">
            Sunrise{" "}
            <span className="text-gray-500">
              {weatherData?.sys?.sunrise
                ? new Date(
                    weatherData?.sys?.sunrise * 1000
                  )?.toLocaleTimeString() + " AM"
                : "N/A"}
            </span>
          </span>
          <span className="flex items-center gap-2">
            Sunset{" "}
            <span className="text-gray-500">
              {weatherData?.sys?.sunset
                ? new Date(
                    weatherData?.sys?.sunset * 1000
                  )?.toLocaleTimeString() + " PM"
                : "N/A"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.object.isRequired,
  isSearch: PropTypes.string.isRequired,
};

export default WeatherCard;

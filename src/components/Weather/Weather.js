const Weather = ({ weatherDetails, url }) => {
  return (
    <div>
      <div>
        <p>{`Temperature: ${(weatherDetails.main.temp - 273).toFixed(
          2,
        )} celcius `}</p>
        <img src={`${url}${weatherDetails.weather[0].icon}@2x.png`} alt="" />
        <p>wind is {weatherDetails.wind.speed}m/s</p>
      </div>
    </div>
  )
}
export default Weather

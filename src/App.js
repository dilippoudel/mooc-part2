import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_COUNTRIES_API, BASE_URL_WEATHER_API } from './Constant'
import Button from './components/Button/Button'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherDetails, setWeatherDetails] = useState(null)
  const countryHook = () => {
    axios
      .get(BASE_URL_COUNTRIES_API)
      .then((response) => setCountries(response.data))
  }
  const weatherHook = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    if (filteredCountries.length === 1) {
      axios
        .get(
          `${BASE_URL_WEATHER_API}${API_KEY}&q=${filteredCountries[0].capital}`,
        )
        .then((response) => setWeatherDetails(response.data))
    }
    return
  }

  const searchTextHandler = (e) => {
    setSearchText(e.target.value)
  }
  const filtering = () => {
    const data = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase()),
    )
    setFilteredCountries(data)
  }

  useEffect(countryHook, [])
  useEffect(filtering, [searchText, countries])
  useEffect(weatherHook, [filteredCountries])

  const renderingCountries = () => {
    if (searchText.length === 0) {
      return
    }
    if (filteredCountries.length > 10) {
      return <p>too many render</p>
    }

    if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((c, i) => (
            <div key={i}>
              <p>
                {c.name.common}
                <Button
                  onClick={() => setSearchText(c.name.common)}
                  text="show"
                />
              </p>
            </div>
          ))}
        </div>
      )
    }
    if (filteredCountries.length === 1) {
      return (
        <div>
          {filteredCountries.map((country, i) => {
            return (
              <div key={i}>
                <h4>{country.name.common}</h4>
                <h5>Languages</h5>

                {Object.values(country.languages).map((lang, i) => {
                  return (
                    <ul key={i}>
                      <li>{lang}</li>
                    </ul>
                  )
                })}
              </div>
            )
          })}
          <img src={`${filteredCountries[0].flags.png}`} alt="" />
          <h2>Weather in {filteredCountries[0].capital}</h2>

          {weatherDetails !== null ? (
            <div>
              <p>{`Temperature: ${(weatherDetails.main.temp - 273).toFixed(
                2,
              )} celcius `}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}
                alt=""
              />
              <p>wind is {weatherDetails.wind.speed}m/s</p>
            </div>
          ) : (
            'loading'
          )}
        </div>
      )
    }
    return
  }

  return (
    <div>
      <div>
        <label htmlFor="find">Find Countries</label>
        <input type="text" value={searchText} onChange={searchTextHandler} />
      </div>
      {renderingCountries()}
    </div>
  )
}

export default App

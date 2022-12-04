import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherDetails, setWeatherDetails] = useState({})
  const countryHook = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => setCountries(response.data))
  }
  const weatherHook = () => {
    if (filteredCountries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=5d33be1060cd03ed695aaece10625218&q=${filteredCountries[0].capital}`,
        )
        .then((response) => setWeatherDetails(response.data))
    }
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
    // 5d33be1060cd03ed695aaece10625218

    if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((c, i) => (
            <div key={i}>
              <p>
                {c.name.common}
                <button onClick={() => setSearchText(c.name.common)}>
                  show
                </button>
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
          {/* <p>{weatherDetails !== null ? weatherDetails.main.temp : ''}</p> */}
          {/* I want to render the temperature of city here............ */}
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

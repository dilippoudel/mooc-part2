import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BASE_URL_COUNTRIES_API,
  BASE_URL_WEATHER_API,
  BASE_URL_OPEN_WEATHER_ICON,
} from './Constant'
import Form from './components/Form/Form'
import Language from './components/Language/Language'
import Country from './components/Country/Country'
import Weather from './components/Weather/Weather'
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
        <Country
          filteredCountries={filteredCountries}
          searchText={setSearchText}
        />
      )
    }

    if (filteredCountries.length === 1) {
      return (
        <div>
          <Language countries={filteredCountries} />

          <img src={`${filteredCountries[0].flags.png}`} alt="" />
          <h2>Weather in {filteredCountries[0].capital}</h2>
          {weatherDetails !== null ? (
            <Weather
              weatherDetails={weatherDetails}
              url={BASE_URL_OPEN_WEATHER_ICON}
            />
          ) : (
            'loading'
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <Form
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {renderingCountries()}
    </div>
  )
}

export default App

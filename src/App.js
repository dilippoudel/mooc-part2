import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const hooks = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => setCountries(response.data))
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
            <h4 key={i}>{c.name.common}</h4>
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
        </div>
      )
    }
    return
  }
  useEffect(hooks, [])
  useEffect(filtering, [searchText, countries])

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

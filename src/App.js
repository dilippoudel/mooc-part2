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

  useEffect(filtering, [searchText])

  const renderingCountries = () => {
    // if (searchText.length === 0) {
    //   return
    // }
    if (filteredCountries.length > 10) {
      return <p>too many render</p>
    }
    if (filteredCountries.length < 10) {
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
            console.log(country)
            return (
              <div key={i}>
                <h4>{country.name.common}</h4>
                <h5>Languages</h5>
                {/* I want render the list of all languages of a specific county:
                For eg, When I enter swi in search text box, it should render 4 languages:   */}
                {/* {country.languages.map((l) => console.log(l))} */}
              </div>
            )
          })}
        </div>
      )
    }
    return
  }
  useEffect(hooks, [])
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

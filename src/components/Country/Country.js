const Country = ({ countries }) => {
  return (
    <div>
      <h4>{countries[0].name.common}</h4>
      <h5>Languages</h5>

      {Object.values(countries[0].languages).map((lang, i) => {
        return (
          <ul key={i}>
            <li>{lang}</li>
          </ul>
        )
      })}
    </div>
  )
}
export default Country

import Button from '../Button/Button'

const Country = ({ filteredCountries, searchText }) => {
  return (
    <div>
      {filteredCountries.map((c, i) => (
        <div key={i}>
          <p>
            {c.name.common}
            <Button onClick={() => searchText(c.name.common)} text="show" />
          </p>
        </div>
      ))}
    </div>
  )
}
export default Country

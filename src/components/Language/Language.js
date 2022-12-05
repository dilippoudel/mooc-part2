import List from '../List/List'

const Language = ({ countries }) => {
  return (
    <div>
      <h4>{countries[0].name.common}</h4>
      <h5>Languages</h5>

      <List items={Object.values(countries[0].languages)} />
    </div>
  )
}
export default Language

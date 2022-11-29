const Persons = ({ lists, searchText }) => {
  return (
    <div>
      {lists
        .filter((person) =>
          person.name.toLowerCase().includes(searchText.toLowerCase()),
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  )
}
export default Persons

const Persons = ({ lists, searchText, onDelete }) => {
  return (
    <div>
      {lists
        .filter((person) =>
          person.name.toLowerCase().includes(searchText.toLowerCase()),
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </p>
        ))}
    </div>
  )
}
export default Persons

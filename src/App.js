import { useState } from 'react'
const Header = ({ text }) => <h2>{text}</h2>
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    setPersons((prevState) => [...prevState, { name: newName }])
    setNewName('')
  }
  const changeNameHandler = (e) => setNewName(e.target.value)

  return (
    <div>
      <Header text="PhoneBook" />
      <form onSubmit={addPerson}>
        <div>
          <input type="text" value={newName} onChange={changeNameHandler} />
          <div>
            <button type="submit">add</button>
          </div>
        </div>
      </form>
      <Header text="Number" />
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}
export default App

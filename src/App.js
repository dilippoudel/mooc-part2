import { useState } from 'react'
const Header = ({ text }) => <h2>{text}</h2>
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123', id: 1 },
  ])
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchContactByName, setSearchContactByName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const isAlreadyExist = persons.find(
      (person) => person.name === newContact.name,
    )
    if (isAlreadyExist) {
      alert(`${newContact.name} is already added to phonebook`)
      return
    }
    let newId = persons.map((person) => person.id)
    let maxId = Math.max(...newId)
    setPersons((prevState) => [
      ...prevState,
      { name: newContact.name, number: newContact.number, id: maxId + 1 },
    ])

    setNewContact({ name: '', number: '' })
  }
  const changeNameHandler = (e) => {
    let createNew = {
      ...newContact,
      name: e.target.value,
    }
    setNewContact(createNew)
  }
  const changeNumberHandler = (e) => {
    let createNew = {
      ...newContact,
      number: e.target.value,
    }
    setNewContact(createNew)
  }
  const searchTextHandler = (e) => {
    setSearchContactByName(e.target.value)
    console.log(e.target.value)
    console.log(searchContactByName)
  }

  console.log(persons)
  return (
    <div>
      <Header text="Phonebiik" />
      <input
        type="text"
        placeholder="Search contact..."
        onChange={searchTextHandler}
      />
      <Header text="add a new" />
      <form onSubmit={addPerson}>
        <div>
          Name:{' '}
          <input
            type="text"
            value={newContact.name}
            onChange={changeNameHandler}
          />
        </div>
        <div>
          Number:{' '}
          <input
            type="text"
            value={newContact.number}
            onChange={changeNumberHandler}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text="Numbers" />
      <div>
        {persons
          .filter((person) =>
            person.name
              .toLowerCase()
              .includes(searchContactByName.toLowerCase()),
          )
          .map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
      </div>
    </div>
  )
}
export default App

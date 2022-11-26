import { useState } from 'react'
const Header = ({ text }) => <h2>{text}</h2>
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123' },
  ])
  const [newContact, setNewContact] = useState({ name: '', number: '' })

  const addPerson = (e) => {
    e.preventDefault()
    const isAlreadyExist = persons.find(
      (person) => person.name === newContact.name,
    )
    if (isAlreadyExist) {
      alert(`${newContact.name} is already added to phonebook`)
      return
    }
    setPersons((prevState) => [
      ...prevState,
      { name: newContact.name, number: newContact.number },
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
  return (
    <div>
      <Header text="PhoneBook" />
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
      <Header text="Number" />
      <div>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  )
}
export default App

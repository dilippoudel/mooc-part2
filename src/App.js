import { useState } from 'react'
import PersonForm from './components/PersonForm/PersonForm'
import Filter from './components/Filter/Filter'
import Persons from './components/Person/Person'
import axios from 'axios'
import { useEffect } from 'react'
const App = () => {
  const [persons, setPersons] = useState(null)
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchContactByName, setSearchContactByName] = useState('')

  // getting data from server
  const getAllPerson = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }
  useEffect(getAllPerson, [])

  //create and save data to server
  const createAndSavePerson = (newPerson) => {
    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      setPersons((prevState) => [prevState, response.data])
    })
  }
  const addPerson = (e) => {
    e.preventDefault()
    const isAlreadyExist = persons.find(
      (person) => person.name === newContact.name,
    )
    if (isAlreadyExist) {
      alert(`${newContact.name} is already added to phonebook`)
      return
    }
    createAndSavePerson(newContact)

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
      <h2>PhoneBook</h2>
      <Filter setSearchContactByName={setSearchContactByName} />
      <h3>Add New Contact</h3>
      <PersonForm
        addPerson={addPerson}
        changeNameHandler={changeNameHandler}
        newContactName={newContact.name}
        newContactPhone={newContact.number}
        changeNumberHandler={changeNumberHandler}
      />
      <h3>Numbers</h3>
      <div>
        {persons !== null ? (
          <Persons lists={persons} searchText={searchContactByName} />
        ) : (
          'loading'
        )}
      </div>
    </div>
  )
}
export default App

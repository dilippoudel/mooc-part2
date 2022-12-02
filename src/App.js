import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm/PersonForm'
import Filter from './components/Filter/Filter'
import Persons from './components/Person/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchContactByName, setSearchContactByName] = useState('')
  const hook = () => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

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
        <Persons lists={persons} searchText={searchContactByName} />
      </div>
    </div>
  )
}
export default App

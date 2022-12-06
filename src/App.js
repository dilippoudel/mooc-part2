import personService from './services/phonebook'
import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm/PersonForm'
import Filter from './components/Filter/Filter'

import Persons from './components/Person/Person'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchContactByName, setSearchContactByName] = useState('')

  useEffect(() => {
    personService.getAllPerson().then((response) => setPersons(response))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const isAlreadyExist = persons.find(
      (person) => person.name === newContact.name,
    )
    if (isAlreadyExist) {
      alert(`${newContact.name} is already added to phonebook`)
      return
    }
    personService.createAndSavePerson(newContact).then((response) => {
      setPersons(persons.concat(response))
      setNewContact({ name: '', number: '' })
    })
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

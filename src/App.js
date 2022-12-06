import personService from './services/phonebook'
import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm/PersonForm'
import Filter from './components/Filter/Filter'

import Persons from './components/Person/Person'
import Notification from './components/Notification/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchContactByName, setSearchContactByName] = useState('')
  const [message, setMessage] = useState(null)

  const addPerson = (e) => {
    e.preventDefault()
    const findExistedPerson = persons.find(
      (person) => person.name === newContact.name,
    )
    if (findExistedPerson) {
      if (
        window.confirm(
          `${newContact.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .replaceNumber(findExistedPerson.id, newContact)
          .then((response) => {
            let contacts = persons.filter(
              (person) => person.id !== findExistedPerson.id,
            )
            setPersons(contacts.concat(response.data))

            setNewContact({ name: '', number: '' })
          })
      }

      return
    }
    personService.createAndSavePerson(newContact).then((response) => {
      setMessage(`Added ${response.name}`)
      setTimeout(() => setMessage(null), 3000)
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
  const phoneDeleteHandler = (id) => {
    let itemToDelete = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${itemToDelete.name} ?  `)) {
      personService.deletePerson(id).then(() => {
        let updatedState = persons.filter((person) => person.id !== id)
        setPersons(updatedState)
      })
    }
  }
  useEffect(() => {
    personService.getAllPerson().then((response) => setPersons(response))
  }, [])

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={message} />
      <Filter setSearchContactByName={setSearchContactByName} />

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
          <Persons
            lists={persons}
            searchText={searchContactByName}
            onDelete={(id) => phoneDeleteHandler(id)}
          />
        ) : (
          'loading'
        )}
      </div>
    </div>
  )
}
export default App

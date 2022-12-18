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
  const [notification, setNotification] = useState(null)

  const addPerson = async (e) => {
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
        try {
          await personService.replaceNumber(findExistedPerson.id, newContact)
          let allContacts = await personService.getAllPerson()
          setPersons(allContacts)
          setNewContact({ name: '', number: '' })
        } catch (error) {
          let errorMessage = {
            ...notification,
            error: `Information of ${newContact.name} has already been removed from server.`,
          }
          setNotification(errorMessage)
          setTimeout(() => setNotification(null), 3000)
        }
      }

      return
    }
    personService
      .createAndSavePerson(newContact)
      .then((response) => {
        let newState = {
          ...notification,
          success: `Added ${response.name}`,
        }
        setNotification(newState)
        setTimeout(() => setNotification(null), 3000)
        setPersons(persons.concat(response))
        setNewContact({ name: '', number: '' })
      })
      .catch((error) => {
        let errorMessage = {
          ...notification,
          error: error.response.data.error,
        }
        setNotification(errorMessage)
        setTimeout(() => setNotification(null), 3000)
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
      <Notification message={notification} />
      <Filter setSearchContactByName={setSearchContactByName} />

      <PersonForm
        addPerson={addPerson}
        changeNameHandler={changeNameHandler}
        newContactName={newContact.name}
        newContactPhone={newContact.number}
        changeNumberHandler={changeNumberHandler}
      />
      <h3>Numbers</h3>

      {persons !== null ? (
        <Persons
          lists={persons}
          searchText={searchContactByName}
          onDelete={(id) => phoneDeleteHandler(id)}
        />
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}
export default App

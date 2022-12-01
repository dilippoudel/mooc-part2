import axios from 'axios'
import { useState, useEffect } from 'react'
import Note from './components/Note/Note'
function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fullfiled')
      setNotes(response.data)
    })
  }
  useEffect(hook, [])
  console.log('renders', notes.length, ' notes')

  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'show Important' : 'show all'}
      </button>
      <ul>
        {notesToShowAll.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  )
}

export default App

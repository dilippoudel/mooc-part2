import noteService from './services/notes'
import { useState, useEffect } from 'react'
import Note from './components/Note/Note'
import Notification from './components/Notification/Notification'
// footer component
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  )
}
function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toogleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changeNote = { ...note, important: !note.important }
    noteService
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch((err) => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`,
        )
        setTimeout(() => setErrorMessage(null), 3000)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  return (
    <div>
      <h1>Notes Application</h1>
      <Notification message={errorMessage} />
      <form action="" onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'show Important' : 'show all'}
      </button>
      <ul>
        {notesToShowAll.map((note) => (
          <Note
            key={note.id}
            note={note}
            toogleImportance={() => toogleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App

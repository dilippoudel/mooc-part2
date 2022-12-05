import noteService from './services/notes'
import { useState, useEffect } from 'react'
import Note from './components/Note/Note'
function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App

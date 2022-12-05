const Note = ({ note, toogleImportance }) => {
  const label = note.important ? 'make not important' : 'Make important'
  return (
    <div>
      <h4 className="title">{note.date}</h4>
      <p>{note.content}</p>
      <button onClick={toogleImportance}>{label}</button>
    </div>
  )
}
export default Note

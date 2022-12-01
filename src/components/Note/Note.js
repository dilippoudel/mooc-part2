const Note = ({ note }) => {
  return (
    <div>
      <h4 className="title">{note.date}</h4>
      <p>{note.content}</p>
    </div>
  )
}
export default Note

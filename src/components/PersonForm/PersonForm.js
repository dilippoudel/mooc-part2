export function PersonForm({
  addPerson,
  newContactName,
  changeNumberHandler,
  changeNameHandler,
  newContactPhone,
}) {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:{' '}
          <input
            type="text"
            value={newContactName}
            onChange={changeNameHandler}
          />
        </div>
        <div>
          Number:{' '}
          <input
            type="text"
            value={newContactPhone}
            onChange={changeNumberHandler}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
export default PersonForm

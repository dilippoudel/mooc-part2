const Filter = (props) => {
  const searchTextHandler = (e) => {
    props.setSearchContactByName(e.target.value)
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search contact..."
        onChange={searchTextHandler}
      />
    </div>
  )
}
export default Filter

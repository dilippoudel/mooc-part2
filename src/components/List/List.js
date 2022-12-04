const List = ({ items }) => {
  return items.map((item, i) => {
    return (
      <ul key={i}>
        <li>{item}</li>
      </ul>
    )
  })
}
export default List

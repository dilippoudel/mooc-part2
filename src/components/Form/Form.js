const Form = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="find">Find Countries</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}
export default Form

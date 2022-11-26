import Part from '../Part/Part'

const Contents = ({ contents }) => {
  const totalExe = contents.map((c) => c.exercises)
  const sum = totalExe.reduce((a, b) => a + b)
  console.log(sum)
  return (
    <div>
      {contents.map((content) => (
        <Part items={content} key={content.id} />
      ))}
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    </div>
  )
}

export default Contents

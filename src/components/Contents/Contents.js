import Part from '../Part/Part'

const Contents = ({ contents }) => {
  const totalExercises = contents
    .map((c) => c.exercises)
    .reduce((a, b) => a + b)

  return (
    <div>
      {contents.map((content) => (
        <Part items={content} key={content.id} />
      ))}
      <p>
        <b>Total of {totalExercises} exercises</b>
      </p>
    </div>
  )
}

export default Contents

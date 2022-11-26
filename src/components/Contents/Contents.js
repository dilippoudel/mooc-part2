import Part from '../Part/Part'

const Contents = ({ contents }) => {
  return (
    <div>
      {contents.map((content) => (
        <Part items={content} key={content.id} />
      ))}
    </div>
  )
}

export default Contents

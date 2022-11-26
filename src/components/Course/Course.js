import Contents from '../Contents/Contents'
import Header from '../Header/Header'

const Course = ({ course }) => {
  let { parts } = course
  console.log('coming from course components', parts)
  return (
    <div>
      <Header header={course.name} />
      <Contents contents={parts} />
    </div>
  )
}
export default Course

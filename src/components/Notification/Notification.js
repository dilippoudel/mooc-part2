import './Notification.css'
const Notification = ({ message }) => {
  if (message == null) {
    return
  }
  return (
    <div className="notification">
      <p className="text">{message}</p>
    </div>
  )
}
export default Notification

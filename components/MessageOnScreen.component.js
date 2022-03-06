import ErrorIcon from './svg/ErrorIcon.component'
import SuccessIcon from './svg/SuccessIcon.component'
import ExIcon from './svg/ExIcon.component'

export default function MessageOnScreen({ message: { type, message }, onClick }) {
  if (!message.length) {
    return null
  }

  const backgrounColor = (type === 'success')
    ? 'message-success'
    : 'message-error'

  const errorList = message.map((msg, i) => {
    return (
      <p key={i} className="font-m m-l-20">{ msg }</p>
    )
  })

  return (
    <div className={`message-container pointer ${backgrounColor}`} onClick={onClick}>
      <div>
        { type === 'error'
          ? <ErrorIcon border={true} />
          : <SuccessIcon border={true} />
        }
      </div>

      <div className="fd-column m-l-5">
        { errorList }
      </div>

      <div className="message-close m-l-5">
        <ExIcon />
      </div>
    </div>
  )
}

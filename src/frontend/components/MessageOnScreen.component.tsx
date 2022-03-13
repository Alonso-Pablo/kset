import ErrorIcon from '@frontend/components/icons/ErrorIcon.component'
import SuccessIcon from '@frontend/components/icons/SuccessIcon.component'
import ExIcon from '@frontend/components/icons/ExIcon.component'
import { Message } from '@frontend/ts/types'

interface MessageOnScreen {
  message: Message;
  onClick?: () => void
}

export default function MessageOnScreen({ message: { type, message }, onClick = ()=>{} }: MessageOnScreen) {
  
  if (message.length === 0) {
    return <></>
  }

  const backgrounColor = (type === 'success') ? 'message-success' : 'message-error'

  const messageList = message.map((msg, i) => {
    return (
      <p key={i} className="font-m m-l-20">{ msg }</p>
    )
  })

  return (
    <div className={`message-container pointer ${backgrounColor}`} onClick={onClick}>
      <div>
        {
          type === 'error'
            ? <ErrorIcon className="message-icon" />
            : <SuccessIcon className="message-icon" />
        }
      </div>

      <div className="fd-column m-l-5">
        { messageList }
      </div>

      <div className="message-close m-l-5">
        <ExIcon />
      </div>
    </div>
  )
}

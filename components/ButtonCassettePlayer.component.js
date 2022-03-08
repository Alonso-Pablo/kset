import { useState } from "react"

export default function ButtonCassettePlayer({
  id,
  children,
  onClick = ()=>{},
  disabled = false,
  innerRef,
}) {

  const [ pressed, setPressed ] = useState(disabled) // If the button is disabled it will be pressed.

  function handleClick() {
    if (disabled) {
      if (pressed) {
        setPressed(true)
      }
      return
    }

    setPressed(!pressed)

    onClick()
  }

  const classAnimation = disabled ? '' : (pressed ? 'btn-squeezing' : '')
  return (
    <div
      id={id}
      role="button"
      className="button-cassette-player-back pointer"
      ref={innerRef}
      onClick={handleClick}
    >
      <div className={`button-cassette-player-front ${classAnimation}`}>
        { children }
      </div>
    </div>
  )
}

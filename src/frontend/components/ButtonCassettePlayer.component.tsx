import { ReactElement, RefObject, useState } from "react"

interface ButtonCassettePlayerProps {
  id?: string;
  children: ReactElement;
  onClick?: ()=>void;
  disabled?: boolean;
  innerRef?: RefObject<HTMLDivElement>;
}

export default function ButtonCassettePlayer({
  id,
  children,
  onClick = ()=>{},
  disabled = false,
  innerRef,
}: ButtonCassettePlayerProps) {

  const [ pressed, setPressed ] = useState<boolean>(disabled)

  function handleOnClick() {
    if (disabled) {
      if (pressed) {
        setPressed(true)
      }
      return
    }

    setPressed(!pressed)

    onClick()
  }

  const classAnimation = disabled ? '' : ( pressed ? 'btn-squeezing' : '' )
  return (
    <div
      id={id}
      role="button"
      className="button-cassette-player-back pointer"
      ref={innerRef}
      onClick={handleOnClick}
    >
      <div className={`button-cassette-player-front ${classAnimation}`}>
        { children }
      </div>
    </div>
  )
}

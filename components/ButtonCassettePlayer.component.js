export default function ButtonCassettePlayer({
  children,
  onClick,
  id,
}) {
  return (
    <div id={id} onClick={onClick} className="button-cassette-player-back pointer">
      <div className="button-cassette-player-front">
        { children }
      </div>
    </div>
  )
}

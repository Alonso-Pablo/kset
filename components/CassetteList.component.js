import CassetteItem from './CassetteItem.component'

export default function CassetteList({
  cassettes,
  className,
}) {
  return (
    <div className={className}>
      {
        cassettes.map(({ id, author, songName }) => <CassetteItem key={id} id={id} songName={songName} author={author} />)
      }
    </div>
  )
}

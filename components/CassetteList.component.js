import CassetteItem from './CassetteItem.component'

export default function CassetteList({
  data,
  className,
}) {
  return (
    <div className={className}>
      {
        data.map(({ id, author, songName }) => <CassetteItem key={id} id={id} songName={songName} author={author} />)
      }
    </div>
  )
}


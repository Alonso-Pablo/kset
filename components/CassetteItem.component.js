import Link from 'next/link'
import Cassette from './Cassette.component'
 
export default function CassetteItem({
  id,
  cassette: {
    color,
  } = {},
  songName,
  author,
}) {
  return (
    <Link href={`/play?song=${id}`}>
      <a className="cassette-item">
        <div>
          <Cassette color={color} className="cassette-cassette" />
        </div>
        <p className="cassette-title m-l-20 font-m">
          { `${songName} - ${author}` }
        </p>
      </a>
    </Link>
  )
}


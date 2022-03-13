import Link from 'next/link'
import Cassette from '@frontend/components/icons/CassetteItemIcon.component'
import { CassetteColors } from "@shared/models/cassette";

interface CassetteItemProps {
  id: string;
  songName: string;
  author: string
}

export default function CassetteItem({ id, songName,author }: CassetteItemProps) {
  const colors: CassetteColors = {
    body: '#3E3B3C',
    holes: '#241E20',
    strips: {
      upper: '#EEF2FF',
      middle: '#FE4D1B',
      bottom: '#EEF2FF',
    },
  }

  return (
    <Link href={`/play?song=${id}`}>
      <a className="cassette-item">
        <div>
          <Cassette colors={colors} className="cassette-cassette" />
        </div>
        <p className="cassette-title m-l-20 font-m">
          { `${songName} - ${author}` }
        </p>
      </a>
    </Link>
  )
}


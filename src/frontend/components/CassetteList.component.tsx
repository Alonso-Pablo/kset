import CassetteItem from './CassetteItem.component'
import { CassetteInterface } from '@shared/models/cassette'

interface CassetteListProps {
  cassettes: CassetteInterface[];
  className: string;
}

export default function CassetteList({ cassettes, className }: CassetteListProps) {
  return (
    <div className={className}>
      {
        cassettes.map(
          ({ id, author, songName }) => <CassetteItem key={id} id={id!} songName={songName} author={author} />
        )
      }
    </div>
  )
}

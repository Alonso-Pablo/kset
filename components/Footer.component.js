import Link from 'next/link'
import HouseIcon from './svg/HouseIcon.component'
import MagnifyingGlassIcon from './svg/MagnifyingGlassIcon.component'
import CassetteIcon from './svg/CassetteIcon.component'
import UserIcon from './svg/UserIcon.component'

export default function Footer({ page='Home' }) {
  return (
    <div>
      <Link href="/">
        <a>
          <HouseIcon active={page==='Home' ? true : false} />
        </a>
      </Link>

      <Link href="/search">
        <a>
          <MagnifyingGlassIcon active={page==='search' ? true : false} />
        </a>
      </Link>

       <Link href="/play">
        <a>
          <CassetteIcon active={page==='play' ? true : false} />
        </a>
       </Link>     

       <Link href="/profile">
        <a>
          <UserIcon active={page==='profile' ? true : false} />
        </a>
       </Link> 
    </div>
  )
}


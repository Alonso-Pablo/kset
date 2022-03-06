import Link from 'next/link'
import HouseIcon from './svg/HouseIcon.component'
import MagnifyingGlassIcon from './svg/MagnifyingGlassIcon.component'
import CassetteIcon from './svg/CassetteIcon.component'
import UserIcon from './svg/UserIcon.component'

export default function Footer({ page='Home' }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link href="/">
          <a className="footer-item">
            <HouseIcon active={page==='Home' ? true : false} />
          </a>
        </Link>

        <Link href="/search">
          <a className="footer-item">
            <MagnifyingGlassIcon active={page==='search' ? true : false} />
          </a>
        </Link>

         <Link href="/play">
          <a className="footer-item">
            <CassetteIcon active={page==='play' ? true : false} />
          </a>
         </Link>     

         <Link href="/profile">
          <a className="footer-item">
            <UserIcon active={page==='profile' ? true : false} />
          </a>
         </Link> 
      </div>
    </footer>
  )
}


import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Icons
import HouseIcon from '@frontend/components/icons/HouseIcon.component'
import MagnifyingGlassIcon from '@frontend/components/icons/MagnifyingGlassIcon.component'
import CassetteIcon from '@frontend/components/icons/CassetteIcon.component'
import UserIcon from '@frontend/components/icons/UserIcon.component'

export default function Footer() {
  const { pathname } = useRouter()
  const [ path, setPath ] = useState(pathname)

  useEffect(() => {
    setPath(pathname)
  },[pathname])

  return (
    <footer className="footer">
      <nav className="footer-container">
        <li>
          <Link href="/">
            <a className="footer-item">
              <HouseIcon fillIcon={path === '/'} />
            </a>
          </Link>
        </li>

        <li>
          <Link href="/search">
            <a className="footer-item">
              <MagnifyingGlassIcon fillIcon={path === '/search'} />
            </a>
          </Link>
        </li>

        <li>
          <Link href="/play">
            <a className="footer-item">
              <CassetteIcon fillIcon={path === '/play'} />
            </a>
          </Link>     
        </li>

        <li>
          <Link href="/profile">
            <a className="footer-item">
              <UserIcon fillIcon={path === '/profile'} />
            </a>
          </Link> 
        </li>
      </nav>
    </footer>
  )
}

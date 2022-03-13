import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

// Services and Interfaces
import { getCassettes } from '@frontend/services/cassette.service'
import { CassetteInterface } from '@shared/models/cassette'

// Icons
import LogoSvg from '@frontend/components/icons/LogoSvg.component'
import SignOutIcon from '@frontend/components/icons/SignOutIcon.component'

// Other Components
import Searcher from '@frontend/components/Searcher.component'
import Button from '@frontend/components/Button.component'
import CassetteList from '@frontend/components/CassetteList.component'

interface NavBarProps {
  hideSearchInput: boolean
}

export default function Navbar({ hideSearchInput }: NavBarProps): JSX.Element {
  const { data: session, status } = useSession()

  const [ cassettes, setCassettes ] = useState<CassetteInterface[]>([])

  async function saveCassettes() {
    setCassettes(await getCassettes())
  }

  useEffect(() => {
    saveCassettes()
  },[])

  const [ showSuggestions, setShowSuggestions ] = useState<boolean>(false)

  function displaySuggestions(inputValue: string | undefined): void {
    if (!inputValue) {
      setShowSuggestions(false)
      return
    }

    setShowSuggestions(true)
  }

  function hiddeSuggestions(): void {
    setShowSuggestions(false)
  }

  return (
    <header>
      <nav className="navbar">
        <ul className="navbar-container">
          <li className="w-278">
            <Link href="/">
              <a>
                <LogoSvg />
              </a>
            </Link>
          </li>

          <li className="navbar-items-desktop">
            <div className="navbar-search">
              {
                !hideSearchInput && 
                  <>
                    <Searcher displaySuggestions={displaySuggestions} onBlur={hiddeSuggestions} placeholder="Buscar cassette..."/>
                    { showSuggestions && <CassetteList cassettes={cassettes} className="navbar-suggestions p-lr-20" /> }
                  </>
              }
            </div>

            {
              (!session && status === 'unauthenticated') && 
                <div className="navbar-sign">
                  <Link href="/signin">
                    <a className="w-100 font-m">
                      Iniciar sesión
                    </a>
                  </Link>
                    
                  <Button className="m-l-20">
                    <Link href="/signup">
                      <a className="font-m txt-bright-rose">
                        Registrate
                      </a>
                    </Link>
                  </Button>
                </div>
            }
          </li>

          {
            (session && status === 'authenticated') &&
              <li onClick={() => signOut()} className="navbar-signout w-278 pointer">
                <SignOutIcon />
              </li>
          }
        </ul>
      </nav>
    </header>
  )
}


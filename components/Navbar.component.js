import Link from 'next/link'
import LogoSvg from './svg/LogoSvg.component'
import ButtonThreeDimension from './ButtonThreeDimension.component'
import Searcher from './Searcher.component'
import { signOut, useSession } from 'next-auth/react'
import SignOutIcon from './svg/SignOutIcon.component'

export default function Navbar({ page }) {
  const { data: session, status } = useSession()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/">
          <a className="w-278">
            <LogoSvg width="100" height="30" />
          </a>
        </Link>

        <div className="navbar-items-desktop">
          <div className="navbar-search">
            {
              page !== 'search'
              ? <Searcher placeholder="Buscar cassette..."/>
              : ""
            }
          </div>

          {
            !(status === 'loading') && (session == null)
            ? <div className="navbar-sign">
              <Link href="/signin">
                <a className="w-100 font-m">
                  Iniciar sesión
                </a>
              </Link>
                
              <ButtonThreeDimension color={{ front: "#F2EAD7", back: "#BCAD88", font: "#FF5959" }} className="m-l-20">
                <Link href="/signup">
                  <a className="font-m txt-bright-rose">
                    Registrate
                  </a>
                </Link>
              </ButtonThreeDimension>

            </div>
            : ''
          }
        </div>

        {
          !(status === 'loading') && !(session == null)
          ? <div onClick={() => signOut()} className="navbar-signout w-278 pointer">
              <SignOutIcon />
            </div>
          : ''
        }
      </div>
    </nav>
  )
}


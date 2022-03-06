import { getSession, useSession } from 'next-auth/react'
import Layout from '../components/Layout.component'
import Image from 'next/image'

export default function Profile() {
  const { data: session, status } = useSession()
  const { user: { name } } = session
  return (
    <>
      <Layout page="profile">
        <main>
          <div className="w-100 jc-center m-t-20">
            <Image
              className="br-100"
              src="/user_profile.png"
              alt='Foto de perfíl del usuario'
              width="140"
              height="140"
            />
          </div>

          <div className="m-t-40">
            <p className="font-mb txt-center">{ name }</p>
          </div>

          <div className="m-t-40">
            <p className="font-mb txt-center">Favoritos:</p>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session == null) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session },
  }
}

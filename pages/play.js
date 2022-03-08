import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Layout from '../components/Layout.component'
import CassetteList from '../components/CassetteList.component'
import CassettePlayer from '../components/CassettePlayer.component'

export default function Play({ cassettes }) {
  const router = useRouter()

  const { song: songID } = router.query

  const [ song, setSong ] = useState(null)

  async function fetchSongToPlay(id) {
    if (!id) return

    const response = await fetch(`/api/cassette/${id}`)

    if (response.ok) {
      const name = response.headers.get('cassette-song-name')
      const author = response.headers.get('cassette-author')
      const data = await response.blob()
      const src = window.URL.createObjectURL(data)
      setSong({ name, author, src })
      return
    }
  }

  useEffect(()=> {
    fetchSongToPlay(songID)
  }, [songID])

  return (
    <Layout page="play">
      <main>

        <CassetteList cassettes={cassettes} className="play-cassette-list max-w-800 p-lr-20" />

        <CassettePlayer song={song} />

      </main>
    </Layout>
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

  const res = await fetch(`${process.env.BASE_URL}/api/cassette`)
  const { items: cassettes } = await res.json()
  return { props: { cassettes } }
}

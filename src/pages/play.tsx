import { useEffect, useState } from 'react'
import { getSession, GetSessionParams } from 'next-auth/react'
import { useRouter } from 'next/router'

// Components
import Layout from '@frontend/components/layout/Layout.component'
import CassetteList from '@frontend/components/CassetteList.component'
import CassettePlayer from '@frontend/components/CassettePlayer.component'

// Services
import { getCassettes } from '@frontend/services/cassette.service'

// Types
import type { CassetteClientSide } from '@frontend/ts/types'
import type { CassetteInterface } from '@shared/models/cassette'

interface PlayProps {
  cassettes: CassetteInterface[]
}

export default function Play({ cassettes }: PlayProps) {
  const router = useRouter()

  const songId= router.query.song as string

  const [ song, setSong ] = useState<CassetteClientSide | null>(null)

  async function fetchSongToPlay(id: string) {
    if (!id) return

    const response = await fetch(`/api/cassette/${id}`)

    if (response.ok) {
      const name = response.headers.get('cassette-song-name') as string
      const author = response.headers.get('cassette-author') as string
      const data = await response.blob()
      const src = window.URL.createObjectURL(data) as string
      setSong({ name, author, src })
      return
    }

    setSong(null)
  }

  useEffect(()=> {
    fetchSongToPlay(songId)
  }, [songId])

  return (
    <Layout>
      <main>

        <CassetteList cassettes={cassettes} className="play-cassette-list max-w-800 p-lr-20" />

        <CassettePlayer song={song} />

      </main>
    </Layout>
  )
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context)

  if (session == null) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  const cassettes: CassetteInterface[] = await getCassettes()

  return { props: { cassettes } }
}

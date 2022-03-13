import { useState } from 'react'
import { getSession, GetSessionParams } from 'next-auth/react'
import { getCassettes } from '@frontend/services/cassette.service'

import Layout from '@frontend/components/layout/Layout.component'
import Searcher from '@frontend/components/Searcher.component'
import CassetteList from '@frontend/components/CassetteList.component'
import { CassetteInterface } from '@shared/models/cassette'

interface SearchProps {
  cassettes: CassetteInterface[]
}

export default function Search({ cassettes }: SearchProps) {
  const [ cassettesList, setCassettesList ] = useState(cassettes)

  function filterCassettes(arrIds: string[]) {
    if (!arrIds.length) return
    const filteredCassettes = cassettes.filter(cassette => arrIds.includes(cassette.id!))
    setCassettesList(filteredCassettes)
  }

  return (
    <Layout hideSearchInput={true}>
      <main className="search-main">

        <Searcher
          className="m-t-50"
          placeholder="Buscar cassette..."
          filterCassettes={filterCassettes}
        />

        <CassetteList cassettes={cassettesList} className="w-100 max-w-800 p-lr-20" />

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

  const cassettes = await getCassettes()

  return { props: { cassettes } }
}

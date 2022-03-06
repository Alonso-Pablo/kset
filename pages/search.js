import Layout from '../components/Layout.component'
import Searcher from '../components/Searcher.component'
import CassetteList from '../components/CassetteList.component'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

export default function Search({ cassettesItems }) {
  const [ cassettes, setCassettes ] = useState(cassettesItems)

  function filterCassettes(arrIDs) {
    if (!arrIDs.length) return
    const filteredCassettes = cassettesItems.filter(cassette => arrIDs.includes(cassette.id))
    setCassettes(filteredCassettes)
  }

  return (
    <Layout page="search">
      <main className="search-main">

        <Searcher
          className="m-t-50"
          placeholder="Buscar cassette..."
          filterCassettes={filterCassettes}
        />

        <CassetteList className={"w-100 max-w-800 p-lr-20"} data={cassettes} />

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
  const { items: cassettesItems } = await res.json()
  return { props: { cassettesItems } }
}

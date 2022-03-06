import '../sass/style.scss'
import { SessionProvider } from "next-auth/react"
import { InstantSearch } from 'react-instantsearch-hooks'
import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch('TECIM0FR95', '64213d0cff686d4034983d851659174b')

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const searchClient = algoliasearch(appID, apiKey)

  return (
    <InstantSearch
    indexName={'cassettes_index'}
    searchClient={searchClient}
    suppressExperimentalWarning
   >
      <SessionProvider session={ session }>
        <Component {...pageProps} />
      </SessionProvider>
    </InstantSearch>

  )
}

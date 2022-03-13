import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { InstantSearch } from 'react-instantsearch-hooks'
import algoliasearch from 'algoliasearch'
import '@frontend/sass/style.scss'

const searchClient = algoliasearch(
  'TECIM0FR95',
  '3a9515be47377554d2944e71b2abd73d'
)

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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

import Head from 'next/head'
import Navbar from './Navbar.component'
import Footer from './Footer.component'

export default function Layout({
  title='KSET',
  description='Un lugar para los amantes del cassette y lo clásico.',
  page,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title} - KSET</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar page={page} />
      { children }
      <Footer page={page} />
    </>
  )
}


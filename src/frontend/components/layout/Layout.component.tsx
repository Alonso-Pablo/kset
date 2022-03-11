import { ReactElement } from 'react'
import Head from 'next/head'
import Navbar from '@frontend/components/Navbar.component'
import Footer from '@frontend/components/Footer.component'

interface LayoutProps {
  title?: string;
  description?: string;
  hideSearchInput?: boolean;
  children: ReactElement;
}

export default function Layout({
  title = 'KSET',
  description='Un lugar para los amantes del cassette y lo clásico.',
  hideSearchInput = false,
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - KSET</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar hideSearchInput={hideSearchInput} />
        { children }
      <Footer />
    </>
  )
}

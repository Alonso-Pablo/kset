import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout.component'
import IsotypeSvg from '../components/svg/IsotypeSvg.component'

export default function Home() {
  return (
    <>
      <Layout>
 
      <main> 
        <h1 className={styles.title}>
          Lo <span>Clasico</span> nunca pasa de <span>Moda</span>
        </h1>

        <IsotypeSvg />
      </main>

      </Layout>
    </>
  )
}


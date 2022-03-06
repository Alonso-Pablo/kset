import Layout from '../components/Layout.component'
import IsotypeSvg from '../components/svg/IsotypeSvg.component'
import CassetteList from '../components/CassetteList.component'

export default function Home({ items }) {
  return (
    <Layout>
      <main className="home-main">
        <div className="home-hero">
          <h1 className="w-80 home-title m-lr-auto">
            Lo <span className="txt-bright-rose">Clasico</span><br/>
            nunca pasa<br/>
            de <span className="txt-bright-rose">Moda</span>
          </h1>

          <div className="jc-center">
            <IsotypeSvg />
          </div>
        </div>

        <CassetteList data={items} className={"home-cassette-list p-lr-20"}/>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/cassette')
  const { items } = await res.json()
  return { props: { items } }
}

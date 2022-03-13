import Layout from '@frontend/components/layout/Layout.component'
import { CassetteInterface } from '@shared/models/cassette'
import { getCassettes } from '@frontend/services/cassette.service'
import CassetteList from '@frontend/components/CassetteList.component'
import IsotypeSvg from '@frontend/components/icons/IsotypeSvg.component'

interface HomeProps {
  cassettes: CassetteInterface[]
}

export default function Home({ cassettes }: HomeProps) {
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

        <CassetteList cassettes={cassettes} className="home-cassette-list p-lr-20"/>

      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  const cassettes: CassetteInterface[] = await getCassettes()

  return { props: { cassettes } }
}

import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Layout from '../components/Layout.component'
import CassetteList from '../components/CassetteList.component'
import Cassette from '../components/Cassette.component'
import ButtonCassettePlayer from '../components/ButtonCassettePlayer.component'

import BackwardIcon from '../components/svg/BackwardIcon.component'
import PauseIcon from '../components/svg/PauseIcon.component'
import PlayIcon from '../components/svg/PlayIcon.component'
import ForwardIcon from '../components/svg/ForwardIcon.component'

export default function Play({ cassettes }) {
  const router = useRouter()

  const { song: songID } = router.query

  const [ song, setSong ] = useState(null)

  async function getSong(id) {
    const response = await fetch(`/api/cassette/${id}`)

    if (response.ok) {
      const name = response.headers.get('cassette-song-name')
      const author = response.headers.get('cassette-author')
      const data = await response.blob()
      const src = window.URL.createObjectURL(data);
      setSong({ name, author, src })
      return
    }
  }

  useEffect(()=> {
    if (songID) {
      getSong(songID)
    }
  }, [songID])

  let cassettePlayer
  let rwd
  let fwd
  let intervalFwd
  let intervalRwd

  if (typeof window === 'object') {
    cassettePlayer = document.getElementById('cassette-player')
    rwd = document.getElementById('backward-btn')
    fwd = document.getElementById('forward-btn')
  }

  function backwardSong() {
    if (!song) return null

    clearInterval(intervalFwd);
    fwd.classList.remove('active');
  
    if (rwd.classList.contains('active')) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      cassettePlayer.play()
      return
    }

    rwd.classList.add('active');
    cassettePlayer.pause();
    intervalRwd = setInterval(windBackward, 200)
  }

  function playSong() {
    if (!song) return null

    cassettePlayer.play()
    rwd.classList.remove('active')
    fwd.classList.remove('active')
    clearInterval(intervalRwd)
    clearInterval(intervalFwd)

    if (cassettePlayer.ended) {
      cassettePlayer.load()
    }
  }

  function pauseSong() {
    if (!song) return null

    cassettePlayer.pause()
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
  }

  function forwardSong() {
    if (!song) return null

    clearInterval(intervalRwd);
    rwd.classList.remove('active');
  
    if(fwd.classList.contains('active')) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      cassettePlayer.play()
      return
    }

    fwd.classList.add('active');
    cassettePlayer.pause();
    intervalFwd = setInterval(windForward, 200);
  }

  function windBackward() {
    if(cassettePlayer.currentTime <= 3) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      pauseSong()
      return
    }

    cassettePlayer.currentTime -= 3;
  }

  function windForward() {
    if(cassettePlayer.currentTime >= cassettePlayer.duration - 3) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      pauseSong();
      return
    }

    cassettePlayer.currentTime += 3;
  }

  return (
    <Layout page="play">
      <main>
        <CassetteList data={cassettes} className="play-cassette-list max-w-800 p-lr-20" />
        
        <div className="play-cassette-player m-b-50">
          <div className="play-cassette-container">
            <Cassette />
          </div>

          <div className="play-cassette-container m-t-20">
            <p className="font-mb">
              {
                song
                ? `${song.name} - ${song.author}`
                : 'Inserte un cassette'
              }
            </p>
          </div>

          <audio
            className="d-none"
            id="cassette-player"
            controls="controls"
            src={song && song.src}
          >
            <source type="audio/mpeg" />
          </audio>

          <div className="play-cassette-container play-cassette-button-container m-t-20">
            <ButtonCassettePlayer id="backward-btn" onClick={backwardSong}>
              <BackwardIcon />
            </ButtonCassettePlayer>

            <ButtonCassettePlayer onClick={playSong}>
              <PlayIcon />
            </ButtonCassettePlayer>

            <ButtonCassettePlayer onClick={pauseSong}>
              <PauseIcon />
            </ButtonCassettePlayer>

            <ButtonCassettePlayer id="forward-btn" onClick={forwardSong}>
              <ForwardIcon />
            </ButtonCassettePlayer>
          </div>
        </div>
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

  const res = await fetch('http://localhost:3000/api/cassette')
  const { items: cassettes } = await res.json()
  return { props: { cassettes } }
}

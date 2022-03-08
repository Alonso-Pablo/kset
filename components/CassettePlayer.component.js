import { useRef } from "react"
import Cassette from "./Cassette.component"
import ButtonCassettePlayer from "./ButtonCassettePlayer.component"

import BackwardIcon from "./svg/BackwardIcon.component"
import PlayIcon from "./svg/PlayIcon.component"
import PauseIcon from "./svg/PauseIcon.component"
import ForwardIcon from "./svg/ForwardIcon.component"

export default function CassettePlayer({ song }) {
  const cassettePlayer = useRef()
  const rewindBtn = useRef()
  const forwindBtn = useRef()
  // let rwd
  // let fwd
  let intervalFwd
  let intervalRwd


  // if (typeof window === 'object') {
  //   rwd = document.getElementById('backward-btn')
  //   fwd = document.getElementById('forward-btn')
  // }

  function backwardSong() {
    if (!song) return null

    clearInterval(intervalFwd)
    forwindBtn.current.classList.remove('active')
  
    if (rewindBtn.current.classList.contains('active')) {
      rewindBtn.current.classList.remove('active')
      clearInterval(intervalRwd)
      cassettePlayer.current.play()
      return
    }

    rewindBtn.current.classList.add('active')
    cassettePlayer.current.pause()
    intervalRwd = setInterval(windBackward, 200)
  }

  function playSong() {
    if (!song) return null

    cassettePlayer.current.play()
    rewindBtn.current.classList.remove('active')
    forwindBtn.current.classList.remove('active')
    clearInterval(intervalRwd)
    clearInterval(intervalFwd)

    if (cassettePlayer.current.ended) {
      cassettePlayer.current.load()
    }
  }

  function pauseSong() {
    if (!song) return null

    cassettePlayer.current.pause()
    rewindBtn.current.classList.remove('active')
    forwindBtn.current.classList.remove('active')
    clearInterval(intervalRwd)
    clearInterval(intervalFwd)
  }

  function forwardSong() {
    if (!song) return null

    clearInterval(intervalRwd)
    rewindBtn.current.classList.remove('active')
  
    if (forwindBtn.current.classList.contains('active')) {
      forwindBtn.current.classList.remove('active')
      clearInterval(intervalFwd)
      cassettePlayer.current.play()
      return
    }

    forwindBtn.current.classList.add('active')
    cassettePlayer.current.pause()
    intervalFwd = setInterval(windForward, 200)
  }

  function windBackward() {
    if (cassettePlayer.current.currentTime <= 3) {
      rewindBtn.current.classList.remove('active')
      clearInterval(intervalRwd)
      pauseSong()
      return
    }

    cassettePlayer.current.currentTime -= 3
  }

  function windForward() {
    if (cassettePlayer.current.currentTime >= cassettePlayer.current.duration - 3) {
      forwindBtn.current.classList.remove('active')
      clearInterval(intervalFwd)
      pauseSong()
      return
    }

    cassettePlayer.current.currentTime += 3
  }

  return (
    <div className="cassette-player m-b-50">
      <div className="cassette-player-container">
        {song ? <Cassette /> : <div className="cassette-empty"></div> }
      </div>

      <div className="cassette-player-container m-t-20">
        <p className="font-mb">
          { song ? `${song.name} - ${song.author}` : 'Inserte un cassette' }
        </p>
      </div>

      <audio
        ref={cassettePlayer}
        className="d-none"
        id="cassette-player"
        controls="controls"
        src={song && song.src}
      >
        <source type="audio/mpeg" />
      </audio>

      <div className="cassette-player-container cassette-player-buttons-container m-t-20">
        <ButtonCassettePlayer innerRef={rewindBtn} onClick={backwardSong}>
          <BackwardIcon className={"m-r-6"}/>
        </ButtonCassettePlayer>

        <ButtonCassettePlayer onClick={playSong}>
          <PlayIcon />
        </ButtonCassettePlayer>

        <ButtonCassettePlayer onClick={pauseSong}>
          <PauseIcon />
        </ButtonCassettePlayer>

        <ButtonCassettePlayer innerRef={forwindBtn} onClick={forwardSong}>
          <ForwardIcon className={"m-l-6"} />
        </ButtonCassettePlayer>
      </div>
    </div>
  )
}
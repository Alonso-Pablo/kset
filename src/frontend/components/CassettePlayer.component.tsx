import { useRef } from 'react'
import ButtonCassettePlayer from '@frontend/components/ButtonCassettePlayer.component'
import { CassetteColors } from '@shared/models/cassette'
import type { CassetteClientSide } from '@frontend/ts/types'

// Icons
import Cassette from '@frontend/components/icons/CassetteItemIcon.component'
import BackwardIcon from '@frontend/components/icons/BackwardIcon.component'
import PlayIcon from '@frontend/components/icons/PlayIcon.component'
import PauseIcon from '@frontend/components/icons/PauseIcon.component'
import ForwardIcon from '@frontend/components/icons/ForwardIcon.component'

interface CassettePlayerProps {
  song: CassetteClientSide | null
}

export default function CassettePlayer({ song }: CassettePlayerProps): JSX.Element {
  const cassettePlayer = useRef<HTMLAudioElement>(null)
  const rewindBtn = useRef<HTMLDivElement>(null)
  const forwindBtn = useRef<HTMLDivElement>(null)

  let intervalForwind: NodeJS.Timeout
  let intervalRewind: NodeJS.Timeout

  function backwardSong() {
    if (!song) return null

    clearInterval(intervalForwind)
    forwindBtn.current!.classList.remove('active')
  
    if (rewindBtn.current!.classList.contains('active')) {
      rewindBtn.current!.classList.remove('active')
      clearInterval(intervalRewind)
      cassettePlayer.current!.play()
      return
    }

    rewindBtn.current!.classList.add('active')
    cassettePlayer.current!.pause()
    intervalRewind = setInterval(windBackward, 200)
  }

  function playSong() {
    if (!song) return null

    cassettePlayer.current!.play()
    rewindBtn.current!.classList.remove('active')
    forwindBtn.current!.classList.remove('active')
    clearInterval(intervalRewind)
    clearInterval(intervalForwind)

    if (cassettePlayer.current!.ended) {
      cassettePlayer.current!.load()
    }
  }

  function pauseSong() {
    if (!song) return null

    cassettePlayer.current!.pause()
    rewindBtn.current!.classList.remove('active')
    forwindBtn.current!.classList.remove('active')
    clearInterval(intervalRewind)
    clearInterval(intervalForwind)
  }

  function forwardSong() {
    if (!song) return null

    clearInterval(intervalRewind)
    rewindBtn.current!.classList.remove('active')
  
    if (forwindBtn.current!.classList.contains('active')) {
      forwindBtn.current!.classList.remove('active')
      clearInterval(intervalForwind)
      cassettePlayer.current!.play()
      return
    }

    forwindBtn.current!.classList.add('active')
    cassettePlayer.current!.pause()
    intervalForwind = setInterval(windForward, 200)
  }

  function windBackward() {
    if (cassettePlayer.current!.currentTime <= 3) {
      rewindBtn.current!.classList.remove('active')
      clearInterval(intervalRewind)
      pauseSong()
      return
    }

    cassettePlayer.current!.currentTime -= 3
  }

  function windForward() {
    if (cassettePlayer.current!.currentTime >= cassettePlayer.current!.duration - 3) {
      forwindBtn.current!.classList.remove('active')
      clearInterval(intervalForwind)
      pauseSong()
      return
    }

    cassettePlayer.current!.currentTime += 3
  }

  const colors: CassetteColors = {
    body: '#3E3B3C',
    holes: '#241E20',
    strips: {
      upper: '#EEF2FF',
      middle: '#FE4D1B',
      bottom: '#EEF2FF',
    },
  }

  return (
    <div className="cassette-player m-b-50">
      <div className="cassette-player-container">
        { song ? <Cassette colors={colors} /> : <div className="cassette-empty"></div> }
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
        controls={true}
        src={song?.src}
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
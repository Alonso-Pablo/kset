import MagnifyingGlassIcon from './svg/MagnifyingGlassIcon.component'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useHits } from 'react-instantsearch-hooks'
import { useSearchBox } from 'react-instantsearch-hooks'

export default function Searcher({
  className = '',
  label,
  placeholder = '',
  filterCassettes = () => {},
  onBlur = () => {}
}) {
  const router = useRouter()

  const { hits } = useHits()
  const { refine, clear } = useSearchBox()
  const inputRef = useRef()


  /**
   * Update the filter used to find matching cassettes (onChange)
   */
  function handleOnChange() {
    const { value } = inputRef.current
    if (!value) {
      clear()
    }

    refine(value) // Refine matches
  }

  function handlerSubmit(e) {
    e.preventDefault()
    const { value } = inputRef.current
    if (!value) return

    const firstMatchID = hits[0]?.objectID
    router.push(`/play?song=${firstMatchID}`)
  }

  // To avoid delaying the filtering of the cassettes I use a useEffect. (async issue)
  function filterMatches() {
    const matchedCassetteIds = hits.map(el => el.objectID)
    filterCassettes(matchedCassetteIds)
  }

  useEffect(() => {
    filterMatches()
  }, [hits])

  return (
    <form onSubmit={handlerSubmit} className={`searcher-container ${className}`}>
      { label && <label htmlFor="searcher">{ label }</label> }
      <input
        id="searcher"
        ref={inputRef}
        name="searcher"
        placeholder={placeholder}
        className="searcher-input"
        onChange={handleOnChange}
        autoComplete="off"
        onBlur={onBlur}
      />
      <button type="submit" className="searcher-button">
        <MagnifyingGlassIcon />
      </button>
    </form>
  )
}


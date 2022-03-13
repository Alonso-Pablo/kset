import MagnifyingGlassIcon from '@frontend/components/icons/MagnifyingGlassIcon.component'
import { useRef, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useHits } from 'react-instantsearch-hooks'
import { useSearchBox } from 'react-instantsearch-hooks'

interface SearcherProps {
  id?: string;
  className?: string;
  label?: string | undefined;
  placeholder: string;
  onBlur?: () => void;
  filterCassettes?: (match: string[]) => void;
  displaySuggestions?: (value: string | undefined) => void;
}

export default function Searcher({
  id='Searcher',
  className = '',
  label,
  placeholder,
  onBlur = () => {},
  filterCassettes = ([]) => {},
  displaySuggestions = () => {}
}: SearcherProps): JSX.Element {
  const router = useRouter()

  const { hits } = useHits()
  const { refine, clear } = useSearchBox()
  const inputSearch = useRef<HTMLInputElement>(null)


  /**
   * Update the filter used to find matching cassettes (onChange)
   */
  function handleOnChange(): void {
    const { value } = inputSearch.current as HTMLInputElement
    if (!value) {
      clear()
    }

    displaySuggestions(value)
    refine(value) // Refine matches
  }

  function handlerSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const { value } = inputSearch.current as HTMLInputElement
    if (!value) {
      return
    }

    const firstMatchID = hits[0]?.objectID
    router.push(`/play?song=${firstMatchID}`)
  }

  // To avoid delaying the filtering of the cassettes I use a useEffect. (async issue)
  function filterMatches(): void {
    const matchedCassetteIds = hits.map(match => match.objectID)
    filterCassettes(matchedCassetteIds)
  }

  useEffect(() => {
    filterMatches()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hits])

  return (
    <form onSubmit={handlerSubmit} className={`searcher-container ${className}`}>
      { label && <label htmlFor={id}>{ label }</label> }

      <input
        id={id}
        ref={inputSearch}
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

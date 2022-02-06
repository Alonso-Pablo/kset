import MagnifyingGlassIcon from './svg/MagnifyingGlassIcon.component'

export default function Searcher({ label = '', placeholder='' }) {
  return (
    <form className="searcher-container">
      { label && <label>{ label }</label> }
      <input placeholder={placeholder} className="searcher-input"/>
      <button type="submit" className="searcher-button">
        <MagnifyingGlassIcon />
      </button>
    </form>
  )
}


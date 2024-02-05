import './index.css'
import {BsSearch} from 'react-icons/bs'

const SearchBar = props => {
  const {initialSearch, mySearchevent, mySearchButton} = props
  const handleOnChange = event => {
    mySearchevent(event.target.value)
  }
  const handleSearchButton = () => mySearchButton()

  return (
    <div className="search_bar_container">
      <input
        placeholder="Search"
        className="search_bar"
        value={initialSearch}
        type="search"
        onChange={handleOnChange}
      />
      <button
        onClick={handleSearchButton}
        aria-label="Search Button"
        data-testid="searchButton"
        type="button"
        className="search_button"
      >
        <BsSearch height={50} width={50} />
      </button>
    </div>
  )
}

export default SearchBar

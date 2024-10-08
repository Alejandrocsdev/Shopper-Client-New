// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../components/Icon'

// 搜尋欄
function SearchBar() {
  return (
    <div className={S.searchBar}>
      <input className={S.searchInput} type="text" placeholder="請輸入搜尋關鍵字" />
      <button className={S.searchButton}>
        <Icon style={S.searchIcon} icon="faMagnifyingGlass" />
      </button>
    </div>
  )
}

export default SearchBar

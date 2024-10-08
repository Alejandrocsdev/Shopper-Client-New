// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Icon from '../../../components/Icon'

// 搜尋欄
function SearchBar() {
  // 語言
  const { t } = useTranslation()

  return (
    <div className={S.searchBar}>
      <input className={S.searchInput} type="text" placeholder={t('searchPlaceholder')} />
      <button className={S.searchButton}>
        <Icon style={S.searchIcon} icon="faMagnifyingGlass" />
      </button>
    </div>
  )
}

export default SearchBar

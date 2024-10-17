// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import useLangSwitch from '../../../hooks/useLangSwitch'
import useClickOutside from '../../../hooks/useClickOutside'
// 組件 (component)
import Icon from '../../../components/Icon'

// 語言切換
function LangSwitch() {
  const { currentLang, langSwitch } = useLangSwitch()

  const langSwitchRef = useRef(null)
  const [isOpened, setIsOpened] = useState(false)
  const toggleDropdown = () => setIsOpened(!isOpened)

  useClickOutside(langSwitchRef, () => {
    if (isOpened) toggleDropdown()
  })

  return (
    <div className={S.langSwitch} onClick={toggleDropdown} ref={langSwitchRef}>
      {/* 語言按鈕 */}
      <button className={S.langBtn}>
        <Icon style={S.globe} icon="faEarthAmericas" />
        <Icon style={`${S.arrow} ${isOpened ? S.rotate : ''}`} icon="faAngleDown" />
      </button>
      {/* 語言列表 */}
      <ul
        className={`${S.dropdown} ${isOpened ? S.showDrop : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <li
          className={`${S.li} ${currentLang === 'zh' ? S.active : ''}`}
          onClick={() => langSwitch('zh')}
        >
          中文
        </li>
        <li
          className={`${S.li} ${currentLang === 'en' ? S.active : ''}`}
          onClick={() => langSwitch('en')}
        >
          English
        </li>
        <li
          className={`${S.li} ${currentLang === 'es' ? S.active : ''}`}
          onClick={() => langSwitch('es')}
        >
          Español
        </li>
      </ul>
    </div>
  )
}

export default LangSwitch

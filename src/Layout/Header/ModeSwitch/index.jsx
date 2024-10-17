// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import useLangSwitch from '../../../hooks/useLangSwitch'
import useClickOutside from '../../../hooks/useClickOutside'
import { useDarkMode } from '../../../context/DarkModeContext'
// 組件 (component)
import Icon from '../../../components/Icon'

// 暗夜模式
function ModeSwitch() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button className={S.modeSwitch} onClick={toggleDarkMode}>
      <Icon style={`${S.modeIcon} ${isDarkMode ? S.rotate : ''}`} icon="faCircleHalfStroke" />
    </button>
  )
}

export default ModeSwitch

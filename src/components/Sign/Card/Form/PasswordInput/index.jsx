// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState } from 'react'
// 組件 (component)
import Icon from '../../../../Icon'

// 密碼輸入欄
const PasswordInput = () => {
  const [showPwd, setShowPwd] = useState(false)
  const togglePassword = () => setShowPwd(!showPwd)

  return (
    <div className={S.inputContainer}>
      <input className={S.input} type={showPwd ? 'text' : 'password'} placeholder="密碼" />
      <div className={S.iconContainer} onClick={togglePassword}>
        <Icon style={S.icon} icon={showPwd ? 'faEye' : 'faEyeSlash'} />
      </div>
    </div>
  )
}

export default PasswordInput

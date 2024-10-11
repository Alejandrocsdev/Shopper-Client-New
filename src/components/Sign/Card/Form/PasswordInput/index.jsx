// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Icon from '../../../../Icon'

// 密碼輸入欄
const PasswordInput = ({ register, name }) => {
  const { t } = useTranslation()
  const [showPwd, setShowPwd] = useState(false)
  const togglePassword = () => setShowPwd(!showPwd)

  return (
    <div className={S.inputContainer}>
      <input
        className={S.input}
        type={showPwd ? 'text' : 'password'}
        placeholder={t('password')}
        {...register(name)}
      />
      <div className={S.iconContainer} onClick={togglePassword}>
        <Icon style={S.icon} icon={showPwd ? 'faEye' : 'faEyeSlash'} />
      </div>
    </div>
  )
}

export default PasswordInput

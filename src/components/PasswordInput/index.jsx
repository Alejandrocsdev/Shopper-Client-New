// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Icon from '../Icon'

// 密碼輸入欄
const PasswordInput = ({ register, name, criteria, password = '', isDirty, errors = false }) => {
  // criteria: boolean
  // password: watch('password', '')
  // isDirty: dirtyFields.password
  // errors: errors
  const { t } = useTranslation()
  const [showPwd, setShowPwd] = useState(false)
  const togglePassword = () => setShowPwd(!showPwd)

  const [isLowerCase, setIsLowerCase] = useState(false)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [isLength, setIsLength] = useState(false)
  const [isNumber, setIsNumber] = useState(false)

  useEffect(() => {
    setIsLowerCase(/[a-z]/.test(password))
    setIsUpperCase(/[A-Z]/.test(password))
    setIsLength(password?.length >= 8 && password?.length <= 16)
    setIsNumber(/\d/.test(password))
  }, [password])

  // 條件樣式(綠/紅)
  const getCriteriaClass = (isValid) => {
    if (!isDirty) return ''
    return isValid ? S.valid : S.invalid
  }

  return (
    <>
      <div className={S.inputContainer}>
        <input
          className={`${S.input} ${errors[name] ? S.inputWarning : ''}`}
          type={showPwd ? 'text' : 'password'}
          placeholder={t('password')}
          {...register(name)}
          maxLength="16"
        />
        <div className={S.iconContainer} onClick={togglePassword}>
          <Icon style={S.eyeIcon} icon={showPwd ? 'faEye' : 'faEyeSlash'} />
        </div>
      </div>
      {/* 錯誤訊息 */}
      {errors && <div className={S.textWarning}>{errors[name] ? t('fillInput') : ''}</div>}

      {criteria && (
        <div className={S.criteria}>
          {/* 小寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLowerCase)}`}>
            <span>
              <Icon style={S.valIcon} icon={isLowerCase ? 'faCircleCheck' : 'faCircleXmark'} />
            </span>
            <span>包含至少一個小寫字母</span>
          </div>
          {/* 大寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isUpperCase)}`}>
            <span>
              <Icon style={S.valIcon} icon={isUpperCase ? 'faCircleCheck' : 'faCircleXmark'} />
            </span>
            <span>包含至少一個大寫字母</span>
          </div>
          {/* 數字 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isNumber)}`}>
            <span>
              <Icon style={S.valIcon} icon={isNumber ? 'faCircleCheck' : 'faCircleXmark'} />
            </span>
            <span>包含至少一個數字</span>
          </div>
          {/* 字數 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLength)}`}>
            <span>
              <Icon style={S.valIcon} icon={isLength ? 'faCircleCheck' : 'faCircleXmark'} />
            </span>
            <span>密碼長度8-16個字元</span>
          </div>
        </div>
      )}
    </>
  )
}

export default PasswordInput

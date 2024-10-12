// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Icon from '../../../Icon'

// 電話輸入欄
const PhoneInput = ({ check, register, name }) => {
  const { t } = useTranslation()

  return (
    <div className={S.inputContainer}>
      <input className={S.input} type="tel" placeholder={t('phoneNumber')} {...register(name)} maxLength="10" />
      {check && (
        <div className={S.iconContainer}>
          <Icon style={S.icon} icon="faCircleCheck" />
        </div>
      )}
    </div>
  )
}

export default PhoneInput

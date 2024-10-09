// 模組樣式
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../../Icon'

// 電話輸入欄
const PhoneInput = ({ check }) => {
  return (
    <div className={S.inputContainer}>
      <input className={S.input} type="tel" placeholder="手機號碼" />
      {check && (
        <div className={S.iconContainer}>
          <Icon style={S.icon} icon="faCircleCheck" />
        </div>
      )}
    </div>
  )
}

export default PhoneInput

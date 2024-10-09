// 模組樣式
import S from './style.module.css'

// 提交按鈕
const SubmitButton = ({ style, type = 'submit', isDisabled, children }) => {
  return (
    <button className={`${S.submit} ${isDisabled ? S.notAllowed : S.allowed}`} type={type}>
      {children}
    </button>
  )
}

export default SubmitButton

// 模組樣式
import S from './style.module.css'

// 提交按鈕
const SubmitButton = ({ style, type = 'submit', isValid, isSubmitting, children }) => {
  return (
    <button className={`${S.submit} ${isValid ? S.allowed : S.notAllowed}`} type={type} disabled={!isValid ||isSubmitting}>
      {isSubmitting ? 'Loading' : children}
    </button>
  )
}

export default SubmitButton

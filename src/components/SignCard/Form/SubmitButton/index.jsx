// 模組樣式 (module css)
import S from './style.module.css'
// 組件 (component)
import Loading from '../../../Laoding'

// 提交按鈕
const SubmitButton = ({ style, type = 'submit', isValid, isSubmitting, children }) => {
  return (
    <>
      <button
        className={`${S.submit} ${isValid ? S.allowed : S.notAllowed} ${style || ''}`}
        type={type}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? <Loading /> : children}
      </button>
    </>
  )
}

export default SubmitButton

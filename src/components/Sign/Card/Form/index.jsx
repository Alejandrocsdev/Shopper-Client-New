// 模組樣式
import S from './style.module.css'
// 組件 (component)
import FormError from './FormError'
import PhoneInput from './PhoneInput'
import SubmitButton from './SubmitButton'
import PasswordInput from './PasswordInput'

// inputWarning

// 表單: 密碼登入 / 簡訊登入 / 註冊
const Form = () => {
  return (
    <form className={S.form}>
      <FormError message="Error" />

      <PhoneInput check={true} />

      <div className={S.textWarning}>{true ? '請填寫此欄位' : '請輸入有效行動電話號碼'}</div>

      <PasswordInput />

      <div className={S.textWarning}>{true ? '請填寫此欄位' : ''}</div>

      <SubmitButton isDisabled={true}>登入</SubmitButton>
    </form>
  )
}

export default Form

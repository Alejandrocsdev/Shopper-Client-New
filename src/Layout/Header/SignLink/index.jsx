// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Anchor from '../../../components/Anchor'

// 登入／註冊　連結
function SignLink() {
  return (
    <div className={S.signLink}>
      <Anchor style={S.signUp} int="/sign-up">
        註冊
      </Anchor>
      <Anchor style={S.signIn} int="/sign-in">
        登入
      </Anchor>
    </div>
  )
}

export default SignLink

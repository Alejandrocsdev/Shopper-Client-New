// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Anchor from '../../../components/Anchor'

// 登入／註冊　連結
function SignLink() {
  // 語言
  const { t } = useTranslation()

  return (
    <div className={S.signLink}>
      <Anchor style={S.signUp} int="/sign-up">
        {t('signUp')}
      </Anchor>
      <Anchor style={S.signIn} int="/sign-in">
        {t('signIn')}
      </Anchor>
    </div>
  )
}

export default SignLink

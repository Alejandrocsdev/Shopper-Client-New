// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Logo from '../../components/Logo'

// 頁首
function AuthHeader({ pageName = 'signUp' }) {
  // 語言
  const { t } = useTranslation()

  return (
    <header className={S.header}>
      <Logo style={S.logo} color="white" />
      <div className={S.pageName}>{t(pageName)}</div>
    </header>
  )
}

export default AuthHeader

// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件 (component)
import Logo from '../Logo'
import Form from './Form'
import Anchor from '../Anchor'
import ThirdPartySign from './ThirdPartySign'

// 樣板: 密碼登入 / 簡訊登入 / 註冊
function SignCard() {
  const { t } = useTranslation()
  const { step, next, previous } = useAuthStep()
  const { modeStates } = useAuthMode()
  const { isSignIn, isSignUp } = modeStates

  const [isSms, setIsSms] = useState(false)
  const toggleSmsSignIn = () => setIsSms(!isSms)

  return (
    <div className={S.main}>
      {/* Logo */}
      <Logo style={S.logo} type="cart" shape="square" text unlink />

      {/* Card */}
      <div className={S.card}>
        {/* 標題 */}
        <h1 className={S.cardName}>{t(isSignUp ? 'signUp' : 'signIn')}</h1>

        {/* 表單 */}
        <Form isSms={isSms} />

        {/* 幫助 */}
        <div className={S.help}>
          <Anchor style={S.link} int="/reset">
            {t(isSignIn ? 'forgotPwd' : '')}
          </Anchor>
          {isSignIn && (
            <div className={S.link} onClick={toggleSmsSignIn}>
              {t(isSms ? 'pwdSignIn' : 'smsSignIn')}
            </div>
          )}
        </div>

        {/* 分隔線 */}
        <div className={`${S.breakLine} ${isSignUp ? S.adjust : ''}`}>
          <div className={S.line}></div>
          <div className={S.or}>{t('or')}</div>
          <div className={S.line}></div>
        </div>

        {/* 第三方登入/註冊 */}
        <ThirdPartySign />

        {/* 條款與政策 */}
        <div className={S.policy}>
          <span>{t('agreement')}</span>
          <span className={S.link}>{t('serviceTerm')}</span>
          <span>{t('and')}</span>
          <span className={S.link}>{t('privacyPolicy')}</span>
        </div>

        {/* 切換 */}
        <div className={S.switch}>
          <span className={S.text}>{t(isSignUp ? 'haveAccount' : 'newToShopper')}</span>
          {/* 返回註冊頁及返回步驟0 */}
          <Anchor style={S.link} int={isSignUp ? '/sign-in' : '/sign-up'}>
            {t(isSignUp ? 'signIn' : 'signUp')}
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default SignCard

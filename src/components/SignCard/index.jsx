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
import Anchor from '../Anchor'
import SignForm from './SignForm'
import ThirdPartySign from './ThirdPartySign'

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function SignCard() {
  const { t } = useTranslation()
  const { step, to } = useAuthStep()
  const { modeStates, toggleSmsSignIn } = useAuthMode()
  const { isSignUp, isSignIn, isPwdSignIn, isSmsSignIn } = modeStates

  return (
    <div className={S.main}>
      {/* Logo */}
      <Logo style={S.logo} type="cart" shape="square" text unlink />

      {/* Card */}
      <div className={S.card}>
        {/* 標題 */}
        <h1 className={S.cardName}>{t(isSignUp ? 'signUp' : 'signIn')}</h1>

        {/* 表單 */}
        <SignForm />

        {/* 幫助 */}
        <div className={S.help}>
          <Anchor style={S.link} int="/reset">
            {t(isSignIn ? 'forgotPwd' : '')}
          </Anchor>
          {isSignIn && (
            <div className={S.link} onClick={toggleSmsSignIn}>
              {t(isPwdSignIn ? 'smsSignIn' : 'pwdSignIn')}
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

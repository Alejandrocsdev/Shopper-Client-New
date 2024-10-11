// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import Anchor from '../../Anchor'
import Form from './Form'
import ThirdPartySign from './ThirdPartySign'

// 表單容器: 密碼登入 / 簡訊登入 / 註冊
function Card() {
  const { t } = useTranslation()
  const { next, previous } = useAuthStep()
  const { modeStates, toggleSMS } = useAuthMode()
  const { isSMS, isSignIn, isSignUp } = modeStates

  return (
    <div className={S.card}>
      {/* 標題 */}
      <h1 className={S.cardName}>{t(isSignUp ? 'signUp' : 'signIn')}</h1>

      {/* 表單 */}
      <Form />

      {/* 幫助 */}
      <div className={S.help}>
        <Anchor style={S.link} int="/reset">
          {t(isSignIn ? 'forgotPwd' : '')}
        </Anchor>
        {!isSignUp && (
          <div className={S.link} onClick={toggleSMS}>
            {t(isSMS ? 'pwdSignIn' : 'smsSignIn')}
          </div>
        )}
      </div>

      {/* 分隔線 */}
      <div className={`${S.breakLine} ${isSignUp ? '' : S.adjust}`}>
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
        <span className={S.text}>{t(isSignUp ? 'haveAccountQ' : 'newFriendQ')}</span>
        {/* 返回註冊頁及返回步驟0 */}
        <Anchor style={S.link} int={isSignUp ? '/sign-in' : '/sign-up'}>
          {t(isSignUp ? 'signIn' : 'signUp')}
        </Anchor>
      </div>
    </div>
  )
}

export default Card

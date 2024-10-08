// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
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
  const { mode } = useAuthMode()

  const signIn = mode === 'signIn'
  const signUp = mode === 'signUp'

  return (
    <div className={S.card}>
      {/* 標題 */}
      <h1 className={S.cardName}>{t(signUp ? 'signUp' : 'signIn')}</h1>

      {/* 表單 */}
      <Form />

      {/* 幫助 */}
      <div className={S.help}>
        {signIn && (
          <Anchor style={S.link} int="/reset">
            {t('forgotPwd')}
          </Anchor>
        )}
        {!signUp && (
          <div className={S.link} onClick={signIn ? next : previous}>
            {t(signIn ? 'smsSignIn' : 'pwdSignIn')}
          </div>
        )}
      </div>

      {/* 分隔線 */}
      <div className={`${S.breakLine} ${signUp ? '' : S.adjust}`}>
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
        <span className={S.text}>{t(signUp ? 'haveAccountQ' : 'newFriendQ')}</span>
        <Anchor style={S.link} int={signUp ? '/sign-in' : '/sign-up'}>
          {t(signUp ? 'signIn' : 'signUp')}
        </Anchor>
      </div>
    </div>
  )
}

export default Card

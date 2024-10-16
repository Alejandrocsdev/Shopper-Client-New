// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'

import { useEffect } from 'react'
// 自訂函式
import { autoSignIn } from '../../../api/request/auth'

import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'

import useCountdown from '../../../hooks/useCountdown'
// 組件
import Icon from '../../Icon'

// 成功頁面: 註冊 / 重設密碼
function Success() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { isSignUp, isReset } = useAuthMode().modeStates

  const { id, phone } = user

  const handleRedirect = async () => {
    if (isSignUp) {
      try {
        const response = await autoSignIn(id)
        console.log('Auto Sign In Response:', response.message)

        console.log('Access Token:', response.accessToken)

        to('/')
      } catch (err) {
        console.error(err.message)
      }
    } else if (isReset) {
      to('/sign-in')
    }
  }

  const { count, startCountdown } = useCountdown(10, handleRedirect)

  useEffect(() => {
    startCountdown()
  }, [])

  return (
    <>
      <div className={S.successIcon}>
        <Icon icon="faCircleCheck" />
      </div>
      <div className={S.cardText}>
        <div className={S.text}>
          <span>您已成功使用{phone ? '電話號碼' : 'Email'} </span>
          <span className={S.method}>{phone || 'email'}</span>
          <div>{isSignUp ? '建立瞎皮爾購物帳號' : '重設密碼'}</div>
        </div>
        <div className={S.text}>
          <span>您將在 </span>
          <span className={S.count}>{count}</span>
          <span> 秒內回到{isSignUp ? '瞎皮爾購物' : '登入頁面'}</span>
        </div>
      </div>
      <div className={S.submit} onClick={handleRedirect}>
        {isSignUp ? '回到瞎皮爾購物' : '回到登入頁面'}
      </div>
    </>
  )
}

export default Success

// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// 自訂函式 (custom function)
import { sendOtp, verifyOtp } from '../../../api/request/verification'
import { findUserByData } from '../../../api/request/user'
import { smsSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
import useCountdown from '../../../hooks/useCountdown'
// 組件 (component)
import FormError from '../../SignCard/Form/FormError'
import Countdown from './Countdown'
import OtpInput from './OtpInput'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function OtpForm({ isSms }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user, next } = useAuthStep()
  const { isSignIn, isSignUp, isReset } = useAuthMode().modeStates
  const { count, isCounting, startCountdown } = useCountdown(60)

  const { phone } = user

  const schema = Joi.object({
    otp: Joi.string().length(6).regex(/^\d+$/).required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    setValue,
    clearErrors
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    shouldFocusError: false
  })

  useEffect(() => {
    startCountdown()
  }, [])

  const handleResend = async () => {
    try {
      clearErrors('root')

      const response = await sendOtp(phone)
      console.log('Resend OTP Response:', response.message)

      startCountdown()
    } catch (error) {
      console.error(error.message)
      setError('root', { message: t(error.i18n) })
    }
  }

  const onSubmit = async (data) => {
    try {
      const { otp } = data
      console.log('Sent Data:', data)

      if (isSignUp) {
        const [otpResponse, userResponse] = await Promise.all([
          verifyOtp(phone, otp),
          findUserByData(`phone:${phone}`)
        ])
        console.log('Verify OTP Response:', otpResponse.message)
        console.log('Find User Response:', userResponse.message)

        if (userResponse.user) {
          const { id, username, avatar } = userResponse.user
          next(4, { id, username, avatar, phone })
        } else {
          next({ phone })
        }
      } else if (isSms) {
        const response = await smsSignIn(phone, otp)
        console.log('SMS Sign In Response:', response.message)
        console.log('Access Token', response.accessToken)
        navigate('/')
      } else if (isReset) {
        const response = await verifyOtp(phone, otp)
        console.log('Verify OTP Response:', response.message)
        next({ phone })
      }
    } catch (error) {
      console.error(error.message)
      setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <FormError message={errors.root.message} />}

      {/* 表單文字 */}
      <div className={S.cardText}>
        <div className={S.text}>您的驗證碼已透過簡訊傳送至</div>
        <div className={S.phone}>{phone}</div>
      </div>

      {/* OTP輸入框 */}
      <OtpInput register={register} name="otp" setValue={setValue} />

      {/* OTP發送倒數 & 重新傳送 */}
      {/* <Countdown /> */}
      <div className={isCounting ? S.countdown : S.resend}>
        <span>{isCounting ? count : '沒有收到驗證碼嗎？'}</span>
        <span onClick={isCounting ? undefined : handleResend}>
          {isCounting ? '秒後' : ''}重新傳送
        </span>
      </div>

      {/* 執行下一步 */}
      <SubmitButton style={S.submit} isValid={isValid} isSubmitting={isSubmitting}>
        {t('next')}
      </SubmitButton>
    </form>
  )
}

export default OtpForm

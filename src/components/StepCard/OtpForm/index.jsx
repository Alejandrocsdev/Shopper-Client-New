// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
// 自訂函式 (custom function)
import { sendOtp, verifyOtp } from '../../../api/request/verification'
import { findUserByData } from '../../../api/request/user'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
import useCountdown from '../../../hooks/useCountdown'
// 組件 (component)
import FormError from '../../SignCard/Form/FormError'
import Countdown from './Countdown'
import OtpInput from './OtpInput'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function OtpForm() {
  const { t } = useTranslation()
  const { user, next } = useAuthStep()
  const { isSignIn, isSignUp } = useAuthMode().modeStates
  const { count, isCounting, startCountdown } = useCountdown(60, () => {})

  const { phone } = user

  const schema = Joi.object({
    otp: Joi.string().length(6).pattern(/^\d+$/).required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    trigger,
    setError,
    clearErrors
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange', // 'onSubmit' by default
    reValidateMode: 'onChange', // 'onChange' by default
    shouldFocusError: false // true by default
  })

  useEffect(() => {
    startCountdown() // This will trigger the countdown on mount
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
      if (isSignUp) {
        console.log('Sent Data:', data)

        const otpResponse = await verifyOtp(phone, data.otp)
        console.log('OTP Response:', otpResponse.message)

        const userResponse = await findUserByData(`phone:${phone}`)
        console.log('User Response:', userResponse.message)

        if (userResponse.user) {
          const { id, username, avatar } = userResponse.user
          next(4, { id, username, avatar, phone })
        } else {
          next({ phone })
        }
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
        <div className={S.phone}>0938473300</div>
      </div>

      {/* OTP輸入框 */}
      <OtpInput register={register} name="otp" setValue={setValue} trigger={trigger} />

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

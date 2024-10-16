// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { sendOtp } from '../../../api/request/verification'
import { pwdSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import FormError from './FormError'
import PhoneInput from './PhoneInput'
import SubmitButton from './SubmitButton'
import PasswordInput from './PasswordInput'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const Form = ({ isSms }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { next } = useAuthStep()
  const { isSignIn, isSignUp } = useAuthMode().modeStates

  const schema = Joi.object({
    signInKey: isSignIn && !isSms ? Joi.string().required() : Joi.string().forbidden(),
    password: isSignIn && !isSms ? Joi.string().required() : Joi.string().forbidden(),
    phone:
      isSignUp || isSms ? Joi.string().regex(/^09/).length(10).required() : Joi.string().forbidden()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    reset
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    shouldFocusError: false
  })

  useEffect(() => {
    reset()
  }, [isSignIn, isSignUp, isSms])

  const onSubmit = async (data) => {
    try {
      const { phone, signInKey, password } = data
      console.log('Sent Data:', data)

      if (isSignUp || isSms) {
        const response = await sendOtp(phone)
        console.log('Send OTP Response:', response.message)
        next({ phone })
      } else if (isSignIn && !isSms) {
        const response = await pwdSignIn(signInKey, password)
        console.log('Password Sign In Response:', response.message)
        console.log('Access Token', response.accessToken)
        navigate('/')
      }
    } catch (error) {
      console.error(error.message)
      setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <FormError message={errors.root.message} />}

      {/* signInKey */}
      {isSignIn && !isSms && (
        <div className={S.inputContainer}>
          <input
            className={`${S.input} ${errors.signInKey ? S.inputWarning : ''}`}
            type="text"
            placeholder={t('phoneUserEmail')}
            {...register('signInKey')}
          />
        </div>
      )}
      {/* 錯誤訊息 */}
      {isSignIn && !isSms && (
        <div className={S.textWarning}>{errors.signInKey ? t('fillInput') : ''}</div>
      )}

      {/* password */}
      {isSignIn && !isSms && <PasswordInput register={register} name="password" errors={errors} />}

      {/* phone */}
      {(isSignUp || isSms) && (
        <PhoneInput check={isValid} register={register} name="phone" errors={errors} />
      )}

      <SubmitButton isValid={isValid} isSubmitting={isSubmitting}>
        {t(isSignIn ? 'signIn' : 'next')}
      </SubmitButton>
    </form>
  )
}

export default Form

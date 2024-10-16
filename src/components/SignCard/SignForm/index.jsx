// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { useEffect } from 'react'
// 自訂函式 (custom function)
import { sendOtp } from '../../../api/request/verif'
import { pwdSignIn } from '../../../api/request/auth'

import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import FormError from '../../FormError'
import PhoneInput from './PhoneInput'
import SubmitButton from '../../SubmitButton'
import PasswordInput from '../../PasswordInput'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()
  const { to } = useAuthStep()
  const { isSignUp, isSignIn,isPwdSignIn, isSmsSignIn } = useAuthMode().modeStates

  const schema = Joi.object({
    signInKey: isPwdSignIn 
      ? Joi.string().required() 
      : Joi.string().forbidden(),
    password: isPwdSignIn 
      ? Joi.string().required() 
      : Joi.string().forbidden(),
    phone: isSignUp || isSmsSignIn
      ? Joi.string().regex(/^09/).length(10).required()
      : Joi.string().forbidden()
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
  }, [isSignUp, isPwdSignIn, isSmsSignIn])

  const onSubmit = async (data) => {
    try {
      const { signInKey, password, phone } = data
      console.log('Sent Data:', data)

      if (isSignUp || isSmsSignIn) {
        const response = await sendOtp(phone)
        console.log('Send OTP Response:', response.message)
        to('+', { phone })
      } else if (isPwdSignIn) {
        const response = await pwdSignIn(signInKey, password)
        console.log('Password Sign In Response:', response.message)

        console.log('Access Token', response.accessToken)

        to('/')
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
      {isPwdSignIn && (
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
      {isPwdSignIn && (
        <div className={S.textWarning}>{errors.signInKey ? t('fillInput') : ''}</div>
      )}

      {/* password */}
      {isPwdSignIn && <PasswordInput register={register} name="password" errors={errors} />}

      {/* phone */}
      {(isSignUp || isSmsSignIn) && (
        <PhoneInput check={isValid} register={register} name="phone" errors={errors} />
      )}

      <SubmitButton isValid={isValid} isSubmitting={isSubmitting}>
        {t(isSignIn ? 'signIn' : 'next')}
      </SubmitButton>
    </form>
  )
}

export default SignForm

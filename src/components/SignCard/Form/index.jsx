// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
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
const Form = ({ isSMS }) => {
  const { t } = useTranslation()
  const { next } = useAuthStep()
  const { isSignIn, isSignUp } = useAuthMode().modeStates

  // 導向
  const navigate = useNavigate()

  const schema = Joi.object({
    signInKey: isSignIn ? Joi.string().required() : Joi.string().forbidden(),
    password: isSignIn ? Joi.string().required() : Joi.string().forbidden(),
    phone: !isSignIn ? Joi.string().regex(/^09/).length(10).required() : Joi.string().forbidden()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    reset
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange', // 'onSubmit' by default // onSubmit | onBlur | onChange | onTouched | all
    reValidateMode: 'onChange', // 'onChange' by default // onChange | onBlur | onSubmit = 'onChange'
    shouldFocusError: false // true by default
  })

  // onTouched: Focuses the field and then blurs (tracks if the field was interacted with).
  // onDirty: The first time the value of the field changes from its initial state.
  // onChange: Every time the value changes.
  // onBlur: When the field loses focus.

  useEffect(() => {
    reset()
  }, [isSignIn, isSignUp])

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        console.log('Sent Data:', data)
        const response = await sendOtp(data.phone)
        console.log('Response:', response.message)
        next({ phone: data.phone })
      } else if (isSignIn) {
        console.log('Sent Data:', data)
        const response = await pwdSignIn(data.signInKey, data.password)
        console.log('Response:', response.message)
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
      {isSignIn && !isSMS && (
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
      {isSignIn && !isSMS && (
        <div className={S.textWarning}>{errors.signInKey ? t('fillInput') : ''}</div>
      )}

      {/* password */}
      {isSignIn && !isSMS && <PasswordInput register={register} name="password" errors={errors} />}

      {/* phone */}
      {(isSignUp || isSMS) && (
        <PhoneInput check={isValid} register={register} name="phone" errors={errors} />
      )}

      <SubmitButton isValid={isValid} isSubmitting={isSubmitting}>
        {t(isSignIn ? 'signIn' : 'next')}
      </SubmitButton>
    </form>
  )
}

export default Form

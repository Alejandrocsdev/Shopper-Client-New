// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { signUp } from '../../../api/request/auth'
import { findUserByInfo, putPwdByInfo } from '../../../api/request/user'

import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import FormError from '../../FormError'
import Icon from '../../Icon'
import PasswordInput from '../../PasswordInput'
import SubmitButton from '../../SubmitButton'

function PasswordForm() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { isSignUp, isReset } = useAuthMode().modeStates

  const { phone, email } = user

  const schema = Joi.object({
    password: Joi.string().min(8).max(16).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields },
    setError,
    setValue,
    trigger,
    watch
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    shouldFocusError: false
  })

  const password = watch('password', '')
  const isDirty = dirtyFields.password

  const onSubmit = async (data) => {
    try {
      const { password } = data
      console.log('Sent Data:', data)
      
      if (isSignUp) {
        const response = await signUp(phone, password)
        console.log('Sign Up Response:', response.message)

        const { id } = response.user
        to('+',{ id, phone })
      } else if (isReset && phone) {
        const response = await putPwdByInfo(`phone:${phone}`, password)
        console.log('Change Password Response:', response.message)
        to(4)
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
        <div className={S.text}>
          {isSignUp ? '最後一步! 請設定您的密碼以完成登入' : '設定一組新密碼給'}
        </div>
        {isReset && <div className={S.method}>{phone || 'email'}</div>}
      </div>

      {/* 密碼輸入欄 (含條件) */}
      <PasswordInput
        criteria
        password={password}
        isDirty={isDirty}
        register={register}
        name="password"
      />

      {/* 執行下一步 */}
      <SubmitButton style={S.submit} isValid={isValid} isSubmitting={isSubmitting}>
        {true ? '註冊' : '重設'}
      </SubmitButton>
    </form>
  )
}

export default PasswordForm

// 模組樣式
import S from './style.module.css'

// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
// import axios from '../../../api/axios'
// import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

// 自訂函式 (custom function)
import { signUp } from '../../../api/request/user'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'

// 組件 (component)
import FormError from '../../SignCard/Form/FormError'
import Icon from '../../Icon'
import PasswordInput from '../../../components/SignCard/Form/PasswordInput'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function PasswordForm() {
  const { t } = useTranslation()
  const { userPass, next } = useAuthStep()
  const { isSignUp, isReset } = useAuthMode().modeStates

  const { phone } = userPass

  const schema = Joi.object({
    password: Joi.string().min(8).max(16).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields },
    setValue,
    trigger,
    setError,
    watch
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange', // 'onSubmit' by default
    reValidateMode: 'onChange', // 'onChange' by default
    shouldFocusError: false // true by default
  })

  const password = watch('password', '')
  const isDirty = dirtyFields.password

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        console.log('Sent Data:', data)

        const response = await signUp(phone, data.password)
        console.log('Response:', response.message)

        const { id } = response.newUser

        next({ id, phone })
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

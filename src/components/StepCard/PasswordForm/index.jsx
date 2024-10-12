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

// 自訂函式
import { useAuthStep } from '../../../context/AuthStepContext'

// 組件 (component)
import Icon from '../../Icon'
import PasswordInput from '../../../components/SignCard/Form/PasswordInput'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function PasswordForm() {
  const { t } = useTranslation()
  const { next } = useAuthStep()

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

  console.log(dirtyFields)

  const password = watch('password', '')

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Form data:', data)
      next()
    } catch (error) {
      console.error('Submission Error:', error)
      setError('root', error)
    }
  }

  return (
    <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
      {/* 表單文字 */}
      <div className={S.cardText}>
        <div className={S.text}>
          {false ? '最後一步! 請設定您的密碼以完成登入' : '設定一組新密碼給'}
        </div>
        {true && <div className={S.method}>{true ? 'phone' : 'email'}</div>}
      </div>

      {/* 密碼輸入欄 (含條件) */}
      <PasswordInput
        criteria
        password={password}
        register={register}
        name="password"
        touched={dirtyFields.password}
      />

      {/* 執行下一步 */}
      <SubmitButton style={S.submit} isValid={isValid} isSubmitting={isSubmitting}>
        {true ? '註冊' : '重設'}
      </SubmitButton>
    </form>
  )
}

export default PasswordForm

// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import axios from '../../../api/axios'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
// 自訂函式
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import Countdown from './Countdown'
import OtpInput from './OtpInput'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function OtpForm() {
  const { t } = useTranslation()
  const { next } = useAuthStep()

  const schema = Joi.object({
    otp: Joi.string().length(6).pattern(/^\d+$/).required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    trigger,
    setError
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange', // 'onSubmit' by default
    reValidateMode: 'onChange', // 'onChange' by default
    shouldFocusError: false // true by default
  })

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
        <div className={S.text}>您的驗證碼已透過簡訊傳送至</div>
        <div className={S.phone}>0938473300</div>
      </div>

      {/* OTP輸入框 */}
      <OtpInput register={register} name="otp" setValue={setValue} trigger={trigger} />

      {/* OTP發送倒數 & 重新傳送 */}
      <Countdown />

      {/* 執行下一步 */}
      <SubmitButton style={S.submit} isValid={isValid} isSubmitting={isSubmitting}>
        {t('next')}
      </SubmitButton>
    </form>
  )
}

export default OtpForm

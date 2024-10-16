// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { sendOtp } from '../../../api/request/verification'
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import FormError from '../../../components/SignCard/Form/FormError'
import SubmitButton from '../../../components/SignCard/Form/SubmitButton'

function Step1({ name, back }) {
  const { t } = useTranslation()
  const { next } = useAuthStep()

  const schema = Joi.object({
    resetKey: Joi.string()
      .required()
      .when(Joi.string().pattern(/^\d+$/), {
        then: Joi.string().regex(/^09/).length(10).required(),
        otherwise: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
      })
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    getValues
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    shouldFocusError: false
  })

  const isPhone = /^\d+$/.test(getValues('resetKey'))

  const onSubmit = async (data) => {
    try {
      const { resetKey } = data
      console.log('Sent Data:', data)
      
      if (isPhone) {
        const response = await sendOtp(resetKey)
        console.log('Response:', response.message)
        next({ phone: resetKey })
      } else {
        next({ email: resetKey })
      }
    } catch (error) {
      console.error(error.message)
      setError('root', { message: t(error.i18n) })
    }
  }

  const errMsg = () => {
    if (errors.resetKey && isPhone) {
      return t('phone')
    } else if (errors.resetKey && !isPhone) {
      return t('email')
    } else {
      return ''
    }
  }

  return (
    <StepCard back={back} name={name}>
      <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <FormError message={errors.root.message} />}

        {/* signInKey */}
        <div className={S.signInKey}>
          <input
            className={`${S.signInKeyInput} ${errors.signInKey ? S.inputWarning : ''}`}
            type="text"
            placeholder={t('phoneOrEmail')}
            {...register('resetKey')}
          />
        </div>
        {/* 錯誤訊息 */}
        <div className={S.textWarning}>{errMsg()}</div>

        <SubmitButton style={S.submit} isValid={isValid} isSubmitting={isSubmitting}>
          {t('next')}
        </SubmitButton>
      </form>
    </StepCard>
  )
}

export default Step1

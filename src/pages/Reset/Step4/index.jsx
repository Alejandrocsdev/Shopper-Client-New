// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useEffect } from 'react'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// 自訂函式
import useCountdown from '../../../hooks/useCountdown'
import { sendOtp } from '../../../api/request/verif'
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import FormError from '../../../components/FormError'
import SubmitButton from '../../../components/SubmitButton'
import Icon from '../../../components/Icon'

function Step4() {
  const { t } = useTranslation()
  const { next } = useAuthStep()

  const { count, startCountdown } = useCountdown(10, () => next(0))

  useEffect(() => {
    startCountdown()
  }, [])

  return (
    <StepCard title="重設密碼失敗">
      <div className={S.failureIcon}>
        <Icon icon="faCircleXmark" />
      </div>
      <div className={S.cardText}>
        <div className={S.errMsg}>{'message'}</div>
        <div className={S.text}>
          您將在 <span className={S.count}>{count}</span> 秒內回到登入頁面
        </div>
      </div>
      <div className={S.submit} onClick={() => next(0)}>
        回到重設頁面
      </div>
    </StepCard>
  )
}

export default Step4

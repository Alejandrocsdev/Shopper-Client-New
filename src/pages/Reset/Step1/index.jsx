// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

function Step1() {
  const { user } = useAuthStep()
  const { phone, email } = user

  return (
    <StepCard title="輸入驗證碼" back>
      {phone && <OtpForm />}
      {email && <div></div>}
    </StepCard>
  )
}

export default Step1

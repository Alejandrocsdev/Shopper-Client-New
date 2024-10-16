// 組件 (component)
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

function Step1() {
  return (
    <StepCard title="輸入驗證碼" back steps>
      <OtpForm />
    </StepCard>
  )
}

export default Step1

// 組件 (component)
import StepCard from '../../../components/StepCard'
import PasswordForm from '../../../components/StepCard/PasswordForm'

function Step2() {
  return (
    <StepCard title="設定您的密碼" steps>
      <PasswordForm />
    </StepCard>
  )
}

export default Step2

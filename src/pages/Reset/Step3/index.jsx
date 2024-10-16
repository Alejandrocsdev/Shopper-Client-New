// 組件 (component)
import StepCard from '../../../components/StepCard'
import PasswordForm from '../../../components/StepCard/PasswordForm'

function Step3({ name }) {
  return (
    <StepCard name={name} steps>
      <PasswordForm />
    </StepCard>
  )
}

export default Step3

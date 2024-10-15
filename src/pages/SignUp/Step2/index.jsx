// 組件 (component)
import StepCard from '../../../components/StepCard'
import PasswordForm from '../../../components/StepCard/PasswordForm'

function Step2({ name }) {
  return (
    <StepCard name={name}>
      <PasswordForm />
    </StepCard>
  )
}

export default Step2

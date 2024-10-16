// 組件 (component)
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

function Step1({ name, back }) {
  return (
    <StepCard back={back} steps name={name}>
      <OtpForm />
    </StepCard>
  )
}

export default Step1

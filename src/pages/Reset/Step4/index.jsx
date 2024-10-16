// 組件 (component)
import StepCard from '../../../components/StepCard'
import Success from '../../../components/StepCard/Success'

function Step4({ name }) {
  return (
    <StepCard name={name} steps>
      <Success />
    </StepCard>
  )
}

export default Step4

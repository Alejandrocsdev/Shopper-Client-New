// 模組樣式
import S from './style.module.css'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import Success from '../../../components/StepCard/Success'

function Step3({ name, back }) {
  return (
    <StepCard back={back} name={name}>
      <Success />
    </StepCard>
  )
}

export default Step3

// 模組樣式
import S from './style.module.css'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

function Step1({ name, back }) {
  return (
    <StepCard back={back} name={name}>
      <OtpForm />
    </StepCard>
  )
}

export default Step1

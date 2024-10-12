// 模組樣式
import S from './style.module.css'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import PasswordForm from '../../../components/StepCard/PasswordForm'

function Step2({ name, back }) {
  return (
    <StepCard back={back} name={name}>
      <PasswordForm />
    </StepCard>
  )
}

export default Step2

// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import SignCard from '../../components/SignCard'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

// 註冊流程
function SignUp() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  useEffect(() => {
    setMode('signUp')
  }, [])

  return (
    <>
      {/* 註冊頁面 */}
      {step === 0 && <SignCard />}
      {/* OtpForm */}
      {step === 1 && <Step1 />}
      {/* PasswordForm */}
      {step === 2 && <Step2 />}
      {/* Success */}
      {step === 3 && <Step3  />}
      {/* 獨立: 已註冊過 */}
      {step === 4 && <Step4  />}
    </>
  )
}

export default SignUp

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
  }, [setMode])

  return (
    <>
      {step === 0 && <SignCard />}
      {step === 1 && <Step1 back name="輸入驗證碼" />}
      {step === 2 && <Step2 name="設定您的密碼" />}
      {step === 3 && <Step3 name="註冊成功!" />}
      {step === 4 && <Step4 name="這是您的帳號嗎?" />}
    </>
  )
}

export default SignUp

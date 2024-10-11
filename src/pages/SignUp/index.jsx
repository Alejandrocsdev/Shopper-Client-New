// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import SignCard from '../../components/SignCard'
import Step1 from './Step1'

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
    </>
  )
}

export default SignUp

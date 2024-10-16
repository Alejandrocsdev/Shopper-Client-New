// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import SignCard from '../../components/SignCard'
import Step1 from './Step1'

// 登入流程
function SignIn() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  useEffect(() => {
    setMode('signIn')
  }, [setMode])

  return (
    <>
      {step === 0 && <SignCard />}
      {step === 1 && <Step1 back={true} name="輸入驗證碼" />}
    </>
  )
}

export default SignIn

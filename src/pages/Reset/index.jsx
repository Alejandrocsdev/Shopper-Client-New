// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import Step1 from './Step1'
import Step2 from './Step2'
// import Step3 from './Step3'
// import Step4 from './Step4'
// import Step5 from './Step5'

// 註冊流程
function SignUp() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  useEffect(() => {
    setMode('reset')
  }, [setMode])

  return (
    <>
      {step === 0 && <Step1 back="/sign-in" name="重新設定密碼" />}
      {step === 1 && <Step2 back name="重新設定密碼" />}
      {/* {step === 2 && <Step3 name="" />} */}
      {/* {step === 3 && <Step4 name="" />} */}
      {/* {step === 4 && <Step5 name="" />} */}
    </>
  )
}

export default SignUp

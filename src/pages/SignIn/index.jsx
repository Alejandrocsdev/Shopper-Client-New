// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import Sign from '../../components/Sign'

// 登入流程
function SignIn() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  useEffect(() => {
    setMode('signIn')
  }, [])

  return (
    <>
      {step === 0 && <Sign />}
    </>
  )
}

export default SignIn

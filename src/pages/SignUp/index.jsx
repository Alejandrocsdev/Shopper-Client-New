// 鉤子函式
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthStep } from '../../context/AuthStepContext'
import { useAuthMode } from '../../context/AuthModeContext'
// 組件
import Sign from '../../components/Sign'

// 註冊流程
function SignUp() {
  const { step } = useAuthStep()
  const { onMode } = useAuthMode()

  useEffect(() => {
    onMode('signUp')
  }, [onMode])

  return (
    <>
      {step === 0 && <Sign />}
    </>
  )
}

export default function SignUpWrapper() {
  return <SignUp />
}

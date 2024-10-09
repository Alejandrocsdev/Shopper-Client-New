// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 自訂函式 (custom function)
import { AuthStepProvider, useAuthStep } from '../context/AuthStepContext'
import { AuthModeProvider, useAuthMode } from '../context/AuthModeContext'
// 組件 (component)
import AuthHeader from './AuthHeader'
import Footer from '../components/Footer'

// 佈局組件
function AuthLayout() {
  return (
    <>
      <AuthModeProvider>
        <AuthStepProvider>
          <AuthHeader />
          <div className={S.container}>
            <Outlet />
          </div>
          <Footer />
        </AuthStepProvider>
      </AuthModeProvider>
    </>
  )
}

export default AuthLayout

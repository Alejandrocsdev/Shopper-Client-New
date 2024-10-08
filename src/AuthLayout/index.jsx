// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 組件 (component)
import AuthHeader from './AuthHeader'
import Footer from '../components/Footer'

// 佈局組件
function AuthLayout() {
  return (
    <>
      <AuthHeader pageName={'signUp'} />
      <Outlet />
      <Footer />
    </>
  )
}

export default AuthLayout

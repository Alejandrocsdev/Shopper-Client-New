// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 組件 (component)
import Header from './Header'
import Footer from './Footer'

// 佈局組件
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout

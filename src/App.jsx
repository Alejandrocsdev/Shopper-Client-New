// 樣式
import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/css/global.css'
// 語言工具
import { i18n, supportedLngs } from './utils/i18n'
// 主題工具
import { DarkModeProvider } from './context/DarkModeContext'
// 函式庫 (library)
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom'
// 佈局組件
import Layout from './Layout'
import AuthLayout from './AuthLayout'
// 頁面
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Reset from './pages/Reset'
// 錯誤頁面
import NotFound from './pages/NotFound'

const LangRoutes = () => {
  const { lang } = useParams()

  useEffect(() => {
    if (supportedLngs.includes(lang)) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  if (!supportedLngs.includes(lang)) {
    // host/wrong => host/zh
    return <Navigate to={`/${i18n.language}`} />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/reset" element={<Reset />} />
      </Route>
      {/* host/zh/wrong => NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:lang/*" element={<LangRoutes />} />
          {/* host/ => host/zh */}
          <Route path="/" element={<Navigate to={`/${i18n.language}`} />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App

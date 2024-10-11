// 樣式
import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/css/global.css'
// 語言工具
import i18n from './utils/i18n'
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
// import Reset from './pages/Reset'
// import Step1 from './pages/SignUp/Step1'

const LangRoutes = () => {
  // path="/:lang/*"
  const { lang } = useParams()

  useEffect(() => {
    if (['zh', 'en', 'es'].includes(lang)) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  // 使用 useEffect:
  // 確保"語言變更"發生在元件渲染完成後，
  // 而不是在渲染過程中直接修改狀態。如果在渲染時直接修改語言狀態，
  // 可能會導致 React 的錯誤（例如在渲染中調用 setState）。
  // 使用 useEffect 可以避免無限重複渲染的問題，
  // 並確保語言切換等副作用在適當的時間點執行，
  // 保持元件的渲染邏輯純淨和穩定。

  if (!['zh', 'en', 'es'].includes(lang)) {
    return <Navigate to={`/${i18n.language}`} replace />
  }

  // 使用 replace:
  // 返回上一頁不會回到錯誤路徑

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/reset" element={<Reset />} /> */}
        {/* <Route path="/step-1" element={<Step1 />} /> */}
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<LangRoutes />} />
        <Route path="*" element={<Navigate to={`/${i18n.language}`} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

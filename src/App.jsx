// 樣式
import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/css/global.css'
// 函式庫 (library)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 佈局組件
import Layout from './Layout'
// 頁面
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

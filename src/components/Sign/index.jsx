// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Logo from '../Logo'
import Card from './Card'

// 樣板: 密碼登入 / 簡訊登入 / 註冊
function Sign() {
  return (
    <div className={S.main}>
      <Logo style={S.logo} type="cart" shape="square" text unlink />
      <Card />
    </div>
  )
}

export default Sign

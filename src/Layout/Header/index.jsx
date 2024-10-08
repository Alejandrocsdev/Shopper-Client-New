// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Logo from '../../components/Logo'
import Anchor from '../../components/Anchor'
import SignLink from './SignLink'
import SearchBar from './SearchBar'
import ProfileLink from './ProfileLink'
// 組件 (component)
import Icon from '../../components/Icon'

// 模仿用戶狀態
const user = true

// 頁首
function Header() {
  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}>
          <Anchor style={S.seller} int="/seller">
            賣家中心
          </Anchor>
        </div>
        <div className={S.navRight}>
          <div>
            {!user && <SignLink />}
            {user && <ProfileLink avatar="" username="newlean14" />}
          </div>
        </div>
      </nav>
      <header className={S.header}>
        <Logo style={`${S.logo} ${S.large}`} />
        <Logo style={`${S.logo} ${S.small}`} type="cart" text />
        <SearchBar />
        <div className={S.cart}>
          <Icon style={S.cartIcon} icon="faCartShopping" />
        </div>
      </header>
    </div>
  )
}

export default Header

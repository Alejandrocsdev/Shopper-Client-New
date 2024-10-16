// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Icon from '../../components/Icon'
import Logo from '../../components/Logo'
import Anchor from '../../components/Anchor'
import SignLink from './SignLink'
import SearchBar from './SearchBar'
import ModeSwitch from './ModeSwitch'
import LangSwitch from './LangSwitch'
import ProfileLink from './ProfileLink'

// 模仿用戶狀態
const user = false

// 頁首
function Header() {
  const { t } = useTranslation()

  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}>
          <Anchor style={S.seller} int="/seller">
            {t('sellerCenter')}
          </Anchor>
        </div>
        <div className={S.navRight}>
          {!user && <SignLink />}
          {user && <ProfileLink avatar="" username="newlean14" />}
          <LangSwitch />
          <ModeSwitch />
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

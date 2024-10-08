// 組件 (component)
import Anchor from '../Anchor'
// 圖檔 (image)
import logo01Png from '../../assets/img/logo/banner-dark.png'
import logo02Png from '../../assets/img/logo/banner-light.png'
import logo03Png from '../../assets/img/logo/cart-round-dark.png'
import logo04Png from '../../assets/img/logo/cart-round-light.png'
import logo05Png from '../../assets/img/logo/cart-square-dark.png'
import logo06Png from '../../assets/img/logo/cart-square-light.png'
import logo07Png from '../../assets/img/logo/cart-text-round-dark.png'
import logo08Png from '../../assets/img/logo/cart-text-round-light.png'
import logo09Png from '../../assets/img/logo/cart-text-square-dark.png'
import logo10Png from '../../assets/img/logo/cart-text-square-light.png'

// Logo
function Logo({
  style,
  color = 'dark',
  type = 'banner',
  shape = 'round',
  text = false,
  unlink = false
}) {
  const getSrc = () => {
    if (type === 'banner') {
      return color === 'dark' ? logo01Png : logo02Png
    } else if (type === 'cart') {
      if (shape === 'round') {
        if (text) {
          return color === 'dark' ? logo07Png : logo08Png
        }
        return color === 'dark' ? logo03Png : logo04Png
      } else if (shape === 'square') {
        if (text) {
          return color === 'dark' ? logo09Png : logo10Png
        }
        return color === 'dark' ? logo05Png : logo06Png
      }
    }
  }

  const src = getSrc()

  const img = <img className={style} src={src} />

  const linked = <Anchor int="/">{img}</Anchor>

  return <div>{unlink ? img : linked}</div>
}

export default Logo

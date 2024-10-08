// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  } from '@fortawesome/free-brands-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

// Icon mapping
const iconMap = {
  faCartShopping,
  faMagnifyingGlass
}

// 圖示
function Icon({ style, icon }) {
  const selected = iconMap[icon]
  return <FontAwesomeIcon className={style} icon={selected} />
}

export default Icon

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import {
  faCartShopping,
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faCheck,
  faArrowRightLong,
  faArrowLeftLong
} from '@fortawesome/free-solid-svg-icons'

// Icon mapping
const iconMap = {
  faSquareFacebook,
  faInstagram,
  faLine,
  faCircleCheck,
  faCircleXmark,
  faCartShopping,
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faCheck,
  faArrowRightLong,
  faArrowLeftLong
}

// 圖示
function Icon({ style, icon }) {
  const selected = iconMap[icon]
  return <FontAwesomeIcon className={style} icon={selected} />
}

export default Icon

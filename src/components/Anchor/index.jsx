// 函式庫 (library)
import { Link } from 'react-router-dom'

// 錨點
function Anchor({ int, ext, style, target, children }) {
  const internalLink = (
    <Link to={int} className={style} target={target || '_self'}>
      {children}
    </Link>
  )

  const externalLink = (
    <a href={ext} className={style} target={target || '_blank'}>
      {children}
    </a>
  )

  return <>{int ? internalLink : externalLink}</>
}

export default Anchor

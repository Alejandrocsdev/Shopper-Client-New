// 函式庫 (library)
import { Link, useParams } from 'react-router-dom'

// 錨點
function Anchor({ int, ext, style, target, children }) {
  const { lang } = useParams()

  const internalLink = (
    <Link to={`/${lang}${int}`} className={style} target={target || '_self'}>
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

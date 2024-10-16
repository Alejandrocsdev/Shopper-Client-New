import { useNavigate, useParams } from 'react-router-dom'
import i18n from '../utils/i18n' // Your i18n instance

const useLangNavigate = () => {
  const navigate = useNavigate()
  const { lang } = useParams()

  const currentLang = lang || i18n.language

  const langNavigate = (path, options) => {
    const prefixedPath = `/${currentLang}${path}`
    navigate(prefixedPath, options)
  }

  return langNavigate
}

export default useLangNavigate

import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { i18n } from '../utils/i18n'
import { useTranslation } from 'react-i18next'

const useLangSwitch = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const location = useLocation()
  const navigate = useNavigate()
  const { lang } = useParams()

  const { t } = useTranslation()

  useEffect(() => {
    if (lang !== currentLang) {
      setCurrentLang(lang)
      i18n.changeLanguage(lang)
      document.title = t('shopper.title')
      document.dir = ['ar', 'fa', 'he', 'ur', 'sd', 'ug', 'dv'].includes(lang) ? 'rtl' : 'ltr'
    }
  }, [lang, currentLang])

  const langSwitch = (newLang) => {
    if (newLang !== lang) {
      const currentPath = location.pathname
      const newPath = currentPath.replace(`/${lang}`, `/${newLang}`)
      Cookies.set('lang', newLang, { expires: 30 })
      navigate(newPath)
    }
  }

  return {
    currentLang,
    langSwitch
  }
}

export default useLangSwitch

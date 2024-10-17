// 函式庫 (library)
import i18n from 'i18next'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'
// 資料 (json)
import lang from '../assets/locales/lang.json'

const htmlTag = document.querySelector('html').lang || 'zh'

// 語言設定
i18n.use(initReactI18next).init({
  resources: lang,
  lng: Cookies.get('lang') || htmlTag,
  fallbackLng: 'zh',
  supportedLngs: ['zh', 'en', 'es']
})

const supportedLngs = i18n.options.supportedLngs

export { i18n, supportedLngs }
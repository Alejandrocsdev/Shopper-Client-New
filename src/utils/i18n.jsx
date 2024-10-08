// 函式庫 (library)
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// 資料 (json)
import lang from '../assets/locales/lang.json'

// 語言設定
i18n.use(initReactI18next).init({
  resources: lang,
  lng: 'zh',
  fallbackLng: 'zh',
  interpolation: { escapeValue: false }
})

export default i18n

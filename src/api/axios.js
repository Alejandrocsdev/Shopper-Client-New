// 函式庫 (library)
import axios from 'axios'
// 環境變數
const { VITE_NODE_ENV, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL } = import.meta.env

// Base Url
const baseURL = VITE_NODE_ENV === 'production' ? VITE_PROD_BASE_URL : VITE_DEV_BASE_URL
// 自訂 axios
export const axiosPublic = axios.create({ baseURL })

export const axiosPrivate = axios.create({ baseURL, withCredentials: true })

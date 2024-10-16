// 函式庫 (library)
import axios from 'axios'
// 環境變數
const { VITE_NODE_ENV, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL } = import.meta.env
// Base Url
const baseURL = VITE_NODE_ENV === 'production' ? VITE_PROD_BASE_URL : VITE_DEV_BASE_URL
// Public
const axiosPublic = axios.create({ baseURL })
// Private
const axiosPrivate = axios.create({ baseURL, withCredentials: true })
// Request
const axiosRequest = async (isPrivate, method, url, data) => {
  const axiosInstance = isPrivate ? axiosPrivate : axiosPublic
  try {
    const requestData = method === 'get' || method === 'delete' ? { params: data } : data
    const response = await axiosInstance[method](url, requestData)
    console.log('response from axios', response)
    return response.data
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'An unknown error occurred',
      i18n: error.response?.data?.i18n || 'defaultError'
    }
  }
}

export default axiosRequest

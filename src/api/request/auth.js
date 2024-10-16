import axiosRequest from '../axios'

const base = '/auth'

// Private Requests
export const autoSignIn = (userId) => {
  return axiosRequest(true, 'post', `${base}/sign-in/auto/${userId}`)
}
export const pwdSignIn = (signInKey, password) => {
  return axiosRequest(true, 'post', `${base}/sign-in/pwd`, { signInKey, password })
}
export const smsSignIn = (phone, otp) => {
  return axiosRequest(true, 'post', `${base}/sign-in/sms`, { phone, otp })
}

// Public Requests
export const signUp = (phone, password) => {
  return axiosRequest(false, 'post', `${base}/sign-in/sms`, { phone, password })
}

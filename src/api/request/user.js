import axiosRequest from '../axios'

const base = '/user'

// Private Requests

// Public Requests
export const getUserById = (userId) => {
  return axiosRequest(false, 'get', `${base}/${userId}`)
}
export const findUserByInfo = (userInfo) => {
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}
export const putPwdByInfo = (userInfo, password) => {
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}

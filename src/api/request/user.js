import { axiosPublic } from '../axios'
import axiosError from '../axiosError'
const base = '/user'

export const getUserById = axiosError(async (userId) => {
  const response = await axiosPublic.get(`${base}/${userId}`)
  return response.data
})

export const findUserByInfo = axiosError(async (userInfo) => {
  const response = await axiosPublic.get(`${base}/find/${userInfo}`)
  return response.data
})

export const putPwdByInfo = axiosError(async (userInfo, password) => {
  const response = await axiosPublic.put(`${base}/pwd/${userInfo}`, { password })
  return response.data
})

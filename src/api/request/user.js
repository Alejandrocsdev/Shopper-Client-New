import { axiosPublic } from '../axios'
import axiosError from '../axiosError'
const base = '/user'

export const getUserById = axiosError(async (userId) => {
  const response = await axiosPublic.get(`${base}/${userId}`)
  return response.data
})

export const getUserByData = axiosError(async (userInfo) => {
  const response = await axiosPublic.get(`${base}/check/${userInfo}`)
  return response.data
})

export const signUp = axiosError(async (phone, password) => {
  const response = await axiosPublic.post(`${base}/sign-up`, { phone, password })
  return response.data
})

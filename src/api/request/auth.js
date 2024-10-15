import { axiosPublic, axiosPrivate } from '../axios'
import axiosError from '../axiosError'
const base = '/auth'

export const autoSignIn = axiosError(async (userId) => {
  const response = await axiosPrivate.post(`${base}/sign-in/auto/${userId}`)
  return response.data
})

export const signUp = axiosError(async (phone, password) => {
  const response = await axiosPublic.post(`${base}/sign-up`, { phone, password })
  return response.data
})

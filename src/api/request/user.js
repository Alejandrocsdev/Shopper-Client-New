import { axiosPublic } from '../axios'
import axiosError from '../axiosError'
const base = '/user'

export const getUserById = axiosError(async (userId) => {
  const response = await axiosPublic.get(`${base}/${userId}`)
  return response.data
})

export const findUserByData = axiosError(async (userInfo) => {
  const response = await axiosPublic.get(`${base}/find/${userInfo}`)
  return response.data
})

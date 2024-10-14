import { axiosPublic } from '../axios'
import axiosError from '../axiosError'
const base = '/verification'

export const sendOtp = axiosError(async (phone) => {
  const response = await axiosPublic.post(`${base}/send/otp`, { phone })
  return response.data
})

export const verifyOtp = axiosError(async (phone, otp) => {
  const response = await axiosPublic.post(`${base}/verify/otp`, { phone, otp })
  return response.data
})

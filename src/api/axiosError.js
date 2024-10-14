function axiosError(fn) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An unknown error occurred',
        i18n: error.response?.data?.i18n || 'defaultError'
      }
    }
  }
}

export default axiosError

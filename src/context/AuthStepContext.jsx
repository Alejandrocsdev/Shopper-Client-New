// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AuthStepContext = createContext()

// (1)
export const AuthStepProvider = ({ children }) => {
  const [step, setStep] = useState(0)
  const [userPass, setUserPass] = useState({})
  const location = useLocation()
  const next = (userPass) => {
    setUserPass(userPass)
    setStep((prevStep) => prevStep + 1)
  }
  const previous = () => setStep((prevStep) => prevStep - 1)
  useEffect(() => {
    setStep(0)
  }, [location.pathname])

  return (
    <AuthStepContext.Provider value={{ userPass, step, setStep, next, previous }}>
      {children}
    </AuthStepContext.Provider>
  )
}

// (2)
export const useAuthStep = () => useContext(AuthStepContext)

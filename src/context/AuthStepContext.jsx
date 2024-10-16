// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthStepContext = createContext()

// (1) Provider
export const AuthStepProvider = ({ children }) => {
  const [step, setStep] = useState(0)
  const [user, setUser] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  const next = (step, user) => {
    const stepT = typeof step
    const userT = typeof user
    stepT === 'number' ? setStep(step) : setStep((prevStep) => prevStep + 1)
    if (stepT === 'object' || userT === 'object') {
      setUser(user || step)
    } else {
      setUser({})
    }
  }

  const previous = (path) => {
    typeof path === 'string' ? navigate(path) : setStep((prevStep) => prevStep - 1)
  }

  useEffect(() => {
    setStep(0)
  }, [location.pathname])

  return (
    <AuthStepContext.Provider value={{ user, step, next, previous }}>
      {children}
    </AuthStepContext.Provider>
  )
}

// (2) Hook
export const useAuthStep = () => useContext(AuthStepContext)

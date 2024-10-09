import { createContext, useState, useContext } from 'react'

const AuthStepContext = createContext()

// (1)
export const useAuthStep = () => useContext(AuthStepContext)

// (2)
export const AuthStepProvider = ({ children }) => {
  const [step, setStep] = useState(0)

  const next = () => setStep((prevStep) => prevStep + 1)
  const previous = () => setStep((prevStep) => prevStep - 1)

  return <AuthStepContext.Provider value={{ step, next, previous }}>{children}</AuthStepContext.Provider>
}

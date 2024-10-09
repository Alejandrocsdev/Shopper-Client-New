import { createContext, useContext, useState } from 'react'

const AuthModeContext = createContext()

// (1)
export const useAuthMode = () => useContext(AuthModeContext)

// (2)
export const AuthModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  // signIn, signUp, sms, reset 

  const onMode = (newMode) => setMode(newMode)

  return (
    <AuthModeContext.Provider value={{ mode, onMode }}>{children}</AuthModeContext.Provider>
  )
}

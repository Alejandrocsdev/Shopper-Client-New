// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'

const AuthModeContext = createContext()

// (1) Provider
export const AuthModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null)

  const modeStates = {
    isSignIn: mode === 'signIn',
    isSignUp: mode === 'signUp',
    isReset: mode === 'reset'
  }

  return (
    <AuthModeContext.Provider value={{ mode, setMode, modeStates }}>
      {children}
    </AuthModeContext.Provider>
  )
}

// (2) Hook
export const useAuthMode = () => useContext(AuthModeContext)

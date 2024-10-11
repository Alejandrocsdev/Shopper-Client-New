// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'

const AuthModeContext = createContext()

// (1)
export const AuthModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [isSMS, setIsSMS] = useState(false)

  const toggleSMS = () => setIsSMS(!isSMS)

  const modeStates = {
    isSMS,
    isSignIn: isSMS ? false : mode === 'signIn',
    isSignUp: isSMS ? false : mode === 'signUp',
    isReset: isSMS ? false : mode === 'reset'
  }

  return (
    <AuthModeContext.Provider value={{ mode, setMode, modeStates, toggleSMS }}>
      {children}
    </AuthModeContext.Provider>
  )
}

// (2)
export const useAuthMode = () => useContext(AuthModeContext)

import { createContext, useContext, useState, useEffect } from 'react'

export const DarkModeContext = createContext()

// (1) Provider
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme')
    return savedMode ? savedMode === 'dark' : false
  })

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// (2) Hook
export const useDarkMode = () => useContext(DarkModeContext)

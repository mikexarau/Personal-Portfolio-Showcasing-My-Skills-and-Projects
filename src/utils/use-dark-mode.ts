import { useState, useEffect } from 'react'

export interface UseDarkModeResult {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
}

export const useDarkMode = (): UseDarkModeResult => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    // Verificar si estamos en el cliente (no SSR)
    if (typeof window !== 'undefined') {
      // Obtener preferencia guardada o detectar preferencia del sistema
      const savedPreference = localStorage.getItem('darkMode')
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const initialValue = savedPreference !== null 
        ? JSON.parse(savedPreference) 
        : systemPreference
        
      setIsDarkMode(initialValue)
    }
  }, [])

  useEffect(() => {
    // Aplicar clase al documento y guardar preferencia
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value)
  }

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  }
} 
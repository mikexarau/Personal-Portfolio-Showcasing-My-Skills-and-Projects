import React, { createContext, useContext, useState, useEffect } from 'react'
import designSystem2025, { themeColors } from './design-system-2025'

// 🎯 Simplified Theme Interface - Unified across all components
interface Theme2025 {
  name: 'light' | 'dark'
  colors: typeof themeColors & {
    // Status colors (direct mapping)
    status: typeof themeColors.status
  }
}

interface Theme2025ContextType {
  theme: Theme2025
  designSystem: typeof designSystem2025
  isDark: boolean
  toggleTheme: () => void
  isClient: boolean
}

// 🎨 Light Theme - Clean and Professional (UNIFIED)
const lightTheme: Theme2025 = {
  name: 'light',
  colors: {
    ...themeColors,
    status: themeColors.status
  }
}

// 🌙 Dark Theme - Rich and Modern (UNIFIED)
const darkTheme: Theme2025 = {
  name: 'dark',
  colors: {
    // Background system (dark)
    bg: {
      primary: designSystem2025.colors.neutral[950],     // Near black
      secondary: designSystem2025.colors.neutral[900],   // Dark gray
      tertiary: designSystem2025.colors.neutral[800]     // Medium dark
    },
    
    // Text system (dark) 
    text: {
      primary: designSystem2025.colors.neutral[50],      // Off-white
      secondary: designSystem2025.colors.neutral[400],   // Medium gray
      tertiary: designSystem2025.colors.neutral[500],    // Darker gray
      inverse: designSystem2025.colors.neutral[900]      // Dark text
    },
    
    // Border system (dark)
    border: {
      primary: designSystem2025.colors.neutral[700],     // Medium border
      secondary: designSystem2025.colors.neutral[800],   // Darker border  
      accent: designSystem2025.colors.accent[400]        // Accent border
    },
    
    // Interactive system (dark)
    interactive: {
      primary: designSystem2025.colors.accent[500],      // Brighter in dark
      hover: designSystem2025.colors.accent[400],        // Lighter on hover
      active: designSystem2025.colors.accent[600]        // Active state
    },
    
    // Status system (consistent)
    status: themeColors.status
  }
}

// 🎭 Theme Context
const Theme2025Context = createContext<Theme2025ContextType | undefined>(undefined)

// 🎯 Theme Provider - SSR Protected
export function ThemeProvider2025({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // 🔒 SSR Protection: Mark when hydration is complete
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 💾 Persist theme preference - ONLY after hydration
  useEffect(() => {
    if (!isClient) return

    const savedTheme = localStorage.getItem('theme-2025')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient) return
    localStorage.setItem('theme-2025', isDark ? 'dark' : 'light')
  }, [isDark, isClient])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  const currentTheme = isDark ? darkTheme : lightTheme

  return (
    <Theme2025Context.Provider 
      value={{
        theme: currentTheme,
        designSystem: designSystem2025,
        isDark,
        toggleTheme,
        isClient
      }}
    >
      {children}
    </Theme2025Context.Provider>
  )
}

// 🪝 Unified Theme Hook - Single source of truth
export function useTheme2025() {
  const context = useContext(Theme2025Context)
  if (context === undefined) {
    throw new Error('useTheme2025 must be used within a ThemeProvider2025')
  }
  return context
}

// Export for compatibility
export default Theme2025Context 
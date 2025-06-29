import React from 'react'
import { ThemeProvider2025 } from './src/utils/theme-context-2025'

// 🔧 Hacer React y hooks disponibles globalmente para SSR
if (typeof window === 'undefined') {
  global.React = React
  global.useState = React.useState
  global.useEffect = React.useEffect
  global.useRef = React.useRef
}

// 🎨 Wrap all pages with ThemeProvider (SSR)
export const wrapRootElement = ({ element }) => {
  return (
  <ThemeProvider2025>
    {element}
  </ThemeProvider2025>
) 
}

// 🎯 SSR page wrapper
export const wrapPageElement = ({ element, props }) => {
  return element
} 
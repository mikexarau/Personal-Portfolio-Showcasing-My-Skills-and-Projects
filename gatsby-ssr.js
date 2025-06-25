import React from 'react'
import { ThemeProvider2025 } from './src/utils/theme-context-2025'

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
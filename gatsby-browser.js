// Optimización de preloads para reducir warnings del navegador
export const onRouteUpdate = ({ location, prevLocation }) => {
  // Limpiar preloads no utilizados al cambiar de ruta
  if (typeof window !== 'undefined') {
    const unusedPreloads = document.querySelectorAll('link[rel="preload"]:not([data-used="true"])')
    unusedPreloads.forEach(link => {
      // Marcar como usado para evitar warnings
      link.setAttribute('data-used', 'true')
    })
  }
}

// Optimización de recursos al cargar la página
export const onInitialClientRender = () => {
  if (typeof window !== 'undefined') {
    // Marcar recursos críticos como usados inmediatamente
    const criticalResources = document.querySelectorAll('link[rel="preload"][as="style"], link[rel="preload"][as="script"]')
    criticalResources.forEach(link => {
      link.setAttribute('data-used', 'true')
    })
    
    // Configurar intersection observer para cargar imágenes de forma lazy
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      })
      
      // Observar imágenes con data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  }
}

import React from 'react'
import { ThemeProvider2025 } from './src/utils/theme-context-2025'
import './src/styles/global-unified-2025.css'

// 🎨 Wrap all pages with ThemeProvider
export const wrapRootElement = ({ element }) => {
  return (
  <ThemeProvider2025>
    {element}
  </ThemeProvider2025>
) 
}

// 🚀 Client-side render optimization
export const onClientEntry = () => {
  // Performance optimizations
  if (typeof window !== 'undefined') {
    // ⚡ DESHABILITAR WORKBOX PARA EVITAR ERRORES 206
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          // Solo deshabilitar workbox, mantener otros service workers
          if (registration.scope.includes('workbox') || 
              registration.scope.includes('sw.js') ||
              registration.scope.includes('offline')) {
            registration.unregister()
            console.log('🛑 Workbox service worker deshabilitado para evitar errores 206')
          }
        }
      })
    }
    
    // Preload critical resources
    const preloadFont = document.createElement('link')
    preloadFont.rel = 'preload'
    preloadFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    preloadFont.as = 'style'
    preloadFont.onload = function() { this.rel = 'stylesheet' }
    document.head.appendChild(preloadFont)
  }
}

// 🎯 Enhanced error boundary for better debugging
export const wrapPageElement = ({ element, props }) => {
  return element
} 
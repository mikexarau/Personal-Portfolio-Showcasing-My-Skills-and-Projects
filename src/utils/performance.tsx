import React, { lazy } from 'react'

// Configuración de rendimiento
export const PERFORMANCE_CONFIG = {
  // Chunk splitting para optimizar el bundle
  ICON_CHUNK_SIZE: 20,
  LAZY_LOAD_THRESHOLD: 100,
  INTERSECTION_THRESHOLD: 0.1,
  
  // Prefetching y preloading
  ENABLE_PREFETCH: true,
  PREFETCH_DELAY: 2000,
  
  // Debouncing y throttling
  SCROLL_THROTTLE: 16,
  RESIZE_DEBOUNCE: 250,
  SEARCH_DEBOUNCE: 300
}

// Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Solo en producción, enviar métricas a analytics
    console.info(`[Web Vitals] ${metric.name}: ${metric.value}`)
    
    // Aquí podrías integrar con Google Analytics, etc.
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        non_interaction: true,
      })
    }
  }
}

// Lazy loading con error boundary
export const createLazyComponent = (importFunc: () => Promise<any>, fallback?: React.ComponentType) => {
  const LazyComponent = lazy(importFunc)
  
  return React.memo((props: any) => (
    <React.Suspense fallback={fallback ? React.createElement(fallback) : <div>Cargando...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  ))
}

// Intersection Observer para lazy loading
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  callback: () => void,
  options = { threshold: PERFORMANCE_CONFIG.INTERSECTION_THRESHOLD }
) => {
  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
          observer.disconnect()
        }
      },
      options
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, callback, options])
}

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/inter.woff2',
    '/fonts/soehne.woff2'
  ]

  fontPreloads.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Service Worker registration para caching
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.info('Service Worker registrado:', registration)
    } catch (error) {
        console.error('Error al registrar Service Worker:', error)
    }
  }
}

// Bundle analyzer helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.info('Bundle Analysis disponible en: http://localhost:8888')
  }
}

// Memory leak prevention
export const createCleanupEffect = (cleanup: () => void) => {
  return React.useEffect(() => {
    return cleanup
  }, [cleanup])
}

// Declaración global para TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default {
  PERFORMANCE_CONFIG,
  trackWebVitals,
  createLazyComponent,
  useIntersectionObserver,
  preloadCriticalResources,
  registerServiceWorker,
  analyzeBundleSize,
  createCleanupEffect
} 
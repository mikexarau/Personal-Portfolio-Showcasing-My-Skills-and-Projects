import { useState, useEffect, useCallback, useRef } from 'react'

// 🎯 Tipos para interacciones táctiles
export interface TouchPoint {
  x: number
  y: number
  timestamp: number
}

export interface SwipeGesture {
  direction: 'left' | 'right' | 'up' | 'down'
  distance: number
  velocity: number
  duration: number
}

export interface PinchGesture {
  scale: number
  velocity: number
}

export interface TouchInteractionConfig {
  swipeThreshold?: number
  velocityThreshold?: number
  longPressDelay?: number
  hapticFeedback?: boolean
  preventScrollOnSwipe?: boolean
}

const defaultConfig: TouchInteractionConfig = {
  swipeThreshold: 50,
  velocityThreshold: 0.3,
  longPressDelay: 500,
  hapticFeedback: true,
  preventScrollOnSwipe: true
}

// 🔥 Hook principal para interacciones táctiles
export const useTouchInteractions = (config: TouchInteractionConfig = {}) => {
  const mergedConfig = { ...defaultConfig, ...config }
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [supportsHover, setSupportsHover] = useState(true)
  const [isPressing, setIsPressing] = useState(false)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const [currentSwipe, setCurrentSwipe] = useState<SwipeGesture | null>(null)
  
  const startTouch = useRef<TouchPoint | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout>()
  const elementRef = useRef<HTMLElement>()

  // 🎯 Detección de dispositivos táctiles
  const detectTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return false
    
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }, [])

  // 🎯 Detección de soporte hover
  const detectHoverSupport = useCallback(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  // 🎯 Haptic feedback nativo
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!mergedConfig.hapticFeedback || typeof window === 'undefined') return
    
    try {
      // iOS Haptic Feedback
      if ('hapticFeedback' in navigator && 'vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30]
        }
        navigator.vibrate(patterns[type])
      }
      // Android Web Vibration API
      else if ('vibrate' in navigator) {
        const intensities = {
          light: 25,
          medium: 50,
          heavy: 100
        }
        navigator.vibrate(intensities[type])
      }
    } catch (error) {
      // Silently fail if haptic feedback is not supported
    }
  }, [mergedConfig.hapticFeedback])

  // 🎯 Calcular velocidad de gesto
  const calculateVelocity = useCallback((start: TouchPoint, end: TouchPoint): number => {
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    )
    const time = end.timestamp - start.timestamp
    return time > 0 ? distance / time : 0
  }, [])

  // 🎯 Detectar dirección de swipe
  const getSwipeDirection = useCallback((start: TouchPoint, end: TouchPoint): SwipeGesture['direction'] => {
    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left'
    } else {
      return deltaY > 0 ? 'down' : 'up'
    }
  }, [])

  // 🎯 Manejar inicio de touch
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0]
    startTouch.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }
    
    setIsPressing(true)
    triggerHapticFeedback('light')
    
    // Iniciar timer para long press
    longPressTimer.current = setTimeout(() => {
      setIsLongPressing(true)
      triggerHapticFeedback('medium')
    }, mergedConfig.longPressDelay)
    
  }, [mergedConfig.longPressDelay, triggerHapticFeedback])

  // 🎯 Manejar movimiento de touch
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!startTouch.current) return
    
    const touch = event.touches[0]
    const currentTouch: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }
    
    const deltaX = Math.abs(currentTouch.x - startTouch.current.x)
    const deltaY = Math.abs(currentTouch.y - startTouch.current.y)
    
    // Cancelar long press si hay movimiento
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
      setIsLongPressing(false)
    }
    
    // Prevenir scroll si se está haciendo swipe horizontal
    if (mergedConfig.preventScrollOnSwipe && deltaX > deltaY && deltaX > 20) {
      event.preventDefault()
    }
    
  }, [mergedConfig.preventScrollOnSwipe])

  // 🎯 Manejar fin de touch
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!startTouch.current) return
    
    const touch = event.changedTouches[0]
    const endTouch: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }
    
    const distance = Math.sqrt(
      Math.pow(endTouch.x - startTouch.current.x, 2) + 
      Math.pow(endTouch.y - startTouch.current.y, 2)
    )
    
    // Detectar swipe
    if (distance > mergedConfig.swipeThreshold!) {
      const velocity = calculateVelocity(startTouch.current, endTouch)
      
      if (velocity > mergedConfig.velocityThreshold!) {
        const swipeGesture: SwipeGesture = {
          direction: getSwipeDirection(startTouch.current, endTouch),
          distance,
          velocity,
          duration: endTouch.timestamp - startTouch.current.timestamp
        }
        
        setCurrentSwipe(swipeGesture)
        triggerHapticFeedback('medium')
        
        // Limpiar swipe después de un frame
        setTimeout(() => setCurrentSwipe(null), 16)
      }
    }
    
    // Limpiar estados
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    
    setIsPressing(false)
    setIsLongPressing(false)
    startTouch.current = null
    
  }, [
    mergedConfig.swipeThreshold,
    mergedConfig.velocityThreshold,
    calculateVelocity,
    getSwipeDirection,
    triggerHapticFeedback
  ])

  // 🎯 Configurar listeners de eventos
  const attachTouchListeners = useCallback((element: HTMLElement) => {
    elementRef.current = element
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // 🎯 Inicializar detecciones
  useEffect(() => {
    setIsTouchDevice(detectTouchDevice())
    setSupportsHover(detectHoverSupport())
    
    const handleResize = () => {
      setSupportsHover(detectHoverSupport())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [detectTouchDevice, detectHoverSupport])

  // 🎯 Utilidades para componentes
  const getTouchProps = useCallback(() => ({
    'data-touch-device': isTouchDevice,
    'data-supports-hover': supportsHover,
    'data-pressing': isPressing,
    'data-long-pressing': isLongPressing,
  }), [isTouchDevice, supportsHover, isPressing, isLongPressing])

  const shouldDisableHover = !supportsHover || isTouchDevice

  return {
    // Estados
    isTouchDevice,
    supportsHover,
    isPressing,
    isLongPressing,
    currentSwipe,
    shouldDisableHover,
    
    // Funciones
    attachTouchListeners,
    triggerHapticFeedback,
    getTouchProps,
    
    // Utilidades
    isSwipeLeft: currentSwipe?.direction === 'left',
    isSwipeRight: currentSwipe?.direction === 'right',
    isSwipeUp: currentSwipe?.direction === 'up',
    isSwipeDown: currentSwipe?.direction === 'down'
  }
} 
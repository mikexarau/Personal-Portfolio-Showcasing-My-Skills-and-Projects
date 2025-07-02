import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTouchInteractions } from '../utils/useTouchInteractions'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🎬 Animaciones avanzadas para touch
const rippleAnimation = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
`

const springBounce = keyframes`
  0% { transform: scale(1) translateZ(0); }
  50% { transform: scale(0.95) translateZ(0); }
  100% { transform: scale(1) translateZ(0); }
`

const feedbackPulse = keyframes`
  0% { 
    transform: scale(1) translateZ(0);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% { 
    transform: scale(1.05) translateZ(0);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% { 
    transform: scale(1) translateZ(0);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`

const longPressFeedback = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(0.98); }
`

// 🎯 Contenedor principal táctil
const TouchContainer = styled.div<{
  $theme: any
  $designSystem: any
  $isPressed: boolean
  $isLongPressed: boolean
  $shouldDisableHover: boolean
  $enableSpring: boolean
  $enableRipple: boolean
}>`
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  
  /* 🔥 Eliminar hover en dispositivos táctiles */
  ${props => props.$shouldDisableHover && css`
    pointer-events: ${props.$isPressed ? 'none' : 'auto'};
    
    * {
      &:hover {
        /* Resetear todos los hovers en móvil */
        transform: none !important;
        background: inherit !important;
        box-shadow: inherit !important;
        opacity: inherit !important;
      }
    }
  `}
  
  /* 🎯 Estados táctiles */
  ${props => props.$isPressed && css`
    ${props.$enableSpring && css`
      /* 🔥 MOBILE: Animación simplificada */
      @media (min-width: 768px) {
        animation: ${springBounce} 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @media (max-width: 768px) {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
    `}
  `}
  
  ${props => props.$isLongPressed && css`
    /* 🔥 MOBILE: Sin animación de long press */
    @media (min-width: 768px) {
      animation: ${longPressFeedback} 0.3s ease-in-out forwards;
    }
    @media (max-width: 768px) {
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }
  `}
  
  /* 🎯 Feedback visual en tap */
  &[data-pressing="true"] {
    /* 🔥 MOBILE: Feedback simplificado */
    @media (min-width: 768px) {
      animation: ${feedbackPulse} 0.6s ease-out;
    }
    @media (max-width: 768px) {
      opacity: 0.8;
    }
  }
  
  /* 🔥 MOBILE: Eliminar optimizaciones GPU costosas */
  @media (max-width: 768px) {
    will-change: auto;
    transform: none;
  }
  
  /* 🔥 DESKTOP: Optimizaciones de rendimiento para touch */
  @media (min-width: 768px) {
    will-change: transform, opacity;
  }
  
  /* 🔥 Optimizaciones de rendimiento para touch */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`

// 🌊 Ripple effect container
const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`

// 🌊 Ripple individual
const RippleEffect = styled.div<{
  $x: number
  $y: number
  $size: number
  $color: string
}>`
  position: absolute;
  left: ${props => props.$x - props.$size / 2}px;
  top: ${props => props.$y - props.$size / 2}px;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: ${props => props.$color};
  animation: ${rippleAnimation} 0.6s ease-out forwards;
  pointer-events: none;
`

// 🎯 Loading dots para estados de carga táctil
const TouchLoadingDots = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem.spacing[1]};
  
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => props.$theme.colors.interactive.primary};
    animation: touchLoadingPulse 1.4s ease-in-out infinite both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0; }
  }
  
  @keyframes touchLoadingPulse {
    0%, 80%, 100% { 
      transform: scale(0);
      opacity: 0.5;
    }
    40% { 
      transform: scale(1);
      opacity: 1;
    }
  }
`

// 🎯 Interfaces
interface RippleState {
  id: number
  x: number
  y: number
  size: number
}

interface TouchInteractionsProps {
  children: React.ReactNode
  onTap?: () => void
  onLongPress?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  enableRipple?: boolean
  enableSpring?: boolean
  enableHaptic?: boolean
  disabled?: boolean
  loading?: boolean
  rippleColor?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// 🔥 Componente principal de interacciones táctiles
export const TouchInteractions: React.FC<TouchInteractionsProps> = ({
  children,
  onTap,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  enableRipple = true,
  enableSpring = true,
  enableHaptic = true,
  disabled = false,
  loading = false,
  rippleColor,
  className,
  as = 'div'
}) => {
  const { theme, designSystem } = useTheme2025()
  const [ripples, setRipples] = useState<RippleState[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const {
    isTouchDevice,
    shouldDisableHover,
    isPressing,
    isLongPressing,
    isSwipeLeft,
    isSwipeRight,
    isSwipeUp,
    isSwipeDown,
    attachTouchListeners,
    triggerHapticFeedback,
    getTouchProps
  } = useTouchInteractions({
    hapticFeedback: enableHaptic
  })

  // 🌊 Crear ripple effect
  const createRipple = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!enableRipple || disabled || !containerRef.current) return
    
    // 🔥 MOBILE: Limitar ripples para mejor performance
    if (isTouchDevice && ripples.length >= 3) return
    
    const rect = containerRef.current.getBoundingClientRect()
    let x: number, y: number
    
    if ('touches' in event) {
      x = event.touches[0].clientX - rect.left
      y = event.touches[0].clientY - rect.top
    } else {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }
    
    // 🔥 MOBILE: Ripple más pequeño para mejor performance
    const size = isTouchDevice 
      ? Math.max(rect.width, rect.height) * 1.5 
      : Math.max(rect.width, rect.height) * 2
    
    const newRipple: RippleState = {
      id: Date.now(),
      x,
      y,
      size
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // 🔥 MOBILE: Cleanup más rápido para liberar recursos
    const cleanupTime = isTouchDevice ? 400 : 600
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, cleanupTime)
    
    // Haptic feedback
    if (enableHaptic && isTouchDevice) {
      triggerHapticFeedback('light')
    }
  }, [enableRipple, disabled, enableHaptic, isTouchDevice, triggerHapticFeedback, ripples.length])

  // 🎯 Manejar interacciones
  useEffect(() => {
    if (!containerRef.current) return
    
    const cleanup = attachTouchListeners(containerRef.current)
    return cleanup
  }, [attachTouchListeners])

  // 🎯 Callbacks para gestos
  useEffect(() => {
    if (isLongPressing && onLongPress) {
      onLongPress()
      triggerHapticFeedback('medium')
    }
  }, [isLongPressing, onLongPress, triggerHapticFeedback])

  useEffect(() => {
    if (isSwipeLeft && onSwipeLeft) onSwipeLeft()
    if (isSwipeRight && onSwipeRight) onSwipeRight()
    if (isSwipeUp && onSwipeUp) onSwipeUp()
    if (isSwipeDown && onSwipeDown) onSwipeDown()
  }, [isSwipeLeft, isSwipeRight, isSwipeUp, isSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  // 🎯 Manejar click/tap
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (disabled || loading) return
    
    createRipple(event)
    
    if (onTap) {
      onTap()
    }
  }, [disabled, loading, createRipple, onTap])

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (disabled || loading) return
    
    createRipple(event)
  }, [disabled, loading, createRipple])

  const defaultRippleColor = rippleColor || `${theme.colors.interactive.primary}40`

  return (
    <TouchContainer
      ref={containerRef}
      as={as}
      className={className}
      $theme={theme}
      $designSystem={designSystem}
      $isPressed={isPressing}
      $isLongPressed={isLongPressing}
      $shouldDisableHover={shouldDisableHover}
      $enableSpring={enableSpring}
      $enableRipple={enableRipple}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      {...getTouchProps()}
      style={{
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* 🌊 Ripple Effects */}
      {enableRipple && (
        <RippleContainer>
          {ripples.map(ripple => (
            <RippleEffect
              key={ripple.id}
              $x={ripple.x}
              $y={ripple.y}
              $size={ripple.size}
              $color={defaultRippleColor}
            />
          ))}
        </RippleContainer>
      )}
      
      {/* 📱 Contenido principal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <TouchLoadingDots $theme={theme} $designSystem={designSystem}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </TouchLoadingDots>
        ) : (
          children
        )}
      </div>
    </TouchContainer>
  )
}

// 🎯 HOC para envolver componentes existentes con interacciones táctiles
export const withTouchInteractions = <P extends object>(
  Component: React.ComponentType<P>,
  options: Partial<TouchInteractionsProps> = {}
) => {
  const WrappedComponent = React.forwardRef<any, P & Partial<TouchInteractionsProps>>((props, ref) => {
    const { onTap, onLongPress, enableRipple, enableSpring, ...componentProps } = props
    
    return (
      <TouchInteractions
        onTap={onTap}
        onLongPress={onLongPress}
        enableRipple={enableRipple ?? options.enableRipple}
        enableSpring={enableSpring ?? options.enableSpring}
        {...options}
      >
        <Component {...(componentProps as P)} ref={ref} />
      </TouchInteractions>
    )
  })
  
  WrappedComponent.displayName = `withTouchInteractions(${Component.displayName || Component.name})`
  return WrappedComponent
}

// 🎯 Componente de botón táctil optimizado
const TouchButton = styled.button<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.interactive.primary};
  color: ${props => props.$theme.colors.text.inverse};
  border: none;
  border-radius: ${props => props.$designSystem.radius.full};
  padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  /* 🔥 Optimizaciones táctiles */
  -webkit-tap-highlight-color: transparent;
  min-height: 44px; /* Mínimo para touch targets */
  min-width: 44px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const TouchOptimizedButton: React.FC<{
  children: React.ReactNode
  onTap?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}> = ({ children, onTap, disabled, loading, variant = 'primary', className }) => {
  const { theme, designSystem } = useTheme2025()
  
  return (
    <TouchInteractions
      onTap={onTap}
      disabled={disabled}
      loading={loading}
      enableRipple={true}
      enableSpring={true}
      className={className}
    >
      <TouchButton
        $theme={theme}
        $designSystem={designSystem}
        disabled={disabled}
        type="button"
      >
        {children}
      </TouchButton>
    </TouchInteractions>
  )
}

export default TouchInteractions 
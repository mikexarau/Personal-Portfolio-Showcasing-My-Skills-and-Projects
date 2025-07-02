import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 📊 Barra de progreso de scroll fija
const ProgressBar = styled.div<{ $theme: any; $designSystem: any; $variant: 'default' | 'reading' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$variant === 'reading' ? '2px' : '3px'};
  background: ${props => props.$variant === 'reading' ? 'transparent' : 'rgba(0, 0, 0, 0.05)'};
  z-index: ${props => props.$designSystem.zIndex.fixed};
  pointer-events: none;
  transition: opacity 0.3s ease;
`

const ProgressFill = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $progress: number;
  $variant: 'default' | 'reading'
}>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: ${props => props.$variant === 'reading' 
    ? props.$theme.colors.interactive.primary
    : `linear-gradient(90deg, ${props.$theme.colors.interactive.primary}, ${props.$theme.colors.interactive.hover})`
  };
  transition: width 0.1s ease-out;
  opacity: ${props => props.$variant === 'reading' ? '0.8' : '1'};
  transform: translateZ(0);
  will-change: width;
`

// 🎯 Interface del componente
interface ScrollProgressProps {
  variant?: 'default' | 'reading'
  showOnPages?: string[]
  hideOnPages?: string[]
}

// 🚀 Componente principal
const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  variant = 'default',
  showOnPages = [],
  hideOnPages = []
}) => {
  const { theme, designSystem, isClient } = useTheme2025()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // 🎯 Calcular progreso de scroll
  useEffect(() => {
    if (!isClient) return

    const calculateProgress = () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0
      
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    // 🔧 Throttled scroll handler para mejor performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // 🎯 Mostrar/ocultar basado en scroll position
    const handleVisibility = () => {
      // Mostrar siempre, independientemente de la posición de scroll
      setIsVisible(true)
    }

    // Event listeners optimizados
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleVisibility, { passive: true })
    window.addEventListener('resize', calculateProgress, { passive: true })

    // Initial calculation
    calculateProgress()
    handleVisibility()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleVisibility)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [isClient])

  // 🎯 Lógica de visibilidad por página
  useEffect(() => {
    if (!isClient) return

    const currentPath = window.location.pathname

    if (hideOnPages.length > 0) {
      const shouldHide = hideOnPages.some(page => currentPath.includes(page))
      setIsVisible(!shouldHide)
      return
    }

    if (showOnPages.length > 0) {
      const shouldShow = showOnPages.some(page => currentPath.includes(page))
      setIsVisible(shouldShow)
      return
    }

    // Default: mostrar en todas las páginas
    setIsVisible(true)
  }, [isClient, showOnPages, hideOnPages])

  // 🚫 No renderizar en SSR o si no es visible
  if (!isClient || !isVisible) return null

  return (
    <ProgressBar 
      $theme={theme} 
      $designSystem={designSystem} 
      $variant={variant}
      className={variant === 'reading' ? 'reading-progress-bar' : 'scroll-progress-bar'}
      style={{ opacity: 1 }}
    >
      <ProgressFill
        $theme={theme}
        $designSystem={designSystem}
        $progress={scrollProgress}
        $variant={variant}
      />
    </ProgressBar>
  )
}

export default ScrollProgress 
import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

// ⚡ Optimizaciones de Performance Globales
const PerformanceOptimizations = createGlobalStyle`
  /* 🚀 CRITICAL PERFORMANCE OPTIMIZATIONS */
  
  /* Mejoras de rendering para todos los elementos interactivos */
  button,
  a,
  [role="button"],
  [tabindex] {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  /* Optimización para elementos que cambian frecuentemente */
  .animated,
  .hover-effect,
  .carousel-item,
  .modal,
  .dropdown {
    contain: layout style paint;
    will-change: transform, opacity;
  }
  
  /* Lazy loading optimizado para imágenes */
  img {
    content-visibility: auto;
    contain-intrinsic-size: 400px 300px;
  }
  
  /* Optimización de scroll */
  * {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

// 🎯 Loading States Universales
const loadingPulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const loadingShimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

// 📦 Skeleton Loader Universal
export const SkeletonLoader = styled.div<{ 
  width?: string; 
  height?: string; 
  $theme?: any; 
  $designSystem?: any 
}>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  background: linear-gradient(
    90deg,
    ${props => props.$theme?.colors?.bg?.secondary || '#f0f0f0'} 25%,
    ${props => props.$theme?.colors?.bg?.tertiary || '#e0e0e0'} 50%,
    ${props => props.$theme?.colors?.bg?.secondary || '#f0f0f0'} 75%
  );
  background-size: 200px 100%;
  animation: ${loadingShimmer} 1.5s infinite linear;
  border-radius: ${props => props.$designSystem?.radius?.md || '0.5rem'};
`

// 🎭 Micro-interacciones Universales
export const HoverCard = styled.div<{ $theme?: any; $designSystem?: any }>`
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 40px ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}20;
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01);
    transition: all 0.1s ease;
  }
`

// 🎯 Botón Universal con Estados Perfectos
export const UniversalButton = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $theme?: any;
  $designSystem?: any;
}>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'system-ui'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  border: none;
  border-radius: ${props => props.$designSystem?.radius?.lg || '0.75rem'};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: ${props.$designSystem?.spacing?.[2] || '0.5rem'} ${props.$designSystem?.spacing?.[4] || '1rem'};
          font-size: ${props.$designSystem?.typography?.scale?.sm || '0.875rem'};
        `
      case 'lg':
        return `
          padding: ${props.$designSystem?.spacing?.[4] || '1rem'} ${props.$designSystem?.spacing?.[8] || '2rem'};
          font-size: ${props.$designSystem?.typography?.scale?.lg || '1.125rem'};
        `
      default:
        return `
          padding: ${props.$designSystem?.spacing?.[3] || '0.75rem'} ${props.$designSystem?.spacing?.[6] || '1.5rem'};
          font-size: ${props.$designSystem?.typography?.scale?.base || '1rem'};
        `
    }
  }}
  
  /* Color variants */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.$theme?.colors?.interactive?.primary || '#3b82f6'};
          color: ${props.$theme?.colors?.text?.inverse || '#ffffff'};
          
          &:hover {
            background: ${props.$theme?.colors?.interactive?.primaryHover || '#2563eb'};
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 25px ${props.$theme?.colors?.interactive?.primary || '#3b82f6'}40;
          }
        `
      case 'secondary':
        return `
          background: ${props.$theme?.colors?.bg?.secondary || '#f8fafc'};
          color: ${props.$theme?.colors?.text?.primary || '#0f172a'};
          border: 1px solid ${props.$theme?.colors?.border?.primary || '#e5e7eb'};
          
          &:hover {
            background: ${props.$theme?.colors?.bg?.tertiary || '#f1f5f9'};
            border-color: ${props.$theme?.colors?.interactive?.primary || '#3b82f6'};
            transform: translateY(-2px);
          }
        `
      default: // ghost
        return `
          background: transparent;
          color: ${props.$theme?.colors?.text?.secondary || '#64748b'};
          
          &:hover {
            background: ${props.$theme?.colors?.bg?.secondary || '#f8fafc'};
            color: ${props.$theme?.colors?.text?.primary || '#0f172a'};
          }
        `
    }
  }}
  
  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${props => props.$variant === 'primary' 
      ? 'rgba(255, 255, 255, 0.3)' 
      : `${props.$theme?.colors?.interactive?.primary || '#3b82f6'}20`};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Focus state */
  &:focus-visible {
    outline: 2px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    outline-offset: 2px;
  }
`

// 🔄 Loading Spinner Universal
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingSpinner = styled.div<{ 
  size?: string; 
  $theme?: any; 
  color?: string 
}>`
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  border: 2px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-top: 2px solid ${props => props.color || props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

// 🎯 Toast Notification System
const toastSlideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`

export const Toast = styled.div<{ 
  $type?: 'success' | 'error' | 'warning' | 'info';
  $theme?: any;
  $designSystem?: any;
}>`
  padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  border-radius: ${props => props.$designSystem?.radius?.lg || '0.75rem'};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${toastSlideIn} 0.3s ease-out;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  
  ${props => {
    switch (props.$type) {
      case 'success':
        return `
          background: #10b98120;
          border: 1px solid #10b981;
          color: #065f46;
        `
      case 'error':
        return `
          background: #ef444420;
          border: 1px solid #ef4444;
          color: #7f1d1d;
        `
      case 'warning':
        return `
          background: #f59e0b20;
          border: 1px solid #f59e0b;
          color: #78350f;
        `
      default:
        return `
          background: ${props.$theme?.colors?.bg?.primary || '#ffffff'};
          border: 1px solid ${props.$theme?.colors?.border?.primary || '#e5e7eb'};
          color: ${props.$theme?.colors?.text?.primary || '#0f172a'};
        `
    }
  }}
`

// 🎭 Componente Principal de Optimizaciones
interface UXOptimizationsProps {
  children: React.ReactNode
}

const UXOptimizations2025: React.FC<UXOptimizationsProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Optimización de carga inicial
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Preload de recursos críticos
    const preloadResources = () => {
      const links = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }
      ]

      links.forEach(linkProps => {
        const link = document.createElement('link')
        Object.assign(link, linkProps)
        document.head.appendChild(link)
      })
    }

    preloadResources()

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PerformanceOptimizations />
      {children}
    </>
  )
}

export default UXOptimizations2025 
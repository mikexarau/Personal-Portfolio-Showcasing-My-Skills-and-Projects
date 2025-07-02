// 🎯 SISTEMA DE DISEÑO UNIFICADO 2025
// Solución definitiva para armonía, consistencia y accesibilidad

import { css } from 'styled-components'

// ========================================
// 🎨 TOKENS DE DISEÑO UNIFICADOS
// ========================================

export const unifiedTokens = {
  // 🔤 Typography - Sistema escalable y consistente
  typography: {
    fonts: {
      display: "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', 'Consolas', 'Monaco', monospace"
    },
    
    // Scale perfecto basado en ratio 1.25 (Major Third)
    scale: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px - Base
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem'     // 72px
    },
    
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em'
    }
  },

  // 📐 Spacing - Sistema 8pt consistente
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem'       // 128px
  },

  // 🎨 Colors - Paleta armoniosa y accesible
  colors: {
    // Grises neutros (base del sistema)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    },
    
    // Azul primario (acción principal)
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',  // Color principal
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    
    // Semantic colors
    success: {
      50: '#ecfdf5',
      200: '#bbf7d0',
      500: '#10b981',
      600: '#059669'
    },
    warning: {
      50: '#fffbeb',
      200: '#fed7aa',
      500: '#f59e0b',
      600: '#d97706'
    },
    error: {
      50: '#fef2f2',
      200: '#fecaca',
      500: '#ef4444',
      600: '#dc2626'
    }
  },

  // 🔘 Border radius - Consistente y moderno
  // REGLA CRÍTICA DEL DESIGN SYSTEM: Todos los botones DEBEN usar 'full'
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',     // Para formularios
    lg: '0.75rem',    // Para cards y contenedores
    xl: '1rem',       // Para secciones grandes
    '2xl': '1.5rem',
    full: '9999px'    // ⚠️ OBLIGATORIO para todos los botones
  },

  // 🌟 Shadows - Suaves y realistas
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // ⚡ Animations - Fluidas y naturales
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // 📱 Breakpoints - Mobile-first granular
  breakpoints: {
    xs: '480px',     // Teléfonos pequeños
    sm: '640px',     // Teléfonos grandes
    md: '768px',     // Tablets
    lg: '1024px',    // Laptops
    xl: '1280px',    // Desktops
    '2xl': '1536px'  // Pantallas grandes
  }
} as const

// ========================================
// 🎨 TEMAS UNIFICADOS
// ========================================

export const lightTheme = {
  name: 'light',
  colors: {
    // Backgrounds
    bg: {
      primary: unifiedTokens.colors.neutral[50],      // Fondo principal
      secondary: unifiedTokens.colors.neutral[100],   // Cards, sidebars
      tertiary: unifiedTokens.colors.neutral[200]     // Hover states
    },
    
    // Text colors
    text: {
      primary: unifiedTokens.colors.neutral[900],     // Títulos principales
      secondary: unifiedTokens.colors.neutral[600],   // Body text
      tertiary: unifiedTokens.colors.neutral[500],    // Meta info
      inverse: unifiedTokens.colors.neutral[50]       // Texto en fondos oscuros
    },
    
    // Interactive elements
    interactive: {
      primary: unifiedTokens.colors.primary[500],     // Botones primarios, enlaces
      hover: unifiedTokens.colors.primary[600],       // Hover states
      active: unifiedTokens.colors.primary[700]       // Active states
    },
    
    // Borders
    border: {
      primary: unifiedTokens.colors.neutral[200],     // Bordes principales
      secondary: unifiedTokens.colors.neutral[300],   // Bordes enfatizados
      accent: unifiedTokens.colors.primary[200]       // Bordes accent
    },
    
    // Status colors
    status: {
      success: unifiedTokens.colors.success[500],
      warning: unifiedTokens.colors.warning[500],
      error: unifiedTokens.colors.error[500]
    }
  }
}

export const darkTheme = {
  name: 'dark',
  colors: {
    // Backgrounds
    bg: {
      primary: unifiedTokens.colors.neutral[950],     // Fondo principal
      secondary: unifiedTokens.colors.neutral[900],   // Cards, sidebars
      tertiary: unifiedTokens.colors.neutral[800]     // Hover states
    },
    
    // Text colors
    text: {
      primary: unifiedTokens.colors.neutral[50],      // Títulos principales
      secondary: unifiedTokens.colors.neutral[400],   // Body text
      tertiary: unifiedTokens.colors.neutral[500],    // Meta info
      inverse: unifiedTokens.colors.neutral[900]      // Texto en fondos claros
    },
    
    // Interactive elements
    interactive: {
      primary: unifiedTokens.colors.primary[400],     // Más brillante en dark
      hover: unifiedTokens.colors.primary[300],       // Hover states
      active: unifiedTokens.colors.primary[500]       // Active states
    },
    
    // Borders
    border: {
      primary: unifiedTokens.colors.neutral[800],     // Bordes principales
      secondary: unifiedTokens.colors.neutral[700],   // Bordes enfatizados
      accent: unifiedTokens.colors.primary[600]       // Bordes accent
    },
    
    // Status colors
    status: {
      success: unifiedTokens.colors.success[500],
      warning: unifiedTokens.colors.warning[500],
      error: unifiedTokens.colors.error[500]
    }
  }
}

// ========================================
// 🧱 COMPONENTES BASE UNIFICADOS
// ========================================

// 🔘 Button base - Consistente en todo el sitio
export const unifiedButton = css<{ 
  $variant?: 'primary' | 'secondary' | 'ghost'
  $size?: 'sm' | 'md' | 'lg'
  $theme?: any
}>`
  /* Reset y base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${unifiedTokens.spacing[2]};
  border: none;
  border-radius: ${unifiedTokens.radius.full};
  font-family: ${unifiedTokens.typography.fonts.body};
  font-weight: ${unifiedTokens.typography.weight.medium};
  text-decoration: none;
  cursor: pointer;
  transition: all ${unifiedTokens.animation.duration.normal} ${unifiedTokens.animation.easing.smooth};
  white-space: nowrap;
  
  /* Focus accesible */
  &:focus-visible {
    outline: 2px solid ${props => props.$theme?.colors?.interactive?.primary};
    outline-offset: 2px;
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Tamaños */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: ${unifiedTokens.spacing[2]} ${unifiedTokens.spacing[4]};
          font-size: ${unifiedTokens.typography.scale.sm};
        `
      case 'lg':
        return `
          padding: ${unifiedTokens.spacing[4]} ${unifiedTokens.spacing[8]};
          font-size: ${unifiedTokens.typography.scale.lg};
        `
      default:
        return `
          padding: ${unifiedTokens.spacing[3]} ${unifiedTokens.spacing[6]};
          font-size: ${unifiedTokens.typography.scale.base};
        `
    }
  }}
  
  /* Variantes */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.$theme?.colors?.interactive?.primary};
          color: ${props.$theme?.colors?.text?.inverse};
          border: 1px solid ${props.$theme?.colors?.interactive?.primary};
          
          &:hover:not(:disabled) {
            background: ${props.$theme?.colors?.interactive?.hover};
            border-color: ${props.$theme?.colors?.interactive?.hover};
            transform: translateY(-1px);
            box-shadow: ${unifiedTokens.shadows.md};
          }
        `
      case 'secondary':
        return `
          background: ${props.$theme?.colors?.bg?.secondary};
          color: ${props.$theme?.colors?.text?.primary};
          border: 1px solid ${props.$theme?.colors?.border?.primary};
          
          &:hover:not(:disabled) {
            background: ${props.$theme?.colors?.bg?.tertiary};
            border-color: ${props.$theme?.colors?.interactive?.primary};
            color: ${props.$theme?.colors?.interactive?.primary};
            transform: translateY(-1px);
          }
        `
      default: // ghost
        return `
          background: transparent;
          color: ${props.$theme?.colors?.text?.secondary};
          border: 1px solid transparent;
          
          &:hover:not(:disabled) {
            background: ${props.$theme?.colors?.bg?.secondary};
            color: ${props.$theme?.colors?.text?.primary};
          }
        `
    }
  }}
`

// 🃏 Card base - Consistente para todos los cards
export const unifiedCard = css<{ 
  $hover?: boolean
  $padding?: 'sm' | 'md' | 'lg'
  $theme?: any
}>`
  background: ${props => props.$theme?.colors?.bg?.secondary};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary};
  border-radius: ${unifiedTokens.radius.xl};
  transition: all ${unifiedTokens.animation.duration.normal} ${unifiedTokens.animation.easing.smooth};
  
  /* Padding variants */
  ${props => {
    switch (props.$padding) {
      case 'sm':
        return `padding: ${unifiedTokens.spacing[4]};`
      case 'lg':
        return `padding: ${unifiedTokens.spacing[8]};`
      default:
        return `padding: ${unifiedTokens.spacing[6]};`
    }
  }}
  
  /* Hover effects */
  ${props => props.$hover && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${unifiedTokens.shadows.lg};
      border-color: ${props.$theme?.colors?.border?.accent};
    }
  `}
`

// 📝 Typography base - Consistente para todos los textos
export const unifiedHeading = css<{ 
  $level?: 1 | 2 | 3 | 4 | 5 | 6
  $theme?: any
}>`
  font-family: ${unifiedTokens.typography.fonts.display};
  font-weight: ${unifiedTokens.typography.weight.bold};
  line-height: ${unifiedTokens.typography.lineHeight.tight};
  letter-spacing: ${unifiedTokens.typography.letterSpacing.tight};
  color: ${props => props.$theme?.colors?.text?.primary};
  margin: 0;
  
  ${props => {
    switch (props.$level) {
      case 1:
        return `font-size: ${unifiedTokens.typography.scale['5xl']};`
      case 2:
        return `font-size: ${unifiedTokens.typography.scale['3xl']};`
      case 3:
        return `font-size: ${unifiedTokens.typography.scale['2xl']};`
      case 4:
        return `font-size: ${unifiedTokens.typography.scale.xl};`
      case 5:
        return `font-size: ${unifiedTokens.typography.scale.lg};`
      default:
        return `font-size: ${unifiedTokens.typography.scale.base};`
    }
  }}
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    ${props => {
      switch (props.$level) {
        case 1:
          return `font-size: ${unifiedTokens.typography.scale['4xl']};`
        case 2:
          return `font-size: ${unifiedTokens.typography.scale['2xl']};`
        case 3:
          return `font-size: ${unifiedTokens.typography.scale.xl};`
        default:
          return `font-size: ${unifiedTokens.typography.scale.lg};`
      }
    }}
  }
`

export const unifiedText = css<{ 
  $variant?: 'body' | 'caption' | 'lead'
  $theme?: any
}>`
  font-family: ${unifiedTokens.typography.fonts.body};
  line-height: ${unifiedTokens.typography.lineHeight.normal};
  margin: 0;
  
  ${props => {
    switch (props.$variant) {
      case 'lead':
        return `
          font-size: ${unifiedTokens.typography.scale.lg};
          font-weight: ${unifiedTokens.typography.weight.medium};
          color: ${props.$theme?.colors?.text?.primary};
          line-height: ${unifiedTokens.typography.lineHeight.relaxed};
        `
      case 'caption':
        return `
          font-size: ${unifiedTokens.typography.scale.sm};
          color: ${props.$theme?.colors?.text?.tertiary};
        `
      default:
        return `
          font-size: ${unifiedTokens.typography.scale.base};
          color: ${props.$theme?.colors?.text?.secondary};
          line-height: ${unifiedTokens.typography.lineHeight.relaxed};
        `
    }
  }}
`

// 📐 Layout helpers - Consistentes para spacing
export const unifiedContainer = css<{ 
  $size?: 'sm' | 'md' | 'lg' | 'xl'
}>`
  width: 100%;
  margin: 0 auto;
  padding-left: ${unifiedTokens.spacing[6]};
  padding-right: ${unifiedTokens.spacing[6]};
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `max-width: 640px;`
      case 'md':
        return `max-width: 768px;`
      case 'lg':
        return `max-width: 1024px;`
      case 'xl':
        return `max-width: 1280px;`
      default:
        return `max-width: 1200px;`
    }
  }}
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    padding-left: ${unifiedTokens.spacing[4]};
    padding-right: ${unifiedTokens.spacing[4]};
  }
`

// ========================================
// 🎯 UTILIDADES DE ACCESSIBILIDAD
// ========================================

export const accessibilityFocus = css`
  &:focus-visible {
    outline: 2px solid ${unifiedTokens.colors.primary[500]};
    outline-offset: 2px;
    border-radius: ${unifiedTokens.radius.sm};
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const visuallyHidden = css`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`

// ========================================
// 🌊 MOTION UTILITIES
// ========================================

export const respectReducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`

export const standardTransition = css`
  transition: all ${unifiedTokens.animation.duration.normal} ${unifiedTokens.animation.easing.smooth};
  ${respectReducedMotion}
`

// Export como default
export default {
  tokens: unifiedTokens,
  themes: { light: lightTheme, dark: darkTheme },
  components: {
    button: unifiedButton,
    card: unifiedCard,
    heading: unifiedHeading,
    text: unifiedText,
    container: unifiedContainer
  },
  utils: {
    accessibilityFocus,
    visuallyHidden,
    respectReducedMotion,
    standardTransition
  }
} 
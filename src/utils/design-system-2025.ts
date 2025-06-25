// ✨ Design System 2025 - Miquel Xarau Portfolio
// Sistema consolidado inspirado en Pangram Pangram y Thomas Le Corre
// Enfoque moderno con tipografía impactante y espaciados generosos

export const designSystem2025 = {
  // 🎨 Color Palette - Inspirado en Pangram Pangram
  colors: {
    // Base colors - Paleta neutral refinada
    neutral: {
      0: '#ffffff',
      50: '#fafafa', 
      100: '#f8fafc',
      200: '#f1f5f9',
      300: '#e2e8f0',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    
    // Professional accent colors - Inspirado en Le Corre
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b', 
      error: '#ef4444'
    }
  },

  // 📝 Typography - Stack moderno inspirado en ambos sitios
  typography: {
    fonts: {
      // Primary: Font stack moderno similar a Pangram Pangram
      sans: "'Inter', 'Söhne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      // Display: Para títulos grandes, inspirado en Le Corre
      display: "'Inter', 'Söhne', 'PP Monument', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    
    // Type scale expandida - Inspirada en los headers grandes de Le Corre
    scale: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px - Heroes principales
      '6xl': '3.75rem',  // 60px - Hero secundarios
      '7xl': '4.5rem',   // 72px - Títulos masivos como Le Corre
      '8xl': '6rem',     // 96px - Ultra displays
      '9xl': '8rem'      // 128px - Inspired by "Hello" sections
    },
    
    // Line heights optimizadas para tipografías grandes
    leading: {
      none: '1',
      tight: '1.1',     // Para títulos muy grandes
      snug: '1.25',     // Headlines
      normal: '1.5',    // Body text
      relaxed: '1.625', 
      loose: '2'
    },
    
    // Weights con más variedad
    weight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    
    // Letter spacing para diferentes contextos
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // 📐 Spacing - Sistema 8pt expandido con más opciones
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px  
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    7: '1.75rem',   // 28px
    8: '2rem',      // 32px
    9: '2.25rem',   // 36px
    10: '2.5rem',   // 40px
    11: '2.75rem',  // 44px
    12: '3rem',     // 48px
    14: '3.5rem',   // 56px
    16: '4rem',     // 64px
    18: '4.5rem',   // 72px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    28: '7rem',     // 112px
    32: '8rem',     // 128px
    36: '9rem',     // 144px
    40: '10rem',    // 160px
    44: '11rem',    // 176px
    48: '12rem',    // 192px
    52: '13rem',    // 208px
    56: '14rem',    // 224px
    60: '15rem',    // 240px
    64: '16rem',    // 256px
    72: '18rem',    // 288px
    80: '20rem',    // 320px
    96: '24rem'     // 384px
  },

  // 🔘 Border Radius - Más variedad, inspirado en Pangram
  radius: {
    none: '0',
    xs: '0.125rem',   // 2px
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '2.5rem',  // 40px
    full: '9999px'
  },

  // 🌊 Shadows - Sistema expandido con más opciones
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(14, 165, 233, 0.15)',
    glowLg: '0 0 40px rgba(14, 165, 233, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Sombras sutiles inspiradas en Pangram
    soft: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
    strong: '0 16px 40px 0 rgba(0, 0, 0, 0.12)'
  },

  // ⚡ Animation - Curvas más naturales
  animation: {
    duration: {
      fastest: '100ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms'
    },
    easing: {
      linear: 'linear',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      // Easing más naturales inspirados en diseño moderno
      bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      anticipate: 'cubic-bezier(0.22, 1, 0.36, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)'
    }
  },

  // 📱 Breakpoints - Más granular
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1920px'
  },

  // 📊 Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
    tooltip: 600,
    max: 9999
  }
}

// 🎨 Theme Mapping mejorado
export const themeColors = {
  // Background system
  bg: {
    primary: designSystem2025.colors.neutral[0],
    secondary: designSystem2025.colors.neutral[50],
    tertiary: designSystem2025.colors.neutral[100]
  },
  
  // Text system
  text: {
    primary: designSystem2025.colors.neutral[900],
    secondary: designSystem2025.colors.neutral[600],
    tertiary: designSystem2025.colors.neutral[500],
    inverse: designSystem2025.colors.neutral[0]
  },
  
  // Border system
  border: {
    primary: designSystem2025.colors.neutral[200],
    secondary: designSystem2025.colors.neutral[300],
    accent: designSystem2025.colors.accent[500]
  },
  
  // Interactive system
  interactive: {
    primary: designSystem2025.colors.accent[500],
    hover: designSystem2025.colors.accent[600],
    active: designSystem2025.colors.accent[700]
  },
  
  // Status system
  status: designSystem2025.colors.status
}

export default designSystem2025 
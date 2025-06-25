export type ChildImageSharp = {
  childImageSharp: {
    fluid: {
      aspectRatio: number
      src: string
      srcSet: string
      sizes: string
      base64: string
      tracedSVG: string
      srcWebp: string
      srcSetWebp: string
    }
  }
}

// About Page Types
export interface Technology {
  name: string
  icon: React.ComponentType
}

export interface Skill {
  category: string
  icon: React.ComponentType
  iconClass: 'react' | 'design' | 'tools' | 'ai'
  description: string
  technologies: Technology[]
}

export interface ContactInfo {
  icon: React.ComponentType
  text: string
}

export interface ContactAction {
  href: string
  text: string
  icon: React.ReactNode
  variant: 'primary' | 'secondary'
  target?: string
  rel?: string
}

export interface HeroConfig {
  badge: {
    icon: React.ReactNode
    text: string
  }
  title: string | React.ReactNode
  subtitle?: string
  actions?: ContactAction[]
}

// Theme types
export interface ThemeColors {
  primary: string
  accent: string
  surface: string
  background: string
  onBackground: string
  onSurface: string
  onSurfaceLight: string
  surfaceVariant: string
  primaryLight: string
  neon: string
}

export interface Theme {
  colors: ThemeColors
  fonts: {
    mono: string
  }
}

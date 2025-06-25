import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🎨 Modern, Clean, Medium-style UI Components
export interface PageHeaderProps {
  title: string
  subtitle: string
  actions?: Array<{
    label: string
    href: string
    variant: 'primary' | 'secondary'
    icon: React.ReactElement
    external?: boolean
  }>
}

const HeaderWrapper = styled.div<{ $theme: any; $designSystem: any }>`
  text-align: center;
  padding: 2.5rem 0 2rem 0;
  background: ${props => props.$theme.colors.bg.primary};
  
  @media (max-width: 768px) {
    padding: 2rem 0 1.5rem 0;
  }
`

const Title = styled.h1<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem?.typography?.scale?.['5xl'] || '3rem'};
  font-weight: 700;
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
  
  .highlight {
    color: ${props => props.$theme.colors.interactive.primary};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem?.typography?.scale?.['4xl'] || '2.25rem'};
  }
`

const Subtitle = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
  color: ${props => props.$theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto 1.5rem auto;
  line-height: 1.6;
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    margin-bottom: 1rem;
  }
`

const ActionsWrapper = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <HeaderWrapper $theme={theme} $designSystem={designSystem}>
      <Title $theme={theme} $designSystem={designSystem} dangerouslySetInnerHTML={{ __html: title }} />
      
      <Subtitle $theme={theme} $designSystem={designSystem}>
        {subtitle}
      </Subtitle>
      
      {actions && (
        <ActionsWrapper $designSystem={designSystem}>
          {actions.map((action, index) => (
            <ModernButton
              key={index}
              variant={action.variant}
              href={action.href}
              external={action.external}
              icon={action.icon}
              size="sm"
            >
              {action.label}
            </ModernButton>
          ))}
        </ActionsWrapper>
      )}
    </HeaderWrapper>
  )
}

// 🔘 Modern Button Component
export interface ModernButtonProps {
  variant: 'primary' | 'secondary'
  href: string
  children: React.ReactNode
  icon?: React.ReactElement
  external?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  as?: string
}

const ButtonBase = styled.a<{ $variant: string; $size: string; $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  white-space: nowrap;
  border: 1px solid transparent;
  
  ${props => props.$size === 'sm' && `
    padding: 0.5rem 1rem;
    font-size: ${props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  `}
  
  ${props => props.$size === 'md' && `
    padding: 0.75rem 1.5rem;
    font-size: ${props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  `}
  
  ${props => props.$size === 'lg' && `
    padding: 1rem 2rem;
    font-size: ${props.$designSystem?.typography?.scale?.base || '1rem'};
  `}
  
  ${props => props.$variant === 'primary' && `
    background: ${props.$theme.colors.interactive.primary};
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: ${props.$theme.colors.interactive.hover};
      transform: translateY(-2px);
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
    
    &:hover {
      background: #000000;
      border-color: #000000;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.25);
    }
  `}
`

export function ModernButton({ variant, href, children, icon, external, onClick, size = 'sm', as }: ModernButtonProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $theme={theme}
      $designSystem={designSystem}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      as={as}
    >
      {icon}
      {children}
    </ButtonBase>
  )
}

// 🃏 Modern Card Component - Medium Style
export interface ModernCardProps {
  children: React.ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
  onClick?: () => void
}

const CardWrapper = styled.div<{ $hover: boolean; $padding: string; $variant: string; $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  ${props => props.$padding === 'sm' && `padding: 1rem;`}
  ${props => props.$padding === 'md' && `padding: 1.5rem;`}
  ${props => props.$padding === 'lg' && `padding: 2rem;`}
  ${props => props.$padding === 'xl' && `padding: 2.5rem;`}
  
  ${props => props.$variant === 'default' && `
    border: 1px solid ${props.$theme.colors.border.primary};
  `}
  
  ${props => props.$variant === 'elevated' && `
    border: 1px solid ${props.$theme.colors.border.secondary};
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  `}
  
  ${props => props.$variant === 'outlined' && `
    border: 2px solid ${props.$theme.colors.border.primary};
  `}
  
  ${props => props.$hover && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: ${props.$theme.colors.interactive.primary}30;
      background: ${props.$theme.colors.bg.primaryDark};
      
      &::after {
        opacity: 1;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${props.$theme.colors.interactive.primary}03, transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  `}
`

export function ModernCard({ children, hover = false, padding = 'md', className, variant = 'default', onClick }: ModernCardProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <CardWrapper
      $hover={hover}
      $padding={padding}
      $variant={variant}
      $theme={theme}
      $designSystem={designSystem}
      className={className}
      onClick={onClick}
    >
      {children}
    </CardWrapper>
  )
}

// 📝 Modern Typography Components
const baseHeadingStyles = `
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
`

const ModernH2 = styled.h2<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
  color: ${props => props.$theme.colors.text.primary};
  font-size: 1.875rem;
  margin-bottom: 2rem;
  ${baseHeadingStyles}
`

const ModernH3 = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
  color: ${props => props.$theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  ${baseHeadingStyles}
`

const ModernH4 = styled.h4<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
  color: ${props => props.$theme.colors.text.primary};
  font-size: 1.25rem;
  margin-bottom: 1rem;
  ${baseHeadingStyles}
`

export interface ModernHeadingProps {
  level: 2 | 3 | 4
  children: React.ReactNode
  className?: string
}

export function ModernHeading({ level, children, className }: ModernHeadingProps) {
  const { theme, designSystem } = useTheme2025()

  if (level === 2) {
    return (
      <ModernH2 $theme={theme} $designSystem={designSystem} className={className}>
        {children}
      </ModernH2>
    )
  }
  
  if (level === 3) {
    return (
      <ModernH3 $theme={theme} $designSystem={designSystem} className={className}>
        {children}
      </ModernH3>
    )
  }
  
  return (
    <ModernH4 $theme={theme} $designSystem={designSystem} className={className}>
      {children}
    </ModernH4>
  )
}

// 🏷️ Modern Badge Component
const ModernBadgeStyled = styled.div<{ $variant: string; $size: string; $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$size === 'sm' ? '0.25rem' : '0.5rem'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.$size === 'sm' && `
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  `}
  
  ${props => props.$size === 'md' && `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}
  
  ${props => props.$variant === 'primary' && `
    background: ${props.$theme.colors.interactive.primary}15;
    color: ${props.$theme.colors.interactive.primary};
    border: 1px solid ${props.$theme.colors.interactive.primary}30;
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: ${props.$theme.colors.bg.secondary};
    color: ${props.$theme.colors.text.secondary};
    border: 1px solid ${props.$theme.colors.border.primary};
  `}
  
  ${props => props.$variant === 'success' && `
    background: #10b98115;
    color: #059669;
    border: 1px solid #10b98130;
  `}
  
  ${props => props.$variant === 'warning' && `
    background: #f59e0b15;
    color: #d97706;
    border: 1px solid #f59e0b30;
  `}
`

export interface ModernBadgeProps {
  variant: 'primary' | 'secondary' | 'success' | 'warning'
  children: React.ReactNode
  icon?: React.ReactElement
  size?: 'sm' | 'md'
}

export function ModernBadge({ variant, children, icon, size = 'md' }: ModernBadgeProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <ModernBadgeStyled $variant={variant} $size={size} $theme={theme} $designSystem={designSystem}>
      {icon}
      {children}
    </ModernBadgeStyled>
  )
}

// 📊 Modern Section Component
const SectionWrapper = styled.section<{ $theme: any; $designSystem: any }>`
  margin: 3rem 0;
  
  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  .section-header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const SectionTitle = styled.h2<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
`

const SectionDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: 1rem;
  color: ${props => props.$theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.625;
  font-weight: 400;
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
`

const SectionContent = styled.div<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '2rem'};
`

const SectionFooter = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  padding-top: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  border-top: 1px solid ${props => props.$theme.colors.border.primary}15;
`

const ElegantLink = styled.a<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  color: ${props => props.$theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      ${props => props.$theme.colors.interactive.primary}, 
      ${props => props.$theme.colors.interactive.hover}
    );
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$theme.colors.interactive.primary}08;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateY(-2px);
    
    &::before {
      width: 60%;
    }
    
    &::after {
      opacity: 1;
    }
    
    svg {
      transform: translateX(4px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
    opacity: 0.7;
  }
  
  .link-text {
    position: relative;
    z-index: 1;
  }
`

export interface ModernSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  action?: {
    label: string
    href: string
    icon?: React.ReactElement
    external?: boolean
  }
}

export function ModernSection({ title, description, children, action }: ModernSectionProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <SectionWrapper $theme={theme} $designSystem={designSystem}>
      <div className="section-header">
        <div className="section-header-content">
          <SectionTitle $theme={theme} $designSystem={designSystem}>
            {title}
          </SectionTitle>
          {description && (
            <SectionDescription $theme={theme} $designSystem={designSystem}>
              {description}
            </SectionDescription>
          )}
        </div>
      </div>
      
      <SectionContent $designSystem={designSystem}>
        {children}
      </SectionContent>
      
      {action && (
        <SectionFooter $theme={theme} $designSystem={designSystem}>
          <ElegantLink
            $theme={theme}
            $designSystem={designSystem}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
          >
            <span className="link-text">{action.label}</span>
            {action.icon}
          </ElegantLink>
        </SectionFooter>
      )}
    </SectionWrapper>
  )
}

// 🔄 Export for backward compatibility
export { ModernCard as UnifiedCard }
export { ModernSection as UnifiedSection }
export { ModernButton as UnifiedButton } 

const StatusBadge = styled.span<{ $variant: 'success' | 'warning' | 'error'; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
  padding: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'} ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => {
    const colors = {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
    return `
      background: ${colors[props.$variant]}15;
      color: ${colors[props.$variant]};
      border: 1px solid ${colors[props.$variant]}30;
    `
  }}
`

const HeroSection = styled.section<{ $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem?.spacing?.[20] || '5rem'} 0;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.$theme?.colors?.bg?.primary || '#ffffff'} 0%, ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'} 100%);
  
  h1 {
    font-size: ${props => props.$designSystem?.typography?.scale?.['5xl'] || '3rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
    color: ${props => props.$theme?.colors?.text?.primary || '#1e293b'};
  }
  
  p {
    font-size: ${props => props.$designSystem?.typography?.scale?.['2xl'] || '1.5rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    max-width: 600px;
    margin: 0 auto ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  }
  
  .subtitle {
    font-size: ${props => props.$designSystem?.typography?.scale?.xl || '1.25rem'};
    font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
    font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
  }
`

const MetricCard = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e2e8f0'};
  border-radius: ${props => props.$designSystem?.radius?.lg || '1rem'};
  padding: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$designSystem?.shadows?.md || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
  }
  
  .metric-number {
    font-size: ${props => props.$designSystem?.typography?.scale?.['4xl'] || '2.25rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    color: ${props => props.$theme?.colors?.interactive?.primary || '#0ea5e9'};
    line-height: 1;
    margin-bottom: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
  
  .metric-label {
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  }
  
  .metric-icon {
    font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
    color: ${props => props.$theme?.colors?.interactive?.primary || '#0ea5e9'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  }
`

const FeatureGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  margin: ${props => props.$designSystem?.spacing?.[8] || '2rem'} 0;
`

const FeatureCard = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e2e8f0'};
  border-radius: ${props => props.$designSystem?.radius?.lg || '1rem'};
  padding: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#0ea5e9'};
  }
  
  .feature-icon {
    font-size: ${props => props.$designSystem?.typography?.scale?.['3xl'] || '1.875rem'};
    color: ${props => props.$theme?.colors?.interactive?.primary || '#0ea5e9'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  }
  
  h3 {
    font-size: ${props => props.$designSystem?.typography?.scale?.['2xl'] || '1.5rem'};
    font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    color: ${props => props.$theme?.colors?.text?.primary || '#1e293b'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  }
  
  h4 {
    font-size: ${props => props.$designSystem?.typography?.scale?.xl || '1.25rem'};
    font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    color: ${props => props.$theme?.colors?.text?.primary || '#1e293b'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
  
  p {
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    line-height: 1.6;
    margin: 0;
  }
`

const CallToActionSection = styled.section<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme?.colors?.interactive?.primary || '#0ea5e9'};
  color: white;
  padding: ${props => props.$designSystem?.spacing?.[16] || '4rem'} 0;
  text-align: center;
  margin: ${props => props.$designSystem?.spacing?.[16] || '4rem'} 0;
  border-radius: ${props => props.$designSystem?.radius?.xl || '1.5rem'};
  
  h2 {
    font-size: ${props => props.$designSystem?.typography?.scale?.['4xl'] || '2.25rem'};
    font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'sans-serif'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  }
  
  p {
    font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
    font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
    opacity: 0.9;
  }
`

// 🎯 Container con márgenes consistentes
const UnifiedContainerStyled = styled.div<{ $theme: any; $designSystem: any; $size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.$designSystem.spacing[8]};
  
  ${props => props.$size === 'sm' && `max-width: 640px;`}
  ${props => props.$size === 'md' && `max-width: 768px;`}
  ${props => props.$size === 'lg' && `max-width: 1024px;`}
  ${props => props.$size === 'xl' && `max-width: 1280px;`}
  
  @media (max-width: ${props => props.$designSystem.breakpoints.lg}) {
    padding: 0 ${props => props.$designSystem.spacing[6]};
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: 0 ${props => props.$designSystem.spacing[4]};
  }
`

// 🎯 Spacing consistente entre secciones
const SectionSpacerStyled = styled.div<{ $size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; $designSystem: any }>`
  ${props => props.$size === 'xs' && `height: ${props.$designSystem.spacing[4]};`}
  ${props => props.$size === 'sm' && `height: ${props.$designSystem.spacing[8]};`}
  ${props => props.$size === 'md' && `height: ${props.$designSystem.spacing[12]};`}
  ${props => props.$size === 'lg' && `height: ${props.$designSystem.spacing[16]};`}
  ${props => props.$size === 'xl' && `height: ${props.$designSystem.spacing[20]};`}
  
  @media (max-width: 768px) {
    ${props => props.$size === 'xs' && `height: ${props.$designSystem.spacing[2]};`}
    ${props => props.$size === 'sm' && `height: ${props.$designSystem.spacing[4]};`}
    ${props => props.$size === 'md' && `height: ${props.$designSystem.spacing[6]};`}
    ${props => props.$size === 'lg' && `height: ${props.$designSystem.spacing[8]};`}
    ${props => props.$size === 'xl' && `height: ${props.$designSystem.spacing[12]};`}
  }
`

// 🎯 Texto con microinteracciones sutiles
const InteractiveTextStyled = styled.span<{ $theme: any; $designSystem: any; $hover?: boolean }>`
  position: relative;
  transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  
  ${props => props.$hover && `
    cursor: pointer;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${props.$theme.colors.interactive.primary};
      transition: width ${props.$designSystem.animation.duration.normal} ease;
    }
    
    &:hover {
      color: ${props.$theme.colors.interactive.primary};
      
      &::after {
        width: 100%;
      }
    }
  `}
`

export interface UnifiedContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function UnifiedContainer({ children, size, className }: UnifiedContainerProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <UnifiedContainerStyled 
      $theme={theme} 
      $designSystem={designSystem} 
      $size={size}
      className={className}
    >
      {children}
    </UnifiedContainerStyled>
  )
}

export interface SectionSpacerProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function SectionSpacer({ size }: SectionSpacerProps) {
  const { designSystem } = useTheme2025()

  return (
    <SectionSpacerStyled $size={size} $designSystem={designSystem} />
  )
}

export interface InteractiveTextProps {
  children: React.ReactNode
  hover?: boolean
  onClick?: () => void
  className?: string
}

export function InteractiveText({ children, hover = false, onClick, className }: InteractiveTextProps) {
  const { theme, designSystem } = useTheme2025()

  return (
    <InteractiveTextStyled 
      $theme={theme} 
      $designSystem={designSystem} 
      $hover={hover}
      onClick={onClick}
      className={className}
    >
      {children}
    </InteractiveTextStyled>
  )
} 
import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🎯 COMPONENTES UI ESENCIALES - VERSION CONSOLIDADA
// Solo los componentes que realmente se usan en el proyecto

// ================================
// MODERN BUTTON
// ================================
interface ModernButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
}

const StyledButton = styled.button<{ 
  $variant: string
  $size: string
  $theme: any
  $designSystem: any
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem.spacing[2]};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  border-radius: ${props => props.$designSystem.radius.lg};
  transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  cursor: pointer;
  border: 2px solid transparent;
  text-decoration: none;
  
  /* Sizes */
  ${props => props.$size === 'sm' && `
    padding: ${props.$designSystem.spacing[2]} ${props.$designSystem.spacing[4]};
    font-size: ${props.$designSystem.typography.scale.sm};
  `}
  
  ${props => props.$size === 'md' && `
    padding: ${props.$designSystem.spacing[3]} ${props.$designSystem.spacing[6]};
    font-size: ${props.$designSystem.typography.scale.base};
  `}
  
  ${props => props.$size === 'lg' && `
    padding: ${props.$designSystem.spacing[4]} ${props.$designSystem.spacing[8]};
    font-size: ${props.$designSystem.typography.scale.lg};
  `}
  
  /* Variants */
  ${props => props.$variant === 'primary' && `
    background: ${props.$theme.colors.interactive.primary};
    color: white;
    border-color: ${props.$theme.colors.interactive.primary};
    
    &:hover {
      background: ${props.$theme.colors.interactive.hover};
      border-color: ${props.$theme.colors.interactive.hover};
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: ${props.$theme.colors.bg.secondary};
    color: ${props.$theme.colors.text.primary};
    border-color: ${props.$theme.colors.border.primary};
    
    &:hover {
      background: ${props.$theme.colors.bg.tertiary};
      border-color: ${props.$theme.colors.interactive.primary};
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.$variant === 'outline' && `
    background: transparent;
    color: ${props.$theme.colors.interactive.primary};
    border-color: ${props.$theme.colors.interactive.primary};
    
    &:hover {
      background: ${props.$theme.colors.interactive.primary};
      color: white;
      transform: translateY(-2px);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon,
  disabled,
  className
}) => {
  const { theme, designSystem } = useTheme2025()
  
  const buttonContent = (
    <>
      {icon && icon}
      {children}
    </>
  )
  
  if (href) {
    return (
      <StyledButton
        as="a"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        $variant={variant}
        $size={size}
        $theme={theme}
        $designSystem={designSystem}
        className={className}
      >
        {buttonContent}
      </StyledButton>
    )
  }
  
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $theme={theme}
      $designSystem={designSystem}
      className={className}
    >
      {buttonContent}
    </StyledButton>
  )
}

// ================================
// MODERN SECTION
// ================================
interface ModernSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const SectionContainer = styled.section<{ $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[12]};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[10]};
  }
`

const SectionHeader = styled.div<{ $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
`

const SectionTitle = styled.h2<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale['3xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  font-family: ${props => props.$designSystem.typography.fonts.display};
  line-height: ${props => props.$designSystem.typography.leading.tight};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['2xl']};
  }
`

const SectionDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.lg};
  color: ${props => props.$theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.base};
  }
`

export const ModernSection: React.FC<ModernSectionProps> = ({
  title,
  description,
  children,
  className
}) => {
  const { theme, designSystem } = useTheme2025()
  
  return (
    <SectionContainer $theme={theme} $designSystem={designSystem} className={className}>
      <SectionHeader $theme={theme} $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          {title}
        </SectionTitle>
        {description && (
          <SectionDescription $theme={theme} $designSystem={designSystem}>
            {description}
          </SectionDescription>
        )}
      </SectionHeader>
      {children}
    </SectionContainer>
  )
}

// ================================
// MODERN CARD
// ================================
interface ModernCardProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const CardContainer = styled.div<{ 
  $theme: any
  $designSystem: any
  $padding: string
  $isClickable: boolean
}>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  
  /* Padding variants */
  ${props => props.$padding === 'sm' && `padding: ${props.$designSystem.spacing[4]};`}
  ${props => props.$padding === 'md' && `padding: ${props.$designSystem.spacing[6]};`}
  ${props => props.$padding === 'lg' && `padding: ${props.$designSystem.spacing[8]};`}
  ${props => props.$padding === 'xl' && `padding: ${props.$designSystem.spacing[10]};`}
  
  ${props => props.$isClickable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      border-color: ${props.$theme.colors.interactive.primary}50;
    }
  `}
`

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  onClick,
  href,
  className,
  padding = 'md'
}) => {
  const { theme, designSystem } = useTheme2025()
  const isClickable = !!(onClick || href)
  
  if (href) {
    return (
      <CardContainer
        as="a"
        href={href}
        $theme={theme}
        $designSystem={designSystem}
        $padding={padding}
        $isClickable={isClickable}
        className={className}
      >
        {children}
      </CardContainer>
    )
  }
  
  return (
    <CardContainer
      onClick={onClick}
      $theme={theme}
      $designSystem={designSystem}
      $padding={padding}
      $isClickable={isClickable}
      className={className}
    >
      {children}
    </CardContainer>
  )
}

// ================================
// PAGE HEADER
// ================================
interface PageHeaderAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
  external?: boolean
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: PageHeaderAction[]
  className?: string
}

const HeaderContainer = styled.div<{ $theme: any; $designSystem: any }>`
  text-align: center;
  padding: ${props => props.$designSystem.spacing[12]} 0;
  background: ${props => props.$theme.colors.bg.primary};
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[10]} 0;
  }
`

const HeaderTitle = styled.h1<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale['4xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  font-family: ${props => props.$designSystem.typography.fonts.display};
  line-height: ${props => props.$designSystem.typography.leading.tight};
  
  .highlight {
    color: ${props => props.$theme.colors.interactive.primary};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['3xl']};
  }
`

const HeaderSubtitle = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.xl};
  color: ${props => props.$theme.colors.text.secondary};
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.lg};
  }
`

const HeaderActions = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className
}) => {
  const { theme, designSystem } = useTheme2025()
  
  return (
    <HeaderContainer $theme={theme} $designSystem={designSystem} className={className}>
      <HeaderTitle 
        $theme={theme} 
        $designSystem={designSystem}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <HeaderSubtitle $theme={theme} $designSystem={designSystem}>
          {subtitle}
        </HeaderSubtitle>
      )}
      {actions && actions.length > 0 && (
        <HeaderActions $designSystem={designSystem}>
          {actions.map((action, index) => (
            <ModernButton
              key={index}
              href={action.href}
              variant={action.variant || 'primary'}
              external={action.external}
              icon={action.icon}
            >
              {action.label}
            </ModernButton>
          ))}
        </HeaderActions>
      )}
    </HeaderContainer>
  )
}

// ================================
// MODERN BADGE
// ================================
interface ModernBadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

const BadgeContainer = styled.span<{ 
  $variant: string
  $size: string
  $theme: any
  $designSystem: any
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  border-radius: ${props => props.$designSystem.radius.full};
  text-transform: uppercase;
  letter-spacing: ${props => props.$designSystem.typography.tracking.wide};
  
  /* Sizes */
  ${props => props.$size === 'sm' && `
    padding: ${props.$designSystem.spacing[1]} ${props.$designSystem.spacing[3]};
    font-size: ${props.$designSystem.typography.scale.xs};
  `}
  
  ${props => props.$size === 'md' && `
    padding: ${props.$designSystem.spacing[2]} ${props.$designSystem.spacing[4]};
    font-size: ${props.$designSystem.typography.scale.sm};
  `}
  
  /* Variants */
  ${props => props.$variant === 'primary' && `
    background: ${props.$theme.colors.interactive.primary}20;
    color: ${props.$theme.colors.interactive.primary};
    border: 1px solid ${props.$theme.colors.interactive.primary}40;
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: ${props.$theme.colors.text.secondary}20;
    color: ${props.$theme.colors.text.secondary};
    border: 1px solid ${props.$theme.colors.text.secondary}40;
  `}
  
  ${props => props.$variant === 'success' && `
    background: #10b98120;
    color: #10b981;
    border: 1px solid #10b98140;
  `}
  
  ${props => props.$variant === 'warning' && `
    background: #f59e0b20;
    color: #f59e0b;
    border: 1px solid #f59e0b40;
  `}
  
  ${props => props.$variant === 'danger' && `
    background: #ef444420;
    color: #ef4444;
    border: 1px solid #ef444440;
  `}
`

export const ModernBadge: React.FC<ModernBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className
}) => {
  const { theme, designSystem } = useTheme2025()
  
  return (
    <BadgeContainer
      $variant={variant}
      $size={size}
      $theme={theme}
      $designSystem={designSystem}
      className={className}
    >
      {children}
    </BadgeContainer>
  )
} 
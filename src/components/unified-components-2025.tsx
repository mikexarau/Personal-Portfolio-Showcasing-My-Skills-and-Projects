import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { 
  unifiedButton, 
  unifiedCard, 
  unifiedHeading, 
  unifiedText, 
  unifiedContainer,
  accessibilityFocus,
  standardTransition,
  unifiedTokens
} from '../utils/unified-design-system-2025'
import { useTheme2025 } from '../utils/theme-context-2025'

// ========================================
// 🔘 UNIFIED BUTTON COMPONENT
// ========================================

interface UnifiedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  icon?: React.ReactElement
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledButton = styled.button<{
  $variant: UnifiedButtonProps['variant']
  $size: UnifiedButtonProps['size']
  $theme: any
}>`
  ${unifiedButton}
  ${accessibilityFocus}
  ${standardTransition}
`

export const UnifiedButton = forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, icon, children, as, ...props }, ref) => {
    const Component = href ? 'a' : (as || 'button')
    
    return (
      <StyledButton
        ref={ref}
        as={Component}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        $variant={variant}
        $size={size}
        {...props}
      >
        {icon}
        {children}
      </StyledButton>
    )
  }
)

UnifiedButton.displayName = 'UnifiedButton'

// ========================================
// 🃏 UNIFIED CARD COMPONENT
// ========================================

interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledCard = styled.div<{
  $hover?: boolean
  $padding?: UnifiedCardProps['padding']
  $theme: any
}>`
  ${unifiedCard}
  ${standardTransition}
`

export const UnifiedCard = forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({ hover = false, padding = 'md', children, as, ...props }, ref) => {
    return (
      <StyledCard
        ref={ref}
        as={as}
        $hover={hover}
        $padding={padding}
        {...props}
      >
        {children}
      </StyledCard>
    )
  }
)

UnifiedCard.displayName = 'UnifiedCard'

// ========================================
// 📝 UNIFIED TYPOGRAPHY COMPONENTS
// ========================================

interface UnifiedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

const StyledHeading = styled.h1<{
  $level: UnifiedHeadingProps['level']
  $theme: any
}>`
  ${unifiedHeading}
`

export const UnifiedHeading = forwardRef<HTMLHeadingElement, UnifiedHeadingProps>(
  ({ level, children, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements
    
    return (
      <StyledHeading
        ref={ref}
        as={Component}
        $level={level}
        {...props}
      >
        {children}
      </StyledHeading>
    )
  }
)

UnifiedHeading.displayName = 'UnifiedHeading'

interface UnifiedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'caption' | 'lead'
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledText = styled.p<{
  $variant?: UnifiedTextProps['variant']
  $theme: any
}>`
  ${unifiedText}
`

export const UnifiedText = forwardRef<HTMLParagraphElement, UnifiedTextProps>(
  ({ variant = 'body', children, as = 'p', ...props }, ref) => {
    return (
      <StyledText
        ref={ref}
        as={as}
        $variant={variant}
        {...props}
      >
        {children}
      </StyledText>
    )
  }
)

UnifiedText.displayName = 'UnifiedText'

// ========================================
// 📐 UNIFIED LAYOUT COMPONENTS
// ========================================

interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledContainer = styled.div<{
  $size?: UnifiedContainerProps['size']
}>`
  ${unifiedContainer}
`

export const UnifiedContainer = forwardRef<HTMLDivElement, UnifiedContainerProps>(
  ({ size, children, as, ...props }, ref) => {
    return (
      <StyledContainer
        ref={ref}
        as={as}
        $size={size}
        {...props}
      >
        {children}
      </StyledContainer>
    )
  }
)

UnifiedContainer.displayName = 'UnifiedContainer'

// ========================================
// 🏷️ UNIFIED BADGE COMPONENT
// ========================================

interface UnifiedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  icon?: React.ReactElement
  children: React.ReactNode
}

const StyledBadge = styled.span<{
  $variant: UnifiedBadgeProps['variant']
  $size: UnifiedBadgeProps['size']
  $theme: any
}>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$size === 'sm' ? unifiedTokens.spacing[1] : unifiedTokens.spacing[2]};
  border-radius: ${unifiedTokens.radius.full};
  font-family: ${unifiedTokens.typography.fonts.body};
  font-weight: ${unifiedTokens.typography.weight.medium};
  ${standardTransition}
  
  ${props => props.$size === 'sm' ? `
    padding: ${unifiedTokens.spacing[1]} ${unifiedTokens.spacing[3]};
    font-size: ${unifiedTokens.typography.scale.xs};
  ` : `
    padding: ${unifiedTokens.spacing[2]} ${unifiedTokens.spacing[4]};
    font-size: ${unifiedTokens.typography.scale.sm};
  `}
  
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.$theme?.colors?.interactive?.primary}15;
          color: ${props.$theme?.colors?.interactive?.primary};
          border: 1px solid ${props.$theme?.colors?.interactive?.primary}30;
        `
      case 'secondary':
        return `
          background: ${props.$theme?.colors?.bg?.tertiary};
          color: ${props.$theme?.colors?.text?.secondary};
          border: 1px solid ${props.$theme?.colors?.border?.primary};
        `
      case 'success':
        return `
          background: ${unifiedTokens.colors.success[50]};
          color: ${unifiedTokens.colors.success[600]};
          border: 1px solid ${unifiedTokens.colors.success[200]};
        `
      case 'warning':
        return `
          background: ${unifiedTokens.colors.warning[50]};
          color: ${unifiedTokens.colors.warning[600]};
          border: 1px solid ${unifiedTokens.colors.warning[200]};
        `
      case 'error':
        return `
          background: ${unifiedTokens.colors.error[50]};
          color: ${unifiedTokens.colors.error[600]};
          border: 1px solid ${unifiedTokens.colors.error[200]};
        `
      default:
        return `
          background: ${props.$theme?.colors?.bg?.tertiary};
          color: ${props.$theme?.colors?.text?.secondary};
          border: 1px solid ${props.$theme?.colors?.border?.primary};
        `
    }
  }}
`

export const UnifiedBadge = forwardRef<HTMLSpanElement, UnifiedBadgeProps>(
  ({ variant = 'secondary', size = 'md', icon, children, ...props }, ref) => {
    return (
      <StyledBadge
        ref={ref}
        $variant={variant}
        $size={size}
        {...props}
      >
        {icon}
        {children}
      </StyledBadge>
    )
  }
)

UnifiedBadge.displayName = 'UnifiedBadge'

// ========================================
// 📄 UNIFIED PAGE HEADER COMPONENT
// ========================================

interface UnifiedPageHeaderProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    variant?: UnifiedBadgeProps['variant']
    icon?: React.ReactElement
  }
  actions?: Array<{
    label: string
    href?: string
    onClick?: () => void
    variant?: UnifiedButtonProps['variant']
    icon?: React.ReactElement
    external?: boolean
  }>
}

const HeaderWrapper = styled.header<{ $theme: any }>`
  text-align: center;
  padding: ${unifiedTokens.spacing[12]} 0 ${unifiedTokens.spacing[8]} 0;
  background: ${props => props.$theme?.colors?.bg?.primary};
  
  .header-badge {
    margin-bottom: ${unifiedTokens.spacing[6]};
  }
  
  .header-title {
    margin-bottom: ${unifiedTokens.spacing[4]};
  }
  
  .header-subtitle {
    margin-bottom: ${unifiedTokens.spacing[8]};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .header-actions {
    display: flex;
    gap: ${unifiedTokens.spacing[4]};
    justify-content: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    padding: ${unifiedTokens.spacing[8]} 0 ${unifiedTokens.spacing[6]} 0;
    
    .header-actions {
      flex-direction: column;
      align-items: center;
      gap: ${unifiedTokens.spacing[3]};
    }
  }
`

export const UnifiedPageHeader: React.FC<UnifiedPageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions
}) => {
  return (
    <HeaderWrapper>
      {badge && (
        <div className="header-badge">
          <UnifiedBadge 
            variant={badge.variant} 
            icon={badge.icon}
          >
            {badge.text}
          </UnifiedBadge>
        </div>
      )}
      
      <UnifiedHeading level={1} className="header-title">
        {title}
      </UnifiedHeading>
      
      {subtitle && (
        <UnifiedText variant="lead" className="header-subtitle">
          {subtitle}
        </UnifiedText>
      )}
      
      {actions && actions.length > 0 && (
        <div className="header-actions">
          {actions.map((action, index) => (
            <UnifiedButton
              key={index}
              variant={action.variant}
              href={action.href}
              onClick={action.onClick}
              external={action.external}
              icon={action.icon}
            >
              {action.label}
            </UnifiedButton>
          ))}
        </div>
      )}
    </HeaderWrapper>
  )
}

// ========================================
// 📱 UNIFIED RESPONSIVE GRID
// ========================================

interface UnifiedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: keyof typeof unifiedTokens.spacing
  children: React.ReactNode
}

const StyledGrid = styled.div<{
  $columns: UnifiedGridProps['columns']
  $gap: UnifiedGridProps['gap']
}>`
  display: grid;
  gap: ${props => unifiedTokens.spacing[props.$gap || '6']};
  
  ${props => {
    if (typeof props.$columns === 'number') {
      return `grid-template-columns: repeat(${props.$columns}, 1fr);`
    } else if (props.$columns) {
      const { sm = 1, md = 2, lg = 3, xl = 4 } = props.$columns
      return `
        grid-template-columns: repeat(${sm}, 1fr);
        
        @media (min-width: ${unifiedTokens.breakpoints.sm}) {
          grid-template-columns: repeat(${md}, 1fr);
        }
        
        @media (min-width: ${unifiedTokens.breakpoints.lg}) {
          grid-template-columns: repeat(${lg}, 1fr);
        }
        
        @media (min-width: ${unifiedTokens.breakpoints.xl}) {
          grid-template-columns: repeat(${xl}, 1fr);
        }
      `
    }
    return 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));'
  }}
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    gap: ${props => unifiedTokens.spacing[props.$gap ? '4' : '4']};
  }
`

export const UnifiedGrid = forwardRef<HTMLDivElement, UnifiedGridProps>(
  ({ columns, gap = '6', children, ...props }, ref) => {
    return (
      <StyledGrid
        ref={ref}
        $columns={columns}
        $gap={gap}
        {...props}
      >
        {children}
      </StyledGrid>
    )
  }
)

UnifiedGrid.displayName = 'UnifiedGrid'

// ========================================
// 📊 UNIFIED SECTION COMPONENT
// ========================================

interface UnifiedSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledSection = styled.section<{
  $spacing: UnifiedSectionProps['spacing']
  $theme: any
}>`
  ${props => {
    switch (props.$spacing) {
      case 'sm':
        return `padding: ${unifiedTokens.spacing[8]} 0;`
      case 'lg':
        return `padding: ${unifiedTokens.spacing[20]} 0;`
      case 'xl':
        return `padding: ${unifiedTokens.spacing[24]} 0;`
      default:
        return `padding: ${unifiedTokens.spacing[16]} 0;`
    }
  }}
  
  .section-header {
    text-align: center;
    margin-bottom: ${unifiedTokens.spacing[12]};
    
    .section-title {
      margin-bottom: ${unifiedTokens.spacing[4]};
    }
    
    .section-subtitle {
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    ${props => {
      switch (props.$spacing) {
        case 'sm':
          return `padding: ${unifiedTokens.spacing[6]} 0;`
        case 'lg':
          return `padding: ${unifiedTokens.spacing[12]} 0;`
        case 'xl':
          return `padding: ${unifiedTokens.spacing[16]} 0;`
        default:
          return `padding: ${unifiedTokens.spacing[10]} 0;`
      }
    }}
    
    .section-header {
      margin-bottom: ${unifiedTokens.spacing[8]};
    }
  }
`

export const UnifiedSection = forwardRef<HTMLElement, UnifiedSectionProps>(
  ({ title, subtitle, children, spacing = 'md', as, ...props }, ref) => {
    return (
      <StyledSection
        ref={ref}
        as={as}
        $spacing={spacing}
        {...props}
      >
        {(title || subtitle) && (
          <div className="section-header">
            {title && (
              <UnifiedHeading level={2} className="section-title">
                {title}
              </UnifiedHeading>
            )}
            {subtitle && (
              <UnifiedText variant="lead" className="section-subtitle">
                {subtitle}
              </UnifiedText>
            )}
          </div>
        )}
        {children}
      </StyledSection>
    )
  }
)

UnifiedSection.displayName = 'UnifiedSection' 
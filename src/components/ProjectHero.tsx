import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// Animaciones mejoradas
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`

// Hero Container minimalista y limpio
const HeroContainer = styled.section<{ $theme: any; $designSystem: any }>`
  position: relative;
  padding: 2.5rem 0 2rem 0;
  background: ${props => props.$theme.colors.bg.primary};
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary};
  
  @media (max-width: 768px) {
    padding: 2rem 0 1.5rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0 1rem 0;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`

const HeroTitle = styled.h1<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  font-size: ${props => props.$designSystem.typography.scale['4xl']};
  line-height: ${props => props.$designSystem.typography.lineHeight.tight};
  margin-bottom: ${props => props.$designSystem.spacing[3]};
  color: ${props => props.$theme.colors.text.primary};
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
  
  .highlight {
    color: ${props => props.$theme.colors.interactive.primary};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['3xl']};
    margin-bottom: ${props => props.$designSystem.spacing[2]};
  }
`

const HeroSubtitle = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.lg};
  line-height: ${props => props.$designSystem.typography.lineHeight.relaxed};
  color: ${props => props.$theme.colors.text.secondary};
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.base};
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.$designSystem.typography.scale.sm};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }
`

const HeroActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
  
  @media (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`

const ActionButton = styled.a<{ $theme: any; $designSystem: any; variant: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[2]};
  padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[4]};
  margin: 0 ${props => props.$designSystem.spacing[1]};
  border-radius: ${props => props.$designSystem.radius.full};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  
  ${props => {
    if (props.variant === 'primary') {
      return `
        background: ${props.$theme.colors.interactive.primary};
        color: ${props.$theme.colors.text.inverse};
        border: 2px solid ${props.$theme.colors.interactive.primary};
        
        &:hover {
          background: ${props.$theme.colors.interactive.hover};
          border-color: ${props.$theme.colors.interactive.hover};
          transform: translateY(-2px);
        }
      `;
    } else {
      return `
        background: ${props.$theme.colors.bg.secondary};
        color: ${props.$theme.colors.text.primary};
        border: 2px solid ${props.$theme.colors.border.primary};
        
        &:hover {
          background: ${props.$theme.colors.interactive.primary}15;
          border-color: ${props.$theme.colors.interactive.primary};
          color: ${props.$theme.colors.interactive.primary};
          transform: translateY(-2px);
        }
      `;
    }
  }}
  
  svg {
    transition: transform ${props => props.$designSystem.animation.duration.normal} ease;
    font-size: ${props => props.$designSystem.typography.scale.sm};
  }

  &:hover svg {
    transform: translateX(2px) scale(1.1);
  }
  
  @media (max-width: 560px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    margin: ${props => props.$designSystem.spacing[1]} 0;
    padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[3]};
  }
`

// Props del componente simplificadas
interface ProjectHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  actions?: Array<{
    href: string;
    text: string;
    icon: React.ReactNode;
    variant: 'primary' | 'secondary';
    target?: string;
    rel?: string;
  }>;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  subtitle,
  actions = []
}) => {
  const { theme, designSystem } = useTheme2025()

  return (
    <HeroContainer $theme={theme} $designSystem={designSystem}>
      <HeroContent>
        <HeroTitle $theme={theme} $designSystem={designSystem}>
          {title}
        </HeroTitle>
        
        {subtitle && (
          <HeroSubtitle $theme={theme} $designSystem={designSystem}>
            {subtitle}
          </HeroSubtitle>
        )}
        
        {actions.length > 0 && (
          <HeroActions>
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                href={action.href}
                variant={action.variant}
                $theme={theme}
                $designSystem={designSystem}
                target={action.target}
                rel={action.rel}
              >
                {action.icon}
                {action.text}
              </ActionButton>
            ))}
          </HeroActions>
        )}
      </HeroContent>
    </HeroContainer>
  )
}

export default ProjectHero 
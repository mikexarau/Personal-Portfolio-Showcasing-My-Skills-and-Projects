import React, { memo, Suspense } from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import designSystem2025 from '../utils/design-system-2025'
import { cardStyles, fadeInUp } from '../styles/shared-styles'
import { sanitizeString } from '../utils/skills-data'

// Card principal con diseño elegante y profesional
const Card = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: 2rem;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeInUp} 0.8s ease-out;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;

  /* Línea sutil de marca en la parte superior */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${props => props.$theme.colors.interactive.primary},
      ${props => props.$theme.colors.interactive.primary}90
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  /* Hover elegante y sutil */
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-color: ${props => props.$theme.colors.interactive.primary}30;
    
    &::before {
      transform: scaleX(1);
    }
    
    .skill-icon {
      transform: scale(1.05);
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    
    &:hover {
      transform: translateY(-2px) scale(1.005);
    }
  }
`

// Header con icono y título integrados elegantemente
const SkillHeader = styled.div<{ $designSystem: any }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 2;
`

// Icono rediseñado: más pequeño, elegante e integrado
const SkillIcon = styled.div<{ $theme: any; $designSystem: any; $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.$designSystem.radius.md};
  background: ${props => props.$color || props.$theme.colors.interactive.primary}12;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.spring};
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$color || props.$theme.colors.interactive.primary};
    transition: all 0.3s ease;
  }
`

// Área de contenido del título
const TitleArea = styled.div`
  flex: 1;
  min-width: 0;
`

// Título rediseñado: más compacto y elegante
const SkillTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.xl};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.tight};
  font-family: ${props => props.$designSystem.typography.fonts.display};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.lg};
  }
`

// Badge de categoría sutil
const CategoryBadge = styled.div<{ $theme: any; $designSystem: any }>`
  display: inline-block;
  font-size: ${props => props.$designSystem.typography.scale.xs};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  color: ${props => props.$theme.colors.text.tertiary};
  background: ${props => props.$theme.colors.bg.primaryDark};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.$designSystem.radius.sm};
  margin-top: 0.25rem;
  border: 1px solid ${props => props.$theme.colors.border.secondary};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
`

// Descripción más limpia
const SkillDescription = styled.p<{ $theme: any; $designSystem: any }>`
  color: ${props => props.$theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  position: relative;
  z-index: 2;
  flex-grow: 1;
`

// Grid de tecnologías más compacto
const TechGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.375rem;
  }
`

// Items de tecnología rediseñados: más minimalistas
const TechItem = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: ${props => props.$theme.colors.bg.primary};
  padding: 0.375rem 0.5rem;
  border-radius: ${props => props.$designSystem.radius.sm};
  font-size: ${props => props.$designSystem.typography.scale.xs};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  color: ${props => props.$theme.colors.text.tertiary};
  border: 1px solid ${props => props.$theme.colors.border.secondary};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  /* Hover sutil y elegante */
  &:hover {
    border-color: ${props => props.$theme.colors.interactive.primary}40;
    background: ${props => props.$theme.colors.interactive.primary}08;
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  /* Accesibilidad mejorada */
  &:focus-visible {
    outline: 2px solid ${props => props.$theme.colors.interactive.primary};
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  svg {
    color: ${props => props.$theme.colors.interactive.primary};
    transition: all 0.2s ease;
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`

// Skeleton loader optimizado
const IconSkeleton = styled.div<{ $theme: any }>`
  width: 0.75rem;
  height: 0.75rem;
  background: linear-gradient(90deg, 
    ${props => props.$theme.colors.bg.primaryDark} 25%, 
    ${props => props.$theme.colors.border.secondary} 50%, 
    ${props => props.$theme.colors.bg.primaryDark} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 2px;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

interface SkillCardProps {
  skill: any
  theme?: any
}

const SkillCard: React.FC<SkillCardProps> = memo(({ skill }) => {
  const { theme, designSystem } = useTheme2025()
  
  // Validar que skill existe y tiene las propiedades necesarias
  if (!skill || !skill.category || !skill.description || !skill.technologies) {
    return null
  }

  // Sanitizar datos para prevenir XSS
  const sanitizedCategory = sanitizeString(skill.category)
  const sanitizedDescription = sanitizeString(skill.description)
  
  const IconComponent = skill.icon

  // Validar que IconComponent existe
  if (!IconComponent) {
    return null
  }

  // Determinar la categoría principal para el badge
  const categoryType = skill.category.toLowerCase().includes('design') ? 'Design' :
                      skill.category.toLowerCase().includes('ai') ? 'AI & Tech' :
                      skill.category.toLowerCase().includes('seguridad') ? 'Security' :
                      skill.category.toLowerCase().includes('fullstack') ? 'Development' :
                      skill.category.toLowerCase().includes('herramientas') ? 'Tools' : 'Engineering'

  return (
    <Card $theme={theme} $designSystem={designSystem}>
      <SkillHeader $designSystem={designSystem}>
        <SkillIcon 
          $theme={theme} 
          $designSystem={designSystem} 
          $color={skill.color}
          className="skill-icon"
        >
          <Suspense fallback={<IconSkeleton $theme={theme} />}>
            <IconComponent />
          </Suspense>
        </SkillIcon>
        <TitleArea>
          <SkillTitle $theme={theme} $designSystem={designSystem}>
            {sanitizedCategory}
          </SkillTitle>
          <CategoryBadge $theme={theme} $designSystem={designSystem}>
            {categoryType}
          </CategoryBadge>
        </TitleArea>
      </SkillHeader>
      
      <SkillDescription $theme={theme} $designSystem={designSystem}>
        {sanitizedDescription}
      </SkillDescription>
      
      <TechGrid $designSystem={designSystem}>
        {skill.technologies.map((tech: any, index: number) => {
          // Validar cada tecnología
          if (!tech || !tech.name || !tech.icon) {
            return null
          }

          const TechIcon = tech.icon
          const sanitizedName = sanitizeString(tech.name)
          
          return (
            <TechItem 
              key={`${sanitizedName}-${index}`} 
              $theme={theme} 
              $designSystem={designSystem}
              className="tech-item"
              title={sanitizedName}
            >
              <Suspense fallback={<IconSkeleton $theme={theme} />}>
                <TechIcon />
              </Suspense>
              <span>{sanitizedName}</span>
            </TechItem>
          )
        })}
      </TechGrid>
    </Card>
  )
})

SkillCard.displayName = 'SkillCard'

export default SkillCard 
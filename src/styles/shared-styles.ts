import styled, { keyframes, css } from 'styled-components'
import designSystem2025 from '../utils/design-system-2025'

// Animaciones reutilizables
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`

export const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
  50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8); }
`

// Mixins CSS reutilizables - UNIFICADOS
export const cardStyles = css<{ $theme?: any }>`
  background: ${props => props.$theme?.colors?.bg?.secondary || '#ffffff'};
  border-radius: ${designSystem2025.radius.xl};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  transition: all ${designSystem2025.animation.duration.normal} ${designSystem2025.animation.easing.smooth};
  box-shadow: ${designSystem2025.shadows.sm};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${designSystem2025.shadows.md};
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}50;
  }
`

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const buttonBase = css<{ $theme?: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${designSystem2025.spacing[2]};
  padding: ${designSystem2025.spacing[3]} ${designSystem2025.spacing[6]};
  border-radius: ${designSystem2025.radius.full};
  font-weight: ${designSystem2025.typography.weight.medium};
  font-family: ${designSystem2025.typography.fonts.sans};
  text-decoration: none;
  transition: all ${designSystem2025.animation.duration.normal} ${designSystem2025.animation.easing.smooth};
  cursor: pointer;
  border: none;
  
  &:focus {
    outline: 2px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`

export const primaryButton = css<{ $theme?: any }>`
  ${buttonBase}
  background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
  border: 2px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  
  &:hover:not(:disabled) {
    background: ${props => props.$theme?.colors?.interactive?.hover || '#2563eb'};
    border-color: ${props => props.$theme?.colors?.interactive?.hover || '#2563eb'};
    transform: translateY(-2px);
    box-shadow: ${designSystem2025.shadows.md};
  }
`

export const secondaryButton = css<{ $theme?: any }>`
  ${buttonBase}
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  color: ${props => props.$theme?.colors?.text?.primary || '#0f172a'};
  border: 2px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  
  &:hover:not(:disabled) {
    background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}15;
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    transform: translateY(-2px);
  }
`

export const responsiveGrid = css`
  display: grid;
  gap: ${designSystem2025.spacing[8]};
  
  @media (max-width: 480px) {
    gap: ${designSystem2025.spacing[6]};
  }
`

export const sectionHeader = css<{ $theme?: any }>`
  text-align: center;
  margin-bottom: ${designSystem2025.spacing[12]};
  
  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: ${designSystem2025.spacing[2]};
    background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}15;
    color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    padding: ${designSystem2025.spacing[2]} ${designSystem2025.spacing[4]};
    border-radius: ${designSystem2025.radius.full};
    font-family: ${designSystem2025.typography.fonts.mono};
    font-size: ${designSystem2025.typography.scale.sm};
    font-weight: ${designSystem2025.typography.weight.semibold};
    margin-bottom: ${designSystem2025.spacing[6]};
    border: 1px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}30;
  }
  
  h2 {
    color: ${props => props.$theme?.colors?.text?.primary || '#0f172a'};
    margin-bottom: ${designSystem2025.spacing[4]};
    font-weight: ${designSystem2025.typography.weight.bold};
    font-size: ${designSystem2025.typography.scale['5xl']};
    line-height: ${designSystem2025.typography.leading.tight};
    font-family: ${designSystem2025.typography.fonts.display};
    
    @media (max-width: 768px) {
      font-size: ${designSystem2025.typography.scale['3xl']};
    }
  }
  
  p {
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    font-size: ${designSystem2025.typography.scale.xl};
    line-height: ${designSystem2025.typography.leading.relaxed};
    max-width: 600px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${designSystem2025.spacing[8]};
  }
`

// Contenedores reutilizables
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${designSystem2025.spacing[16]} ${designSystem2025.spacing[8]};
  
  @media (max-width: 768px) {
    padding: ${designSystem2025.spacing[12]} ${designSystem2025.spacing[4]};
  }
`

export const Section = styled.section<{ $theme?: any }>`
  margin-bottom: ${designSystem2025.spacing[16]};
  
  .section-header {
    ${sectionHeader}
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${designSystem2025.spacing[12]};
  }
`

// Grid responsivo optimizado
export const SkillsGrid = styled.div`
  ${responsiveGrid}
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
` 
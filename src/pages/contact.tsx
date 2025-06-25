import React from 'react'
import styled, { keyframes } from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import { unifiedTokens } from '../utils/unified-design-system-2025'
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaClock,
  FaExternalLinkAlt,
  FaVimeo,
  FaBehance,
  FaArrowRight
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

// 🎬 Animaciones ultra sutiles y profesionales
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const subtleFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

// 🏗️ Layout ultra compacto y sofisticado
const PageContainer = styled.div<{ $theme: any; $designSystem: any }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.$theme.colors.bg.primary};
`

const MainContent = styled.main<{ $theme: any; $designSystem: any }>`
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.$designSystem.spacing[8]} ${props => props.$designSystem.spacing[8]} ${props => props.$designSystem.spacing[12]} ${props => props.$designSystem.spacing[8]};
  width: 100%;
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[6]} ${props => props.$designSystem.spacing[6]} ${props => props.$designSystem.spacing[8]} ${props => props.$designSystem.spacing[6]};
  }
`

// 🎯 Hero minimalista y elegante
const HeroSection = styled.section<{ $theme: any; $designSystem: any }>`
  text-align: center;
  margin-bottom: ${props => props.$designSystem.spacing[20]};
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[4]};
    background: ${props => props.$theme.colors.bg.secondary};
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: ${props => props.$designSystem.radius.full};
    font-size: ${props => props.$designSystem.typography.scale.xs};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    color: ${props => props.$theme.colors.text.secondary};
    margin-bottom: ${props => props.$designSystem.spacing[8]};
    animation: ${fadeInUp} 0.6s ease-out;
    letter-spacing: ${unifiedTokens.typography.letterSpacing.wide};
    text-transform: uppercase;
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: ${subtleFloat} 3s ease-in-out infinite;
    }
  }
  
  .hero-title {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale['5xl']};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: ${props => props.$designSystem.spacing[6]};
    line-height: 1.1;
    letter-spacing: ${unifiedTokens.typography.letterSpacing.tight};
    animation: ${fadeInUp} 0.8s ease-out 0.1s both;
    
    .highlight {
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  .hero-subtitle {
    font-size: ${props => props.$designSystem.typography.scale.lg};
    color: ${props => props.$theme.colors.text.secondary};
    margin-bottom: ${props => props.$designSystem.spacing[10]};
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
    line-height: ${unifiedTokens.typography.lineHeight.relaxed};
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
    font-weight: ${props => props.$designSystem.typography.weight.normal};
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[16]};
    
    .hero-title {
      font-size: ${props => props.$designSystem.typography.scale['4xl']};
      margin-bottom: ${props => props.$designSystem.spacing[4]};
    }
    
    .hero-subtitle {
      font-size: ${props => props.$designSystem.typography.scale.base};
      margin-bottom: ${props => props.$designSystem.spacing[8]};
    }
  }
`

// 🎯 CTA principal refinado
const PrimaryCTA = styled.a<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[3]};
  padding: ${props => props.$designSystem.spacing[4]} ${props => props.$designSystem.spacing[8]};
  background: #000000;
  color: #ffffff;
  border-radius: ${props => props.$designSystem.radius.full};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px -6px rgba(0, 0, 0, 0.4);
    background: #1a1a1a;
    
    &::before {
      left: 100%;
    }
    
    svg {
      transform: translateX(4px);
    }
  }
  
  svg {
    transition: transform ${props => props.$designSystem.animation.duration.fast} ease;
  }
`

// 🌐 Grid de redes sociales compacto y elegante
const SocialSection = styled.section<{ $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[20]};
  
  .section-header {
    text-align: center;
    margin-bottom: ${props => props.$designSystem.spacing[12]};
    
    .section-title {
      font-family: ${props => props.$designSystem.typography.fonts.display};
      font-size: ${props => props.$designSystem.typography.scale['2xl']};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: ${props => props.$designSystem.spacing[3]};
      letter-spacing: ${unifiedTokens.typography.letterSpacing.tight};
    }
    
    .section-subtitle {
      font-size: ${props => props.$designSystem.typography.scale.base};
      color: ${props => props.$theme.colors.text.secondary};
      max-width: 400px;
      margin: 0 auto;
      line-height: ${unifiedTokens.typography.lineHeight.relaxed};
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[16]};
  }
`

const SocialGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.$designSystem.spacing[4]};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[3]};
  }
`

const SocialCard = styled.a<{ $theme: any; $designSystem: any; $color: string }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[4]};
  padding: ${props => props.$designSystem.spacing[5]};
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.lg};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$color};
    transform: scaleX(0);
    transition: transform ${props => props.$designSystem.animation.duration.normal} ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.$color}40;
    
    &::before {
      transform: scaleX(1);
    }
    
    .social-icon {
      background: ${props => props.$color};
      color: #ffffff;
      transform: scale(1.05);
    }
    
    .social-title {
      color: ${props => props.$color};
    }
    
    .external-icon {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    background: ${props => props.$color}15;
    color: ${props => props.$color};
    border-radius: ${props => props.$designSystem.radius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.$designSystem.typography.scale.lg};
    transition: all ${props => props.$designSystem.animation.duration.normal} ease;
    flex-shrink: 0;
  }
  
  .social-info {
    flex: 1;
    min-width: 0;
    
    .social-title {
      font-family: ${props => props.$designSystem.typography.fonts.display};
      font-size: ${props => props.$designSystem.typography.scale.base};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: ${props => props.$designSystem.spacing[1]};
      transition: color ${props => props.$designSystem.animation.duration.fast} ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .external-icon {
        opacity: 0;
        transform: scale(0.8);
        transition: all ${props => props.$designSystem.animation.duration.normal} ease;
        color: ${props => props.$theme.colors.text.tertiary};
        font-size: ${props => props.$designSystem.typography.scale.xs};
      }
    }
    
    .social-handle {
      font-size: ${props => props.$designSystem.typography.scale.sm};
      color: ${props => props.$theme.colors.text.secondary};
      font-family: ${props => props.$designSystem.typography.fonts.mono};
      font-weight: ${props => props.$designSystem.typography.weight.normal};
    }
  }
`

// 📍 Footer con información contextual compacta
const InfoFooter = styled.footer<{ $theme: any; $designSystem: any }>`
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  padding-top: ${props => props.$designSystem.spacing[8]};
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.$designSystem.spacing[8]};
    text-align: center;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: ${props => props.$designSystem.spacing[6]};
    }
  }
  
  .info-item {
    animation: ${fadeInUp} 0.6s ease-out;
    
    .info-icon {
      width: 32px;
      height: 32px;
      background: ${props => props.$theme.colors.text.primary};
      color: ${props => props.$theme.colors.text.inverse};
      border-radius: ${props => props.$designSystem.radius.md};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto ${props => props.$designSystem.spacing[3]} auto;
      font-size: ${props => props.$designSystem.typography.scale.sm};
      animation: ${subtleFloat} 4s ease-in-out infinite;
    }
    
    .info-title {
      font-family: ${props => props.$designSystem.typography.fonts.display};
      font-size: ${props => props.$designSystem.typography.scale.sm};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: ${props => props.$designSystem.spacing[1]};
      letter-spacing: ${unifiedTokens.typography.letterSpacing.wide};
      text-transform: uppercase;
    }
    
    .info-value {
      color: ${props => props.$theme.colors.text.secondary};
      font-size: ${props => props.$designSystem.typography.scale.sm};
      line-height: ${unifiedTokens.typography.lineHeight.relaxed};
    }
    
    &.status {
      .info-icon {
        background: #10b981;
        animation: ${subtleFloat} 2s ease-in-out infinite;
      }
      
      .info-value {
        color: #10b981;
        font-weight: ${props => props.$designSystem.typography.weight.medium};
      }
    }
  }
`

const Contact: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  const socialNetworks = [
    {
      name: 'Email',
      handle: 'hello@mxglab.com',
      icon: FaEnvelope,
      color: '#EA4335',
      url: 'mailto:hello@mxglab.com'
    },
    {
      name: 'LinkedIn',
      handle: '@miquelxarau',
      icon: FaLinkedin,
      color: '#0A66C2',
      url: 'https://linkedin.com/in/miquelxarau'
    },
    {
      name: 'GitHub',
      handle: '@mikexarau',
      icon: FaGithub,
      color: '#181717',
      url: 'https://github.com/mikexarau'
    },
    {
      name: 'Portfolio Web',
      handle: 'mikexarau.github.io',
      icon: FaExternalLinkAlt,
      color: '#4F46E5',
      url: 'https://mikexarau.github.io/'
    },
    {
      name: 'X',
      handle: '@miquelxarau',
      icon: FaXTwitter,
      color: '#000000',
      url: 'https://x.com/miquelxarau'
    },
    {
      name: 'Behance',
      handle: '@miquelxarau',
      icon: FaBehance,
      color: '#1769FF',
      url: 'https://behance.net/miquelxarau'
    },
    {
      name: 'Vimeo',
      handle: '@miquelxarau',
      icon: FaVimeo,
      color: '#1AB7EA',
      url: 'https://vimeo.com/miquelxarau'
    }
  ]

  return (
    <Layout2025>
      <SEO 
        title="Contacto - Miquel Xarau | Diseñador UX/UI & Desarrollador FullStack"
        desc="Disponible para proyectos de diseño UX/UI, desarrollo fullstack y consultoría en IA y ciberseguridad."
      />
      
      <PageContainer $theme={theme} $designSystem={designSystem}>
        <MainContent $theme={theme} $designSystem={designSystem}>
          
          {/* Hero Section Minimalista */}
          <HeroSection $theme={theme} $designSystem={designSystem}>
            <div className="hero-badge">
              <div className="status-dot" />
              Disponible para proyectos
            </div>
            
            <h1 className="hero-title">
              <span className="highlight">Contacto</span> profesional
            </h1>
            
            <p className="hero-subtitle">
              Disponible para proyectos de diseño UX/UI, desarrollo fullstack y consultoría especializada en IA y ciberseguridad.
            </p>
            
            <PrimaryCTA 
              $theme={theme} 
              $designSystem={designSystem}
              href="mailto:hello@mxglab.com"
            >
              <FaEnvelope />
              Empezar conversación
              <FaArrowRight />
            </PrimaryCTA>
          </HeroSection>

          {/* Redes Sociales Compactas */}
          <SocialSection $theme={theme} $designSystem={designSystem}>
            <div className="section-header">
              <h2 className="section-title">Conecta conmigo</h2>
              <p className="section-subtitle">
                Contenido sobre UX/UI, desarrollo fullstack, IA y ciberseguridad.
              </p>
            </div>
            
            <SocialGrid $designSystem={designSystem}>
              {socialNetworks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <SocialCard
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $theme={theme}
                    $designSystem={designSystem}
                    $color={social.color}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="social-icon">
                      <IconComponent />
                    </div>
                    <div className="social-info">
                      <div className="social-title">
                        {social.name}
                        <FaExternalLinkAlt className="external-icon" />
                      </div>
                      <div className="social-handle">{social.handle}</div>
                    </div>
                  </SocialCard>
                )
              })}
            </SocialGrid>
          </SocialSection>

          {/* Footer con Información Contextual */}
          <InfoFooter $theme={theme} $designSystem={designSystem}>
            <div className="info-grid">
              <div className="info-item status">
                <div className="info-icon">
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    background: '#ffffff', 
                    borderRadius: '50%' 
                  }} />
                </div>
                <h3 className="info-title">Estado</h3>
                <p className="info-value">Disponible para nuevos proyectos</p>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="info-title">Ubicación</h3>
                <p className="info-value">Barcelona, España<br />Remoto global</p>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaClock />
                </div>
                <h3 className="info-title">Horario</h3>
                <p className="info-value">CET (UTC+1)<br />Flexible</p>
              </div>
            </div>
          </InfoFooter>
          
        </MainContent>
      </PageContainer>
    </Layout2025>
  )
}

export default Contact 
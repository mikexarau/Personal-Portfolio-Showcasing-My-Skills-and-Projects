import React from 'react'
import styled from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import {
  UnifiedContainer,
  UnifiedSection,
  UnifiedHeading,
  UnifiedText,
  UnifiedButton,
  UnifiedGrid,
  UnifiedCard,
  UnifiedBadge
} from '../components/unified-components-2025'
import { unifiedTokens } from '../utils/unified-design-system-2025'
import FeaturedWorksCarousel from '../components/featured-works-carousel'
import GitHubCarousel from '../components/github-carousel'
import { 
  FaArrowRight, 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope,
  FaCode,
  FaLaptopCode,
  FaRocket
} from 'react-icons/fa'

// 🎬 Hero Section Unificado
const HeroSection = styled.section<{ $theme: any }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${props => props.$theme.colors.bg.primary} 0%,
    ${props => props.$theme.colors.bg.secondary} 100%
  );
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, ${props => props.$theme.colors.interactive.primary}15 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${props => props.$theme.colors.interactive.primary}10 0%, transparent 50%);
    pointer-events: none;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  .hero-badge {
    margin-bottom: ${unifiedTokens.spacing[8]};
    display: inline-block;
  }
  
  .hero-title {
    margin-bottom: ${unifiedTokens.spacing[6]};
    
    .highlight {
      color: ${props => props.$theme.colors.interactive.primary};
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 3px;
        background: ${props => props.$theme.colors.interactive.primary};
        border-radius: ${unifiedTokens.radius.full};
        opacity: 0.3;
      }
    }
  }
  
  .hero-subtitle {
    margin-bottom: ${unifiedTokens.spacing[10]};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    display: flex;
    gap: ${unifiedTokens.spacing[4]};
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: ${unifiedTokens.spacing[12]};
  }
  
  .hero-social {
    display: flex;
    gap: ${unifiedTokens.spacing[4]};
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    min-height: 80vh;
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
      gap: ${unifiedTokens.spacing[3]};
    }
    
    .hero-social {
      gap: ${unifiedTokens.spacing[3]};
    }
  }
`

// 🎯 Stats Section
const StatsSection = styled.section<{ $theme: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary};
`

const StatCard = styled.div<{ $theme: any }>`
  text-align: center;
  padding: ${unifiedTokens.spacing[6]};
  
  .stat-number {
    display: block;
    font-size: ${unifiedTokens.typography.scale['4xl']};
    font-weight: ${unifiedTokens.typography.weight.bold};
    color: ${props => props.$theme.colors.interactive.primary};
    margin-bottom: ${unifiedTokens.spacing[2]};
    font-family: ${unifiedTokens.typography.fonts.display};
  }
  
  .stat-label {
    color: ${props => props.$theme.colors.text.secondary};
    font-size: ${unifiedTokens.typography.scale.sm};
    font-weight: ${unifiedTokens.typography.weight.medium};
    text-transform: uppercase;
    letter-spacing: ${unifiedTokens.typography.letterSpacing.wide};
  }
  
  @media (max-width: ${unifiedTokens.breakpoints.md}) {
    .stat-number {
      font-size: ${unifiedTokens.typography.scale['3xl']};
    }
  }
`

// 🎨 Services Section
const ServiceCard = styled(UnifiedCard)<{ $theme: any }>`
  text-align: center;
  transition: all ${unifiedTokens.animation.duration.normal} ${unifiedTokens.animation.easing.smooth};
  
  .service-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto ${unifiedTokens.spacing[4]} auto;
    background: ${props => props.$theme.colors.interactive.primary}15;
    border-radius: ${unifiedTokens.radius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$theme.colors.interactive.primary};
    font-size: 24px;
  }
  
  .service-title {
    margin-bottom: ${unifiedTokens.spacing[3]};
  }
  
  .service-description {
    line-height: ${unifiedTokens.typography.lineHeight.relaxed};
  }
  
  &:hover {
    .service-icon {
      background: ${props => props.$theme.colors.interactive.primary};
      color: ${props => props.$theme.colors.text.inverse};
      transform: scale(1.05);
    }
  }
`

const UnifiedHomePage: React.FC = () => {
  const { theme } = useTheme2025()

  const services = [
    {
      icon: <FaCode />,
      title: 'Desarrollo Frontend',
      description: 'Creación de interfaces modernas y responsivas con React, TypeScript y las últimas tecnologías web.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Desarrollo Fullstack',
      description: 'Soluciones completas desde el frontend hasta el backend, integrando APIs y bases de datos.'
    },
    {
      icon: <FaRocket />,
      title: 'Optimización & Performance',
      description: 'Mejora del rendimiento web, SEO técnico y experiencia de usuario excepcional.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '3+', label: 'Años de Experiencia' },
    { number: '15+', label: 'Tecnologías Dominadas' },
    { number: '100%', label: 'Satisfacción Cliente' }
  ]

  return (
    <Layout2025>
      <SEO 
        title="Miquel Xarau | Desarrollador Frontend & UX/UI Designer"
        description="Portfolio de Miquel Xarau - Desarrollador Frontend especializado en React, TypeScript y diseño UX/UI. Creando experiencias digitales excepcionales."
      />
      
      {/* 🎬 Hero Section */}
      <HeroSection $theme={theme}>
        <UnifiedContainer size="lg">
          <div className="hero-content">
            <div className="hero-badge">
              <UnifiedBadge variant="primary" size="md">
                👋 ¡Hola! Soy Miquel
              </UnifiedBadge>
            </div>
            
            <UnifiedHeading level={1} className="hero-title">
              Desarrollador <span className="highlight">Frontend</span><br />
              & UX/UI Designer
            </UnifiedHeading>
            
            <UnifiedText variant="lead" className="hero-subtitle">
              Creo experiencias digitales excepcionales combinando código limpio, 
              diseño centrado en el usuario y las últimas tecnologías web.
            </UnifiedText>
            
            <div className="hero-actions">
              <UnifiedButton 
                variant="primary" 
                size="lg"
                href="/trabajos"
                icon={<FaArrowRight />}
              >
                Ver mis trabajos
              </UnifiedButton>
              
              <UnifiedButton 
                variant="secondary" 
                size="lg"
                href="/contact"
              >
                Trabajemos juntos
              </UnifiedButton>
            </div>
            
            <div className="hero-social">
              <UnifiedText variant="caption">
                Sígueme en:
              </UnifiedText>
              
              <UnifiedButton 
                variant="ghost" 
                size="sm"
                href="https://github.com/miquelxarau"
                external
                icon={<FaGithub />}
              >
                GitHub
              </UnifiedButton>
              
              <UnifiedButton 
                variant="ghost" 
                size="sm"
                href="https://linkedin.com/in/miquelxarau"
                external
                icon={<FaLinkedin />}
              >
                LinkedIn
              </UnifiedButton>
              
              <UnifiedButton 
                variant="ghost" 
                size="sm"
                href="mailto:miquel@example.com"
                icon={<FaEnvelope />}
              >
                Email
              </UnifiedButton>
            </div>
          </div>
        </UnifiedContainer>
      </HeroSection>

      {/* 📊 Stats Section */}
      <StatsSection $theme={theme}>
        <UnifiedContainer size="lg">
          <UnifiedGrid columns={{ sm: 2, md: 4 }} gap="0">
            {stats.map((stat, index) => (
              <StatCard key={index} $theme={theme}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </StatCard>
            ))}
          </UnifiedGrid>
        </UnifiedContainer>
      </StatsSection>

      {/* 🎨 Services Section */}
      <UnifiedSection 
        title="¿En qué puedo ayudarte?"
        subtitle="Especializado en desarrollo frontend moderno y diseño UX/UI centrado en el usuario"
        spacing="lg"
      >
        <UnifiedContainer size="lg">
          <UnifiedGrid columns={{ sm: 1, md: 3 }} gap="8">
            {services.map((service, index) => (
              <ServiceCard key={index} hover padding="lg" $theme={theme}>
                <div className="service-icon">
                  {service.icon}
                </div>
                <UnifiedHeading level={3} className="service-title">
                  {service.title}
                </UnifiedHeading>
                <UnifiedText className="service-description">
                  {service.description}
                </UnifiedText>
              </ServiceCard>
            ))}
          </UnifiedGrid>
        </UnifiedContainer>
      </UnifiedSection>

      {/* 🎬 Featured Works */}
      <UnifiedSection 
        title="Trabajos Destacados"
        subtitle="Una selección de mis proyectos más recientes y significativos"
        spacing="lg"
      >
        <FeaturedWorksCarousel />
      </UnifiedSection>

      {/* 🔬 Lab/GitHub Projects */}
      <UnifiedSection 
        title="Laboratorio"
        subtitle="Experimentos, contribuciones open source y proyectos personales"
        spacing="lg"
      >
        <GitHubCarousel />
      </UnifiedSection>

      {/* 🚀 CTA Section */}
      <UnifiedSection spacing="xl">
        <UnifiedContainer size="md">
          <div style={{ textAlign: 'center' }}>
            <UnifiedBadge variant="primary" size="md">
              ¿Tienes un proyecto en mente?
            </UnifiedBadge>
            
            <UnifiedHeading level={2} style={{ margin: `${unifiedTokens.spacing[6]} 0 ${unifiedTokens.spacing[4]} 0` }}>
              Trabajemos juntos
            </UnifiedHeading>
            
            <UnifiedText variant="lead" style={{ marginBottom: unifiedTokens.spacing[8] }}>
              Estoy siempre abierto a nuevos desafíos y oportunidades interesantes. 
              ¡Hablemos sobre cómo puedo ayudarte a hacer realidad tu visión!
            </UnifiedText>
            
            <div style={{ display: 'flex', gap: unifiedTokens.spacing[4], justifyContent: 'center', flexWrap: 'wrap' }}>
              <UnifiedButton 
                variant="primary" 
                size="lg"
                href="/contact"
                icon={<FaEnvelope />}
              >
                Empezar un proyecto
              </UnifiedButton>
              
              <UnifiedButton 
                variant="secondary" 
                size="lg"
                href="/blog"
              >
                Lee mi blog
              </UnifiedButton>
            </div>
          </div>
        </UnifiedContainer>
      </UnifiedSection>
    </Layout2025>
  )
}

export default UnifiedHomePage 
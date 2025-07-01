import React, { memo, startTransition, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import SkillCard from '../components/SkillCard'
import ContactSection from '../components/ContactSection'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  PageHeader, 
  ModernSection 
} from '../components/ui-components'
import { skillsData } from '../utils/skills-data'
import {
  FaLinkedin
} from 'react-icons/fa'

// Contenedor principal
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

// Grid de skills minimalista y elegante
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`

// Skeleton mejorado para loading
const SkillCardSkeleton = memo(() => (
  <div 
    style={{
      height: '280px',
      background: 'linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%)',
      borderRadius: '1rem',
      animation: 'pulse 2s infinite'
    }}
  />
))
SkillCardSkeleton.displayName = 'SkillCardSkeleton'

// Hook optimizado para skills
const useOptimizedSkills = () => {
  const [skills, setSkills] = useState(skillsData)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setIsLoaded(true)
    })
  }, [])

  return { skills, isLoaded }
}

// Sección Hero mejorada
const HeroSection = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.primary};
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary};
  margin-bottom: 3rem;
`

// Sección introductoria elegante
const IntroSection = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: 2.5rem;
  margin-bottom: 3rem;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }
`

const IntroTitle = styled.h2<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale['3xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: ${props => props.$designSystem.typography.leading.tight};
  font-family: ${props => props.$designSystem.typography.fonts.display};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['2xl']};
  }
`

const IntroDescription = styled.p<{ $theme: any; $designSystem: any }>`
  color: ${props => props.$theme.colors.text.secondary};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  max-width: 100%;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.base};
  }
`

const About: React.FC = memo(() => {
  const { skills, isLoaded } = useOptimizedSkills()
  const { theme, designSystem } = useTheme2025()

  return (
    <Layout2025>
      <SEO 
        title="About | Miquel Xarau - Diseñador UX/UI & Desarrollador FullStack"
        desc="Diseñador UX/UI y desarrollador fullstack con especialización en IA y ciberseguridad. Enfoque en experiencias digitales seguras y centradas en el usuario."
      />
      
      <HeroSection $theme={theme} $designSystem={designSystem}>
        <PageHeader
          title='<span class="highlight">Diseñador UX/UI</span> & FullStack Developer'
          subtitle="Especializado en IA y ciberseguridad. Enfocado en crear experiencias digitales seguras, escalables y centradas en el usuario."
          actions={[
            {
              label: "Conectar en LinkedIn",
              href: "https://linkedin.com/in/miquelxarau",
              variant: "secondary",
              icon: <FaLinkedin />,
              external: true
            }
          ]}
        />
      </HeroSection>

      <Container>
        {/* Sección introductoria elegante */}
        <IntroSection $theme={theme} $designSystem={designSystem}>
          <IntroTitle $theme={theme} $designSystem={designSystem}>
            Enfoque y especialización
          </IntroTitle>
          <IntroDescription $theme={theme} $designSystem={designSystem}>
            Mi trabajo se centra en el diseño UX/UI y desarrollo fullstack, con especialización en IA y ciberseguridad. 
            Aplico principios de diseño centrado en el usuario para crear experiencias digitales que sean intuitivas, 
            seguras y escalables. Mi metodología combina investigación de usuarios, prototipado iterativo y desarrollo ágil, 
            priorizando siempre la usabilidad, performance y seguridad en cada etapa del proceso.
          </IntroDescription>
        </IntroSection>

        {/* Stack técnico y especialidades */}
        <ModernSection
          title="Stack tecnológico y especialidades"
          description="Mi especialización abarca UX/UI design, desarrollo fullstack, inteligencia artificial y ciberseguridad. Cada área se complementa para entregar soluciones completas y seguras."
        >
          <SkillsGrid>
            {!isLoaded ? (
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <SkillCardSkeleton key={`skeleton-${i}`} />
                ))}
              </>
            ) : (
              <>
                {skills.map((skill, index) => (
                  <SkillCard 
                    key={`skill-${skill.category}-${index}`}
                    skill={skill}
                  />
                ))}
              </>
            )}
          </SkillsGrid>
        </ModernSection>

        {/* Sección de contacto */}
        <ModernSection
          title="Contacto"
          description="Disponible para proyectos de diseño UX/UI, desarrollo fullstack y consultoría especializada."
        >
          <ContactSection />
        </ModernSection>
      </Container>
    </Layout2025>
  )
})

About.displayName = 'About'

export default About
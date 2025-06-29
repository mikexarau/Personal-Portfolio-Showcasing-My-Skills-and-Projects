import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled, { keyframes, css } from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import FeaturedWorksCarousel from '../components/featured-works-carousel'
import { 
  ModernButton,
  ModernSection,
  ModernCard
} from '../components/ui-components-2025'
import { 
  FiArrowRight,
  FiMail,
  FiEye,
  FiLinkedin} from 'react-icons/fi'
import GitHubCarousel from '../components/github-carousel'

// 🎬 Animaciones inspiradas en Le Corre y Pangram Pangram
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const subtleFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px);
  }
  50% { 
    transform: translateY(-4px);
  }
`

const textReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

// 🎯 Animaciones tipográficas ultra limpias - ENFOQUE MINIMALISTA
const cleanFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
`

const cleanFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

// 🎯 Animación ultra fluida y armoniosa - SMOOTH TRANSITION
const smoothWordChange = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  25% {
    opacity: 0.3;
    transform: translateY(-4px) scale(0.98);
  }
  50% {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  75% {
    opacity: 0.3;
    transform: translateY(-4px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

// 🎯 Animación de entrada suave para la segunda palabra
const delayedWordChange = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  20% {
    opacity: 0.8;
    transform: translateY(-2px) scale(0.99);
  }
  50% {
    opacity: 0;
    transform: translateY(-6px) scale(0.96);
  }
  80% {
    opacity: 0.8;
    transform: translateY(-2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

// 🏗️ Container principal - SIN RESTRICCIONES DE ANCHO
const Container = styled.div<{ $theme: any; $designSystem: any }>`
  width: 100%;
  padding: 0 ${props => props.$designSystem.spacing[8]};
  margin: ${props => props.$designSystem.spacing[8]} 0;
  
  @media (max-width: 768px) {
    padding: 0 ${props => props.$designSystem.spacing[6]};
    margin: ${props => props.$designSystem.spacing[6]} 0;
  }
`

// 🎯 Hero Section inspirado en Thomas Le Corre - CENTRADO Y SIMPLIFICADO
const HeroSection = styled.section<{ $theme: any; $designSystem: any }>`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$designSystem.spacing[12]} 0 ${props => props.$designSystem.spacing[8]} 0;
  background: ${props => props.$theme.colors.bg?.primary || '#ffffff'};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    min-height: 45vh;
    padding: ${props => props.$designSystem.spacing[10]} 0 ${props => props.$designSystem.spacing[6]} 0;
  }
  
  @media (max-width: 768px) {
    min-height: 40vh;
    align-items: center;
    padding: ${props => props.$designSystem.spacing[8]} 0 ${props => props.$designSystem.spacing[4]} 0;
  }
`

// 🎯 Contenido principal del hero - CENTRADO
const HeroContent = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  gap: ${props => props.$designSystem.spacing[10]};
  
  @media (max-width: 768px) {
    gap: ${props => props.$designSystem.spacing[8]};
  }
  
  @media (max-width: 480px) {
    gap: ${props => props.$designSystem.spacing[6]};
  }
`

// 🎯 Grid de Hello inspirado en Le Corre - COMPACTO Y AJUSTADO
const HelloGrid = styled.div<{ $designSystem: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[0]};
  margin-bottom: ${props => props.$designSystem.spacing[2]};
  padding: ${props => props.$designSystem.spacing[2]} 0;
  
  @media (max-width: 768px) {
    gap: ${props => props.$designSystem.spacing[0]};
    margin-bottom: ${props => props.$designSystem.spacing[1]};
    padding: ${props => props.$designSystem.spacing[2]} 0;
  }
`

// 🎯 Cada línea de Hello - TIPOGRAFÍA EQUILIBRADA
const HelloLine = styled.div<{ $theme: any; $designSystem: any; $delay?: number }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale['8xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  line-height: 0.9;
  letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  color: ${props => props.$theme.colors.text?.primary};
  opacity: 0;
  transform: translateY(100%);
  animation: ${textReveal} 0.8s ${props => props.$designSystem.animation.easing.anticipate} ${props => (props.$delay || 0) * 0.15}s both;
  position: relative;
  padding-bottom: 8px;
  
  @media (max-width: 1200px) {
    font-size: ${props => props.$designSystem.typography.scale['7xl']};
    line-height: 0.9;
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['6xl']};
    line-height: 0.95;
  }
  
  @media (max-width: 475px) {
    font-size: ${props => props.$designSystem.typography.scale['5xl']};
    line-height: 1.0;
  }
`

// 🎯 Palabra animada simple - SIN POSICIONAMIENTO ABSOLUTO
const AnimatedWordContainer = styled.span<{ $theme: any; $designSystem: any }>`
  display: inline-block;
  min-width: 200px;
  text-align: center;
  
  @media (max-width: 768px) {
    min-width: 150px;
  }
  
  @media (max-width: 475px) {
    min-width: 120px;
  }
`

const AnimatedWord = styled.span<{ 
  $theme: any; 
  $designSystem: any;
  $isChanging: boolean;
  $isSecondWord?: boolean;
}>`
  color: ${props => props.$theme.colors.interactive?.primary};
  display: inline-block;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  transition: all 0.15s ease-out;
  ${props => props.$isChanging && !props.$isSecondWord && css`
    animation: ${smoothWordChange} 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  `};
  ${props => props.$isChanging && props.$isSecondWord && css`
    animation: ${delayedWordChange} 1.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  `};
`

// 🎯 Descripción principal - TAMAÑO REDUCIDO
const HeroDescription = styled.div<{ $theme: any; $designSystem: any }>`
  animation: ${fadeInUp} 1s ${props => props.$designSystem.animation.easing.smooth} 0.6s both;
  text-align: center;
  max-width: 700px;
`

const DescriptionText = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.xl};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  color: ${props => props.$theme.colors.text?.secondary};
  margin-bottom: ${props => props.$designSystem.spacing[10]};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.lg};
    margin-bottom: ${props => props.$designSystem.spacing[8]};
  }
  
  @media (max-width: 475px) {
    font-size: ${props => props.$designSystem.typography.scale.base};
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
`

// 🎯 Botones de acción principales - CENTRADOS
const ActionButtons = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[6]};
  justify-content: center;
  animation: ${fadeInUp} 1s ${props => props.$designSystem.animation.easing.smooth} 0.9s both;
  
  @media (max-width: 640px) {
    gap: ${props => props.$designSystem.spacing[4]};
  }
  
  @media (max-width: 475px) {
    flex-direction: column;
    gap: ${props => props.$designSystem.spacing[3]};
    width: 100%;
    max-width: 300px;
  }
`

const PrimaryButton = styled.button<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[2]};
  padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: ${props => props.$designSystem.radius.full};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  text-decoration: none;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const SecondaryButton = styled.button<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[2]};
  padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
  background: transparent;
  color: ${props => props.$theme.colors.text?.primary};
  border: 1px solid ${props => props.$theme.colors.border?.primary};
  border-radius: ${props => props.$designSystem.radius.full};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  text-decoration: none;
  
  &:hover {
    background: ${props => props.$theme.colors.bg?.secondary};
    border-color: #000000;
    color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
`

// 🎯 Botón negro para CTA principal
const BlackButton = styled.a<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[3]};
  padding: ${props => props.$designSystem.spacing[4]} ${props => props.$designSystem.spacing[8]};
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: ${props => props.$designSystem.radius.full};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.3);
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
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px -6px rgba(0, 0, 0, 0.4);
    
    &::before {
      left: 100%;
    }
    
    svg:last-child {
      transform: translateX(4px);
    }
  }
  
  svg {
    transition: transform ${props => props.$designSystem.animation.duration.fast} ease;
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
    font-size: ${props => props.$designSystem.typography.scale.sm};
  }
`

// 🎯 Stats data - MOVIDOS AL FOOTER
const stats = [
  { number: '5+', label: 'Años' },
  { number: '50+', label: 'Proyectos' },
  { number: '15+', label: 'Clientes' },
  { number: '99%', label: 'Éxito' }
]

// 🎯 Featured Works Section - REDUCIDO ESPACIADO PARA MEJOR FLUIDEZ
const FeaturedWorksSection = styled.section<{ $theme: any; $designSystem: any }>`
  width: 100%;
  background: ${props => props.$theme.colors.bg?.primary};
  padding: 0 0 ${props => props.$designSystem.spacing[8]} 0;
  overflow: hidden;
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: 768px) {
    padding: 0 0 ${props => props.$designSystem.spacing[6]} 0;
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
`

// 🎯 GitHub Section - REDUCIDO ESPACIADO PARA MEJOR FLUIDEZ
const GitHubSection = styled.section<{ $theme: any; $designSystem: any }>`
  width: 100%;
  background: ${props => props.$theme.colors.bg?.primary};
  padding: ${props => props.$designSystem.spacing[6]} 0 ${props => props.$designSystem.spacing[8]} 0;
  overflow: hidden;
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[4]} 0 ${props => props.$designSystem.spacing[6]} 0;
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
`

// 🎯 Header del GitHub Section
const SectionHeader = styled.div<{ $theme: any; $designSystem: any }>`
  text-align: center;
  margin-bottom: ${props => props.$designSystem.spacing[12]};
  padding: 0 ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[8]};
    padding: 0 ${props => props.$designSystem.spacing[6]};
  }
`

const SectionTitle = styled.h2<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale['4xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  line-height: ${props => props.$designSystem.typography.leading.tight};
  color: ${props => props.$theme.colors.text?.primary};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['3xl']};
  }
`

const SectionDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  color: ${props => props.$theme.colors.text?.secondary};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.base};
  }
`

// 🎯 Main Component Interfaces
interface HomePageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    allProjectsYaml: {
      edges: Array<{
        node: {
          title: string
          slug: string
          desc: string
          cover?: string
        }
      }>
    }
  }
  location: {
    pathname: string
  }
}

// 🎯 Hook avanzado con anti-repetición - CAMBIO PRIMERA Y ÚLTIMA PALABRA
const useAdvancedAnimatedWords = () => {
  // Lista de palabras cuidadosamente seleccionadas para fluidez de lectura
  const wordSets = {
    first: ['Design','Build', 'Create', 'Craft', 'Shape', 'Develop', 'Devise','Creativity'],
    second: ['Humans', 'Simplify', 'Business', 'World', 'Brands', 'Us', 'You', 'People', 'Users', 'Growth', 'Success', 'Impact', 'Innovation', 'Excellence', 'Improve', 'Tomorrow']
  }
  
  const [currentWords, setCurrentWords] = useState({
    first: wordSets.first[0],
    second: wordSets.second[0]
  })
  
  const [animatingWord, setAnimatingWord] = useState<'first' | 'second' | null>(null)
  
  // Índices actuales para cada conjunto
  const [indices, setIndices] = useState({
    first: 0,
    second: 0
  })

  // Función para obtener un índice aleatorio diferente al actual
  const getRandomDifferentIndex = (currentIndex: number, arrayLength: number): number => {
    if (arrayLength <= 1) return 0
    
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * arrayLength)
    } while (newIndex === currentIndex)
    
    return newIndex
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      // 🎯 SECUENCIA PERFECTAMENTE ORQUESTADA
      
      // 1️⃣ Paso 1: Iniciar animación de la primera palabra
      setAnimatingWord('first')
      
      // 2️⃣ Paso 2: Cambiar primera palabra en el punto medio de su animación (600ms)
      setTimeout(() => {
        setIndices(prevIndices => {
          const newFirstIndex = getRandomDifferentIndex(prevIndices.first, wordSets.first.length)
          
          // Solo cambiar la primera palabra inicialmente
          setCurrentWords(prevWords => ({
            ...prevWords,
            first: wordSets.first[newFirstIndex]
          }))
          
          return {
            ...prevIndices,
            first: newFirstIndex
          }
        })
      }, 600) // Punto medio de la animación de 1.2s
      
      // 3️⃣ Paso 3: Pequeña pausa para que el usuario procese la primera palabra (800ms después del inicio)
      setTimeout(() => {
        setAnimatingWord('second')
      }, 800)
      
      // 4️⃣ Paso 4: Cambiar segunda palabra en su punto medio (1500ms total)
      setTimeout(() => {
        setIndices(prevIndices => {
          const newSecondIndex = getRandomDifferentIndex(prevIndices.second, wordSets.second.length)
          
          setCurrentWords(prevWords => ({
            ...prevWords,
            second: wordSets.second[newSecondIndex]
          }))
          
          return {
            ...prevIndices,
            second: newSecondIndex
          }
        })
      }, 1500)
      
      // 5️⃣ Paso 5: Finalizar todas las animaciones (2200ms total)
      setTimeout(() => {
        setAnimatingWord(null)
      }, 2200)
      
    }, 5000) // Intervalo más espacioso para una experiencia relajada
    
    return () => clearInterval(interval)
  }, [])
  
  return {
    currentWords,
    animatingWord
  }
}

function HomePage2025({ data, location }: HomePageProps) {
  const { theme, designSystem } = useTheme2025()
  const { currentWords, animatingWord } = useAdvancedAnimatedWords()

  return (
    <Layout2025 location={location}>
      <SEO 
        title="Miquel Xarau - Diseñador UX/UI & Desarrollador FullStack" 
        desc="Diseño UX/UI, desarrollo fullstack y especialización en IA y ciberseguridad. Creando experiencias digitales centradas en el usuario."
      />

      <div>
        {/* 🎯 Hero Section inspirado en Thomas Le Corre - CENTRADO Y SIMPLIFICADO */}
        <HeroSection $theme={theme} $designSystem={designSystem}>
          <Container $theme={theme} $designSystem={designSystem}>
            <HeroContent $theme={theme} $designSystem={designSystem}>
              <HelloGrid $designSystem={designSystem}>
                <HelloLine $theme={theme} $designSystem={designSystem} $delay={0}>
                  <AnimatedWordContainer $theme={theme} $designSystem={designSystem}>
                    <AnimatedWord 
                      $theme={theme}
                      $designSystem={designSystem}
                      $isChanging={animatingWord === 'first'}
                      $isSecondWord={false}
                    >
                      {currentWords.first}
                    </AnimatedWord>
                  </AnimatedWordContainer> for
                </HelloLine>
                <HelloLine $theme={theme} $designSystem={designSystem} $delay={1}>
                  <AnimatedWordContainer $theme={theme} $designSystem={designSystem}>
                    <AnimatedWord 
                      $theme={theme}
                      $designSystem={designSystem}
                      $isChanging={animatingWord === 'second'}
                      $isSecondWord={true}
                    >
                      {currentWords.second}
                    </AnimatedWord>
                  </AnimatedWordContainer>
                </HelloLine>
              </HelloGrid>

              <HeroDescription $theme={theme} $designSystem={designSystem}>
                <DescriptionText $theme={theme} $designSystem={designSystem}>
                  Diseñador UX/UI y desarrollador fullstack especializado en IA y ciberseguridad. 
                  Enfocado en crear experiencias digitales innovadoras y centradas en el usuario.
                </DescriptionText>
              </HeroDescription>
            </HeroContent>
          </Container>
        </HeroSection>



        {/* 🎯 Featured Works section - SIN HEADER COMO THOMAS LE CORRE */}
        <FeaturedWorksSection $theme={theme} $designSystem={designSystem}>
          <FeaturedWorksCarousel />
        </FeaturedWorksSection>

        {/* 🔧 GitHub Activity - AJUSTADO AL ANCHO COMPLETO COMO TRABAJOS */}
        <GitHubSection $theme={theme} $designSystem={designSystem}>
          <SectionHeader $theme={theme} $designSystem={designSystem}>
            <SectionTitle $theme={theme} $designSystem={designSystem}>
              Proyectos Open Source
            </SectionTitle>
            <SectionDescription $theme={theme} $designSystem={designSystem}>
              Proyectos de código abierto y experimentación técnica
            </SectionDescription>
          </SectionHeader>
          <GitHubCarousel />
        </GitHubSection>

        {/* 📞 Contact CTA - MEJORADA */}
        <ModernSection 
          title="¿Listo para empezar?"
          description="Transformemos tu visión en una experiencia digital excepcional"
        >
          <Container $theme={theme} $designSystem={designSystem}>
            <ModernCard padding="xl" variant="elevated">
              <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  gap: designSystem.spacing[4],
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: designSystem.spacing[10]
                }}>
                  <a 
                    href="/contact"
                    data-cursor="hover"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: designSystem.spacing[3],
                      padding: `${designSystem.spacing[4]} ${designSystem.spacing[8]}`,
                      background: '#000000',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: designSystem.radius.full,
                      fontFamily: designSystem.typography.fonts.sans,
                      fontSize: designSystem.typography.scale.base,
                      fontWeight: designSystem.typography.weight.medium,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: `all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.smooth}`,
                      boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement
                      target.style.background = '#1a1a1a'
                      target.style.transform = 'translateY(-2px)'
                      target.style.boxShadow = '0 8px 30px -6px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement
                      target.style.background = '#000000'
                      target.style.transform = 'translateY(0)'
                      target.style.boxShadow = '0 4px 20px -4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <FiMail />
                    Empezar proyecto
                    <FiArrowRight />
                  </a>
                  
                  <ModernButton 
                    variant="secondary"
                    size="lg"
                    href="/about"
                    icon={<FiEye />}
                  >
                    Conocer más
                  </ModernButton>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: designSystem.spacing[8],
                  flexWrap: 'wrap'
                }}>
                  <a 
                    href="mailto:hello@miquel.dev"
                    data-cursor="hover"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: designSystem.spacing[2],
                      color: theme.colors.text?.secondary,
                      textDecoration: 'none',
                      fontSize: designSystem.typography.scale.sm,
                      transition: `color ${designSystem.animation.duration.fast} ${designSystem.animation.easing.smooth}`
                    }}
                  >
                    <FiMail />
                    hello@miquel.dev
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/miquelxarau"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: designSystem.spacing[2],
                      color: theme.colors.text?.secondary,
                      textDecoration: 'none',
                      fontSize: designSystem.typography.scale.sm,
                      transition: `color ${designSystem.animation.duration.fast} ${designSystem.animation.easing.smooth}`
                    }}
                  >
                    <FiLinkedin />
                    LinkedIn
                  </a>
                </div>
              </div>
            </ModernCard>
          </Container>
        </ModernSection>
      </div>
    </Layout2025>
  )
}

// GraphQL query
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allProjectsYaml(
      sort: { from: DESC }
      limit: 6
    ) {
      edges {
        node {
          title
          slug
          desc
          cover
        }
      }
    }
  }
`

export default HomePage2025
import React, { useState, useRef, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  FiArrowRight,
  FiCalendar,
  FiCode,
  FiEye,
  FiExternalLink
} from 'react-icons/fi'

// Query para obtener todos los proyectos del YAML
const PROJECTS_QUERY = graphql`
  query FeaturedProjectsQuery {
    allProjectsYaml(
      sort: { from: DESC }
      limit: 12
    ) {
      edges {
        node {
          id
          title
          title_detail
          slug
          category
          from
          desc
          images
          cover
        }
      }
    }
    allFile(filter: { 
      sourceInstanceName: { in: ["projects", "content"] }, 
      extension: { in: ["mp4", "webm", "mov"] }
    }) {
      nodes {
        id
        name
        extension
        relativeDirectory
        publicURL
      }
    }
  }
`

// Tipo para proyectos desde GraphQL
interface ProjectFromYaml {
  id: string
  title: string
  title_detail?: string
  slug: string
  category?: string
  from?: string
  desc?: string
  images?: string
  cover?: string
}

// 🎬 Animaciones para el carrusel
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 🏗️ Container principal del carrusel
const CarouselContainer = styled.section<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100%;
  background: ${props => props.$theme.colors.bg.primary};
  overflow: hidden;
  padding: ${props => props.$designSystem.spacing[8]} 0 ${props => props.$designSystem.spacing[4]} 0;
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[6]} 0 ${props => props.$designSystem.spacing[2]} 0;
  }
`

// 🎯 Wrapper para el carrusel
const CarouselWrapper = styled.div<{ $designSystem: any }>`
  position: relative;
  width: 100%;
  max-width: 100vw;
`

// 🎯 Track del carrusel que se mueve automáticamente
const CarouselTrack = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $cardWidth: number;
  $totalCards: number;
}>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[4]};
  width: ${props => (props.$cardWidth + parseInt(props.$designSystem.spacing[4])) * props.$totalCards * 2}px;
  animation: slideLoop ${props => props.$totalCards * 3}s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
  
  /* Mejorar la performance del scroll */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  @keyframes slideLoop {
    100% {
      transform: translateX(-${props => (props.$cardWidth + parseInt(props.$designSystem.spacing[4])) * props.$totalCards}px);
    }
    0% {
      transform: translateX(0);
    }
  }
`

// 🎯 Wrapper para card + información debajo (como lecorre.design) - Sin interferencia z-index
const CarouselCard = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $isDark: boolean;
  $cardWidth: number;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${props => props.$cardWidth}px;
  flex-shrink: 0;
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  
  /* 🔥 CRITICAL: NO crear stacking context que interfiera con badge */
  z-index: auto;
  isolation: auto;
  will-change: auto;
  
  /* 🔥 Hover effects solo en dispositivos con hover real (no móviles) */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-8px);
      
      .card-visual {
        .work-image {
          transform: scale(1.05);
        }

        .work-overlay {
          opacity: 1;
        }
        
        .work-content {
          transform: translateY(0);
          opacity: 1;
        }
        
        /* 🔥 Badge hover effect sin interferencia */
        .work-badge {
          transform: translateY(-4px) translateZ(999px) !important;
        }
      }
    }
  }
  
  /* 🔥 MOBILE: Asegurar que no haya stacking context issues */
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    z-index: auto !important;
    isolation: auto !important;
    will-change: auto !important;
    transform: none !important;
  }
`

// 🎯 Card visual interactiva - Sin interferencia con badge z-index
const CardVisual = styled(Link)<{ 
  $theme: any; 
  $designSystem: any; 
  $isDark: boolean;
}>`
  display: block;
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: ${props => props.$designSystem.radius.xl};
  /* REMOVIDO: overflow: hidden; - Para permitir que el badge sobresalga */
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  
  /* 🔥 CRITICAL: NO crear stacking context que interfiera con el badge */
  z-index: auto; /* No forzar z-index para evitar stacking context */
  transform: none; /* No usar transform que crea stacking context */
  will-change: auto; /* Evitar creating layers innecesarios */
  isolation: auto; /* No crear isolation context */
  
  /* El hover effect se maneja desde CarouselCard */
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    height: 200px;
    
    /* 🔥 MOBILE: Asegurar que no interfiera con badge */
    z-index: auto !important;
    transform: none !important;
    will-change: auto !important;
  }
`

// 📝 Información del proyecto debajo de la card (como lecorre.design)
const CardInfo = styled.div<{ $theme: any; $designSystem: any }>`
  margin-top: ${props => props.$designSystem.spacing[4]};
  padding: 0 ${props => props.$designSystem.spacing[1]};
`

const CardTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0 0 ${props => props.$designSystem.spacing[1]} 0;
  line-height: ${props => props.$designSystem.typography.leading.tight};
  letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.base};
    }
`

const CardRole = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.body};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  color: ${props => props.$theme.colors.text.secondary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  letter-spacing: ${props => props.$designSystem.typography.tracking.normal};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
  }
`

// 🎯 Contenedor interno de la card con overflow hidden para imágenes
const CardInner = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
    width: 100%;
  height: 100%;
  border-radius: ${props => props.$designSystem.radius.xl};
    overflow: hidden;
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f5f5f5'};
`

// 🖼️ Imagen de fondo
const WorkImageBackground = styled.div<{ $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Z-index bajo para que no tape el badge */
`

const WorkImage = styled.div<{ $designSystem: any }>`
  width: 100%;
  height: 100%;
  transition: transform ${props => props.$designSystem.animation.duration.slower} ${props => props.$designSystem.animation.easing.anticipate};
  
  /* 🎯 SOLUCIÓN DEFINITIVA - MÁXIMA ESPECIFICIDAD CSS PARA CARRUSEL */
  .gatsby-image-wrapper,
  .gatsby-image-wrapper > div,
  .gatsby-image-wrapper picture,
  .gatsby-image-wrapper img {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    
    /* Renderizado de alta calidad */
    image-rendering: optimizeQuality !important;
    -webkit-font-smoothing: antialiased !important;
    }
  
  /* Videos con especificidad máxima */
  video {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
  }
`

const WorkImagePlaceholder = styled.div<{ $theme: any; $designSystem: any }>`
      width: 100%;
      height: 100%;
  background: linear-gradient(135deg, ${props => props.$theme.colors.interactive.primary} 0%, ${props => props.$theme.colors.interactive.hover} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$theme.colors.text.inverse};
  
  svg {
    opacity: 0.7;
  }
`

// 🎯 Overlay que aparece en hover - FONDO SÓLIDO SIN BORDES
const WorkOverlay = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  position: absolute;
  top: -1px; /* Compensar por el border de la card */
  left: -1px; /* Compensar por el border de la card */
  width: calc(100% + 2px); /* Compensar por los borders */
  height: calc(100% + 2px); /* Compensar por los borders */
  background: ${props => props.$isDark 
    ? '#1a1a1a' // Color sólido dark mode - sin transparencia
    : '#000000' // Color sólido light mode - sin transparencia
  };
  border-radius: ${props => props.$designSystem.radius.xl}; /* Mantener el radio de borde */
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 2;
`

// 🏷️ Badge - SOLUCION DEFINITIVA Z-INDEX - Posición absoluta con máximo z-index
const WorkBadge = styled.div<{ $theme: any; $designSystem: any; $badgeType: string }>`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${props => {
    const year = parseInt(props.$badgeType)
    const currentYear = new Date().getFullYear()
    const isDark = props.$theme.mode === 'dark'
    
    // Sistema monocromático basado en la antigüedad del proyecto
    if (year >= currentYear - 1) {
      // Proyectos recientes - máximo contraste
      return isDark ? '#ffffff' : '#1a1a1a'
    }
    if (year >= currentYear - 3) {
      // Proyectos de 2-4 años - contraste alto
      return isDark ? '#e5e5e5' : '#2d2d2d'
    }
    if (year >= currentYear - 6) {
      // Proyectos de 4-7 años - contraste medio
      return isDark ? '#b8b8b8' : '#525252'
    }
    // Proyectos más antiguos - contraste bajo
    return isDark ? '#8a8a8a' : '#737373'
  }};
  color: ${props => {
    const year = parseInt(props.$badgeType)
    const currentYear = new Date().getFullYear()
    const isDark = props.$theme.mode === 'dark'
    
    // Color de texto óptimo para cada tonalidad monocromática
    if (year >= currentYear - 1) {
      // Proyectos recientes - texto inverso al fondo
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    if (year >= currentYear - 3) {
      // Proyectos de 2-4 años - texto inverso
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    if (year >= currentYear - 6) {
      // Proyectos de 4-7 años - texto que contraste
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    // Proyectos más antiguos - texto que contraste
    return isDark ? '#1a1a1a' : '#ffffff'
  }};
  padding: 4px 12px;
  border-radius: ${props => props.$designSystem.radius.xl};
  font-size: 10px;
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  text-transform: uppercase;
  letter-spacing: ${props => props.$designSystem.typography.tracking.wider};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  white-space: nowrap;
  
  /* Diseño ultra limpio sin bordes */
  border: none;
  backdrop-filter: none;
  
  /* Sin animación de desplazamiento - pegado siempre a la card */
  opacity: 1;
  transform: translate(0, 0) scale(1);
  
  /* 🔥 SOLUCIÓN DEFINITIVA Z-INDEX - MÁXIMA PRIORIDAD */
  z-index: 999999 !important; /* Z-index máximo con !important */
  
  /* 🔥 CREAR NUEVO STACKING CONTEXT PARA SUPERAR TODOS LOS DEMÁS */
  isolation: isolate;
  will-change: auto;
  contain: layout style;
  
  /* 📱 MOBILE: Configuración específica para pantallas pequeñas */
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    top: -6px !important;
    right: -6px !important;
    padding: 3px 8px;
    font-size: 9px;
    z-index: 999999 !important;
    position: absolute !important;
    
    /* 🔥 ASEGURAR QUE ESTÉ POR ENCIMA DE VIDEOS Y OVERLAYS EN MOBILE */
    isolation: isolate !important;
    will-change: auto !important;
    transform: translateZ(999px) !important; /* Forzar nuevo layer */
  }
  
  @media (max-width: 480px) {
    top: -6px !important;
    right: -6px !important;
    padding: 2px 6px;
    font-size: 8px;
    z-index: 999999 !important;
    position: absolute !important;
    
    /* 🔥 MÁXIMO NIVEL DE ESPECIFICIDAD PARA PANTALLAS PEQUEÑAS */
    isolation: isolate !important;
    will-change: auto !important;
    transform: translateZ(999px) !important;
    contain: layout style !important;
  }
  
  /* 🎯 HOVER: Mantener máxima visibilidad en hover */
  &:hover {
    z-index: 999999 !important;
    transform: translateZ(999px) scale(1.05) !important;
  }
`

// 🎯 Contenido en hover (CENTRADO VERTICAL Y HORIZONTAL)
const WorkContent = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${props => props.$designSystem.spacing[4]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${props => props.$designSystem.spacing[4]};
  color: ${props => props.$isDark 
    ? '#ffffff'
    : '#ffffff'
  };
  opacity: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 3;
  overflow: hidden;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: ${props => props.$designSystem.spacing[3]};
    gap: ${props => props.$designSystem.spacing[3]};
  }
`

// 🏆 Área de contenido principal - unificada con lab
const WorkHeader = styled.div`
  flex-shrink: 0;
  width: 100%;
`

const WorkTitle = styled.h3<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: white;
  line-height: ${props => props.$designSystem.typography.leading.tight};
  margin: 0 0 ${props => props.$designSystem.spacing[1]} 0;
  letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  
  /* Limitar título a máximo 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.base};
    -webkit-line-clamp: 1;
  }
`

const WorkSubtitle = styled.p<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  font-family: ${props => props.$designSystem.typography.fonts.body};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
  }
`

// 📝 Área de descripción - flexible y optimizada
const WorkBody = styled.div<{ $designSystem: any }>`
  flex: 1;
  margin: ${props => props.$designSystem.spacing[4]} 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    margin: ${props => props.$designSystem.spacing[3]} 0;
  }
`

const WorkDescription = styled.p<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  font-family: ${props => props.$designSystem.typography.fonts.body};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  
  /* Limitar descripción a 2 líneas para composición más armónica */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
    -webkit-line-clamp: 2;
  }
`

// 🎯 Área de acción - siempre visible en el bottom
const WorkFooter = styled.div<{ $designSystem: any }>`
  flex-shrink: 0;
  margin-top: ${props => props.$designSystem.spacing[2]};
  width: 100%;
`

const WorkButton = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[2]};
  padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[4]};
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.$designSystem.radius.xl};
  color: white;
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
    padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[3]};
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`

// 🎯 Botón "Ver todos"
const ViewAllSection = styled.div<{ $theme: any; $designSystem: any }>`
    display: flex;
  justify-content: center;
  margin-top: ${props => props.$designSystem.spacing[12]};
  padding-top: ${props => props.$designSystem.spacing[8]};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  animation: ${fadeInUp} 0.8s ease-out 0.5s both;
`

const ViewAllButton = styled(Link)<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[3]};
  padding: ${props => props.$designSystem.spacing[4]} ${props => props.$designSystem.spacing[8]};
  background: ${props => props.$theme.colors.bg.primary};
  color: ${props => props.$theme.colors.text.primary};
  border: 2px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  
  svg {
    transition: transform ${props => props.$designSystem.animation.duration.fast} ease;
  }
      
      &:hover {
        background: ${props => props.$theme.colors.interactive.primary};
    color: ${props => props.$theme.colors.text.inverse};
        border-color: ${props => props.$theme.colors.interactive.primary};
    transform: translateY(-2px);
    
    svg {
      transform: translateX(4px);
      }
  }
`

// 🎬 Video component para el carousel - Simplificado
const WorkVideo = styled.video<{ $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
  background: ${props => props.$designSystem.colors.neutral?.[100] || '#f5f5f5'};
  z-index: 1; /* Z-index bajo para que no tape el badge */
  
  /* Optimización para reproducción suave */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  
  /* Ocultar controles de video */
  &::-webkit-media-controls,
  &::-webkit-media-controls-panel,
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-mute-button,
  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-current-time-display {
    display: none !important;
    -webkit-appearance: none !important;
  }
`

// 🎯 Video fallback placeholder - Simplificado
const VideoLoadingPlaceholder = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.$theme.colors.interactive.primary} 0%, ${props => props.$theme.colors.interactive.hover} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$theme.colors.text.inverse};
  border-radius: inherit;
  z-index: 1; /* Z-index bajo para que no tape el badge */
  
  svg {
    opacity: 0.7;
  }
`

interface FeaturedWorksCarouselProps {
  className?: string
}

// 🎥 COMPONENTE UNIFICADO - USA EL SISTEMA OPTIMIZADO
const UnifiedVideoComponent: React.FC<{
  videoUrl: string
  projectId: string 
  index: number
  projectTitle: string
}> = ({ videoUrl, projectId, index, projectTitle }) => {
  const { theme, designSystem } = useTheme2025()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // 🚀 PROTECCIÓN SSR - Solo ejecutar en cliente
  useEffect(() => {
    setIsClient(true)
  }, [])




    // 🎯 AUTOPLAY SIMPLE Y DIRECTO - SOLO EN CLIENTE
  useEffect(() => {
    if (!isClient || !videoRef.current) return

    const video = videoRef.current
    
    // Configuración básica
    video.muted = true
    video.playsInline = true
    video.loop = true
    video.preload = 'metadata'
    video.setAttribute('webkit-playsinline', 'true')
    video.controls = false

    // Observer simple
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoading(false)
            
            // AUTOPLAY DIRECTO - SIN VERIFICACIONES COMPLICADAS
            setTimeout(() => {
              video.currentTime = 0
              video.play().then(() => {
                console.log(`✅ Carousel video ${projectId} playing`)
              }).catch(() => {
                console.log(`⚠️ Carousel video ${projectId} autoplay blocked`)
              })
            }, 100)
            
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '50px' }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [projectId, isClient])



  if (hasError) {
    return (
      <VideoLoadingPlaceholder 
        $theme={theme} 
        $designSystem={designSystem}
      >
        <FiEye size={48} />
      </VideoLoadingPlaceholder>
    )
  }

  // 🚀 SSR SAFE: Mostrar placeholder hasta que el cliente esté listo
  if (!isClient) {
    return (
      <VideoLoadingPlaceholder 
        $theme={theme} 
        $designSystem={designSystem}
      >
        <FiEye size={48} />
      </VideoLoadingPlaceholder>
    )
  }

  return (
    <>
      {isLoading && (
        <VideoLoadingPlaceholder 
          className="loading"
          $theme={theme} 
          $designSystem={designSystem}
        >
          <FiEye size={48} />
        </VideoLoadingPlaceholder>
      )}
      
      <WorkVideo 
        ref={videoRef}
        $designSystem={designSystem}
        data-video-id={`carousel-${projectId}-${index}`}
        preload="metadata"
        muted
        playsInline
        loop
        style={{ display: isLoading ? 'none' : 'block' }}
        aria-label={`Video promocional del proyecto ${projectTitle}`}
        title={`Proyecto ${projectTitle} - Preview`}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
      </WorkVideo>
    </>
  )
}

const FeaturedWorksCarousel = ({ className }: FeaturedWorksCarouselProps) => {
  const { theme, designSystem, isDark } = useTheme2025()
  const data = useStaticQuery(PROJECTS_QUERY)
  
  const projects: ProjectFromYaml[] = data?.allProjectsYaml?.edges?.map((edge: any) => edge.node) || []
  const videoFiles = data?.allFile?.nodes || []
  
  // Duplicar projects para efecto loop infinito
  const allProjects = [...projects, ...projects]
  
  // 🎬 Función optimizada para encontrar el video principal de un proyecto
  const getProjectVideo = (project: ProjectFromYaml): string | null => {
    // Usar el campo "images" para obtener la carpeta real del proyecto
    const projectFolder = project.images || project.slug
    const projectSlug = project.slug
    
    // Buscar videos en la carpeta del proyecto - PATHS FLEXIBLES
    const projectVideos = videoFiles.filter((file: any) => {
      const path = file.relativeDirectory || ''
      // Buscar por carpeta real (campo images) y también por slug como fallback
      return path === `projects/${projectFolder}` || 
             path === projectFolder ||
             path === `projects/${projectSlug}` || 
             path === projectSlug
    })
    
    if (projectVideos.length === 0) return null
    
    // 🎯 Prioridades optimizadas para seleccionar el video principal
    const priorities = [
      // TRAM específico
      'NOCOLA-1080x1080_2',
      'NOCOLA-1080x1090_6', 
      'NOCOLA-BannerWeb',
      'BALLARINA_1080x1920',
      'BALLARÍ_1x1_INSTA',
      // Patrones generales por carpeta real
      `${projectFolder}-hero`,
      `${projectFolder}-main`,
      `${projectFolder}-preview`,
      `projects-${projectFolder}-001`,
      // Patrones generales por slug como fallback
      `${projectSlug}-hero`,
      `${projectSlug}-main`,
      `${projectSlug}-preview`,
      `projects-${projectSlug}-001`
    ]
    
    // 🔍 Buscar por prioridad con matching flexible
    for (const priority of priorities) {
      const video = projectVideos.find((file: any) => 
        file.name.toLowerCase().includes(priority.toLowerCase())
      )
      if (video) return video.publicURL
    }
    
    // 🎯 Si no encuentra por prioridad, tomar el primer video disponible
    return projectVideos[0]?.publicURL || null
  }
  
  // Calcular tamaño de card responsive
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 220 // móvil - reducido de 260
      if (window.innerWidth < 1024) return 260 // tablet - reducido de 300
      return 300 // desktop - reducido de 340
    }
    return 300
  }
  
  const [cardWidth, setCardWidth] = useState(300)
  
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getProjectDescription = (desc?: string, title_detail?: string): string => {
    if (desc && desc.trim().length > 0) {
      return desc.length > 80 ? desc.substring(0, 80) + '...' : desc
    }
    return title_detail || 'Proyecto de desarrollo web.'
  }

  // Función para obtener el año del proyecto como badge
  const getProjectYearBadge = (project: ProjectFromYaml): string => {
    return project.from || '2024'
  }

  const getProjectSubtitle = (project: ProjectFromYaml): string => {
    const categories = project.category?.replace(/^#/, '').split('#').filter(Boolean) || []
    const topThreeSkills = categories.slice(0, 3).map(cat => cat.trim()).filter(Boolean)
    
    if (topThreeSkills.length === 0) {
      return 'Desarrollo'
    }
    
    // Mostrar las 3 primeras skills separadas por " • "
    return topThreeSkills.join(' • ')
  }

  return (
    <CarouselContainer $theme={theme} $designSystem={designSystem} className={className}>
      <CarouselWrapper $designSystem={designSystem}>        
        {/* Track del carrusel */}
        <CarouselTrack
          $theme={theme}
          $designSystem={designSystem}
          $cardWidth={cardWidth}
          $totalCards={projects.length}
        >
          {allProjects.map((project, index) => (
            <CarouselCard 
              key={`${project.id}-${index}`}
              $theme={theme} 
              $designSystem={designSystem}
              $isDark={isDark}
              $cardWidth={cardWidth}
            >
              {/* Card visual con enlace */}
              <CardVisual 
                className="card-visual"
                to={`/${project.slug}/`}
                $theme={theme} 
                $designSystem={designSystem}
                $isDark={isDark}
                data-cursor="view"
              >
                {/* Badge de año FUERA del CardInner para que sobresalga */}
                <WorkBadge 
                  className="work-badge" 
                  $theme={theme} 
                  $designSystem={designSystem}
                  $badgeType={getProjectYearBadge(project)}
                >
                  {getProjectYearBadge(project)}
                </WorkBadge>

                {/* Contenedor interno con overflow hidden */}
                <CardInner $theme={theme} $designSystem={designSystem}>
                  {/* Imagen de fondo o Video */}
                  <WorkImageBackground $designSystem={designSystem}>
                    <WorkImage className="work-image" $designSystem={designSystem}>
                      {(() => {
                        const videoUrl = getProjectVideo(project)
                        
                        if (videoUrl) {
                          return <UnifiedVideoComponent 
                            videoUrl={videoUrl}
                            projectId={project.id}
                            index={index}
                            projectTitle={project.title}
                          />
                        }
                        
                        // Mostrar imagen si no hay video y hay cover
                        if (project.cover && project.cover.endsWith('.jpg')) {
                          return (
                            <img
                              src={project.cover}
                              alt={`${project.title} - Preview`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          )
                        }
                        
                        // Placeholder si no hay ni video ni imagen
                        return (
                          <WorkImagePlaceholder $theme={theme} $designSystem={designSystem}>
                            <FiCode size={48} />
                          </WorkImagePlaceholder>
                        )
                      })()}
                    </WorkImage>
                  </WorkImageBackground>
                  
                  {/* Overlay */}
                  <WorkOverlay 
                    className="work-overlay" 
                    $theme={theme} 
                    $designSystem={designSystem}
                    $isDark={isDark}
                  />
                  
                  {/* Contenido en hover - CENTRADO SIN DESCRIPCIÓN */}
                  <WorkContent 
                    className="work-content" 
                    $theme={theme} 
                    $designSystem={designSystem}
                    $isDark={isDark}
                  >
                    <WorkHeader>
                      <WorkTitle $theme={theme} $designSystem={designSystem} $isDark={isDark}>
                        {project.title}
                      </WorkTitle>
                      
                      <WorkSubtitle $theme={theme} $designSystem={designSystem} $isDark={isDark}>
                        {getProjectSubtitle(project)}
                      </WorkSubtitle>
                    </WorkHeader>
                    
                    <WorkFooter $designSystem={designSystem}>
                      <WorkButton $theme={theme} $designSystem={designSystem} $isDark={isDark}>
                        Ver trabajo
                        <FiEye />
                      </WorkButton>
                    </WorkFooter>
                  </WorkContent>
                </CardInner>
              </CardVisual>

              {/* Información del proyecto debajo de la card */}
              <CardInfo $theme={theme} $designSystem={designSystem}>
                <CardTitle $theme={theme} $designSystem={designSystem}>
                  {project.title}
                </CardTitle>
                <CardRole $theme={theme} $designSystem={designSystem}>
                  {getProjectSubtitle(project)}
                </CardRole>
              </CardInfo>
            </CarouselCard>
          ))}
        </CarouselTrack>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default FeaturedWorksCarousel 
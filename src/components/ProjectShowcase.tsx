import React, { useEffect, useRef, useState } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🎯 CONTENEDOR PRINCIPAL SIMPLIFICADO
const ShowcaseContainer = styled.section<{ $theme: any; $designSystem: any }>`
  width: 100%;
  margin: ${props => props.$designSystem.spacing[16]} 0;
  position: relative;
  
  @media (max-width: 768px) {
    margin: ${props => props.$designSystem.spacing[12]} 0;
  }
`

// 🖼️ SECCIÓN DE MEDIA OPTIMIZADA
const MediaSection = styled.div<{ $theme: any; $designSystem: any }>`
  width: 100%;
  margin-bottom: ${props => props.$designSystem.spacing[12]};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.$designSystem.spacing[8]};
  }
`

// 🖼️ CONTENEDOR DE IMAGEN OPTIMIZADO
const ImageContainer = styled.div<{ $theme: any; $designSystem: any; $isIPB?: boolean }>`
  position: relative;
  width: 100%;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.secondary};
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.1),
    0 8px 20px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.15),
      0 12px 30px -5px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
  
  .gatsby-image-wrapper {
    width: 100% !important;
    height: auto !important;
  }
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
  
  @media (max-width: 768px) {
    border-radius: ${props => props.$designSystem.radius.lg};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`

// 🖼️ GRID ESPECIAL PARA PROYECTO IPB - SIN EFECTOS
const IPBImageGrid = styled.div<{ $theme: any; $designSystem: any }>`
  display: grid;
  gap: ${props => props.$designSystem.spacing[4]};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
  /* 🖥️ Desktop: 3 columnas para aprovechar imágenes móviles */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.$designSystem.spacing[6]};
  }
  
  /* 📱 Tablet: 2 columnas */
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.$designSystem.spacing[4]};
  }
  
  /* 📱 Mobile: 1 columna */
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[3]};
  }
`

// 🖼️ CONTENEDOR SIMPLE PARA IMÁGENES IPB
const IPBImageContainer = styled.div<{ $theme: any; $designSystem: any }>`
  width: 100%;
  border-radius: ${props => props.$designSystem.radius.lg};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.secondary};
  
  .gatsby-image-wrapper {
    width: 100% !important;
    height: auto !important;
    
    img {
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
      object-position: center !important;
      display: block !important;
    }
  }
  
  > img {
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
    display: block;
  }
`

// 🎥 CONTENEDOR DE VIDEO OPTIMIZADO
const VideoContainer = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100%;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.secondary};
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.1),
    0 8px 20px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.15),
      0 12px 30px -5px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
  
  video {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  
  @media (max-width: 768px) {
    border-radius: ${props => props.$designSystem.radius.lg};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`

// 📄 CONTENEDOR DE DOCUMENTOS OPTIMIZADO
const DocumentContainer = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100%;
  padding: ${props => props.$designSystem.spacing[12]};
  border-radius: ${props => props.$designSystem.radius.xl};
  background: linear-gradient(135deg, 
    ${props => props.$theme.colors.bg.primary}, 
    ${props => props.$theme.colors.bg.secondary}
  );
  border: 1px solid ${props => props.$theme.colors.border.primary};
  text-align: center;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.15),
      0 12px 30px -5px rgba(0, 0, 0, 0.08);
  }
  
  .document-icon {
    font-size: 4rem;
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }
  
  .document-title {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.lg};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: ${props => props.$designSystem.spacing[2]};
  }
  
  .document-meta {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: ${props => props.$theme.colors.text.secondary};
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
  
  .document-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.$designSystem.spacing[2]};
    padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
    background: ${props => props.$theme.colors.interactive.primary};
    color: ${props => props.$theme.colors.text.inverse};
    border: none;
    border-radius: ${props => props.$designSystem.radius.full};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.$theme.colors.interactive.secondary};
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[8]};
    border-radius: ${props => props.$designSystem.radius.lg};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`

// 🎯 TIPOS DE INTERFAZ SIMPLIFICADOS
interface ProjectShowcaseProps {
  projectImages: Array<{
    node: {
      id: string
      name: string
      relativePath: string
      publicURL?: string
      childImageSharp?: {
        gatsbyImageData?: IGatsbyImageData
      }
    }
  }>
  projectVideos: Array<{
    node: {
      id: string
      name: string
      relativePath: string
      publicURL?: string
    }
  }>
  projectDocuments: Array<{
    node: {
      id: string
      name: string
      relativePath: string
      publicURL?: string
      extension: string
    }
  }>
  projectTitle: string
}

// 🚀 COMPONENTE PRINCIPAL OPTIMIZADO CON SCROLL DETECTION
const ProjectShowcase = ({
  projectImages,
  projectVideos,
  projectDocuments,
  projectTitle
}: ProjectShowcaseProps) => {
  const { theme, designSystem } = useTheme2025()
  
  // 🎯 Referencias para videos y observer
  const videoRefsMap = React.useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  // 🔄 Combinar y ordenar todos los medios de forma simple
  const allMedia = [
    ...projectImages.map(({ node }) => ({ ...node, type: 'image' as const })),
    ...projectVideos.map(({ node }) => ({ ...node, type: 'video' as const })),
    ...projectDocuments.map(({ node }) => ({ ...node, type: 'document' as const }))
  ].sort((a, b) => a.name.localeCompare(b.name))

  // 🎯 SISTEMA DE VIDEO OPTIMIZADO - Sin problemas de scroll
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Crear nuevo observer con configuración optimizada
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id')
          const video = videoRefsMap.current[videoId || '']
          
          if (!video) return

          if (entry.isIntersecting) {
            // 🎥 Video entra en viewport - reproducir
            video.currentTime = 0 // Reiniciar desde el principio
            video.play().catch((error) => {
                          // Video autoplay puede estar bloqueado, se ignora silenciosamente
            })
          } else {
            // ⏸️ Video sale del viewport - pausar inmediatamente
            video.pause()
          }
        })
      },
      {
        threshold: 0.1, // Solo necesita 10% visible para activarse
        rootMargin: '50px 0px', // Margen extra para activación anticipada
      }
    )

    // Observar todos los videos actuales
    const videosToObserve = Object.values(videoRefsMap.current).filter(Boolean)
    videosToObserve.forEach((video) => {
      if (video && observerRef.current) {
        observerRef.current.observe(video)
      }
    })

    // Observer configurado

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [allMedia.length])

  // 📦 Función para registrar video y observarlo inmediatamente
  const setVideoRef = React.useCallback((id: string, element: HTMLVideoElement | null) => {
    // Remover observación del video anterior si existe
    const previousVideo = videoRefsMap.current[id]
    if (previousVideo && observerRef.current) {
      observerRef.current.unobserve(previousVideo)
    }

    // Actualizar referencia
    videoRefsMap.current[id] = element

    // Observar nuevo video inmediatamente si el observer está listo
    if (element && observerRef.current) {
      // Pequeño delay para asegurar que el elemento está completamente montado
      setTimeout(() => {
        if (observerRef.current && element) {
          observerRef.current.observe(element)
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`🎥 Video ${id} añadido al observer`)
          }
        }
      }, 50)
    }
  }, [])

  // 🎯 Función para detectar el aspect ratio y aplicar clases CSS
  const getAspectRatioClass = React.useCallback((element: HTMLVideoElement | HTMLImageElement) => {
    const { videoWidth, videoHeight, naturalWidth, naturalHeight } = element as any
    const width = videoWidth || naturalWidth || element.clientWidth
    const height = videoHeight || naturalHeight || element.clientHeight
    
    if (!width || !height) return 'aspect-landscape'
    
    const ratio = width / height
    
    if (ratio > 1.3) return 'aspect-landscape'   // Horizontal
    if (ratio < 0.8) return 'aspect-portrait'    // Vertical  
    return 'aspect-square'                       // Cuadrado
  }, [])

  // 🎯 Función para detectar aspect ratio por nombre de archivo (carga inicial rápida)
  const getAspectRatioFromFilename = React.useCallback((filename: string) => {
    const name = filename.toLowerCase()
    
    // 📱 Detectar formatos verticales/móviles (portrait)
    if (name.includes('1080x1920') || name.includes('9x16') || name.includes('_vertical') || 
        name.includes('mobile') || name.includes('portrait') || name.includes('stories') ||
        name.match(/\d+x\d+/) && name.match(/(\d+)x(\d+)/) && 
        parseInt(name.match(/(\d+)x(\d+)/)?.[2] || '0') > parseInt(name.match(/(\d+)x(\d+)/)?.[1] || '0')) {
      return 'aspect-portrait'
    }
    
    // ⬜ Detectar formatos cuadrados (square)
    if (name.includes('1x1') || name.includes('1080x1080') || name.includes('_square') ||
        name.includes('square') || name.includes('instagram') ||
        name.match(/\d+x\d+/) && name.match(/(\d+)x(\d+)/) && 
        parseInt(name.match(/(\d+)x(\d+)/)?.[1] || '0') === parseInt(name.match(/(\d+)x(\d+)/)?.[2] || '0')) {
      return 'aspect-square'
    }
    
    // 🖥️ Detectar formatos horizontales/desktop (landscape)
    if (name.includes('1920x1080') || name.includes('16x9') || name.includes('_horizontal') ||
        name.includes('banner') || name.includes('web') || name.includes('desktop') ||
        name.includes('landscape') || name.includes('wide')) {
      return 'aspect-landscape'
    }
    
    // 🎯 Fallback inteligente por extensión
    if (name.includes('video') || name.includes('.mp4') || name.includes('.webm')) {
      return 'aspect-landscape' // Videos suelen ser horizontales por defecto
    }
    
    // Default conservador para no sobredimensionar
    return 'aspect-landscape'
  }, [])

  // 🎯 Función para aplicar clase de aspect ratio inmediatamente
  const applyAspectRatioClass = React.useCallback((containerId: string, aspectClass: string) => {
    const container = document.getElementById(containerId)
    if (container) {
      // Remover clases anteriores y aplicar la nueva
      container.className = container.className.replace(/aspect-\w+/g, '').trim() + ` ${aspectClass}`
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📐 Aplicada clase ${aspectClass} a ${containerId}`)
      }
    }
  }, [])

  // 🎯 Effect para aplicar aspect ratios inmediatamente al montar
  React.useEffect(() => {
    // Aplicar clases de aspect ratio a todos los contenedores inmediatamente
    allMedia.forEach((media) => {
      const initialAspectClass = getAspectRatioFromFilename(media.name)
      const containerId = `${media.type}-container-${media.id}`
      
      // Aplicar inmediatamente
      applyAspectRatioClass(containerId, initialAspectClass)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Aplicación inicial: ${media.name} → ${initialAspectClass}`)
      }
    })
  }, [allMedia, getAspectRatioFromFilename, applyAspectRatioClass])

  // 🧹 Cleanup al desmontar el componente
  React.useEffect(() => {
    return () => {
      // Pausar todos los videos al desmontar
      Object.values(videoRefsMap.current).forEach((video) => {
        if (video) {
          video.pause()
        }
      })
      
      // Limpiar observer
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🧹 ProjectShowcase ${projectTitle} desmontado correctamente`)
      }
    }
  }, [projectTitle])

  // 🐛 Debug en desarrollo
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Solo logear una vez al montar el componente
    React.useEffect(() => {
      console.log(`📸 ProjectShowcase ${projectTitle} - Total media:`, allMedia.length)
      console.log(`   🖼️ Imágenes recibidas: ${projectImages.length}`)
      }, []) // Solo ejecutar al montar
  }

  if (allMedia.length === 0) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ No se encontraron archivos para el proyecto: ${projectTitle}`)
    }
    return null
  }

  // 🎯 CONFIGURACIÓN ESPECIAL PARA PROYECTO IPB - Mostrar imágenes sin efectos
  const isIPBProject = projectTitle.toLowerCase().includes('ipb') || 
                      allMedia.some(media => media.name.includes('ipb'))

  // 🎯 RENDERIZADO ESPECIAL PARA IPB - SIN EFECTOS
  if (isIPBProject && projectImages.length > 0) {
    const sortedImages = [...projectImages].sort((a, b) => 
      a.node.name.localeCompare(b.node.name)
    )
    
    return (
      <ShowcaseContainer $theme={theme} $designSystem={designSystem}>
        <IPBImageGrid $theme={theme} $designSystem={designSystem}>
          {sortedImages.map(({ node: image }) => (
            <IPBImageContainer 
              key={image.id}
              $theme={theme} 
              $designSystem={designSystem}
            >
              {image.childImageSharp?.gatsbyImageData ? (
                <GatsbyImage
                  image={image.childImageSharp.gatsbyImageData}
                  alt={`${projectTitle} - ${image.name}`}
                  loading="lazy"
                />
              ) : image.publicURL ? (
                <img
                  src={image.publicURL}
                  alt={`${projectTitle} - ${image.name}`}
                  loading="lazy"
                />
              ) : null}
            </IPBImageContainer>
          ))}
        </IPBImageGrid>
      </ShowcaseContainer>
    )
  }

  return (
    <ShowcaseContainer $theme={theme} $designSystem={designSystem}>
      {allMedia.map((media) => (
        <MediaSection
          key={media.id}
          $theme={theme}
          $designSystem={designSystem}
        >
          {/* 🖼️ RENDERIZADO DE IMÁGENES */}
          {media.type === 'image' && (
            <ImageContainer 
              $theme={theme} 
              $designSystem={designSystem}
              $isIPB={isIPBProject}
              id={`image-container-${media.id}`}
            >
              {media.childImageSharp?.gatsbyImageData ? (
                <GatsbyImage
                  image={media.childImageSharp.gatsbyImageData}
                  alt={`${projectTitle} - ${media.name}`}
                  loading="lazy"
                />
              ) : media.publicURL ? (
                <img
                  src={media.publicURL}
                  alt={`${projectTitle} - ${media.name}`}
                  loading="lazy"
                />
              ) : (
                <div style={{
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                  color: '#9ca3af',
                  fontSize: '2rem'
                }}>
                  🖼️ Imagen no disponible
                </div>
              )}
            </ImageContainer>
          )}

          {/* 🎥 RENDERIZADO DE VIDEOS CON SCROLL CONTROL */}
          {media.type === 'video' && media.publicURL && (
            <VideoContainer 
              $theme={theme} 
              $designSystem={designSystem}
              id={`video-container-${media.id}`}
            >
              <video
                ref={(el) => setVideoRef(media.id, el)}
                data-video-id={media.id}
                src={media.publicURL}
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
              />
            </VideoContainer>
          )}

          {/* 📄 RENDERIZADO DE DOCUMENTOS */}
          {media.type === 'document' && media.publicURL && (
            <DocumentContainer $theme={theme} $designSystem={designSystem}>
              <div className="document-icon">📄</div>
              <div className="document-title">
                {media.name.replace(/\.[^/.]+$/, '')}
              </div>
              <div className="document-meta">
                {media.extension.toUpperCase()} Document
              </div>
              <a
                href={media.publicURL}
                target="_blank"
                rel="noopener noreferrer"
                className="document-action"
              >
                Ver Documento
              </a>
            </DocumentContainer>
          )}
        </MediaSection>
      ))}
    </ShowcaseContainer>
  )
}

export default ProjectShowcase 
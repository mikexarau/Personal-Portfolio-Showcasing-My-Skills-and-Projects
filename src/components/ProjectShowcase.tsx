import React, { useEffect, useRef, useState } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import OptimizedVideoPerformance from './optimized-video-performance'

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

// 🎥 CONTENEDOR DE VIDEO OPTIMIZADO - REEMPLAZADO POR COMPONENTE OPTIMIZADO
const VideoContainer = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100%;
  
  /* 🚀 SOLUCIÓN CRÍTICA: MAX-WIDTH RESPONSIVE PARA DESKTOP */
  max-width: min(900px, 90vw); /* Máximo 900px o 90% del viewport */
  margin: 0 auto; /* Centrar el contenedor */
  
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.secondary};
  
  /* 🎯 HARDWARE ACCELERATION FORZADA */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.1),
    0 8px 20px -5px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.15),
      0 12px 30px -5px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px) translateZ(0);
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    
    /* 🚀 HARDWARE ACCELERATION */
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  
  @media (max-width: 768px) {
    border-radius: ${props => props.$designSystem.radius.lg};
    max-width: 100%;
    
    &:hover {
      transform: translateY(-2px) translateZ(0);
    }
  }
  
  @media (max-width: 480px) {
    border-radius: ${props => props.$designSystem.radius.md};
    max-width: 95vw !important;
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

// 🚀 COMPONENTE PRINCIPAL OPTIMIZADO - SIN LAG EN SCROLL
const ProjectShowcase = ({
  projectImages,
  projectVideos,
  projectDocuments,
  projectTitle
}: ProjectShowcaseProps) => {
  const { theme, designSystem } = useTheme2025()

  // 🔄 Combinar y ordenar todos los medios de forma simple
  const allMedia = [
    ...projectImages.map(({ node }) => ({ ...node, type: 'image' as const })),
    ...projectVideos.map(({ node }) => ({ ...node, type: 'video' as const })),
    ...projectDocuments.map(({ node }) => ({ ...node, type: 'document' as const }))
  ].sort((a, b) => a.name.localeCompare(b.name))

  // ✅ NOTA: Ya no necesitamos detectar aspect ratio - el componente mantiene proporciones originales automáticamente

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

          {/* 🎥 RENDERIZADO DE VIDEOS OPTIMIZADO - MANTIENE PROPORCIONES ORIGINALES */}
          {media.type === 'video' && media.publicURL && (
            <OptimizedVideoPerformance
                src={media.publicURL}
              videoId={`project-${projectTitle}-${media.id}`}
              autoPlay={true}
              loop={true}
              muted={true}
            />
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
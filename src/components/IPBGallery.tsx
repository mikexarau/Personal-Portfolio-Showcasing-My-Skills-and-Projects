import React, { useState, useEffect, useCallback } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'

// 🎨 Animaciones vanguardistas
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 🏗️ Container principal de la galería IPB
const IPBGalleryContainer = styled.section<{ $theme: any; $designSystem: any }>`
  width: 100%;
  margin: ${props => props.$designSystem.spacing[16]} 0;
  position: relative;
  
  @media (max-width: 768px) {
    margin: ${props => props.$designSystem.spacing[12]} 0;
  }
`

// 📐 Grid de galería vanguardista - 3 columnas en desktop
const GalleryGrid = styled.div<{ $theme: any; $designSystem: any }>`
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

// 🖼️ Item de galería con efectos vanguardistas
const GalleryItem = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $index: number;
}>`
  position: relative;
  cursor: pointer;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.secondary};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideInFromBottom} 0.6s ease-out ${props => props.$index * 0.1}s both;
  
  /* 🎯 Aspect ratio óptimo para imágenes móviles */
  aspect-ratio: 9 / 16;
  
  /* 🎨 Efectos hover vanguardistas */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px -8px rgba(0, 0, 0, 0.15),
      0 0 0 1px ${props => props.$theme.colors.border.secondary}40;
    
    .gallery-overlay {
      opacity: 1;
      backdrop-filter: blur(8px);
    }
    
    .gallery-image {
      transform: scale(1.05);
    }
    
    .gallery-zoom-icon {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* 📱 Mobile: reducir efectos para mejor performance */
  @media (max-width: 767px) {
    aspect-ratio: 16 / 9;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`

// 🖼️ Imagen con efectos suaves
const GalleryImage = styled(GatsbyImage)<{ $theme: any; $designSystem: any }>`
  width: 100% !important;
  height: 100% !important;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  
  img {
    object-fit: cover !important;
    object-position: center !important;
  }
`

// 🎭 Overlay con glassmorphism
const GalleryOverlay = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${props => props.$theme.colors.bg.primary}20,
    ${props => props.$theme.colors.bg.secondary}40
  );
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(0px);
`

// 🔍 Icono de zoom elegante
const ZoomIcon = styled.div<{ $theme: any; $designSystem: any }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$theme.colors.bg.primary}E6;
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${props => props.$theme.colors.border.secondary}40;
  
  svg {
    color: ${props => props.$theme.colors.text.primary};
    width: 20px;
    height: 20px;
  }
`

// 🌟 Lightbox moderno con glassmorphism
const Lightbox = styled.div<{ $theme: any; $designSystem: any; $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: ${props => props.$theme.colors.bg.primary}F0;
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: ${props => props.$designSystem.spacing[4]};
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[2]};
  }
`

// 🖼️ Imagen del lightbox
const LightboxImage = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: ${fadeInScale} 0.3s ease-out;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.3);
  
  .gatsby-image-wrapper {
    border-radius: ${props => props.$designSystem.radius.xl};
  }
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: ${props => props.$designSystem.radius.xl};
  }
`

// 🎮 Controles del lightbox
const LightboxControls = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: ${props => props.$designSystem.spacing[4]};
  right: ${props => props.$designSystem.spacing[4]};
  display: flex;
  gap: ${props => props.$designSystem.spacing[2]};
  z-index: 10001;
`

const ControlButton = styled.button<{ $theme: any; $designSystem: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$theme.colors.bg.primary}E6;
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.$theme.colors.border.secondary}40;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    color: ${props => props.$theme.colors.text.primary};
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: ${props => props.$theme.colors.bg.secondary}F0;
    transform: scale(1.1);
  }
`

// 🏷️ Contador de imágenes
const ImageCounter = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  bottom: ${props => props.$designSystem.spacing[4]};
  left: 50%;
  transform: translateX(-50%);
  padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[4]};
  background: ${props => props.$theme.colors.bg.primary}E6;
  backdrop-filter: blur(20px);
  border-radius: ${props => props.$designSystem.radius.full};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: ${props => props.$theme.colors.text.secondary};
  border: 1px solid ${props => props.$theme.colors.border.secondary}40;
  z-index: 10001;
`

// 🎯 Interface para imágenes
interface IPBImage {
  id: string
  name: string
  publicURL?: string
  childImageSharp?: {
    gatsbyImageData?: IGatsbyImageData
  }
}

interface IPBGalleryProps {
  images: Array<{
    node: IPBImage
  }>
  projectTitle: string
}

// 🎨 Componente principal IPBGallery
const IPBGallery: React.FC<IPBGalleryProps> = ({ images, projectTitle }) => {
  const { theme, designSystem } = useTheme2025()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 🎯 Ordenar imágenes por nombre para consistencia
  const sortedImages = [...images].sort((a, b) => 
    a.node.name.localeCompare(b.node.name)
  )

  // 🔄 Navegación del lightbox
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === sortedImages.length - 1 ? 0 : prev + 1
    )
  }, [sortedImages.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? sortedImages.length - 1 : prev - 1
    )
  }, [sortedImages.length])

  // ⌨️ Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      switch (e.key) {
        case 'Escape':
          setLightboxOpen(false)
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [lightboxOpen, nextImage, prevImage])

  // 🚫 Bloquear scroll del body cuando lightbox está abierto
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <IPBGalleryContainer $theme={theme} $designSystem={designSystem}>
      {/* 🎯 Grid de galería */}
      <GalleryGrid $theme={theme} $designSystem={designSystem}>
        {sortedImages.map((image, index) => (
          <GalleryItem
            key={image.node.id}
            $theme={theme}
            $designSystem={designSystem}
            $index={index}
            onClick={() => openLightbox(index)}
          >
            {image.node.childImageSharp?.gatsbyImageData ? (
              <GalleryImage
                className="gallery-image"
                $theme={theme}
                $designSystem={designSystem}
                image={image.node.childImageSharp.gatsbyImageData}
                alt={`${projectTitle} - ${image.node.name}`}
                loading="lazy"
              />
            ) : image.node.publicURL ? (
              <img
                className="gallery-image"
                src={image.node.publicURL}
                alt={`${projectTitle} - ${image.node.name}`}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            ) : null}
            
            <GalleryOverlay className="gallery-overlay" $theme={theme} $designSystem={designSystem}>
              <ZoomIcon className="gallery-zoom-icon" $theme={theme} $designSystem={designSystem}>
                <FiMaximize2 />
              </ZoomIcon>
            </GalleryOverlay>
          </GalleryItem>
        ))}
      </GalleryGrid>

      {/* 🌟 Lightbox moderno */}
      {lightboxOpen && (
        <Lightbox 
          $theme={theme} 
          $designSystem={designSystem} 
          $isOpen={lightboxOpen}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxOpen(false)
            }
          }}
        >
          <LightboxControls $theme={theme} $designSystem={designSystem}>
            <ControlButton 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={prevImage}
              title="Imagen anterior"
            >
              <FiChevronLeft />
            </ControlButton>
            <ControlButton 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={nextImage}
              title="Siguiente imagen"
            >
              <FiChevronRight />
            </ControlButton>
            <ControlButton 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={() => setLightboxOpen(false)}
              title="Cerrar"
            >
              <FiX />
            </ControlButton>
          </LightboxControls>

          <LightboxImage $theme={theme} $designSystem={designSystem}>
            {sortedImages[currentImageIndex]?.node.childImageSharp?.gatsbyImageData ? (
              <GatsbyImage
                image={sortedImages[currentImageIndex].node.childImageSharp.gatsbyImageData}
                alt={`${projectTitle} - ${sortedImages[currentImageIndex].node.name}`}
              />
            ) : sortedImages[currentImageIndex]?.node.publicURL ? (
              <img
                src={sortedImages[currentImageIndex].node.publicURL}
                alt={`${projectTitle} - ${sortedImages[currentImageIndex].node.name}`}
              />
            ) : null}
          </LightboxImage>

          <ImageCounter $theme={theme} $designSystem={designSystem}>
            {currentImageIndex + 1} de {sortedImages.length}
          </ImageCounter>
        </Lightbox>
      )}
    </IPBGalleryContainer>
  )
}

export default IPBGallery 
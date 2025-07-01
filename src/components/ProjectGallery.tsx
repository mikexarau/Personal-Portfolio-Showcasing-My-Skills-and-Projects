import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image'
import styled, { keyframes, css } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  FiPlay,
  FiPause,
  FiX,
  FiMaximize2,
  FiImage,
  FiVideo,
  FiFile
} from 'react-icons/fi'

// 🎬 Animaciones modernas
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// 🏗️ Interfaces
interface MediaFile {
  id: string
  name: string
  relativePath: string
  publicURL?: string
  childImageSharp?: {
    gatsbyImageData?: IGatsbyImageData
  }
  isVideo: boolean
  isImage: boolean
  isDocument?: boolean
}

interface ProjectGalleryProps {
  projectImages: MediaFile[]
  projectVideos: MediaFile[]
  projectDocuments?: MediaFile[]
  projectTitle: string
}

// 🎨 Styled Components
const GalleryContainer = styled.section<{ $theme: any; $designSystem: any }>`
  margin: ${props => props.$designSystem.spacing[12]} 0;
  animation: ${slideUp} 0.8s ease-out;
`

const GalleryHeader = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  padding-bottom: ${props => props.$designSystem.spacing[4]};
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary};

  h3 {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale['2xl']};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    color: ${props => props.$theme.colors.text.primary};
    margin: 0;
  }

  .media-count {
    display: flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[4]};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: ${props => props.$theme.colors.text.secondary};

    .count-item {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[2]};
      
      svg {
        color: ${props => props.$theme.colors.interactive.primary};
      }
    }
  }
`

const MediaGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.$designSystem.spacing[8]};
  align-items: start;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: ${props => props.$designSystem.spacing[6]};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[5]};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[4]};
  }
`

const MediaItem = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme.colors.bg.primary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.$theme.colors.interactive.primary};
  }

  .media-content {
    position: relative;
    width: 100%;
    height: 280px; /* Altura fija para evitar solapamientos */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$theme.colors.bg.secondary};
    
    @media (max-width: 768px) {
      height: 240px;
    }
    
    @media (max-width: 480px) {
      height: 200px;
    }
  }

  .expand-button {
    position: absolute;
    top: ${props => props.$designSystem.spacing[3]};
    right: ${props => props.$designSystem.spacing[3]};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: ${props => props.$designSystem.radius.full};
    color: white;
    font-size: 18px;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 3;
    border: none;
    cursor: pointer;
    backdrop-filter: blur(10px);
  }

  &:hover .expand-button {
    opacity: 1;
    background: rgba(0, 0, 0, 0.85);
    transform: scale(1.1);
  }
`

const VideoElement = styled.video<{ $theme: any }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${props => props.$theme.colors.bg.tertiary};
`

// 🖼️ Contenedor para imágenes - Mejorado para thumbnails y escalado
const ImageElement = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    
    /* Asegurar que las imágenes se escalen correctamente */
    [data-gatsby-image-wrapper] {
      width: 100% !important;
      height: 100% !important;
    }
    
    img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      transition: transform 0.3s ease;
    }
  }
  
  /* Efecto hover suave en thumbnail */
  &:hover .gatsby-image-wrapper img {
    transform: scale(1.05);
  }
`

// 🎯 Placeholder para archivos no soportados
const UnsupportedFileElement = styled.div<{ $theme: any; $designSystem: any }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${props => props.$theme.colors.bg.tertiary} 0%, 
    ${props => props.$theme.colors.bg.secondary} 100%
  );
  color: ${props => props.$theme.colors.text.secondary};
  text-align: center;
  padding: ${props => props.$designSystem.spacing[4]};
  
  svg {
    font-size: 2rem;
    margin-bottom: ${props => props.$designSystem.spacing[2]};
    opacity: 0.7;
  }
  
  .file-name {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    word-break: break-word;
    opacity: 0.8;
  }
  
  .file-type {
    font-size: ${props => props.$designSystem.typography.scale.xs};
    text-transform: uppercase;
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$theme.colors.interactive.primary};
    margin-top: ${props => props.$designSystem.spacing[1]};
  }
`

const MediaInfo = styled.div<{ $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem.spacing[5]};
  background: ${props => props.$theme.colors.bg.primary};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  flex-shrink: 0; /* Evita que se comprima */
  min-height: 80px; /* Altura mínima garantizada */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${props => props.$designSystem.spacing[2]};
  
  .media-name {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.base};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    color: ${props => props.$theme.colors.text.primary};
    margin: 0;
    line-height: 1.4;
    /* Permitir wrap para evitar cortes */
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .media-type {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[3]};
    background: ${props => props.$theme.colors.bg.secondary};
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: ${props => props.$designSystem.radius.full};
    font-size: ${props => props.$designSystem.typography.scale.xs};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    color: ${props => props.$theme.colors.text.secondary};
    width: fit-content;
    
    svg {
      width: 14px;
      height: 14px;
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
`

// 🖼️ Modal para vista completa - Mejorado
const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const ModalContent = styled.div`
  position: relative;
  max-width: 95vw;
  max-height: 90vh;
  animation: ${zoomIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .modal-media {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }
  
  .modal-image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 95vw;
    max-height: 85vh;
    
    .gatsby-image-wrapper {
      max-width: 100%;
      max-height: 85vh;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
      
      img {
        object-fit: contain !important;
        width: auto !important;
        height: auto !important;
        max-width: 100% !important;
        max-height: 85vh !important;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 100vw;
    max-height: 95vh;
    
    .modal-media,
    .modal-image-wrapper .gatsby-image-wrapper {
      max-height: 90vh;
      border-radius: 12px;
    }
  }
`

const ModalControls = styled.div<{ $theme: any }>`
  position: absolute;
  top: -70px;
  right: 0;
  display: flex;
  gap: ${({ $theme }) => $theme?.spacing?.[3] || '12px'};
  z-index: 10;
  
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.9);
      border-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  @media (max-width: 768px) {
    top: -60px;
    gap: 8px;
    
    button {
      width: 44px;
      height: 44px;
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`

// ✅ MediaTypeIcon removido para mejorar UX limpia

// 🎯 Componente principal
const ProjectGallery = ({ 
  projectImages, 
  projectVideos, 
  projectDocuments, 
  projectTitle 
}: ProjectGalleryProps) => {
  const { theme, designSystem } = useTheme2025()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const allMedia = [
    ...projectImages, 
    ...projectVideos,
    ...(projectDocuments || [])
  ].sort((a, b) => a.name.localeCompare(b.name))

  const openModal = useCallback((media: MediaFile) => {
    setSelectedMedia(media)
    setModalOpen(true)
    setIsPlaying(false)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelectedMedia(null)
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  if (allMedia.length === 0) {
    return null
  }

  return (
    <>
      <GalleryContainer $theme={theme} $designSystem={designSystem}>
        <GalleryHeader $theme={theme} $designSystem={designSystem}>
          <h3>Galería del proyecto</h3>
          <div className="media-count">
            {projectImages.length > 0 && (
              <div className="count-item">
                <FiImage />
                <span>{projectImages.length} imágenes</span>
              </div>
            )}
            {projectVideos.length > 0 && (
              <div className="count-item">
                <FiVideo />
                <span>{projectVideos.length} videos</span>
              </div>
            )}
            {(projectDocuments?.length || 0) > 0 && (
              <div className="count-item">
                <FiFile />
                <span>{projectDocuments?.length} documentos</span>
              </div>
            )}
          </div>
        </GalleryHeader>

        <MediaGrid $designSystem={designSystem}>
          {allMedia.map((media) => {
            return (
              <MediaItem 
                key={media.id}
                $theme={theme} 
                $designSystem={designSystem}
                onClick={() => openModal(media)}
              >
                <div className="media-content">
                  {media.isVideo && media.publicURL ? (
                    <VideoElement 
                      $theme={theme}
                      src={media.publicURL}
                      muted
                      loop
                      playsInline
                      onError={(e) => {
                        console.warn(`Error loading video: ${media.name}`, e)
                        e.currentTarget.style.display = 'none'
                      }}
                      aria-label={`Video del proyecto ${projectTitle}: ${media.name}`}
                      title={`Video del proyecto ${projectTitle}`}
                    >
                      <track 
                        kind="captions" 
                        srcLang="es" 
                        label="Español"
                        default
                      />
                    </VideoElement>
                  ) : media.isImage && media.childImageSharp?.gatsbyImageData ? (
                    <ImageElement>
                      <GatsbyImage
                        image={media.childImageSharp.gatsbyImageData}
                        alt={`${projectTitle} - ${media.name}`}
                        onError={() => {
                          console.warn(`Error loading image: ${media.name}`)
                        }}
                      />
                    </ImageElement>
                  ) : (
                    <UnsupportedFileElement $theme={theme} $designSystem={designSystem}>
                      <FiFile />
                      <div className="file-name">{media.name}</div>
                      <div className="file-type">
                        {media.relativePath.split('.').pop()?.toUpperCase() || 'Archivo'}
                      </div>
                    </UnsupportedFileElement>
                  )}
                  
                  <button 
                    className="expand-button"
                    aria-label={`Ampliar ${media.isVideo ? 'video' : 'imagen'}: ${media.name}`}
                    title={`Ver ${media.isVideo ? 'video' : 'imagen'} en pantalla completa`}
                  >
                    <FiMaximize2 />
                  </button>
                </div>

                <MediaInfo $theme={theme} $designSystem={designSystem}>
                  <p className="media-name">{media.name}</p>
                  <div className="media-type">
                    {media.isVideo ? <FiVideo /> : media.isImage ? <FiImage /> : <FiFile />}
                    {media.isVideo ? 'Video' : media.isImage ? 'Imagen' : 'Archivo'}
                  </div>
                </MediaInfo>
              </MediaItem>
            )
          })}
        </MediaGrid>
      </GalleryContainer>

      {/* Modal para vista completa */}
      <Modal $isOpen={modalOpen} onClick={closeModal}>
        {selectedMedia && (
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalControls $theme={theme}>
              {selectedMedia.isVideo && (
                <button 
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                  title={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </button>
              )}
              <button 
                onClick={closeModal}
                aria-label="Cerrar modal"
                title="Cerrar vista completa"
              >
                <FiX />
              </button>
            </ModalControls>

            {selectedMedia.isVideo && selectedMedia.publicURL ? (
              <video
                className="modal-media"
                src={selectedMedia.publicURL}
                controls
                autoPlay={isPlaying}
                muted
                onError={(e) => {
                  console.warn(`Error loading video in modal: ${selectedMedia.name}`, e)
                }}
                aria-label={`Video en pantalla completa del proyecto ${projectTitle}: ${selectedMedia.name}`}
                title={`Video del proyecto ${projectTitle}`}
              >
                <track 
                  kind="captions" 
                  srcLang="es" 
                  label="Español"
                  default
                />
              </video>
            ) : selectedMedia.isImage && selectedMedia.childImageSharp?.gatsbyImageData ? (
              (() => {
                const image = getImage(selectedMedia.childImageSharp.gatsbyImageData)
                return image ? (
                  <div className="modal-image-wrapper">
                    <GatsbyImage
                      className="modal-media"
                      image={image}
                      alt={`${projectTitle} - ${selectedMedia.name}`}
                      onError={() => {
                        console.warn(`Error loading image in modal: ${selectedMedia.name}`)
                      }}
                    />
                  </div>
                ) : (
                  <div className="modal-media" style={{ 
                    padding: '2rem', 
                    textAlign: 'center', 
                    color: 'white',
                    background: 'rgba(0,0,0,0.8)',
                    borderRadius: '8px'
                  }}>
                    <FiImage size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>Imagen no disponible</h3>
                    <p>No se pudo cargar la imagen: {selectedMedia.name}</p>
                  </div>
                )
              })()
            ) : (
              <div className="modal-media" style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                color: 'white',
                background: 'rgba(0,0,0,0.8)',
                borderRadius: '8px'
              }}>
                <FiFile size={64} style={{ marginBottom: '1rem' }} />
                <h3>{selectedMedia.name}</h3>
                <p>Archivo no previsualizable</p>
                {selectedMedia.publicURL && (
                  <a 
                    href={selectedMedia.publicURL} 
                    download 
                    style={{ 
                      color: '#3b82f6', 
                      textDecoration: 'underline',
                      display: 'block',
                      marginTop: '1rem'
                    }}
                  >
                    Descargar archivo
                  </a>
                )}
              </div>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default ProjectGallery 
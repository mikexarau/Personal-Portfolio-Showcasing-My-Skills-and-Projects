import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface OptimizedImageProps {
  src: string
  webpSrc?: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
  quality?: number
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

const ImageContainer = styled.div<{ $aspectRatio?: number }>`
  position: relative;
  overflow: hidden;
  
  ${props => props.$aspectRatio && `
    aspect-ratio: ${props.$aspectRatio};
  `}
  
  &.loading {
    /* 🌟 GRADIENTE SHIMMER MINIMALISTA */
    background: linear-gradient(
      110deg,
      #f8f9fa 8%,
      #e9ecef 18%,
      #f8f9fa 33%
    );
    background-size: 200% 100%;
    animation: elegantShimmer 2s ease-in-out infinite;
    
    /* 🔴 INDICADOR SUTIL DE CARGA */
    &::after {
      content: '';
      position: absolute;
      bottom: 12px;
      right: 12px;
      width: 6px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
      opacity: 0.7;
      animation: subtlePulse 1.5s ease-in-out infinite;
    }
  }
  
  @keyframes elegantShimmer {
    0% { 
      background-position: -200% 0; 
    }
    100% { 
      background-position: 200% 0; 
    }
  }
  
  @keyframes subtlePulse {
    0%, 100% { 
      opacity: 0.4; 
      transform: scale(1); 
    }
    50% { 
      opacity: 0.9; 
      transform: scale(1.3); 
    }
  }
  
  /* 🎯 REDUCIR ANIMACIONES EN MOTION REDUCIDO */
  @media (prefers-reduced-motion: reduce) {
    &.loading {
      animation: none;
      background: #e9ecef;
      
      &::after {
        animation: none;
        opacity: 0.5;
      }
    }
  }
`

const StyledImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 300ms ease;
  opacity: ${props => props.$loaded ? 1 : 0};
  
  &[data-lazy="true"] {
    filter: blur(5px);
    transition: all 300ms ease;
  }
  
  &[data-loaded="true"] {
    filter: none;
  }
`

const PlaceholderSvg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #9ca3af;
  font-size: 0.875rem;
  overflow: hidden;
  
  /* 🌟 GRADIENTE SHIMMER PARA ERROR STATE */
  &.error-state {
    background: linear-gradient(
      110deg,
      #fef2f2 8%,
      #fee2e2 18%,
      #fef2f2 33%
    );
    background-size: 200% 100%;
    animation: elegantShimmer 2s ease-in-out infinite;
    
    /* 🔴 INDICADOR DE ERROR */
    &::after {
      content: '';
      position: absolute;
      bottom: 12px;
      right: 12px;
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
      opacity: 0.7;
    }
  }
  
  @keyframes elegantShimmer {
    0% { 
      background-position: -200% 0; 
    }
    100% { 
      background-position: 200% 0; 
    }
  }
  
  /* 🎯 REDUCIR ANIMACIONES EN MOTION REDUCIDO */
  @media (prefers-reduced-motion: reduce) {
    &.error-state {
      animation: none;
      background: #fee2e2;
    }
  }
`

// Hook para detectar soporte WebP
const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState(false)
  
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }
    
    setSupportsWebP(checkWebPSupport())
  }, [])
  
  return supportsWebP
}

// Hook para Intersection Observer
const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01,
      ...options
    })
    
    observer.observe(element)
    
    return () => observer.unobserve(element)
  }, [elementRef, options])
  
  return isIntersecting
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  loading = 'lazy',
  quality = 85,
  priority = false,
  onLoad,
  onError
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority || loading === 'eager')
  
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const supportsWebP = useWebPSupport()
  const isVisible = useIntersectionObserver(containerRef)
  
  // Determinar la mejor fuente de imagen
  const getBestImageSrc = () => {
    if (supportsWebP && webpSrc) {
      return webpSrc
    }
    return src
  }
  
  // Activar carga cuando sea visible (lazy loading)
  useEffect(() => {
    if (isVisible && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isVisible, shouldLoad])
  
  // Manejar carga de imagen
  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }
  
  const handleError = () => {
    setError(true)
    onError?.()
  }
  
  // Calcular aspect ratio
  const aspectRatio = width && height ? width / height : undefined
  
  // Preload crítico para imágenes importantes
  useEffect(() => {
    if (priority && shouldLoad) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = getBestImageSrc()
      link.as = 'image'
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [priority, shouldLoad, getBestImageSrc])
  
  return (
    <ImageContainer
      ref={containerRef}
      className={`${className || ''} ${loaded ? 'loaded' : 'loading'}`}
      $aspectRatio={aspectRatio}
    >
      {shouldLoad && !error ? (
        <picture>
          {/* WebP source para navegadores compatibles */}
          {webpSrc && (
            <source
              srcSet={webpSrc}
              type="image/webp"
              sizes={sizes}
            />
          )}
          
          {/* Fallback JPG/PNG */}
          <StyledImage
            ref={imageRef}
            src={getBestImageSrc()}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={loading}
            decoding="async"
            data-lazy={!priority}
            data-loaded={loaded}
            $loaded={loaded}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      ) : error ? (
        <PlaceholderSvg className="error-state">
          {/* Skeleton loader */}
          <div>Cargando...</div>
        </PlaceholderSvg>
      ) : (
        <PlaceholderSvg>
          {/* Skeleton loader */}
          <div>Cargando...</div>
        </PlaceholderSvg>
      )}
    </ImageContainer>
  )
}

// Componente de galería optimizada
interface OptimizedGalleryProps {
  images: Array<{
    src: string
    webpSrc?: string
    alt: string
    width?: number
    height?: number
  }>
  columns?: number
  gap?: string
  className?: string
}

const GalleryContainer = styled.div<{ $columns: number; $gap: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  gap: ${props => props.$gap};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.min(props.$columns, 2)}, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const OptimizedGallery: React.FC<OptimizedGalleryProps> = ({
  images,
  columns = 3,
  gap = '1rem',
  className
}) => {
  return (
    <GalleryContainer
      className={className}
      $columns={columns}
      $gap={gap}
    >
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image.src}
          webpSrc={image.webpSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={index < 4 ? 'eager' : 'lazy'} // Primeras 4 imágenes eager
          priority={index < 2} // Primeras 2 con priority
        />
      ))}
    </GalleryContainer>
  )
}

export default OptimizedImage 
import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLazyVideo } from '../utils/lazy-loading-system'
import { useTheme2025 } from '../utils/theme-context-2025'
import { FiPlay, FiLoader } from 'react-icons/fi'

interface OptimizedVideoProps {
  src: string
  id: string
  poster?: string
  className?: string
  priority?: 'low' | 'normal' | 'high' | 'critical'
  showControls?: boolean
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'ultra-wide'
  onError?: () => void
}

// 🎬 Container adaptativo según aspect ratio
const VideoContainer = styled.div<{ 
  $aspectRatio: string;
  $theme: any;
  $designSystem: any;
}>`
  position: relative;
  width: 100%;
  background: ${props => props.$theme.colors.bg.secondary};
  border-radius: ${props => props.$designSystem.radius.lg};
  overflow: hidden;
  
  /* Aspect ratios optimizados */
  aspect-ratio: ${props => {
    switch (props.$aspectRatio) {
      case 'portrait': return '9 / 16'
      case 'square': return '1 / 1'
      case 'ultra-wide': return '21 / 9'
      case 'landscape':
      default: return '16 / 9'
    }
  }};
  
  /* Optimizaciones de rendering */
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    border-radius: ${props => props.$designSystem.radius.md};
  }
`

// 🎥 Video element optimizado
const Video = styled.video<{ $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  
  /* Suavizado para mejor calidad visual */
  filter: brightness(1.02) contrast(1.05);
  
  /* Optimizaciones de performance */
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  /* Estados del video */
  &[data-loading="true"] {
    opacity: 0;
    transition: opacity ${props => props.$designSystem.animation.duration.normal} ease;
  }
  
  &[data-loaded="true"] {
    opacity: 1;
  }
`

// 🔄 Loading placeholder
const LoadingPlaceholder = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem.spacing[3]};
  background: linear-gradient(135deg, 
    ${props => props.$theme.colors.bg.secondary} 0%, 
    ${props => props.$theme.colors.bg.tertiary} 100%
  );
  color: ${props => props.$theme.colors.text.secondary};
  transition: opacity ${props => props.$designSystem.animation.duration.normal} ease;
  
  &[data-hidden="true"] {
    opacity: 0;
    pointer-events: none;
  }
  
  .loading-icon {
    animation: spin 1s linear infinite;
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
  
  .loading-text {
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
  }
`

// ▶️ Play button overlay (para modo manual)
const PlayButton = styled.button<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  &[data-hidden="true"] {
    opacity: 0;
    pointer-events: none;
  }
`

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  id,
  poster,
  className,
  priority = 'normal',
  showControls = false,
  aspectRatio = 'landscape',
  onError
}) => {
  const { theme, designSystem } = useTheme2025()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(!showControls)

  // 🎯 Configuración optimizada según prioridad
  const videoConfig = {
    threshold: priority === 'critical' ? [0.2, 0.5, 0.8] : [0.1, 0.3, 0.5],
    rootMargin: priority === 'critical' ? '100px 0px' : '50px 0px',
    priority,
    quality: priority === 'critical' ? 'high' as const : 'medium' as const,
    autoplay: !showControls
  }

  // 🎥 Aplicar lazy loading
  useLazyVideo(videoRef.current, id, videoConfig)

  // 📡 Manejar eventos del video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      video.setAttribute('data-loaded', 'true')
      video.removeAttribute('data-loading')
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setShowPlayButton(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
      if (!showControls) setShowPlayButton(true)
    }

    const handleError = () => {
      onError?.()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [showControls, onError])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (video) {
      video.play().catch(console.warn)
    }
  }

  return (
    <VideoContainer 
      $aspectRatio={aspectRatio}
      $theme={theme}
      $designSystem={designSystem}
      className={className}
    >
      <Video
        ref={videoRef}
        $designSystem={designSystem}
        data-video-id={id}
        data-loading="true"
        poster={poster}
        controls={showControls}
        preload="none"
        onError={onError}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento video.
      </Video>

      {/* Loading placeholder */}
      <LoadingPlaceholder 
        $theme={theme} 
        $designSystem={designSystem}
        data-hidden={isLoaded.toString()}
      >
        <FiLoader className="loading-icon" size={24} />
        <span className="loading-text">Cargando video...</span>
      </LoadingPlaceholder>

      {/* Play button para modo manual */}
      {showPlayButton && (
        <PlayButton
          $theme={theme}
          $designSystem={designSystem}
          onClick={handlePlayClick}
          data-hidden={(!isLoaded || isPlaying).toString()}
          aria-label="Reproducir video"
        >
          <FiPlay size={24} />
        </PlayButton>
      )}
    </VideoContainer>
  )
}

export default OptimizedVideo 
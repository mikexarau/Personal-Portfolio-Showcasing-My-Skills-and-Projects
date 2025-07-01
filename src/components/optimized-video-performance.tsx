import React, { useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🎯 **SOLUCIÓN 1: VIDEO CONTAINER CON MAX-WIDTH RESPONSIVE**
const OptimizedVideoContainer = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
}>`
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
  
  /* 🎨 SHADOW OPTIMIZADA SIN REFLOWS */
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.1),
    0 8px 20px -5px rgba(0, 0, 0, 0.04);
  
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.15),
      0 12px 30px -5px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 768px) {
    border-radius: ${props => props.$designSystem.radius.lg};
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    border-radius: ${props => props.$designSystem.radius.md};
    max-width: 95vw !important;
  }
`

// 🎥 **SOLUCIÓN 2: VIDEO ELEMENT CON HARDWARE ACCELERATION**
const OptimizedVideoElement = styled.video<{ $theme: any }>`
  width: 100%;
  height: auto; /* CRÍTICO: Mantiene aspect ratio original del video */
  display: block;
  
  /* 🎯 OPTIMIZACIÓN CRÍTICA - SIN RECORTAR CONTENIDO */
  object-fit: contain; /* Mantiene proporciones originales sin recortar */
  object-position: center;
  
  /* 🚀 HARDWARE ACCELERATION MÁXIMA */
  will-change: transform, opacity;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  
  /* 🎯 OPTIMIZACIÓN DE RENDERING */
  image-rendering: optimizeQuality;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* 🎮 OCULTAR CONTROLES */
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
  
  /* 🔇 SILENCIAR POR DEFECTO */
  &:focus {
    outline: none;
  }
`

// 🎯 **SOLUCIÓN 3: SIMPLE LOADING STATE**
const LoadingOverlay = styled.div<{ $theme: any; $isVisible: boolean }>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: ${props => props.$theme.colors.text.secondary};
  background: ${props => props.$theme.colors.bg.tertiary};
  min-height: 200px;
  border-radius: inherit;
  
  &::after {
    content: '';
    width: 24px;
    height: 24px;
    border: 2px solid ${props => props.$theme.colors.text.secondary}40;
    border-top: 2px solid ${props => props.$theme.colors.interactive.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// 🎯 **CLASE PRINCIPAL DE OPTIMIZACIÓN AVANZADA**
class VideoPerformanceManager {
  private static instance: VideoPerformanceManager
  private observer: IntersectionObserver | null = null
  private videoQueue: Map<string, HTMLVideoElement> = new Map()
  private playPromises: Map<string, Promise<void>> = new Map()
  private throttleTimeout: NodeJS.Timeout | null = null
  private isProcessing = false

  static getInstance(): VideoPerformanceManager {
    if (!VideoPerformanceManager.instance) {
      VideoPerformanceManager.instance = new VideoPerformanceManager()
    }
    return VideoPerformanceManager.instance
  }

  // 🚀 **THROTTLED INTERSECTION OBSERVER**
  private createOptimizedObserver() {
    return new IntersectionObserver(
      (entries) => {
        // 🎯 THROTTLING CRÍTICO - Evita múltiples llamadas rápidas
        if (this.isProcessing) return
        
        this.isProcessing = true
        
        // Procesar entradas en el próximo frame para no bloquear scroll
        requestAnimationFrame(() => {
          this.processVideoEntries(entries)
          
          // Reset después de un delay mínimo
          setTimeout(() => {
            this.isProcessing = false
          }, 50) // 50ms throttle para suavizar
        })
      },
      {
        threshold: [0, 0.1, 0.5], // Múltiples thresholds para mejor control
        rootMargin: '100px 0px 100px 0px', // Margen generoso para preload
      }
    )
  }

  // 🎯 **PROCESAMIENTO OPTIMIZADO DE VIDEOS**
  private async processVideoEntries(entries: IntersectionObserverEntry[]) {
    const batch: Array<{ video: HTMLVideoElement; action: 'play' | 'pause' }> = []
    
    entries.forEach((entry) => {
      const videoId = entry.target.getAttribute('data-video-id')
      const video = this.videoQueue.get(videoId || '')
      
      if (!video) return
      
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        batch.push({ video, action: 'play' })
      } else if (entry.intersectionRatio === 0) {
        batch.push({ video, action: 'pause' })
      }
    })
    
    // 🔄 Procesar batch de forma eficiente
    await this.processBatch(batch)
  }

  // ⚡ **BATCH PROCESSING PARA MEJOR PERFORMANCE**
  private async processBatch(batch: Array<{ video: HTMLVideoElement; action: 'play' | 'pause' }>) {
    const playPromises: Promise<void>[] = []
    
    batch.forEach(({ video, action }) => {
      const videoId = video.getAttribute('data-video-id') || ''
      
      if (action === 'play') {
        // Cancelar play anterior si existe
        const existingPromise = this.playPromises.get(videoId)
        if (existingPromise) {
          existingPromise.catch(() => {}) // Silenciar errores de cancelación
        }
        
        // Configurar video para reproducción optimizada
        video.currentTime = 0
        video.muted = true
        video.playsInline = true
        
        // Crear nueva promesa de play
        const playPromise = video.play().catch((error) => {
          console.log(`Video ${videoId} autoplay prevented:`, error.message)
        })
        
        this.playPromises.set(videoId, playPromise)
        playPromises.push(playPromise)
        
      } else if (action === 'pause') {
        // Pausar inmediatamente para liberar recursos
        video.pause()
        this.playPromises.delete(videoId)
      }
    })
    
    // Esperar a que se completen todas las reproducciones
    await Promise.allSettled(playPromises)
  }

  // 📝 **REGISTRAR VIDEO EN EL MANAGER**
  registerVideo(videoId: string, video: HTMLVideoElement) {
    this.videoQueue.set(videoId, video)
    
    // Crear observer si no existe
    if (!this.observer) {
      this.observer = this.createOptimizedObserver()
    }
    
    // Observar video con delay para asegurar montaje
    requestAnimationFrame(() => {
      if (this.observer && video.parentElement) {
        this.observer.observe(video)
      }
    })
  }

  // 🗑️ **LIMPIAR VIDEO DEL MANAGER**
  unregisterVideo(videoId: string) {
    const video = this.videoQueue.get(videoId)
    if (video) {
      // Pausar video
      video.pause()
      
      // Remover de observer
      if (this.observer) {
        this.observer.unobserve(video)
      }
      
      // Limpiar referencias
      this.videoQueue.delete(videoId)
      this.playPromises.delete(videoId)
    }
  }

  // 🧹 **CLEANUP COMPLETO**
  cleanup() {
    // Pausar todos los videos
    this.videoQueue.forEach((video) => {
      video.pause()
    })
    
    // Limpiar observer
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    
    // Limpiar maps
    this.videoQueue.clear()
    this.playPromises.clear()
    
    // Limpiar timeouts
    if (this.throttleTimeout) {
      clearTimeout(this.throttleTimeout)
    }
  }
}

// 📦 **INTERFAZ DEL COMPONENTE**
interface OptimizedVideoProps {
  src: string
  videoId: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
  onLoad?: () => void
  onError?: (error: any) => void
}

// 🎬 **COMPONENTE PRINCIPAL OPTIMIZADO**
const OptimizedVideoPerformance: React.FC<OptimizedVideoProps> = ({
  src,
  videoId,
  autoPlay = true,
  loop = true,
  muted = true,
  className,
  onLoad,
  onError
}) => {
  const { theme, designSystem } = useTheme2025()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const managerRef = useRef<VideoPerformanceManager>()

  // 🎯 Inicializar manager
  useEffect(() => {
    managerRef.current = VideoPerformanceManager.getInstance()
    return () => {
      if (managerRef.current) {
        managerRef.current.unregisterVideo(videoId)
      }
    }
  }, [videoId])

  // 📝 Registrar video cuando esté listo
  useEffect(() => {
    if (videoRef.current && managerRef.current) {
      const video = videoRef.current
      
      // Configurar atributos del video
      video.setAttribute('data-video-id', videoId)
      video.muted = muted
      video.playsInline = true
      video.loop = loop
      
      // Registrar en el manager
      managerRef.current.registerVideo(videoId, video)
      
      return () => {
        if (managerRef.current) {
          managerRef.current.unregisterVideo(videoId)
        }
      }
    }
  }, [videoId, muted, loop])

  // 🎯 Handlers optimizados
  const handleLoadedData = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback((error: any) => {
    setHasError(true)
    setIsLoading(false)
    onError?.(error)
  }, [onError])

  if (hasError) {
    return (
      <OptimizedVideoContainer 
        $theme={theme} 
        $designSystem={designSystem}
        className={className}
      >
        <LoadingOverlay $theme={theme} $isVisible={true}>
          ❌ Error cargando video
        </LoadingOverlay>
      </OptimizedVideoContainer>
    )
  }

  return (
    <OptimizedVideoContainer 
      $theme={theme} 
      $designSystem={designSystem}
      className={className}
    >
      {isLoading && (
        <LoadingOverlay $theme={theme} $isVisible={isLoading} />
      )}
      
      <OptimizedVideoElement
        ref={videoRef}
        $theme={theme}
        data-video-id={videoId}
        preload="metadata"
        muted={muted}
        playsInline
        loop={loop}
        onLoadedData={handleLoadedData}
        onError={handleError}
        aria-label={`Video ${videoId}`}
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src={src} type="video/mp4" />
      </OptimizedVideoElement>
    </OptimizedVideoContainer>
  )
}

export default OptimizedVideoPerformance
export { VideoPerformanceManager } 
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

// 🎯 **SOLUCIÓN 3: LOADING STATE CON DIMENSIONES CONSISTENTES**
const LoadingOverlay = styled.div<{ $theme: any; $isVisible: boolean }>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: ${props => props.$theme.colors.text.secondary};
  background: linear-gradient(
    90deg,
    ${props => props.$theme.colors.bg.tertiary} 25%,
    ${props => props.$theme.colors.bg.secondary} 50%,
    ${props => props.$theme.colors.bg.tertiary} 75%
  );
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  
  /* 🎯 DIMENSIONES CONSISTENTES CON VIDEO */
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* Ratio estándar para consistencia */
  min-height: 200px;
  max-height: 400px;
  
  border-radius: inherit;
  position: relative;
  
  &::before {
    content: '▶';
    font-size: clamp(24px, 4vw, 48px); /* Responsive play icon */
    color: ${props => props.$theme.colors.text.secondary}60;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  
  /* 🎯 SHIMMER EFFECT MÁS SUTIL */
  @keyframes shimmer {
    0% { background-position: -400% 0; }
    100% { background-position: 400% 0; }
  }
  
  /* 📱 MOBILE: Ajustes responsivos */
  @media (max-width: 768px) {
    min-height: 150px;
    max-height: 300px;
    
    &::before {
      font-size: 32px;
    }
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
  private isCarouselMode = false // Flag para detectar si estamos en modo carousel

  static getInstance(): VideoPerformanceManager {
    if (!VideoPerformanceManager.instance) {
      VideoPerformanceManager.instance = new VideoPerformanceManager()
    }
    return VideoPerformanceManager.instance
  }

  // 🎯 MÉTODO PARA MANEJAR VIDEOS DE CAROUSEL DIFERENTE
  setCarouselMode(enabled: boolean) {
    this.isCarouselMode = enabled
    if (enabled) {
      // En modo carousel, usamos settings más agresivos
      console.log('VideoPerformanceManager: Activando modo carousel')
    }
  }

  // 🚀 **SIMPLIFIED INTERSECTION OBSERVER**
  private createOptimizedObserver() {
    return new IntersectionObserver(
      (entries) => {
        // Procesar inmediatamente para mejor responsividad
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id')
          const video = this.videoQueue.get(videoId || '')
          
          if (!video) return
          
          if (entry.isIntersecting) {
            // Play inmediato cuando entra en viewport
            video.currentTime = 0
            video.play().catch(() => {
              // Silenciar errores de autoplay
            })
          } else {
            // Pause inmediato cuando sale del viewport
            video.pause()
          }
        })
      },
      {
        threshold: 0.3, // Threshold único más alto para mejor UX
        rootMargin: '50px 0px 50px 0px', // Margen reducido para mejor performance
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

  // 📝 **REGISTRAR VIDEO CON DETECCIÓN INTELIGENTE**
  registerVideo(videoId: string, video: HTMLVideoElement) {
    console.log(`Registrando video: ${videoId}`)
    this.videoQueue.set(videoId, video)
    
    // Crear observer si no existe
    if (!this.observer) {
      this.observer = this.createOptimizedObserver()
    }

    // 🎯 DETECCIÓN INMEDIATA PARA VIDEOS CACHED
    const performImmediateCheck = () => {
      if (!video.parentElement) {
        console.log(`Video ${videoId} no tiene parent - retrasando check`)
        return
      }
      
      const rect = video.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100
      
      console.log(`Video ${videoId} - Visible: ${isVisible}, ReadyState: ${video.readyState}`)
      
      // Si el video ya está listo y visible, reproducir inmediatamente
      if (isVisible && video.readyState >= 2) { // HAVE_CURRENT_DATA o superior
        console.log(`Video ${videoId} CACHED y visible - reproduciendo inmediatamente`)
        
        // Reset y play inmediato para videos cached
        video.currentTime = 0
        video.muted = true
        video.playsInline = true
        
        const playPromise = video.play().catch((error) => {
          console.log(`Video ${videoId} autoplay prevented:`, error)
        })
        
        this.playPromises.set(videoId, playPromise)
      }
      
      // Siempre observar para futuros cambios
      if (this.observer && video.parentElement) {
        this.observer.observe(video)
      }
    }

    // 🚀 MÚLTIPLES INTENTOS PARA ASEGURAR DETECCIÓN
    // Inmediato
    requestAnimationFrame(performImmediateCheck)
    
    // Backup después de 100ms
    setTimeout(performImmediateCheck, 100)
    
    // Backup final después de 300ms
    setTimeout(performImmediateCheck, 300)
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

// 🎬 **COMPONENTE PRINCIPAL OPTIMIZADO CON FIX DE RELOAD**
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
  const hasCheckedReadyState = useRef(false)

  // 🎯 Inicializar manager con reset en reload
  useEffect(() => {
    managerRef.current = VideoPerformanceManager.getInstance()
    
    // 🚀 RESET MANAGER EN RELOAD para evitar estado stale
    if (!hasCheckedReadyState.current) {
      managerRef.current.cleanup()
      managerRef.current = VideoPerformanceManager.getInstance()
    }
    
    return () => {
      if (managerRef.current) {
        managerRef.current.unregisterVideo(videoId)
      }
    }
  }, [videoId])

  // 🎯 FIX CRÍTICO: Verificar si video ya está listo después de reload
  useEffect(() => {
    if (videoRef.current && !hasCheckedReadyState.current) {
      const video = videoRef.current
      hasCheckedReadyState.current = true
      
      // Verificar si el video ya está listo (cached)
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA o superior
        console.log(`Video ${videoId} ya está listo (cached)`)
        setIsLoading(false)
        onLoad?.()
      }
    }
  }, [videoId, onLoad])

  // 🚀 TIMEOUT DE SEGURIDAD para casos edge
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (isLoading && videoRef.current) {
        const video = videoRef.current
        console.warn(`Video ${videoId} timeout - forzando carga`)
        
        // Verificar estado del video
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA o superior
          setIsLoading(false)
          onLoad?.()
        }
      }
    }, 3000) // 3 segundos de timeout

    return () => clearTimeout(safetyTimeout)
  }, [isLoading, videoId, onLoad])

  // 📝 Registrar video cuando esté listo
  useEffect(() => {
    if (videoRef.current && managerRef.current) {
      const video = videoRef.current
      
      // Configurar atributos del video
      video.setAttribute('data-video-id', videoId)
      video.muted = muted
      video.playsInline = true
      video.loop = loop
      
      // 🎯 DELAY PARA ASEGURAR DOM READY
      const registerTimeout = setTimeout(() => {
        if (managerRef.current && video.parentElement) {
          managerRef.current.registerVideo(videoId, video)
        }
      }, 100)
      
      return () => {
        clearTimeout(registerTimeout)
        if (managerRef.current) {
          managerRef.current.unregisterVideo(videoId)
        }
      }
    }
  }, [videoId, muted, loop])

  // 🎯 Handlers optimizados con mejor detección
  const handleLoadedData = useCallback(() => {
    console.log(`Video ${videoId} loaded data`)
    setIsLoading(false)
    onLoad?.()
  }, [videoId, onLoad])

  const handleCanPlay = useCallback(() => {
    console.log(`Video ${videoId} can play`)
    setIsLoading(false)
    onLoad?.()
  }, [videoId, onLoad])

  const handleError = useCallback((error: any) => {
    console.error(`Video ${videoId} error:`, error)
    setHasError(true)
    setIsLoading(false)
    onError?.(error)
  }, [videoId, onError])

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
        preload="auto"
        muted={muted}
        playsInline
        loop={loop}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlay}
        onLoadedMetadata={handleCanPlay}
        aria-label={`Video ${videoId}`}
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src={src} type="video/webm" />
        <source src={src} type="video/mp4" />
      </OptimizedVideoElement>
    </OptimizedVideoContainer>
  )
}

export default OptimizedVideoPerformance
export { VideoPerformanceManager } 
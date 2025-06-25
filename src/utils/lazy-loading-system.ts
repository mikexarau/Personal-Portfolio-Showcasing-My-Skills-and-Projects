import React from 'react'

/**
 * 🚀 SISTEMA AVANZADO DE LAZY LOADING 2025
 * 
 * Sistema inteligente para optimizar la carga de medios pesados:
 * - Videos con threshold dinámico
 * - Imágenes con preloading selectivo  
 * - Gestión de memoria automática
 * - Priorización de contenido crítico
 */

interface LazyMediaOptions {
  threshold?: number[]
  rootMargin?: string
  priority?: 'low' | 'normal' | 'high' | 'critical'
  preload?: boolean
  quality?: 'low' | 'medium' | 'high'
  autoplay?: boolean
}

interface MediaMetrics {
  loadTime: number
  fileSize: number
  renderTime: number
  viewportTime: number
}

class LazyLoadingSystem {
  private observers: Map<string, IntersectionObserver> = new Map()
  private videoRefs: Map<string, HTMLVideoElement> = new Map()
  private imageRefs: Map<string, HTMLImageElement> = new Map()
  private loadQueue: Map<string, () => void> = new Map()
  private metrics: Map<string, MediaMetrics> = new Map()
  private isVisible: Map<string, boolean> = new Map()

  // 🎯 Configuraciones optimizadas por tipo de contenido
  private static readonly CONFIGS = {
    CAROUSEL_VIDEO: {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '50px 0px',
      priority: 'high' as const,
      quality: 'medium' as const,
      autoplay: true
    },
    HERO_VIDEO: {
      threshold: [0.2, 0.5, 0.8],
      rootMargin: '100px 0px',
      priority: 'critical' as const,
      quality: 'high' as const,
      autoplay: true
    },
    THUMBNAIL_IMAGE: {
      threshold: [0.1],
      rootMargin: '200px 0px',
      priority: 'normal' as const,
      quality: 'medium' as const,
      preload: false
    },
    GALLERY_IMAGE: {
      threshold: [0.05],
      rootMargin: '300px 0px', 
      priority: 'low' as const,
      quality: 'high' as const,
      preload: false
    }
  }

  /**
   * 🎥 Observador inteligente para videos
   */
  observeVideo(
    element: HTMLVideoElement,
    id: string,
    options: LazyMediaOptions = LazyLoadingSystem.CONFIGS.CAROUSEL_VIDEO
  ) {
    if (!element || this.videoRefs.has(id)) return

    this.videoRefs.set(id, element)
    
    // Configurar video para óptimo rendimiento
    this.setupVideoElement(element, options)

    // Crear observer específico para este video
    const observer = new IntersectionObserver(
      (entries) => this.handleVideoIntersection(entries, id, options),
      {
        threshold: options.threshold || [0.1],
        rootMargin: options.rootMargin || '50px 0px'
      }
    )

    observer.observe(element)
    this.observers.set(`video-${id}`, observer)

    // Preload inmediato para contenido crítico
    if (options.priority === 'critical') {
      this.preloadVideo(element)
    }

    return () => this.unobserveVideo(id)
  }

  /**
   * 🖼️ Observador inteligente para imágenes
   */
  observeImage(
    element: HTMLImageElement,
    id: string,
    options: LazyMediaOptions = LazyLoadingSystem.CONFIGS.THUMBNAIL_IMAGE
  ) {
    if (!element || this.imageRefs.has(id)) return

    this.imageRefs.set(id, element)

    const observer = new IntersectionObserver(
      (entries) => this.handleImageIntersection(entries, id, options),
      {
        threshold: options.threshold || [0.1],
        rootMargin: options.rootMargin || '200px 0px'
      }
    )

    observer.observe(element)
    this.observers.set(`image-${id}`, observer)

    // Preload para contenido prioritario
    if (options.preload || options.priority === 'critical') {
      this.preloadImage(element)
    }

    return () => this.unobserveImage(id)
  }

  /**
   * 🎬 Manejo inteligente de intersección de videos
   */
  private handleVideoIntersection(
    entries: IntersectionObserverEntry[],
    id: string,
    options: LazyMediaOptions
  ) {
    entries.forEach(async (entry) => {
      const video = this.videoRefs.get(id)
      if (!video) return

      const isVisible = entry.isIntersecting
      const visibilityRatio = entry.intersectionRatio
      
      this.isVisible.set(id, isVisible)

      if (isVisible) {
        // 📊 Iniciar métricas
        const startTime = performance.now()
        
        try {
          // Configurar para autoplay si está habilitado
          if (options.autoplay) {
            video.muted = true
            video.loop = true
            video.playsInline = true
          }

          // Reproducir solo si el video está suficientemente visible
          if (visibilityRatio >= 0.3 && options.autoplay) {
            await this.playVideoSafely(video, id)
          }

          // 📊 Guardar métricas
          this.metrics.set(id, {
            ...this.metrics.get(id),
            loadTime: performance.now() - startTime,
            viewportTime: Date.now()
          } as MediaMetrics)

        } catch (error) {
          console.warn(`🎥 Error al reproducir video ${id}:`, error)
        }
      } else {
        // Pausar video al salir del viewport
        this.pauseVideoSafely(video, id)
      }
    })
  }

  /**
   * 🖼️ Manejo inteligente de intersección de imágenes  
   */
  private handleImageIntersection(
    entries: IntersectionObserverEntry[],
    id: string,
    options: LazyMediaOptions
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = this.imageRefs.get(id)
        if (image && !image.src && image.dataset.src) {
          this.loadImageSafely(image, id, options)
        }
      }
    })
  }

  /**
   * 🔧 Configuración óptima del elemento video
   */
  private setupVideoElement(element: HTMLVideoElement, options: LazyMediaOptions) {
    element.muted = true
    element.loop = true
    element.playsInline = true
    element.controls = false
    element.preload = options.priority === 'critical' ? 'auto' : 'none'
    
    // Optimizaciones de rendimiento
    element.style.willChange = 'transform'
    element.style.backfaceVisibility = 'hidden'
    element.style.transform = 'translateZ(0)'
  }

  /**
   * ▶️ Reproducción segura de video
   */
  private async playVideoSafely(video: HTMLVideoElement, id: string): Promise<void> {
    try {
      if (video.readyState >= 2) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
        }
      } else {
        return new Promise((resolve) => {
          const handleLoad = async () => {
            try {
              await video.play()
              resolve()
            } catch (error) {
              resolve() // No fallar silenciosamente
            }
          }
          video.addEventListener('loadeddata', handleLoad, { once: true })
          video.load()
        })
      }
    } catch (error) {
      console.warn(`🎥 Autoplay falló para video ${id}:`, error)
    }
  }

  /**
   * ⏸️ Pausa segura de video
   */
  private pauseVideoSafely(video: HTMLVideoElement, id: string) {
    try {
      if (!video.paused) {
        video.pause()
        video.currentTime = 0 // Reset para siguiente reproducción
      }
    } catch (error) {
      console.warn(`⏸️ Error al pausar video ${id}:`, error)
    }
  }

  /**
   * 🖼️ Carga segura de imagen
   */
  private loadImageSafely(
    image: HTMLImageElement,
    id: string,
    options: LazyMediaOptions
  ) {
    const startTime = performance.now()
    
    if (image.dataset.src) {
      image.src = image.dataset.src
      image.removeAttribute('data-src')
      
      image.onload = () => {
        this.metrics.set(id, {
          ...this.metrics.get(id),
          loadTime: performance.now() - startTime,
          viewportTime: Date.now()
        } as MediaMetrics)
      }
    }
  }

  /**
   * 🚀 Preload de video crítico
   */
  private preloadVideo(video: HTMLVideoElement) {
    if (video.preload !== 'auto') {
      video.preload = 'metadata'
      video.load()
    }
  }

  /**
   * 🚀 Preload de imagen crítica
   */
  private preloadImage(image: HTMLImageElement) {
    if (image.dataset.src && !image.src) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = image.dataset.src
      document.head.appendChild(link)
    }
  }

  /**
   * 🧹 Limpiar observer de video
   */
  private unobserveVideo(id: string) {
    const observer = this.observers.get(`video-${id}`)
    if (observer) {
      observer.disconnect()
      this.observers.delete(`video-${id}`)
    }

    const video = this.videoRefs.get(id)
    if (video) {
      this.pauseVideoSafely(video, id)
      this.videoRefs.delete(id)
    }

    this.isVisible.delete(id)
  }

  /**
   * 🧹 Limpiar observer de imagen
   */
  private unobserveImage(id: string) {
    const observer = this.observers.get(`image-${id}`)
    if (observer) {
      observer.disconnect()
      this.observers.delete(`image-${id}`)
    }

    this.imageRefs.delete(id)
  }

  /**
   * 🧹 Limpiar todos los observers
   */
  cleanup() {
    // Pausar todos los videos
    this.videoRefs.forEach((video) => {
      if (!video.paused) {
        video.pause()
      }
    })

    // Desconectar todos los observers
    this.observers.forEach((observer) => {
      observer.disconnect()
    })

    // Limpiar mapas
    this.observers.clear()
    this.videoRefs.clear()
    this.imageRefs.clear()
    this.loadQueue.clear()
    this.isVisible.clear()
  }

  /**
   * 📊 Obtener métricas de rendimiento
   */
  getMetrics(): Map<string, MediaMetrics> {
    return new Map(this.metrics)
  }

  /**
   * 🎯 Configuraciones predefinidas
   */
  static getConfigs() {
    return LazyLoadingSystem.CONFIGS
  }
}

// 🌟 Instancia singleton global
export const lazyLoadingSystem = new LazyLoadingSystem()

// 🎯 Hooks de React para usar el sistema
export const useLazyVideo = (
  element: HTMLVideoElement | null,
  id: string,
  options?: LazyMediaOptions
) => {
  React.useEffect(() => {
    if (!element || !id) return

    const cleanup = lazyLoadingSystem.observeVideo(element, id, options)
    return cleanup
  }, [element, id, options])
}

export const useLazyImage = (
  element: HTMLImageElement | null,
  id: string,
  options?: LazyMediaOptions
) => {
  React.useEffect(() => {
    if (!element || !id) return

    const cleanup = lazyLoadingSystem.observeImage(element, id, options)
    return cleanup
  }, [element, id, options])
}

// 🧹 Hook de cleanup global
export const useLazyLoadingCleanup = () => {
  React.useEffect(() => {
    return () => {
      lazyLoadingSystem.cleanup()
    }
  }, [])
}

export default lazyLoadingSystem 
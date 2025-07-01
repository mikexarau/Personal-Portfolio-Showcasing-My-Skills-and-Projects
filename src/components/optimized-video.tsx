import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLazyVideo } from '../utils/lazy-loading-system';
import { useTheme2025 } from '../utils/theme-context-2025';
import { FiPlay, FiLoader } from 'react-icons/fi';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  fallbackImage?: string;
  quality?: 'low' | 'medium' | 'high';
  onClick?: () => void;
}

/**
 * Componente de Video Optimizado para Web
 * 
 * Características:
 * - Lazy loading automático con Intersection Observer
 * - Múltiples formatos (WebM + MP4) para mejor compatibilidad
 * - Preload inteligente basado en conexión
 * - Fallback progresivo para conexiones lentas
 * - Indicador de carga visual
 * - Optimización de memoria
 */
export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  autoplay = false,
  muted = true,
  loop = false,
  controls = false,
  preload = 'metadata',
  onLoadStart,
  onLoadEnd,
  fallbackImage,
  quality = 'medium',
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar tipo de conexión para ajustar calidad
  const getConnectionAwarePreload = useCallback(() => {
    // @ts-ignore - Navigator.connection es experimental
    const connection = (navigator as any).connection;
    
    if (connection) {
      // Conexión lenta: solo metadata
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return 'metadata';
      }
      // Conexión rápida: auto
      if (connection.effectiveType === '4g') {
        return preload === 'auto' ? 'auto' : 'metadata';
      }
    }
    
    return preload;
  }, [preload]);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setIsLoading(true);
            onLoadStart?.();
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Precargar 50px antes de ser visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, onLoadStart]);

  // Obtener rutas de diferentes formatos y calidades
  const getVideoSources = useCallback((baseSrc: string) => {
    const basePath = baseSrc.replace('.mp4', '');
    const qualitySuffix = quality === 'low' ? '-low' : quality === 'high' ? '-high' : '';
    
    return [
      { 
        src: `${basePath}${qualitySuffix}.webm`, 
        type: 'video/webm; codecs="vp9,opus"',
        format: 'webm'
      },
      { 
        src: `${basePath}${qualitySuffix}.mp4`, 
        type: 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
        format: 'mp4'
      },
      // Fallback original
      { 
        src: baseSrc, 
        type: 'video/mp4',
        format: 'mp4-fallback'
      }
    ];
  }, [quality]);

  // Handlers de eventos de video
  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    setCanPlay(true);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoading(false);
    console.warn(`Error cargando video: ${src}`);
  }, [src]);

  const handleCanPlay = useCallback(() => {
    setCanPlay(true);
  }, []);

  const sources = getVideoSources(src);
  const connectionAwarePreload = getConnectionAwarePreload();

  // Renderizar imagen de fallback si hay error
  if (error && fallbackImage) {
    return (
      <div className={`${className} relative`} ref={containerRef}>
        <img 
          src={fallbackImage} 
          alt="Video no disponible"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-sm">Video no disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${className} relative ${onClick ? 'cursor-pointer' : ''}`} 
      ref={containerRef}
      onClick={onClick}
    >
      {/* Placeholder mientras carga */}
      {(!isVisible || isLoading) && (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600 text-sm">Cargando video...</span>
            </div>
          ) : (
            poster && (
              <img 
                src={poster} 
                alt="Vista previa del video"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )
          )}
        </div>
      )}

      {/* Video elemento */}
      {isVisible && (
        <video
          ref={videoRef}
          poster={poster}
          autoPlay={autoplay && canPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={connectionAwarePreload}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onCanPlay={handleCanPlay}
          className={`w-full h-auto transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        >
          {sources.map((source, index) => (
            <source 
              key={`${source.format}-${index}`} 
              src={source.src} 
              type={source.type} 
            />
          ))}
          
          {/* Mensaje de fallback */}
          <div className="p-4 bg-gray-100 text-center">
            <p className="text-gray-600">
              Tu navegador no soporta el elemento video.
            </p>
            {fallbackImage && (
              <img 
                src={fallbackImage} 
                alt="Imagen alternativa"
                className="mt-2 mx-auto max-w-full h-auto"
              />
            )}
          </div>
        </video>
      )}

      {/* Indicador de calidad */}
      {process.env.NODE_ENV === 'development' && isVisible && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {quality} | {connectionAwarePreload}
        </div>
      )}
    </div>
  );
};

/**
 * Hook para detectar soporte de formatos de video
 */
export const useVideoFormatSupport = () => {
  const [support, setSupport] = useState({
    webm: false,
    mp4: false,
    av1: false
  });

  useEffect(() => {
    const video = document.createElement('video');
    
    setSupport({
      webm: video.canPlayType('video/webm; codecs="vp9"') !== '',
      mp4: video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '',
      av1: video.canPlayType('video/mp4; codecs="av01"') !== ''
    });
  }, []);

  return support;
};

/**
 * Componente de Galería de Videos Optimizada
 */
interface VideoGalleryProps {
  videos: Array<{
    src: string;
    poster?: string;
    title?: string;
    description?: string;
  }>;
  className?: string;
  columns?: number;
}

export const OptimizedVideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  className = '',
  columns = 3
}) => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <div className={`grid gap-4 ${className}`} 
         style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {videos.map((video, index) => (
        <div key={index} className="relative group">
          <OptimizedVideo
            src={video.src}
            poster={video.poster}
            className="w-full"
            autoplay={false}
            controls={activeVideo === index}
            onClick={() => setActiveVideo(activeVideo === index ? null : index)}
          />
          
          {video.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold">{video.title}</h3>
              {video.description && (
                <p className="text-gray-300 text-sm mt-1">{video.description}</p>
              )}
            </div>
          )}
          
          {/* Overlay de play */}
          {activeVideo !== index && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptimizedVideo; 
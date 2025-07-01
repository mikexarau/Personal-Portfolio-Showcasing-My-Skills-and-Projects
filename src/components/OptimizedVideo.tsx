import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente de Video Optimizado para Web
 * - Carga lazy automática
 * - Múltiples formatos (WebM + MP4)
 * - Optimización de rendimiento
 */
export const OptimizedVideo = ({ 
  src, 
  poster, 
  className = '',
  autoplay = false,
  muted = true,
  loop = false,
  controls = false,
  preload = 'metadata'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  
  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Obtener rutas de diferentes formatos
  const getVideoSources = (baseSrc) => {
    const basePath = baseSrc.replace('.mp4', '');
    return [
      { src: `${basePath}.webm`, type: 'video/webm' },
      { src: baseSrc, type: 'video/mp4' }
    ];
  };
  
  const sources = getVideoSources(src);
  
  return (
    <div className={className} ref={videoRef}>
      {isVisible && (
        <video
          poster={poster}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          onLoadedData={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          Tu navegador no soporta video HTML5.
        </video>
      )}
    </div>
  );
};

export default OptimizedVideo;
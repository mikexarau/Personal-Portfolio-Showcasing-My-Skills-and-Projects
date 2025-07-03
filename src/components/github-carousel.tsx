import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { useLazyLoadingCleanup } from '../utils/lazy-loading-system'
import logger from '../utils/logger'
import { 
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaCalendarAlt,
  FaSpinner
} from 'react-icons/fa'
import { getCarouselRepositories, GitHubRepo } from '../utils/github-service'

// Animación de spin para loading
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

// Contenedor principal del carrusel
const CarouselContainer = styled.section<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100%;
  background: ${props => props.$theme.colors.bg.primary};
  overflow: hidden;
  padding: ${props => props.$designSystem.spacing[8]} 0 ${props => props.$designSystem.spacing[4]} 0;
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[6]} 0 ${props => props.$designSystem.spacing[2]} 0;
  }
`

const CarouselWrapper = styled.div<{ $designSystem: any }>`
  position: relative;
  width: 100%;
  max-width: 100vw;
`

const CarouselTrack = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $cardWidth: number;
  $totalCards: number;
}>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[4]};
  width: ${props => (props.$cardWidth + parseInt(props.$designSystem.spacing[4])) * props.$totalCards * 2}px;
  animation: slideLoopRight ${props => props.$totalCards * 3}s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
  
  /* Mejorar la performance del scroll */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  @keyframes slideLoopRight {
    100% {
      transform: translateX(0);
    }
    0% {
      transform: translateX(-${props => (props.$cardWidth + parseInt(props.$designSystem.spacing[4])) * props.$totalCards}px);
    }
  }
`

// 🎯 Wrapper para card + información debajo (estructura idéntica a featured-works)
const CarouselCard = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
  $cardWidth: number;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${props => props.$cardWidth}px;
  flex-shrink: 0;
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  
  /* 🔥 Hover effects solo en dispositivos con hover real (no móviles) */
  @media (hover: hover) and (pointer: fine) {
  &:hover {
    transform: translateY(-8px);
    
    .card-visual {
      .work-overlay {
        opacity: 1;
      }
      
      .work-content {
        transform: translateY(0);
        opacity: 1;
        }
      }
    }
  }
`

const CardVisual = styled.div<{ 
  $theme: any; 
  $designSystem: any; 
}>`
  display: block;
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: ${props => props.$designSystem.radius.xl};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  cursor: pointer;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    height: 200px;
  }
`

const CardInner = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.$designSystem.radius.xl};
  overflow: hidden;
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f5f5f5'};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  padding: ${props => props.$designSystem.spacing[6]};
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: ${props => props.$designSystem.spacing[4]};
  }
  
  .repo-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${props => props.$designSystem.spacing[3]};
  }

  .repo-name {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale.lg};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$theme.colors.text.primary};
    margin: 0;
    line-height: ${props => props.$designSystem.typography.leading.tight};
  }

  .repo-links {
    display: flex;
    gap: ${props => props.$designSystem.spacing[2]};
    
    a {
      color: ${props => props.$theme.colors.text.secondary};
      transition: color ${props => props.$designSystem.animation.duration.fast} ease;
      
      &:hover {
        color: ${props => props.$theme.colors.interactive.primary};
      }
    }
  }

  .repo-description {
    font-family: ${props => props.$designSystem.typography.fonts.body};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: ${props => props.$theme.colors.text.secondary};
    margin: 0 0 ${props => props.$designSystem.spacing[4]} 0;
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    flex-grow: 1;
    
    /* Limitar a máximo 3 líneas en contenido base */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .repo-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.$designSystem.spacing[2]};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    
    .tech-tag {
      font-size: ${props => props.$designSystem.typography.scale.xs};
      font-weight: ${props => props.$designSystem.typography.weight.medium};
      color: ${props => props.$theme.colors.interactive.primary};
      background: ${props => props.$theme.colors.interactive.primary}20;
      padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[2]};
      border-radius: ${props => props.$designSystem.radius.sm};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .repo-language {
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    color: ${props => props.$theme.colors.interactive.primary};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }

  .repo-stats {
    display: flex;
    gap: ${props => props.$designSystem.spacing[4]};
    font-size: ${props => props.$designSystem.typography.scale.xs};
    color: ${props => props.$theme.colors.text.tertiary};
    
    .stat {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[1]};
      
      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`

const WorkOverlay = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$isDark ? '#1a1a1a' : '#000000'};
  border-radius: ${props => props.$designSystem.radius.xl};
  opacity: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 2;
`

const WorkContent = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${props => props.$designSystem.spacing[4]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 3;
  color: #ffffff;
  overflow: hidden;
  
  .work-header {
    flex-shrink: 0;
    width: 100%;
  }

  .work-title {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale.lg};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: white;
    margin: 0 0 ${props => props.$designSystem.spacing[1]} 0;
    line-height: ${props => props.$designSystem.typography.leading.tight};
    letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
    
    /* Limitar título a máximo 2 líneas */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      font-size: ${props => props.$designSystem.typography.scale.base};
      -webkit-line-clamp: 1;
    }
  }

  .work-subtitle {
    font-family: ${props => props.$designSystem.typography.fonts.body};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      font-size: ${props => props.$designSystem.typography.scale.xs};
    }
  }

  .work-body {
    flex: 1;
    margin: ${props => props.$designSystem.spacing[4]} 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      margin: ${props => props.$designSystem.spacing[3]} 0;
    }
  }

  .work-description {
    font-family: ${props => props.$designSystem.typography.fonts.body};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    
    /* Limitar descripción a 2 líneas para composición más armónica */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      font-size: ${props => props.$designSystem.typography.scale.xs};
      -webkit-line-clamp: 2;
    }
  }

  .work-footer {
    flex-shrink: 0;
    margin-top: ${props => props.$designSystem.spacing[2]};
    width: 100%;
  }

  .work-button {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[4]};
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
    color: white;
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    text-decoration: none;
    transition: all ${props => props.$designSystem.animation.duration.normal} ease;
    cursor: pointer;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      font-size: ${props => props.$designSystem.typography.scale.xs};
      padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[3]};
      
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`

const LoadingCard = styled.div<{ $theme: any; $designSystem: any; $cardWidth: number }>`
  width: ${props => props.$cardWidth}px;
  flex-shrink: 0;
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: ${props => props.$designSystem.spacing[6]};
  margin: 0;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem.spacing[4]};

  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: ${props => props.$designSystem.spacing[4]};
    height: 200px;
  }

  .loading-icon {
    animation: ${spin} 1s linear infinite;
    color: ${props => props.$theme.colors.interactive.primary};
    font-size: 24px;
  }
  
  .loading-text {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    color: ${props => props.$theme.colors.text.secondary};
    font-size: ${props => props.$designSystem.typography.scale.base};
  }
`

const GitHubCarousel = ({ className }: { className?: string }) => {
  const { theme, designSystem, isDark } = useTheme2025()
  const [repositories, setRepositories] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [cardWidth, setCardWidth] = useState(340)
  const containerRef = useRef<HTMLElement>(null)
  
  // 🧹 Usar cleanup automático del sistema de lazy loading
  useLazyLoadingCleanup()

  // Duplicar repositories para efecto loop infinito
  const allRepositories = [...repositories, ...repositories]

  // Calcular tamaño de card responsive
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 260 // móvil
      if (window.innerWidth < 1024) return 300 // tablet
      return 340 // desktop
    }
    return 340
  }

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cargar repositorios desde servicio local optimizado
  useEffect(() => {
    const timer = setTimeout(() => {
      const carouselRepos = getCarouselRepositories()
      setRepositories(carouselRepos)
      setLoading(false)
      
      logger.info(`Cargados ${carouselRepos.length} repositorios para carousel`, 'GitHub Carousel')
    }, 800) // Carga más rápida para carousel

    return () => clearTimeout(timer)
  }, [])

  const handleRepoClick = (repo: GitHubRepo) => {
    window.open(repo.html_url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <CarouselContainer $theme={theme} $designSystem={designSystem} className={className}>
        <CarouselWrapper $designSystem={designSystem}>
          <CarouselTrack $theme={theme} $designSystem={designSystem} $cardWidth={cardWidth} $totalCards={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingCard key={index} $theme={theme} $designSystem={designSystem} $cardWidth={cardWidth}>
                <FaSpinner className="loading-icon" />
                <p className="loading-text">Cargando desde GitHub...</p>
              </LoadingCard>
            ))}
          </CarouselTrack>
        </CarouselWrapper>
      </CarouselContainer>
    )
  }

  if (repositories.length === 0) {
    return null
  }

  return (
    <CarouselContainer 
      ref={containerRef} 
      $theme={theme} 
      $designSystem={designSystem} 
      className={className}
    >
      <CarouselWrapper $designSystem={designSystem}>
        <CarouselTrack 
          $theme={theme} 
          $designSystem={designSystem} 
          $cardWidth={cardWidth} 
          $totalCards={repositories.length}
        >
          {allRepositories.map((repo, index) => (
            <CarouselCard
              key={`${repo.id}-${index}`}
              $theme={theme}
              $designSystem={designSystem}
              $cardWidth={cardWidth}
            >
              <CardVisual
                className="card-visual"
                onClick={() => handleRepoClick(repo)}
                $theme={theme}
                $designSystem={designSystem}
                data-cursor="external"
              >
                <CardInner $theme={theme} $designSystem={designSystem}>
                  {/* Contenido base siempre visible */}
                  <div className="repo-header">
                    <h3 className="repo-name">{repo.name}</h3>
                    <div className="repo-links">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Ver en GitHub"
                        data-cursor="external"
                      >
                        <FaGithub />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Ver demo"
                          data-cursor="external"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 ? (
                    <div className="repo-technologies">
                      {repo.topics.slice(0, 4).map((topic: string, index: number) => (
                        <span key={`${repo.id}-${index}-topic`} className="tech-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : repo.language && (
                    <div className="repo-language">
                      {repo.language}
                    </div>
                  )}
                  
                  <div className="repo-stats">
                    <div className="stat">
                      <FaStar />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="stat">
                      <FaCodeBranch />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="stat">
                      <FaCalendarAlt />
                      <span>{new Date(repo.updated_at).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </CardInner>

                {/* Overlay */}
                <WorkOverlay 
                  className="work-overlay" 
                  $theme={theme} 
                  $designSystem={designSystem}
                  $isDark={isDark}
                />
                
                {/* Contenido que aparece en hover - similar a trabajos destacados */}
                <WorkContent 
                  className="work-content" 
                  $theme={theme} 
                  $designSystem={designSystem}
                >
                  <div className="work-header">
                    <h3 className="work-title">{repo.name}</h3>
                    
                    <p className="work-subtitle">
                      {repo.language || 'Open Source'} • {new Date(repo.updated_at).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div className="work-body">
                    <p className="work-description">
                      {repo.description ? 
                        (repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description) :
                        'Proyecto de desarrollo experimental con tecnologías modernas.'
                      }
                    </p>
                  </div>
                  
                  <div className="work-footer">
                    <div className="work-button">
                      Ver en GitHub
                      <FaExternalLinkAlt size={14} />
                    </div>
                  </div>
                </WorkContent>
              </CardVisual>

            </CarouselCard>
          ))}
        </CarouselTrack>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default GitHubCarousel
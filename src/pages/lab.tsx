import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import logger from '../utils/logger'
import { 
  PageHeader, 
  ModernSection,
  ModernCard
} from '../components/ui-components'
import { 
  FaGithub,
  FaFlask,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaCalendarPlus,
  FaCalendarAlt
} from 'react-icons/fa'
import { getLabRepositories, getRepositoryStats, GitHubRepo } from '../utils/github-service'

// Animaciones
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

// Contenedores
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const ProjectsSection = styled.section<{ $theme: any; $designSystem: any }>`
  padding: 0rem 0rem 4rem 0rem;
  
  .loading-state, .error-state {
    text-align: center;
    padding: 4rem 0;
    
    .icon {
      font-size: 3rem;
      color: ${props => props.$theme.colors.interactive?.primary || props.$theme.colors.primary};
      margin-bottom: 1.5rem;
      
      &.spinning {
        animation: ${spin} 1s linear infinite;
      }
    }
    
    h3 {
      color: ${props => props.$theme.colors.text?.primary || props.$theme.colors.text.primary};
      margin-bottom: 1rem;
      font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
    }
    
    p {
      color: ${props => props.$theme.colors.text?.secondary || props.$theme.colors.text.primary};
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      
      &.note {
        font-size: 0.875rem;
        color: ${props => props.$theme.colors.text?.tertiary || props.$theme.colors.text.primaryLight};
        margin-top: 1rem;
        font-style: italic;
      }
    }
  }
`

const ProjectsGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  }
`

const ProjectCard = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: ${props => props.$designSystem.spacing[6]};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.$theme.colors.interactive.primary}50;
  }
  animation: ${fadeInUp} 0.6s ease-out;
  height: fit-content;
  
  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    
    .project-title {
      font-size: ${props => props.$designSystem.typography.scale.lg};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      color: ${props => props.$theme.colors.text.primary};
      font-family: ${props => props.$designSystem.typography.fonts.display};
      line-height: ${props => props.$designSystem.typography.leading.tight};
      margin: 0;
      flex: 1;
      margin-right: ${props => props.$designSystem.spacing[3]};
      
      /* Truncar títulos largos */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .project-links {
      display: flex;
      gap: ${props => props.$designSystem.spacing[2]};
      flex-shrink: 0;
      
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid ${props => props.$theme.colors.border.primary};
        border-radius: ${props => props.$designSystem.radius.md};
        color: ${props => props.$theme.colors.text.tertiary};
        transition: all ${props => props.$designSystem.animation.duration.fast} ease;
        background: ${props => props.$theme.colors.bg.primaryDark};
        
        &:hover {
          color: ${props => props.$theme.colors.interactive.primary};
          background: ${props => props.$theme.colors.interactive.primary}15;
          border-color: ${props => props.$theme.colors.interactive.primary}50;
          transform: translateY(-1px);
        }
        
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  
  .project-description {
    color: ${props => props.$theme.colors.text.secondary};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    
    /* Limitar descripción a 3 líneas */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .project-language {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    background: ${props => props.$theme.colors.interactive.primary}15;
    color: ${props => props.$theme.colors.interactive.primary};
    padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[3]};
    border-radius: ${props => props.$designSystem.radius.full};
    font-size: ${props => props.$designSystem.typography.scale.xs};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    border: 1px solid ${props => props.$theme.colors.interactive.primary}30;
    text-transform: uppercase;
    letter-spacing: ${props => props.$designSystem.typography.tracking.wide};
    
    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  .project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.$designSystem.spacing[2]};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    
    .tech-tag {
      background: ${props => props.$theme.colors.interactive.primary}15;
      color: ${props => props.$theme.colors.interactive.primary};
      padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[2]};
      border-radius: ${props => props.$designSystem.radius.full};
      font-size: ${props => props.$designSystem.typography.scale['2xs'] || '0.625rem'};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      text-transform: uppercase;
      letter-spacing: ${props => props.$designSystem.typography.tracking.wide};
      border: 1px solid ${props => props.$theme.colors.interactive.primary}30;
      transition: all ${props => props.$designSystem.animation.duration.fast} ease;
      
      &:first-child {
        background: ${props => props.$theme.colors.interactive.primary};
        color: ${props => props.$theme.colors.text.inverse};
        border-color: ${props => props.$theme.colors.interactive.primary};
      }
      
      &:hover {
        background: ${props => props.$theme.colors.interactive.primary}25;
        transform: translateY(-1px);
      }
    }
  }
  
  .project-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.$designSystem.spacing[3]};
    font-size: ${props => props.$designSystem.typography.scale.xs};
    border-top: 1px solid ${props => props.$theme.colors.border.secondary};
    padding-top: ${props => props.$designSystem.spacing[4]};
    margin-top: auto;
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: ${props => props.$designSystem.spacing[2]};
    }
    
    .stat {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[2]};
      color: ${props => props.$theme.colors.text.tertiary};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      font-weight: ${props => props.$designSystem.typography.weight.medium};
      
      &.date-created, &.date-updated {
        grid-column: span 2;
        flex-direction: column;
        align-items: flex-start;
        gap: ${props => props.$designSystem.spacing[1]};
        
        @media (max-width: 480px) {
          grid-column: span 1;
        }
        
        .date-label {
          font-weight: ${props => props.$designSystem.typography.weight.semibold};
          color: ${props => props.$theme.colors.text.secondary};
          display: flex;
          align-items: center;
          gap: ${props => props.$designSystem.spacing[1]};
        }
      }
      
      svg {
        color: ${props => props.$theme.colors.interactive.primary};
        width: 14px;
        height: 14px;
      }
    }
  }
`



const Lab: React.FC = () => {
  const { theme, designSystem } = useTheme2025()
  const [repositories, setRepositories] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // Simular carga para mantener la experiencia de usuario
    const timer = setTimeout(() => {
      const labRepos = getLabRepositories()
      const repoStats = getRepositoryStats()
      
      setRepositories(labRepos)
      setStats(repoStats)
      setLoading(false)
      
      logger.info(`Cargados ${labRepos.length} repositorios desde servicio local`, 'GitHub Service')
    }, 1200) // Tiempo reducido para mejor UX

    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout2025>
      <SEO 
        title="Lab | Proyectos Open Source - Miquel Xarau"
        desc="Proyectos de código abierto y experimentación técnica. Desarrollo de herramientas, librerías y aplicaciones."
      />
      
      <PageHeader
        title='Proyectos <span class="highlight">Open Source</span>'
        subtitle="Desarrollo de herramientas, librerías y aplicaciones experimentales. Código abierto y documentación técnica."
      />
      
      <Container>
                {stats && (
          <div style={{ 
            marginBottom: designSystem.spacing[8],
            marginTop: `-${designSystem.spacing[4]}`,
            padding: designSystem.spacing[5],
            background: theme.colors.bg.secondary,
            borderRadius: designSystem.radius.lg,
            border: `1px solid ${theme.colors.border.secondary}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Header compacto con estadísticas integradas */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: designSystem.spacing[4]
            }}>
              {/* Título y fecha */}
              <div style={{ minWidth: '140px' }}>
                <h2 style={{
                  fontSize: designSystem.typography.scale.lg,
                  fontWeight: designSystem.typography.weight.semibold,
                  color: theme.colors.text.primary,
                  margin: 0,
                  marginBottom: designSystem.spacing[1]
                }}>
                  GitHub Stats
                </h2>
                <p style={{
                  color: theme.colors.text.secondary,
                  margin: 0,
                  fontSize: designSystem.typography.scale.xs
                }}>
                  Actualizado: {new Date(stats.lastUpdated).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
              
              {/* Estadísticas en línea */}
              <div style={{
                display: 'flex',
                gap: designSystem.spacing[6],
                alignItems: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: designSystem.typography.scale.xl, 
                    fontWeight: designSystem.typography.weight.bold,
                    color: theme.colors.interactive.primary,
                    lineHeight: 1
                  }}>
                    {stats.totalRepositories}
                  </div>
                  <div style={{ 
                    color: theme.colors.text.secondary,
                    fontSize: designSystem.typography.scale.xs,
                    fontWeight: designSystem.typography.weight.medium,
                    marginTop: designSystem.spacing[1]
                  }}>
                    Repos
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: designSystem.typography.scale.xl, 
                    fontWeight: designSystem.typography.weight.bold,
                    color: theme.colors.interactive.primary,
                    lineHeight: 1
                  }}>
                    {stats.totalStars}
                  </div>
                  <div style={{ 
                    color: theme.colors.text.secondary,
                    fontSize: designSystem.typography.scale.xs,
                    fontWeight: designSystem.typography.weight.medium,
                    marginTop: designSystem.spacing[1]
                  }}>
                    Stars
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: designSystem.typography.scale.xl, 
                    fontWeight: designSystem.typography.weight.bold,
                    color: theme.colors.interactive.primary,
                    lineHeight: 1
                  }}>
                    {stats.totalTechnologies}
                  </div>
                  <div style={{ 
                    color: theme.colors.text.secondary,
                    fontSize: designSystem.typography.scale.xs,
                    fontWeight: designSystem.typography.weight.medium,
                    marginTop: designSystem.spacing[1]
                  }}>
                    Techs
                  </div>
                </div>
              </div>
              
              {/* CTA GitHub minimalista */}
              <a
                href="https://github.com/mikexarau"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: designSystem.spacing[2],
                  padding: `${designSystem.spacing[2]} ${designSystem.spacing[4]}`,
                  background: 'transparent',
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  borderRadius: designSystem.radius.md,
                  fontWeight: designSystem.typography.weight.medium,
                  fontSize: designSystem.typography.scale.sm,
                  border: `1px solid ${theme.colors.border.secondary}`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  minWidth: '120px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.interactive.primary
                  e.currentTarget.style.color = theme.colors.interactive.primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.secondary
                  e.currentTarget.style.color = theme.colors.text.secondary
                }}
              >
                <FaGithub style={{ fontSize: '14px' }} />
                Ver GitHub
              </a>
            </div>
          </div>
        )}
        
        <ProjectsSection $theme={theme} $designSystem={designSystem}>
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="icon spinning" />
              <h3>Cargando proyectos de innovación...</h3>
              <p>Recuperando información actualizada de repositorios desde servicio local optimizado</p>
            </div>
          ) : repositories.length === 0 ? (
            <div className="error-state">
              <FaExclamationTriangle className="icon" />
              <h3>No hay repositorios disponibles</h3>
              <p>Temporalmente no hay proyectos para mostrar</p>
            </div>
          ) : (
            <ProjectsGrid $designSystem={designSystem}>
              {repositories.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  <div className="project-header">
                    <h3 className="project-title">{repo.name}</h3>
                    <div className="project-links">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver en GitHub"
                      >
                        <FaGithub />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="project-description">
                    {repo.description || 'Proyecto de desarrollo experimental con tecnologías modernas.'}
                  </p>
                  
                  {repo.topics && repo.topics.length > 0 ? (
                    <div className="project-technologies">
                      {repo.topics.slice(0, 6).map((topic: string, index: number) => (
                        <span key={`${repo.id}-${index}-topic`} className="tech-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : repo.language && (
                    <div className="project-language">
                      {repo.language}
                    </div>
                  )}
                  
                  <div className="project-stats">
                    <div className="stat">
                      <FaStar />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="stat">
                      <FaCodeBranch />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="stat date-created">
                      <FaCalendarPlus />
                      <div>
                        <span className="date-label">Creado:</span>
                        {formatDate(repo.created_at)}
                      </div>
                    </div>
                    <div className="stat date-updated">
                      <FaCalendarAlt />
                      <div>
                        <span className="date-label">Actualizado:</span>
                        {formatDate(repo.updated_at)}
                      </div>
                    </div>
                  </div>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          )}
        </ProjectsSection>
      </Container>
    </Layout2025>
  )
}

export default Lab 
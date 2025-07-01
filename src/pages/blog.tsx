import React from 'react'
import styled from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  PageHeader 
} from '../components/ui-components'
import { 
  FaBrain,
  FaShieldAlt,
  FaCode,
  FaLock,
  FaNetworkWired,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaArrowRight
} from 'react-icons/fa'
import { SiEthereum } from 'react-icons/si'

const Container = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: 768px) {
    padding: 0 ${props => props.$designSystem.spacing[4]};
  }
`

const BlogGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.$designSystem.spacing[8]};
  margin-bottom: ${props => props.$designSystem.spacing[12]};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[6]};
  }
`

const BlogCard = styled.article<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border-radius: ${props => props.$designSystem.radius.lg};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    border-color: ${props => props.$theme.colors.interactive.primary}50;
    text-decoration: none;
    color: inherit;
  }
  
  &:visited {
    color: inherit;
    text-decoration: none;
  }
  
  .card-header {
    padding: ${props => props.$designSystem.spacing[8]} ${props => props.$designSystem.spacing[6]} ${props => props.$designSystem.spacing[6]};
    background: linear-gradient(
      135deg, 
      ${props => props.$theme.colors.bg.tertiary} 0%, 
      ${props => props.$theme.colors.bg.secondary} 100%
    );
    
    .category {
      display: inline-flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[2]};
      padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[3]};
      border-radius: ${props => props.$designSystem.radius.full};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      font-size: ${props => props.$designSystem.typography.scale.xs};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      margin-bottom: ${props => props.$designSystem.spacing[4]};
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      
      &.ai {
        background: var(--color-purple);
      }
      
      &.blockchain {
        background: var(--color-blue);
      }
      
      &.security {
        background: var(--color-rose);
      }
      
      &.tech {
        background: var(--color-emerald);
      }
    }
    
    h3 {
      font-size: ${props => props.$designSystem.typography.scale['2xl']};
      font-weight: ${props => props.$designSystem.typography.weight.bold};
      color: ${props => props.$theme.colors.text.primary};
      margin: 0 0 ${props => props.$designSystem.spacing[3]} 0;
      line-height: ${props => props.$designSystem.typography.leading.tight};
      font-family: ${props => props.$designSystem.typography.fonts.display};
      letter-spacing: -0.025em;
      
      @media (max-width: 768px) {
        font-size: ${props => props.$designSystem.typography.scale.xl};
      }
    }
    
    .meta {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[3]};
      color: ${props => props.$theme.colors.text.tertiary};
      font-size: ${props => props.$designSystem.typography.scale.xs};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      flex-wrap: wrap;
      font-weight: ${props => props.$designSystem.typography.weight.medium};
      
      @media (max-width: 480px) {
        gap: ${props => props.$designSystem.spacing[2]};
      }
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: ${props => props.$designSystem.spacing[1]};
        
        svg {
          width: 12px;
          height: 12px;
          opacity: 0.7;
        }
      }
    }
  }
  
  .card-body {
    padding: 0 ${props => props.$designSystem.spacing[6]} ${props => props.$designSystem.spacing[8]};
    
    p {
      color: ${props => props.$theme.colors.text.secondary};
      line-height: ${props => props.$designSystem.typography.leading.relaxed};
      margin-bottom: ${props => props.$designSystem.spacing[5]};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      font-size: ${props => props.$designSystem.typography.scale.base};
      font-weight: ${props => props.$designSystem.typography.weight.normal};
    }
    
    .read-more {
      display: inline-flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[2]};
      color: ${props => props.$theme.colors.interactive.primary};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      font-family: ${props => props.$designSystem.typography.fonts.sans};
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: ${props => props.$designSystem.typography.scale.sm};
      padding: ${props => props.$designSystem.spacing[2]} 0;
      
      &:hover {
        color: ${props => props.$theme.colors.interactive.hover};
        transform: translateX(2px);
        
        svg {
          transform: translateX(2px);
        }
      }
      
      svg {
        transition: transform 0.2s ease;
        width: 16px;
        height: 16px;
      }
    }
  }
`



const BlogMeta = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[4]};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    color: ${props => props.$theme.colors.text.secondary};
    
    svg {
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    flex-wrap: wrap;
    gap: ${props => props.$designSystem.spacing[3]};
  }
`

const BlogPage: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const blogPosts = [
    {
      id: 1,
      title: "Penetration Testing en 2024: Metodologías OWASP y Zero Trust",
      excerpt: "Guía completa sobre técnicas modernas de penetration testing, implementación de frameworks OWASP Top 10 y integración con arquitecturas Zero Trust para máxima seguridad.",
      category: "security",
      categoryLabel: "Penetration Testing",
      icon: FaShieldAlt,
      date: "2024-12-15",
      readTime: "15 min",
      author: "Miquel Xarau",
      slug: "penetration-testing-2024"
    },
    {
      id: 2,
      title: "DevSecOps Integration 2025: Securing the Software Development Lifecycle",
      excerpt: "Estrategias avanzadas para implementar DevSecOps en 2025, incluyendo shift-left security, automatización de CI/CD, y cultura de seguridad organizacional.",
      category: "security",
      categoryLabel: "DevSecOps",
      icon: FaCode,
      date: "2024-11-18",
      readTime: "10 min", 
      author: "Miquel Xarau",
      slug: "devsecops-integration-2025"
    },
    {
      id: 3,
      title: "AI-Powered Development: Integrating Machine Learning in React Applications",
      excerpt: "Descubre cómo la inteligencia artificial está revolucionando el desarrollo React en 2025, desde herramientas de código inteligente hasta interfaces adaptativas.",
      category: "ai",
      categoryLabel: "Artificial Intelligence",
      icon: FaBrain,
      date: "2024-10-15",
      readTime: "12 min",
      author: "Miquel Xarau",
      slug: "ai-powered-react-development-2025"
    },
    {
      id: 4,
      title: "Application Security Trends 2025: Protecting Modern Web Applications",
      excerpt: "Explora las últimas tendencias en seguridad de aplicaciones, desde Zero Trust hasta IA para detección de amenazas, y cómo implementar defensas robustas en 2025.",
      category: "security",
      categoryLabel: "Application Security",
      icon: FaLock,
      date: "2024-09-12",
      readTime: "14 min",
      author: "Miquel Xarau",
      slug: "application-security-trends-2025"
    },
    {
      id: 5,
      title: "Smart Contract Security: Advanced Patterns for DeFi Applications",
      excerpt: "Deep dive into security patterns and best practices for building robust smart contracts in the DeFi ecosystem.",
      category: "blockchain",
      categoryLabel: "Blockchain",
      icon: SiEthereum,
      date: "2024-09-12",
      readTime: "16 min",
      author: "Miquel Xarau",
      slug: "smart-contract-security-defi-2024"
    },
    {
      id: 6,
      title: "Threat Detection con AI: Machine Learning para Cybersecurity",
      excerpt: "Implementación de algoritmos de machine learning para detección automática de amenazas, análisis de comportamiento anómalo y respuesta proactiva a incidentes.",
      category: "ai",
      categoryLabel: "AI Security",
      icon: FaNetworkWired,
      date: "2024-10-14",
      readTime: "18 min",
      author: "Miquel Xarau",
      slug: "threat-detection-ai-machine-learning-2024"
    }
  ]



  return (
    <Layout2025>
      <SEO 
        title="Blog | Miquel Xarau - UX/UI, Desarrollo & Tecnología"
        desc="Artículos sobre diseño UX/UI, desarrollo fullstack, inteligencia artificial y ciberseguridad. Análisis técnico y metodologías."
      />
      
      <PageHeader
        title='Análisis <span class="highlight">técnico</span> y metodologías'
        subtitle="Artículos sobre diseño UX/UI, desarrollo fullstack, inteligencia artificial y ciberseguridad."
      />
      
      <Container $theme={theme} $designSystem={designSystem}>

        <BlogGrid $designSystem={designSystem}>
          {blogPosts.map((post) => {
            const IconComponent = post.icon
            return (
              <BlogCard 
                key={post.id} 
                $theme={theme} 
                $designSystem={designSystem}
                as="a"
                href={`/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card-header">
                  <div className={`category ${post.category}`}>
                    <IconComponent />
                    {post.categoryLabel}
                  </div>
                  <h3>{post.title}</h3>
                  <div className="meta">
                    <div className="meta-item">
                      <FaClock />
                      {post.readTime}
                    </div>
                    <div className="meta-item">
                      <FaCalendarAlt />
                      {formatDate(post.date)}
                    </div>
                    <div className="meta-item">
                      <FaUser />
                      {post.author}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p>{post.excerpt}</p>
                  <div className="read-more">
                    Read Article
                    <FaArrowRight />
                  </div>
                </div>
              </BlogCard>
            )
          })}
        </BlogGrid>
      </Container>
    </Layout2025>
  )
}

export default BlogPage 
import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  FaHome,
  FaExclamationTriangle,
  FaBug,
  FaCode,
  FaTerminal
} from 'react-icons/fa'

// Animaciones técnicas
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`

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

// Contenedor de la página 404 técnico
const NotFoundContainer = styled.div<{ $theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: ${props => props.$theme.colors.bg.primary};
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 90vh;
  }
`

// Badge técnico
const TechBadge = styled.div<{ $theme: any }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.$theme.colors.bg.secondary}20;
  border: 1px solid ${props => props.$theme.colors.bg.secondary}30;
  border-radius: 2rem;
  color: #ef4444;
  font-family: ${props => props.$theme.designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.6s ease-out;
  
  &::before {
    content: 'ERROR> ';
    color: #ef4444;
  }
`

// Icono de error técnico
const ErrorIcon = styled.div<{ $theme: any }>`
  font-size: 5rem;
  color: #ef4444;
  margin-bottom: 2rem;
  opacity: 0.8;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }
`

// Código de error técnico
const ErrorCode = styled.div<{ $theme: any }>`
  font-size: clamp(8rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 0.8;
  margin-bottom: 1rem;
  background: ${props => props.$theme.colors.bg.secondary}20;
  border: 1px solid ${props => props.$theme.colors.bg.secondary}30;
  border-radius: 2rem;
  padding: 2rem;
  font-family: ${props => props.$theme.designSystem?.typography?.fonts?.display || 'sans-serif'};
  
  .four {
    color: transparent;
    background: linear-gradient(
      135deg,
      #3b82f6 0%,
      #8b5cf6 50%,
      #ec4899 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    animation: glitch 2s infinite;
  }
  
  .zero {
    color: transparent;
    background: linear-gradient(
      135deg,
      #f59e0b 0%,
      #ef4444 50%,
      #ec4899 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    animation: glitch 2s infinite reverse;
  }
  
  @keyframes glitch {
    0%, 100% { transform: translateX(0); }
    10% { transform: translateX(-2px) skew(-2deg); }
    20% { transform: translateX(2px) skew(2deg); }
    30% { transform: translateX(-1px) skew(1deg); }
    40% { transform: translateX(1px) skew(-1deg); }
    50% { transform: translateX(0); }
  }
`

// Título del error técnico
const ErrorTitle = styled.h2<{ $theme: any }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$theme.colors.text.primary};
  margin: 1rem 0;
  font-family: ${props => props.$theme.designSystem?.typography?.fonts?.display || 'sans-serif'};
  
  &::before {
    content: '// ';
    color: ${props => props.$theme.colors.neon};
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

// Descripción del error técnica
const ErrorDescription = styled.p<{ $theme: any }>`
  font-size: 1.125rem;
  color: ${props => props.$theme.colors.text.primaryLight};
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

// Contenedor de botones técnicos
const ActionButtons = styled.div<{ $theme: any }>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
  
  .primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: ${props => props.$theme.colors.interactive.primary};
    color: ${props => props.$theme.colors.bg.secondary};
    text-decoration: none;
    border-radius: 9999px;
    font-weight: 600;
    font-family: ${props => props.$theme.designSystem?.typography?.fonts?.sans || 'sans-serif'};
    transition: all 0.3s ease;
    border: 1px solid ${props => props.$theme.colors.interactive.primary};
    
    &:hover {
      transform: translateY(-2px);
      color: ${props => props.$theme.colors.bg.secondary};
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
      background: ${props => props.$theme.colors.interactive.primaryLight};
    }
    
    svg {
      color: ${props => props.$theme.colors.bg.secondary};
    }
  }
  
  .secondary-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: ${props => props.$theme.colors.bg.secondary};
    color: ${props => props.$theme.colors.text.primary};
    text-decoration: none;
    border-radius: 9999px;
    font-weight: 600;
    font-family: ${props => props.$theme.designSystem?.typography?.fonts?.sans || 'sans-serif'};
    transition: all 0.3s ease;
    border: 1px solid ${props => props.$theme.colors.bg.secondaryVariant};
    
    &:hover {
      transform: translateY(-2px);
      color: ${props => props.$theme.colors.neon};
      border-color: #3b82f6;
      background: ${props => props.$theme.colors.interactive.primary}15;
      border-color: ${props => props.$theme.colors.interactive.primary}50;
    }
    
    svg {
      color: ${props => props.$theme.colors.text.primary};
    }
  }
`

// Información técnica del sistema
const TechInfo = styled.div<{ $theme: any }>`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.$theme.colors.bg.secondary};
  border-radius: 1rem;
  border: 1px solid ${props => props.$theme.colors.bg.secondaryVariant};
  
  h3 {
    font-family: ${props => props.$theme.designSystem?.typography?.fonts?.display || 'sans-serif'};
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: 1.5rem;
    
    &::before {
      content: '// ';
      color: #3b82f6;
    }
    
    .highlight {
      color: ${props => props.$theme.colors.neon};
    }
  }
  
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    color: ${props => props.$theme.colors.text.primaryLight};
    font-family: 'Inter, system-ui, sans-serif;
    font-size: 0.875rem;
    
    .tech-item {
      .label {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #8b5cf6;
      }
      
      .value {
        opacity: 0.8;
      }
    }
  }
`

const CodeBlock = styled.pre<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.tertiary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.md};
  padding: ${props => props.$designSystem.spacing[4]};
  margin: ${props => props.$designSystem.spacing[6]} 0;
  overflow-x: auto;
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  line-height: ${props => props.$designSystem.typography.lineHeight.relaxed};
  color: ${props => props.$theme.colors.text.secondary};
  
  code {
    color: ${props => props.$theme.colors.text.primary};
    font-family: inherit;
  }
  
  .comment {
    color: ${props => props.$theme.colors.text.tertiary};
    font-style: italic;
  }
  
  .keyword {
    color: ${props => props.$theme.colors.interactive.primary};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
  }
  
  .string {
    color: ${props => props.$theme.colors.status.success};
  }
  
  .number {
    color: ${props => props.$theme.colors.status.warning};
  }
`

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme2025()

  return (
    <Layout2025>
      <SEO 
        title="404 - Page Not Found | Miquel Xarau" 
        desc="Oops! The page you're looking for doesn't exist. Return to the portfolio or explore other sections of the site."
      />
      
      <NotFoundContainer $theme={theme}>
        <TechBadge $theme={theme}>
          <FaBug />
          system.error
        </TechBadge>
        
        <ErrorIcon $theme={theme}>
          <FaExclamationTriangle />
        </ErrorIcon>
        
        <ErrorCode $theme={theme}>
          <span className="four">4</span>
          <span className="zero">0</span>
          <span className="four">4</span>
        </ErrorCode>
        
        <ErrorTitle $theme={theme}>
          Page Not Found
        </ErrorTitle>
        
        <ErrorDescription $theme={theme}>
          The requested resource could not be located in the system. 
          It may have been moved, deleted, or the URL might be incorrect.
        </ErrorDescription>
        
        <ActionButtons $theme={theme}>
          <Link to="/" className="primary-btn">
            <FaHome />
            Return Home
          </Link>
          
          <Link to="/trabajos/" className="secondary-btn">
            <FaCode />
            View Portfolio
          </Link>
        </ActionButtons>
        
        <TechInfo $theme={theme}>
          <h3>
            <FaTerminal />
            System Status
          </h3>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="label">HTTP Status</span>
              <span className="value">404 - Resource not found</span>
            </div>
            <div className="tech-item">
              <span className="label">All other systems</span>
              <span className="value">operational</span>
            </div>
            <div className="tech-item">
              <span className="label">Navigation routes</span>
              <span className="value">functioning normally</span>
            </div>
          </div>
        </TechInfo>
      </NotFoundContainer>
    </Layout2025>
  )
}

export default NotFoundPage 
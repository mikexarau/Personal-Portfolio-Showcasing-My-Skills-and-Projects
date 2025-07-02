import styled from 'styled-components'
import { 
  FaArrowLeft, 
  FaShare, 
  FaClock, 
  FaUser, 
  FaEye, 
  FaFileAlt,
  FaInfo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb
} from 'react-icons/fa'

// ========================================
//  BLOG COMPONENTS - MEDIUM.COM STYLE
//  Con tipografías corporativas únicamente
//  Diseño ultra limpio y profesional
// ========================================

// Contenedor principal - Estilo Medium
export const ArticleContainer = styled.article<{ $theme: any }>`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
  background: ${props => props.$theme.colors.bg.primary};
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0 1.25rem;
    max-width: 100%;
  }
`

// ActionBar minimalista - Estilo Medium
export const ActionBar = styled.div<{ $theme: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 3rem 0;
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary}20;
  margin-bottom: 2.5rem;
  
  .back-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.$theme.colors.text.secondary};
    text-decoration: none;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    transition: all 0.2s ease;
    padding: 0.5rem 0;
    
    &:hover {
      color: ${props => props.$theme.colors.text.primary};
      transform: translateX(-2px);
    }
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  .actions {
    display: flex;
    gap: 0.75rem;
    
    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      background: none;
      border: 1px solid ${props => props.$theme.colors.border.primary};
      color: ${props => props.$theme.colors.text.secondary};
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: ${props => props.$theme.colors.bg.secondary};
        color: ${props => props.$theme.colors.text.primary};
        border-color: ${props => props.$theme.colors.border.secondary};
      }
      
      svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }
  }
  
  @media (max-width: 640px) {
    padding: 1.5rem 0 2rem 0;
    margin-bottom: 2rem;
    
    .back-link {
      font-size: 0.8125rem;
    }
    
    .action-btn {
      padding: 0.4375rem 0.875rem;
      font-size: 0.8125rem;
    }
  }
`

// Header del artículo - Estilo Medium clean
export const ArticleHeader = styled.header<{ $theme: any }>`
  margin-bottom: 3.5rem;
  text-align: left;
  
  .category-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    padding: 0.375rem 0.625rem;
    border-radius: 9999px;
    letter-spacing: 0.025em;
    
    /* Estilos por categoría con soporte para modo claro/oscuro */
    &.ai,
    &.artificial-intelligence {
      background: var(--color-purple);
      color: white;
    }
    
    &.blockchain,
    &.web3 {
      background: var(--color-blue);
      color: white;
    }
    
    &.security,
    &.penetration-testing,
    &.devsecops,
    &.application-security {
      background: var(--color-rose);
      color: white;
    }
    
    &.tech,
    &.development,
    &.frontend {
      background: var(--color-emerald);
      color: white;
    }
    
    /* Fallback por defecto */
    &:not(.ai):not(.artificial-intelligence):not(.blockchain):not(.web3):not(.security):not(.penetration-testing):not(.devsecops):not(.application-security):not(.tech):not(.development):not(.frontend) {
      background: var(--color-slate);
      color: white;
    }
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  h1 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 700;
    color: ${props => props.$theme.colors.text.primary};
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    letter-spacing: -0.02em;
    word-spacing: -0.05em;
    
    @media (max-width: 768px) {
      font-size: clamp(1.75rem, 6vw, 2.25rem);
      line-height: 1.15;
    }
  }
  
  .article-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: ${props => props.$theme.colors.text.tertiary};
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.875rem;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-top: 1px solid ${props => props.$theme.colors.border.primary}15;
    border-bottom: 1px solid ${props => props.$theme.colors.border.primary}15;
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      
      svg {
        width: 0.875rem;
        height: 0.875rem;
        opacity: 0.7;
      }
    }
    
    @media (max-width: 640px) {
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.8125rem;
    }
  }
  
  .article-excerpt {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.25rem;
    line-height: 1.6;
    color: ${props => props.$theme.colors.text.secondary};
    margin: 0;
    font-weight: 400;
    
    @media (max-width: 768px) {
      font-size: 1.125rem;
      line-height: 1.55;
    }
  }
`

// Tabla de contenidos - Estilo Medium sidebar
export const TableOfContents = styled.nav<{ $theme: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      a {
        display: block;
        color: ${props => props.$theme.colors.text.secondary};
        text-decoration: none;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 0.25rem 0;
        border-radius: 0.25rem;
        transition: all 0.2s ease;
        
        &:hover {
          color: ${props => props.$theme.colors.interactive.primary};
          padding-left: 0.5rem;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding: 1.25rem;
  }
`

// Contenido del artículo - Tipografía estilo Medium
export const ArticleContent = styled.div<{ $theme: any }>`
  font-family: 'Inter', -apple-system, sans-serif;
  line-height: 1.7;
  color: ${props => props.$theme.colors.text.secondary};
  
  /* Títulos de sección */
  h2 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: ${props => props.$theme.colors.text.primary};
    line-height: 1.2;
    margin: 3rem 0 1.5rem 0;
    letter-spacing: -0.025em;
    
    &:first-child {
      margin-top: 0;
    }
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin: 2.5rem 0 1.25rem 0;
    }
  }
  
  h3 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.375rem;
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
    line-height: 1.3;
    margin: 2.5rem 0 1rem 0;
    letter-spacing: -0.015em;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
      margin: 2rem 0 1rem 0;
    }
  }
  
  h4 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
    line-height: 1.4;
    margin: 2rem 0 0.75rem 0;
  }
  
  /* Párrafos con espaciado perfecto */
  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: ${props => props.$theme.colors.text.secondary};
    margin: 0 0 1.5rem 0;
    font-weight: 400;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.65;
      margin-bottom: 1.25rem;
    }
  }
  
  /* Listas con mejor espaciado */
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    
    li {
      font-size: 1.125rem;
      line-height: 1.7;
      color: ${props => props.$theme.colors.text.secondary};
      margin-bottom: 0.75rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.65;
      }
    }
  }
  
  /* Énfasis */
  strong {
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
  }
  
  /* Código inline */
  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: ${props => props.$theme.colors.bg.secondary};
    color: ${props => props.$theme.colors.text.primary};
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.$theme.colors.border.primary};
  }
  
  /* Bloques de código */
  pre {
    background: ${props => props.$theme.colors.bg.secondary};
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 2rem 0;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.6;
    
    code {
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
      color: ${props => props.$theme.colors.text.primary};
    }
    
    @media (max-width: 768px) {
      padding: 1.25rem;
      margin: 1.5rem 0;
      border-radius: 0.5rem;
    }
  }
  
  /* Citas */
  blockquote {
    margin: 2rem 0;
    padding: 1.5rem;
    background: ${props => props.$theme.colors.bg.secondary};
    border-left: 4px solid ${props => props.$theme.colors.interactive.primary};
    border-radius: 0 0.5rem 0.5rem 0;
    
    p {
      font-size: 1.125rem;
      font-style: italic;
      color: ${props => props.$theme.colors.text.primary};
      margin: 0;
    }
    
    @media (max-width: 768px) {
      margin: 1.5rem 0;
      padding: 1.25rem;
    }
  }
  
  /* Enlaces */
  a {
    color: ${props => props.$theme.colors.interactive.primary};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${props => props.$theme.colors.interactive.hover};
      text-decoration: underline;
    }
  }
  
  /* Secciones */
  section {
    margin: 3rem 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    @media (max-width: 768px) {
      margin: 2.5rem 0;
    }
  }
`

// InfoBox mejorado - Estilo Medium callouts
export const InfoBox = styled.div<{ $theme: any; $variant: 'info' | 'warning' | 'success' | 'tip' }>`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0.75rem;
  border: 1px solid;
  font-family: 'Inter', -apple-system, sans-serif;
  
  ${props => {
    switch (props.$variant) {
      case 'info':
        return `
          background: ${props.$theme.colors.interactive.primary}08;
          border-color: ${props.$theme.colors.interactive.primary}30;
          color: ${props.$theme.colors.text.primary};
        `;
      case 'warning':
        return `
          background: #f59e0b08;
          border-color: #f59e0b30;
          color: ${props.$theme.colors.text.primary};
        `;
      case 'success':
        return `
          background: #10b98108;
          border-color: #10b98130;
          color: ${props.$theme.colors.text.primary};
        `;
      case 'tip':
        return `
          background: #8b5cf608;
          border-color: #8b5cf630;
          color: ${props.$theme.colors.text.primary};
        `;
    }
  }}
  
  .icon {
    font-size: 1.25rem;
    ${props => {
      switch (props.$variant) {
        case 'info': return `color: ${props.$theme.colors.interactive.primary};`;
        case 'warning': return `color: #f59e0b;`;
        case 'success': return `color: #10b981;`;
        case 'tip': return `color: #8b5cf6;`;
      }
    }}
  }
  
  .content {
    flex: 1;
    font-size: 1rem;
    line-height: 1.6;
    
    strong {
      font-weight: 600;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    p, ul, ol {
      margin: 0.5rem 0 0 0;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    li {
      margin-bottom: 0.25rem;
    }
  }
  
  /* Cuando no hay estructura .icon/.content, aplica estilo directo */
  &:not(:has(.content)) {
    flex-direction: row;
    align-items: flex-start;
    font-size: 1rem;
    line-height: 1.6;
    
    strong {
      font-weight: 600;
      display: inline;
      margin-right: 0.5rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin: 1.5rem 0;
    gap: 0.75rem;
    
    .icon {
      font-size: 1.125rem;
    }
    
    .content {
      font-size: 0.9375rem;
    }
  }
`

// ToolsGrid para herramientas - Estilo Medium cards
export const ToolsGrid = styled.div<{ $theme: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  
  .tool-card {
    background: ${props => props.$theme.colors.bg.secondary};
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(14, 165, 233, 0.15);
      border-color: ${props => props.$theme.colors.interactive.primary}30;
    }
    
    .tool-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      
      .tool-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background: ${props => props.$theme.colors.interactive.primary}15;
        color: ${props => props.$theme.colors.interactive.primary};
        border-radius: 0.5rem;
        font-size: 1.25rem;
      }
      
      h4 {
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 1.125rem;
        font-weight: 600;
        color: ${props => props.$theme.colors.text.primary};
        margin: 0;
      }
    }
    
    .tool-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background: ${props => props.$theme.colors.interactive.primary}15;
      color: ${props => props.$theme.colors.interactive.primary};
      border-radius: 0.75rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    h4 {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 1.125rem;
      font-weight: 600;
      color: ${props => props.$theme.colors.text.primary};
      margin: 0 0 0.75rem 0;
    }
    
    p {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: ${props => props.$theme.colors.text.secondary};
      margin: 0 0 1rem 0;
    }
    
    .tool-category {
      display: inline-block;
      background: ${props => props.$theme.colors.interactive.primary}15;
      color: ${props => props.$theme.colors.interactive.primary};
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .tool-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
      
      .tag {
        background: ${props => props.$theme.colors.bg.tertiary};
        color: ${props => props.$theme.colors.text.secondary};
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid ${props => props.$theme.colors.border.primary};
      }
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin: 1.5rem 0;
    
    .tool-card {
      padding: 1.25rem;
    }
  }
`

// Componente para contenido relacionado
export const RelatedContent = styled.section<{ $theme: any }>`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid ${props => props.$theme.colors.border.primary}30;
  
  h3 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.375rem;
    font-weight: 600;
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .related-item {
    padding: 1.5rem;
    background: ${props => props.$theme.colors.bg.secondary};
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(14, 165, 233, 0.1);
    }
    
    h4 {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 1.125rem;
      font-weight: 600;
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    
    p {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: ${props => props.$theme.colors.text.secondary};
      margin-bottom: 1rem;
    }
    
    .read-link {
      color: ${props => props.$theme.colors.interactive.primary};
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      
      &:hover {
        color: ${props => props.$theme.colors.interactive.hover};
        text-decoration: underline;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin-top: 3rem;
    padding-top: 2rem;
    
    .related-grid {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
    
    .related-item {
      padding: 1.25rem;
    }
  }
` 
import { createGlobalStyle } from 'styled-components'
import designSystem2025 from '../utils/design-system-2025'

export const GlobalStyles = createGlobalStyle<{ theme: any }>`
  /* Reset mejorado y base */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: ${designSystem2025.typography.fonts.sans};
    font-size: ${designSystem2025.typography.scale.base};
    line-height: ${designSystem2025.typography.leading.normal};
    font-weight: ${designSystem2025.typography.weight.normal};
    color: ${(props: any) => props.theme?.colors?.text?.primary || '#171717'};
    background: ${(props: any) => props.theme?.colors?.bg?.primary || '#ffffff'};
    overflow-x: hidden;
  }
  
  /* Typography hierarchy - UNIFIED */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${designSystem2025.typography.fonts.display};
    font-weight: ${designSystem2025.typography.weight.bold};
    line-height: ${designSystem2025.typography.leading.tight};
    letter-spacing: ${designSystem2025.typography.tracking.tight};
    color: ${(props: any) => props.theme?.colors?.text?.primary || '#171717'};
    margin-bottom: ${designSystem2025.spacing[4]};
  }
  
  h1 {
    font-size: ${designSystem2025.typography.scale['5xl']};
  }
  
  h2 {
    font-size: ${designSystem2025.typography.scale['3xl']};
  }
  
  h3 {
    font-size: ${designSystem2025.typography.scale['2xl']};
  }
  
  h4 {
    font-size: ${designSystem2025.typography.scale.xl};
  }
  
  p {
    margin-bottom: ${designSystem2025.spacing[4]};
    line-height: ${designSystem2025.typography.leading.relaxed};
    color: ${(props: any) => props.theme?.colors?.text?.secondary || '#525252'};
  }
  
  /* Links unificados */
  a {
    color: ${(props: any) => props.theme?.colors?.interactive?.primary || '#3b82f6'};
    text-decoration: none;
    transition: color ${designSystem2025.animation.duration.fast} ease;
  }
  
  a:hover {
    color: ${(props: any) => props.theme?.colors?.interactive?.hover || '#2563eb'};
  }
  
  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .no-scroll {
    overflow: hidden;
  }
`

export default GlobalStyles 
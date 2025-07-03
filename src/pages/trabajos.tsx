import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  PageHeader,
  ModernBadge
} from '../components/ui-components'
import { 
  FiBriefcase,
  FiFilter,
  FiChevronDown,
  FiX,
  FiSearch,
  FiLayers,
  FiGrid,
  FiList,
  FiExternalLink,
  FiCode
} from 'react-icons/fi'

// 🎯 SOLUCIÓN SCROLL SUAVE - Estilos globales para la página
const GlobalScrollStyles = styled.div`
  /* 🎯 CORRECCIÓN DEFINITIVA DEL SCROLL ENGANCHADO */
  html {
    scroll-behavior: smooth !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
  }
  
  body {
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth !important;
  }
  
  * {
    scroll-behavior: smooth !important;
    overscroll-behavior: contain !important;
  }
  
  /* Evitar scroll horizontal accidental */
  html, body {
    overflow-x: hidden !important;
  }
  
  /* Optimización de rendering para scroll */
  .gatsby-image-wrapper,
  .project-image,
  video {
    will-change: transform !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
    transform: translateZ(0) !important;
  }
`

// 🎬 Essential animations only
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

// 🎯 Optimized height measurement hook
const useAutoHeight = (isOpen: boolean, deps: any[] = []) => {
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const updateHeight = () => {
      if (ref.current) {
        const newHeight = isOpen ? ref.current.scrollHeight : 0
        setHeight(newHeight)
      }
    }

    updateHeight()

    // Observar cambios en el contenido
    const resizeObserver = new ResizeObserver(updateHeight)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => resizeObserver.disconnect()
  }, [isOpen, ...deps])

  return { ref, height }
}

// Interfaces
interface TrabajosPageProps {
  data: {
    allProjectsYaml: {
      edges: Array<{
        node: {
          title: string
          slug: string
          category?: string
          from?: string
          color?: string
          desc?: string
          images?: string
          cover?: string
        }
      }>
    }
    allFile: {
      nodes: Array<{
        id: string
        name: string
        extension: string
        relativeDirectory: string
        publicURL: string
      }>
    }
  }
}

// 🎨 Modern styled components
const Container = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  
  @media (max-width: 768px) {
    padding: 0 ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  }
`

// 🎯 Natural Flow Filter System - REDISEÑO MOBILE ULTRA-COMPACTO
const FilterSection = styled.section<{ $isCollapsed: boolean; $height: number; $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  
  /* 📱 MOBILE: Diseño ultra-compacto horizontal */
  @media (max-width: 968px) {
    margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
    
    /* Ocultar completamente el filtro expandible en mobile */
    .desktop-filters {
      display: none;
    }
    
    /* Mostrar solo filtros compactos */
    .mobile-filters {
      display: block;
    }
  }
  
  /* 🖥️ DESKTOP: Diseño completo */
  @media (min-width: 969px) {
    .desktop-filters {
      display: block;
    }
    
    .mobile-filters {
      display: none;
    }
  }
  
  /* Filtros desktop (diseño actual) */
  .desktop-filters .filter-trigger {
    position: sticky;
    top: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
    z-index: ${props => props.$designSystem?.zIndex?.dropdown || 1000};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.$theme?.colors?.bg?.primary || '#ffffff'};
    border: 2px solid ${props => props.$isCollapsed 
      ? 'rgba(59, 130, 246, 0.1)' 
      : props.$theme?.colors?.border?.primary || '#e5e7eb'};
    border-radius: ${props => props.$designSystem?.radius?.['2xl'] || '1rem'};
    padding: ${props => props.$designSystem?.spacing?.[5] || '1.25rem'} ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    
    /* Sin box-shadow para diseño más limpio */
    
    /* Hover state */
    &:hover {
      border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      transform: translateY(-1px);
    }
    
    /* Focus accessibility */
    &:focus-visible {
      outline: 2px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      outline-offset: 2px;
    }
    
    .trigger-content {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
      flex: 1;
      min-width: 0;
      
      .filter-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: ${props => props.$isCollapsed 
          ? `linear-gradient(135deg, ${props.$theme?.colors?.interactive?.primary || '#3b82f6'}, ${props.$theme?.colors?.interactive?.hover || '#2563eb'})` 
          : `${props.$theme?.colors?.interactive?.primary || '#3b82f6'}15`};
        color: ${props => props.$isCollapsed 
          ? props.$theme?.colors?.text?.inverse || '#ffffff'
          : props.$theme?.colors?.interactive?.primary || '#3b82f6'};
        border-radius: ${props => props.$designSystem?.radius?.xl || '0.75rem'};
        transition: all 0.2s ease;
        box-shadow: ${props => props.$isCollapsed 
          ? '0 4px 8px rgba(59, 130, 246, 0.25)' 
          : 'none'};
      }
      
      .filter-info {
        flex: 1;
        min-width: 0;
        
        h3 {
          font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
          font-size: ${props => props.$designSystem?.typography?.scale?.xl || '1.25rem'};
          font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
          color: ${props => props.$theme?.colors?.text?.primary || '#0f172a'};
          margin: 0 0 ${props => props.$designSystem?.spacing?.[1] || '0.25rem'} 0;
          line-height: 1.2;
        }
        
        .filter-summary {
          font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
          color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
          margin: 0;
          font-weight: 500;
          
          .count-badge {
            display: inline-flex;
            align-items: center;
            gap: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
            background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}10;
            color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
            padding: 2px 8px;
            border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
            font-weight: 600;
            font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
            margin-right: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
          }
          
          .active-filter {
            color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
            font-weight: 600;
          }
          
          .search-term {
            color: #10b981;
            font-weight: 600;
            
            em {
              font-style: normal;
              background: #10b98115;
              padding: 2px 6px;
              border-radius: 4px;
            }
          }
        }
      }
      
      .quick-filters {
        display: flex;
        gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
        align-items: center;
        opacity: ${props => props.$isCollapsed ? '0' : '1'};
        transform: ${props => props.$isCollapsed ? 'scale(0.95) translateX(10px)' : 'scale(1) translateX(0)'};
        transition: all 0.2s ease;
      }
    }
    
    .toggle-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
      background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
      border-radius: ${props => props.$designSystem?.radius?.lg || '0.5rem'};
      transition: all 0.2s ease;
      transform: ${props => props.$isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'};
      
      &:hover {
        background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
        color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
        transform: ${props => props.$isCollapsed ? 'rotate(0deg) scale(1.1)' : 'rotate(180deg) scale(1.1)'};
      }
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
  
  .desktop-filters .filters-panel {
    background: ${props => props.$theme?.colors?.bg?.primary || '#ffffff'};
    border: 0px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
    border-top: none;
    border-radius: 0 0 ${props => props.$designSystem?.radius?.['2xl'] || '1rem'} ${props => props.$designSystem?.radius?.['2xl'] || '1rem'};
    overflow: hidden;
    margin-top: -2px; /* Connect seamlessly with trigger */
    
    /* Natural height animation - pushes content down */
    height: ${props => props.$height}px;
    transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Subtle shadow when expanded */
    box-shadow: ${props => props.$isCollapsed 
      ? 'none' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)'};
    
    .panel-content {
      padding: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
      opacity: ${props => props.$isCollapsed ? '0' : '1'};
      transition: opacity 0.2s ease;
    }
  }
`

// 🎯 MOBILE: Filtros compactos horizontales (solo categorías)
const MobileFilters = styled.div<{ $theme: any; $designSystem: any }>`
  .mobile-categories {
    display: flex;
    gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
    overflow-x: auto;
    padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} 0 ${props => props.$designSystem?.spacing?.[3] || '0.75rem'} 0;
    
    /* Ocultar scrollbar pero mantener funcionalidad */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Smooth scrolling */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
`

const MobileCategoryChip = styled.button<{ $active: boolean; $color: string; $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
  padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  background: ${props => props.$active ? props.$color : props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  color: ${props => props.$active ? props.$theme?.colors?.text?.inverse || '#ffffff' : props.$theme?.colors?.text?.secondary || '#64748b'};
  border: 1px solid ${props => props.$active ? props.$color : 'transparent'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Evitar que se encoja */
  flex-shrink: 0;
  
  &:hover {
    background: ${props => props.$active ? props.$color : props.$theme?.colors?.bg?.tertiary || '#f1f5f9'};
    transform: translateY(-1px);
  }
  
  .count {
    background: ${props => props.$active ? 'rgba(255,255,255,0.25)' : props.$theme?.colors?.bg?.primary || '#ffffff'};
    color: ${props => props.$active ? props.$theme?.colors?.text?.inverse || '#ffffff' : props.$theme?.colors?.text?.secondary || '#64748b'};
    padding: 1px 4px;
    border-radius: ${props => props.$designSystem?.radius?.sm || '0.25rem'};
    font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    min-width: 14px;
    text-align: center;
    line-height: 1;
  }
`

const QuickFilter = styled.div<{ $active: boolean; $color: string; $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  background: ${props => props.$active ? props.$color : props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  color: ${props => props.$active ? props.$theme?.colors?.text?.inverse || '#ffffff' : props.$theme?.colors?.text?.secondary || '#64748b'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
  border: 1px solid ${props => props.$active ? props.$color : 'transparent'};
  transition: all 0.15s ease;
  
  .count {
    background: ${props => props.$active ? 'rgba(255,255,255,0.25)' : props.$theme?.colors?.bg?.primary || '#ffffff'};
    color: ${props => props.$active ? props.$theme?.colors?.text?.inverse || '#ffffff' : props.$theme?.colors?.text?.secondary || '#64748b'};
    padding: 1px 6px;
    border-radius: ${props => props.$designSystem?.radius?.sm || '0.25rem'};
    font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    min-width: 16px;
    text-align: center;
  }
`



const FiltersGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const CategoryFilter = styled.button<{ $active: boolean; $color: string; $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} ${props => props.$designSystem?.spacing?.[5] || '1.25rem'};
  border: 2px solid ${props => props.$active ? props.$color : props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  background: ${props => props.$active ? `${props.$color}10` : props.$theme?.colors?.bg?.primary || '#ffffff'};
  color: ${props => props.$active ? props.$color : props.$theme?.colors?.text?.secondary || '#64748b'};
  font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'system-ui, sans-serif'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${props => props.$color}15;
    border-color: ${props => props.$color};
    color: ${props => props.$color};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.$color};
    outline-offset: 2px;
  }
  
  .filter-text {
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    flex: 1;
    text-align: left;
  }
  
  .filter-count {
    background: ${props => props.$active ? props.$color : props.$theme?.colors?.bg?.secondary || '#f8fafc'};
    color: ${props => props.$active ? props.$theme?.colors?.text?.inverse || '#ffffff' : props.$theme?.colors?.text?.secondary || '#64748b'};
    padding: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'} ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
    border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
    font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    min-width: 24px;
    text-align: center;
    margin-left: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  }
`

const ProjectsSection = styled.section<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem?.spacing?.[16] || '4rem'};
  margin-top: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  position: relative;
  
  /* Ensure proper clearance from sticky elements */
  &::before {
    content: '';
    display: block;
    height: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
`



const ProjectsGrid = styled.div<{ $isFiltering: boolean; $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // EXACTAMENTE 3 COLUMNAS
  gap: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  transition: opacity 0.2s ease;
  opacity: ${props => props.$isFiltering ? '0.7' : '1'};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // Mantener 3 columnas en tablet
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 2 columnas en móvil
    gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr; // Una sola columna en pantallas muy pequeñas
    gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  }
`

// 🎯 Wrapper para card + información debajo - CON HOVER UNIFICADO
const ProjectCard = styled.div<{ $delay: number; $color: string; $theme: any; $designSystem: any }>`
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.6s ease-out ${props => props.$delay * 0.05}s both;
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  
  /* 🎯 HOVER UNIFICADO - toda la card responde al hover */
  &:hover {
    transform: translateY(-8px);
  }
  
  /* Hover en imagen/video */
  &:hover .project-image {
    transform: scale(1.08);
  }
  
  &:hover .project-overlay {
    opacity: 1;
  }
  
  &:hover .project-content {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover .project-badge {
    transform: translateY(-4px) scale(1.05);
  }
  
  /* 🎯 HOVER EN TEXTO INFERIOR - ahora responde igual que la imagen */
  &:hover .project-info-title {
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateX(4px);
  }
  
  &:hover .project-info-role {
    color: ${props => props.$theme.colors.text.primary};
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`

// 🎯 Card visual interactiva - PROPORCIÓN DEL CARRUSEL PERO ESCALADA
const ProjectCardVisual = styled(Link)<{ $color: string; $theme: any; $designSystem: any }>`
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 🎯 PROPORCIÓN DEL CARRUSEL (1.25:1) PERO ESCALADA PARA 3 COLUMNAS */
  width: 100%;
  aspect-ratio: 1.25; // Misma proporción que carrusel
  flex-shrink: 0;
  
  /* Responsive manteniendo proporciones */
  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 1.22; // Proporción móvil del carrusel
  }
  
  /* Mismo diseño del carrusel */
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem?.radius?.xl || '1rem'};
  overflow: hidden;
  
  /* Sin hover individual - manejado por ProjectCard padre */
  z-index: 1;
  
  &:hover {
    z-index: 10;
  }
`

// 📝 Información del proyecto debajo de la card (como el carrusel)
const ProjectInfo = styled.div<{ $theme: any; $designSystem: any }>`
  margin-top: ${props => props.$designSystem.spacing[4]};
  padding: 0 ${props => props.$designSystem.spacing[1]};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${props => props.$designSystem.spacing[2]};
`

const ProjectInfoTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.tight};
  letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.base};
  }
`

const ProjectInfoRole = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.body};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  color: ${props => props.$theme.colors.text.secondary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  letter-spacing: ${props => props.$designSystem.typography.tracking.normal};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
  }
`

// 🎯 Overlay que aparece en hover (mismo que el carrusel)
const ProjectOverlay = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
  position: absolute;
  top: -1px;
  left: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background: ${props => props.$isDark 
    ? '#1a1a1a'
    : '#000000'
  };
  border-radius: ${props => props.$designSystem.radius.xl};
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 2;
`

// 🎯 Contenido en hover (mismo que el carrusel)
const ProjectHoverContent = styled.div<{ $theme: any; $designSystem: any; $isDark: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
  width: 100%;
  height: 100%;
  padding: ${props => props.$designSystem.spacing[6]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${props => props.$isDark 
    ? '#ffffff' 
    : props.$theme.colors.text.inverse
  };
    opacity: 0;
  transform: translateY(20px);
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: 3;
  
  .project-title {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale.xl};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$isDark 
      ? '#ffffff' 
      : props.$theme.colors.text.inverse
    };
    line-height: ${props => props.$designSystem.typography.leading.tight};
    margin-bottom: ${props => props.$designSystem.spacing[2]};
    letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  }
  
  .project-subtitle {
    font-family: ${props => props.$designSystem.typography.fonts.body};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    color: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.75)' 
      : props.$theme.colors.text.inverse + 'DD'
    };
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }
  
  .project-button {
    padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
    background: ${props => props.$isDark 
      ? '#000000' 
      : props.$theme.colors.text.inverse
    };
    color: ${props => props.$isDark 
      ? '#ffffff' 
      : props.$theme.colors.text.primary
    };
    border: none;
    border-radius: ${props => props.$designSystem.radius.full};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    transition: all ${props => props.$designSystem.animation.duration.fast} ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`

// 🏷️ Badge de fecha para página trabajos - consistente con carrusel
const ProjectYearBadge = styled.div<{ $theme: any; $designSystem: any; $year: string }>`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${props => {
    const year = parseInt(props.$year)
    const currentYear = new Date().getFullYear()
    const isDark = props.$theme.mode === 'dark'
    
    // Sistema monocromático idéntico al carrusel
    if (year >= currentYear - 1) {
      // Proyectos recientes - máximo contraste
      return isDark ? '#ffffff' : '#1a1a1a'
    }
    if (year >= currentYear - 3) {
      // Proyectos de 2-4 años - contraste alto
      return isDark ? '#e5e5e5' : '#2d2d2d'
    }
    if (year >= currentYear - 6) {
      // Proyectos de 4-7 años - contraste medio
      return isDark ? '#b8b8b8' : '#525252'
    }
    // Proyectos más antiguos - contraste bajo
    return isDark ? '#8a8a8a' : '#737373'
  }};
  color: ${props => {
    const year = parseInt(props.$year)
    const currentYear = new Date().getFullYear()
    const isDark = props.$theme.mode === 'dark'
    
    // Color de texto óptimo para cada tonalidad monocromática (idéntico al carrusel)
    if (year >= currentYear - 1) {
      // Proyectos recientes - texto inverso al fondo
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    if (year >= currentYear - 3) {
      // Proyectos de 2-4 años - texto inverso
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    if (year >= currentYear - 6) {
      // Proyectos de 4-7 años - texto que contraste
      return isDark ? '#1a1a1a' : '#ffffff'
    }
    // Proyectos más antiguos - texto que contraste
    return isDark ? '#1a1a1a' : '#ffffff'
  }};
  padding: 4px 12px;
  border-radius: ${props => props.$designSystem.radius.full};
  font-size: 10px;
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  text-transform: uppercase;
  letter-spacing: ${props => props.$designSystem.typography.tracking.wider};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  z-index: 20;
  white-space: nowrap;
  
  /* Diseño limpio sin bordes */
  border: none;
  backdrop-filter: none;
  
  /* Sin animación de desplazamiento - pegado siempre a la card */
  opacity: 1;
  transform: translate(0, 0) scale(1);
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    top: -4px;
    right: -4px;
    padding: 3px 8px;
    font-size: 9px;
  }
  
  @media (max-width: 480px) {
    top: -3px;
    right: -3px;
    padding: 2px 6px;
    font-size: 8px;
  }
`

const ProjectImage = styled.div<{ 
  $color: string; 
  $theme: any; 
  $designSystem: any 
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.$designSystem.radius.lg};
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.$color}15, ${props => props.$color}25);
  
  /* 🎯 SOLUCIÓN LIMPIA - MÁXIMA ESPECIFICIDAD SIN REDUNDANCIAS */
  .gatsby-image-wrapper,
  .gatsby-image-wrapper > div,
  .gatsby-image-wrapper picture,
  .gatsby-image-wrapper img {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    border-radius: inherit !important;
  }

  /* Placeholder simple */
  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    
    /* 🌟 GRADIENTE SHIMMER MINIMALISTA */
    background: linear-gradient(
      110deg,
      ${props => props.$color}15 8%,
      ${props => props.$color}25 18%,
      ${props => props.$color}15 33%
    );
    background-size: 200% 100%;
    animation: elegantShimmer 2s ease-in-out infinite;
    
    /* 🔴 INDICADOR SUTIL DE CARGA - SIN ICONOS */
    &::after {
      content: '';
      position: absolute;
      bottom: 12px;
      right: 12px;
      width: 6px;
      height: 6px;
      background: ${props => props.$color};
      border-radius: 50%;
      opacity: 0.7;
      animation: subtlePulse 1.5s ease-in-out infinite;
    }
    
    @keyframes elegantShimmer {
      0% { 
        background-position: -200% 0; 
      }
      100% { 
        background-position: 200% 0; 
      }
    }
    
    @keyframes subtlePulse {
      0%, 100% { 
        opacity: 0.4; 
        transform: scale(1); 
      }
      50% { 
        opacity: 0.9; 
        transform: scale(1.3); 
      }
    }
    
    /* 🎯 REDUCIR ANIMACIONES EN MOTION REDUCIDO */
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background: ${props => props.$color}20;
      
      &::after {
        animation: none;
        opacity: 0.5;
      }
    }
  }
`

// 🎬 Video component para trabajos - SIMPLIFICADO
const ProjectVideo = styled.video<{ $designSystem: any }>`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  border-radius: inherit !important;
  
  /* Ocultar controles */
  &::-webkit-media-controls {
    display: none !important;
  }
`

// 🎯 Video fallback placeholder - Minimalista y profesional
const VideoLoadingPlaceholder = styled.div<{ $theme: any; $designSystem: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
  
  /* 🌟 GRADIENTE SHIMMER MINIMALISTA */
  background: linear-gradient(
    110deg,
    ${props => props.$theme.colors.bg.secondary} 8%,
    ${props => props.$theme.colors.bg.tertiary} 18%,
    ${props => props.$theme.colors.bg.secondary} 33%
  );
  background-size: 200% 100%;
  animation: elegantShimmer 2s ease-in-out infinite;
  
  /* 🎯 SHIMMER EFFECT ELEGANTE */
  @keyframes elegantShimmer {
    0% { 
      background-position: -200% 0; 
    }
    100% { 
      background-position: 200% 0; 
    }
  }
  
  /* 🔴 INDICADOR SUTIL DE CARGA - SIN ICONOS */
  &::after {
    content: '';
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 6px;
    height: 6px;
    background: ${props => props.$theme.colors.interactive.primary};
    border-radius: 50%;
    opacity: 0.7;
    animation: subtlePulse 1.5s ease-in-out infinite;
  }
  
  @keyframes subtlePulse {
    0%, 100% { 
      opacity: 0.4; 
      transform: scale(1); 
    }
    50% { 
      opacity: 0.9; 
      transform: scale(1.3); 
    }
  }
  
  /* 🎯 REDUCIR ANIMACIONES EN MOTION REDUCIDO */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: ${props => props.$theme.colors.bg.tertiary};
    
    &::after {
      animation: none;
      opacity: 0.5;
    }
  }
`

// 🎯 Componente que maneja video + placeholder
const VideoWithPlaceholder: React.FC<{
  videoUrl: string;
  theme: any;
  designSystem: any;
}> = ({ videoUrl, theme, designSystem }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleLoadedData = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
  }, [])

  // 🔄 Verificar estado inicial del video (importante para recargas de página)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Si el video ya tiene datos (caché), ocultamos el placeholder inmediatamente
    if (video.readyState >= 2) { // HAVE_CURRENT_DATA o superior
      setIsLoading(false)
      return
    }

    // Timeout de seguridad - si después de 5 segundos sigue cargando, ocultamos el placeholder
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn('Video loading timeout, hiding placeholder')
        setIsLoading(false)
      }
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [videoUrl, isLoading])

  if (hasError) {
    return <VideoLoadingPlaceholder $theme={theme} $designSystem={designSystem} />
  }

  return (
    <>
      {isLoading && (
        <VideoLoadingPlaceholder $theme={theme} $designSystem={designSystem} />
      )}
      <ProjectVideo
        ref={videoRef}
        $designSystem={designSystem}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        onCanPlay={handleLoadedData}
        onLoadedMetadata={handleLoadedData}
        onError={handleError}
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </ProjectVideo>
    </>
  )
}

const ProjectContent = styled.div<{ $viewMode: 'grid' | 'list'; $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem.spacing[6]};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.$designSystem.spacing[4]};
  background: ${props => props.$theme.colors.bg.secondary};
  
  ${props => props.$viewMode === 'list' && `
    padding: 0;
    flex-direction: row;
    align-items: stretch;
    height: 200px;
    min-height: 200px;
    
    .content-wrapper {
      padding: ${props.$designSystem.spacing[6]} ${props.$designSystem.spacing[8]};
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: ${props.$designSystem.spacing[3]};
      min-width: 0; /* Permite que el contenido se contraiga */
    }
  `}
`

const ProjectHeader = styled.div<{ $designSystem: any }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$designSystem.spacing[3]};
`

const ProjectCategory = styled.div<{ $color: string; $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[2]};
  background: ${props => props.$theme.colors.interactive.primary}15;
  color: ${props => props.$theme.colors.interactive.primary};
  padding: ${props => props.$designSystem.spacing[2]} ${props => props.$designSystem.spacing[3]};
  border-radius: ${props => props.$designSystem.radius.full};
  font-size: ${props => props.$designSystem.typography.scale.xs};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  white-space: nowrap;
  transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  align-self: flex-start;
  
  svg {
    width: 12px;
    height: 12px;
  }
`

const ProjectTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  line-height: ${props => props.$designSystem.typography.leading.tight};
  margin: 0;
  transition: color ${props => props.$designSystem.animation.duration.fast} ease;
  
  /* Limitar a 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProjectDescription = styled.p<{ $theme: any; $designSystem: any }>`
  color: ${props => props.$theme.colors.text.secondary};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  flex-grow: 1;
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  
  /* Limitar a 3 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProjectMeta = styled.div<{ $designSystem: any }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: auto;
  gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  padding-top: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  border-top: 1px solid ${props => props.$designSystem?.colors?.border?.secondary || '#e5e7eb'}10;
  min-height: 60px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
    align-items: flex-start;
  }
`

const TechTags = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  flex-wrap: wrap;
  transition: transform 0.3s ease;
  flex: 1;
  align-items: flex-start;
  
  @media (max-width: 640px) {
    gap: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
`

const TechTag = styled.span<{ $color: string; $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem.spacing[1]} ${props => props.$designSystem.spacing[2]};
  background: ${props => props.$theme.colors.bg.primaryDark};
  color: ${props => props.$theme.colors.text.tertiary};
  border: 1px solid ${props => props.$theme.colors.border.secondary};
  border-radius: ${props => props.$designSystem.radius.full};
  font-size: ${props => props.$designSystem.typography.scale.xs};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  transition: all ${props => props.$designSystem.animation.duration.fast || '0.2s'} cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  /* Individual hover effect when not in card hover */
  &:hover {
    background: ${props => props.$theme.colors.interactive.primary};
    color: white;
    border-color: ${props => props.$theme.colors.interactive.primary};
    transform: scale(1.05) translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Enhanced accessibility */
  &:focus-visible {
    outline: 2px solid ${props => props.$theme.colors.interactive.primary};
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.98);
  }
`

const NoResults = styled.div<{ $theme: any; $designSystem: any }>`
  text-align: center;
  padding: ${props => props.$designSystem.spacing[20]} ${props => props.$designSystem.spacing[8]};
  animation: ${fadeInUp} 0.8s ease-out;
  
  .icon {
    font-size: ${props => props.$designSystem.typography.scale['4xl']};
    color: ${props => props.$theme.colors.text.tertiary};
    margin-bottom: ${props => props.$designSystem.spacing[6]};
  }
  
  h3 {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale['2xl']};
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }
  
  p {
    color: ${props => props.$theme.colors.text.secondary};
    font-size: ${props => props.$designSystem.typography.scale.lg};
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    max-width: 400px;
    margin: 0 auto;
  }
`

const TrabajosPage: React.FC<TrabajosPageProps> = ({ data }) => {
  const { theme, designSystem, isDark } = useTheme2025()
  const projects = data.allProjectsYaml.edges || []
  const videoFiles = data?.allFile?.nodes || []
  
  // 🎯 Enhanced state management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true)
  const [autoCollapsed, setAutoCollapsed] = useState(false)
  const [isFilteringActive, setIsFilteringActive] = useState(false)
  
  // 📱 Mobile touch state for better UX
  const [touchedCard, setTouchedCard] = useState<string | null>(null)
  
  // 🎯 Smart scroll state with user interaction awareness
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false)
  const [pageLoadTime] = useState<number>(Date.now())

  // 🎯 Auto-height measurement for smooth animations
  const { ref: panelRef, height: panelHeight } = useAutoHeight(!isFiltersCollapsed, [selectedFilter, searchQuery, projects.length])

  // 🔧 SOLUCIÓN DEFINITIVA AL BUG DEL SCROLL - UX MEJORADA
  useEffect(() => {
    let ticking = false
    let scrollTimeout: NodeJS.Timeout | null = null
    
    const handleScroll = () => {
      // Cancelar timeout anterior si existe
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollingDown = currentScrollY > lastScrollY
          const scrollDelta = Math.abs(currentScrollY - lastScrollY)
          const timeSinceLoad = Date.now() - pageLoadTime
          
          // ONLY react to significant scroll movements - Evita el "enganche"
          if (scrollDelta > 15) { // Reducido de 20 a 15 para mejor responsividad
            setLastScrollY(currentScrollY)
            
            // 🎯 LÓGICA ANTI-ENGANCHE mejorada
            const minTimeBeforeAutoCollapse = hasUserInteracted ? 800 : 2500 // Reducido tiempos
            const minScrollDistance = hasUserInteracted ? 150 : 350 // Distancias más razonables
            
            // SCROLL DOWN - Colapsar con debounce
            if (scrollingDown && 
                currentScrollY > minScrollDistance && 
                timeSinceLoad > minTimeBeforeAutoCollapse &&
                !isFiltersCollapsed) {
              
              // Debounce para evitar cambios erráticos
              scrollTimeout = setTimeout(() => {
              setIsFiltersCollapsed(true)
              setAutoCollapsed(true)
              }, 100) // Pequeño delay para suavizar
            }
            
            // SCROLL UP - Expandir inmediatamente (mejor UX)
            if (!scrollingDown && 
                isFiltersCollapsed && 
                autoCollapsed &&
                scrollDelta > 25) { // Requiere un scroll up más decidido
              
              if (scrollTimeout) clearTimeout(scrollTimeout) // Cancelar colapso pendiente
              setIsFiltersCollapsed(false)
              setAutoCollapsed(false)
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    // 🚀 Event listener optimizado con passive para mejor performance
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      capture: false 
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout) // Cleanup timeout
    }
  }, [lastScrollY, isFiltersCollapsed, autoCollapsed, hasUserInteracted, pageLoadTime])

  // Manual toggle handler
  const handleToggleFilters = () => {
    setIsFiltersCollapsed(!isFiltersCollapsed)
    setAutoCollapsed(false)
    setHasUserInteracted(true) // Mark user as having interacted
  }

  // Smart filter handler with UX feedback
  const handleFilterChange = (filter: string) => {
    setIsFilteringActive(true)
    setSelectedFilter(filter)
    setHasUserInteracted(true) // Mark user as having interacted
    setTimeout(() => setIsFilteringActive(false), 300)
  }

  // Smart search handler with UX feedback
  const handleSearchChange = (value: string) => {
    setIsFilteringActive(true)
    setSearchQuery(value)
    setHasUserInteracted(true) // Mark user as having interacted
    setTimeout(() => setIsFilteringActive(false), 300)
  }

  // Extraer tecnologías y mapear colores
  const extractTechnologies = (category?: string): string[] => {
    if (!category) return []
    return category
      .split('#')
      .map((cat: string) => cat.trim())
      .filter((cat: string) => cat.length > 0)
  }

  // Mapeo de categorías a colores
  const categoryColors: Record<string, string> = {
    'React': '#61DAFB',
    'TypeScript': '#3178C6', 
    'UX/UI': '#FF6B6B',
    'Full-Stack': '#4ECDC4',
    'WordPress': '#21759B',
    'E-commerce': '#FF9500',
    'Blockchain': '#F7931E',
    'Fintech': '#00D4AA',
    'Healthcare': '#4A90E2',
    'Motion Graphics': '#E74C3C',
    'Branding': '#9B59B6',
    'Mobile Design': '#34C759',
    'Data Visualization': '#FF5722',
    'Enterprise': '#607D8B'
  }

  const getProjectColor = (category?: string, projectColor?: string): string => {
    if (projectColor) return projectColor
    const techs = extractTechnologies(category)
    for (const tech of techs) {
      if (categoryColors[tech]) return categoryColors[tech]
    }
    return theme?.colors?.interactive?.primary || '#3b82f6'
  }

  // Obtener filtros únicos con conteos
  const filterOptions = useMemo(() => {
    const techCount: Record<string, number> = {}
    projects.forEach(({ node }) => {
      const techs = extractTechnologies(node.category)
      techs.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })
    
    return Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .map(([tech, count]) => ({
        name: tech,
        count,
        color: categoryColors[tech] || theme?.colors?.interactive?.primary || '#3b82f6'
      }))
  }, [projects, theme])

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    return projects.filter(({ node }) => {
      const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (node.desc || '').toLowerCase().includes(searchQuery.toLowerCase())
      
      if (selectedFilter === 'all') return matchesSearch
      
      const techs = extractTechnologies(node.category)
      return matchesSearch && techs.includes(selectedFilter)
    })
  }, [projects, searchQuery, selectedFilter])

  // 📱 Enhanced mobile touch handlers
  const handleCardTouchStart = (slug: string) => {
    if (window.innerWidth <= 768) {
      setTouchedCard(slug)
    }
  }

  const handleCardTouchEnd = () => {
    if (window.innerWidth <= 768) {
      // Keep card touched for a moment to allow interaction
      setTimeout(() => {
        setTouchedCard(null)
      }, 300)
    }
  }

  // 🎬 Función optimizada para encontrar el video principal de un proyecto (sincronizada con carrusel)
  const getProjectVideo = (projectSlug: string, projectImages?: string): string | null => {
    // Usar el campo "images" para obtener la carpeta real del proyecto
    const projectFolder = projectImages || projectSlug
    
    // Buscar videos en la carpeta del proyecto - PATHS FLEXIBLES
    const projectVideos = videoFiles.filter((file: any) => {
      const path = file.relativeDirectory || ''
      // Buscar por carpeta real (campo images) y también por slug como fallback
      return path === `projects/${projectFolder}` || 
             path === projectFolder ||
             path === `projects/${projectSlug}` || 
             path === projectSlug
    })
    
    if (projectVideos.length === 0) return null
    
    // 🎯 Prioridades optimizadas para seleccionar el video principal
    const priorities = [
      // TRAM específico
      'NOCOLA-1080x1080_2',
      'NOCOLA-1080x1090_6', 
      'NOCOLA-BannerWeb',
      'BALLARINA_1080x1920',
      'BALLARÍ_1x1_INSTA',
      // Patrones generales por carpeta real
      `${projectFolder}-hero`,
      `${projectFolder}-main`,
      `${projectFolder}-preview`,
      `projects-${projectFolder}-001`,
      // Patrones generales por slug como fallback
      `${projectSlug}-hero`,
      `${projectSlug}-main`,
      `${projectSlug}-preview`,
      `projects-${projectSlug}-001`
    ]
    
    // 🔍 Buscar por prioridad con matching flexible
    for (const priority of priorities) {
      const video = projectVideos.find((file: any) => 
        file.name.toLowerCase().includes(priority.toLowerCase())
      )
      if (video) return video.publicURL
    }
    
    // 🎯 Si no encuentra por prioridad, tomar el primer video disponible
    return projectVideos[0]?.publicURL || null
  }

  return (
    <>
      <GlobalScrollStyles />
    <Layout2025>
      <SEO 
        title="Trabajos Profesionales - Miquel Xarau | Portfolio 2025"
        desc="Portfolio de proyectos profesionales. Diseño UX/UI, desarrollo fullstack y especialización en IA y ciberseguridad."
      />

      <PageHeader
        title="Trabajos que <span class='highlight'>transforman</span> negocios"
        subtitle="Proyectos digitales donde el diseño estratégico y la tecnología se fusionan para crear experiencias únicas."
      />

      <Container $theme={theme} $designSystem={designSystem}>
        {/* Filtros Premium */}
        <FilterSection $isCollapsed={isFiltersCollapsed} $height={panelHeight} $theme={theme} $designSystem={designSystem}>
          {/* 🖥️ DESKTOP: Filtros completos */}
          <div className="desktop-filters">
            <div className="filter-trigger" onClick={handleToggleFilters}>
              <div className="trigger-content">
                <div className="filter-icon">
                  <FiFilter />
                </div>
                <div className="filter-info">
                  <h3>
                    Explorar por especialidad
                    {autoCollapsed && (
                      <span style={{ 
                        fontSize: '10px', 
                        marginLeft: '8px', 
                        padding: '2px 6px', 
                        background: theme?.colors?.interactive?.primary || '#3b82f6', 
                        color: '#ffffff', 
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        auto
                      </span>
                    )}
                  </h3>
                  <div className="filter-summary">
                    <span className="count-badge">
                      {filteredProjects.length}
                    </span>
                    encontrado{filteredProjects.length !== 1 ? 's' : ''}
                    {selectedFilter !== 'all' && (
                      <span className="active-filter">
                        {' en '}<strong>{selectedFilter}</strong>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="search-term">
                        {' • búsqueda: "'}<em>{searchQuery}</em>{'"'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="quick-filters">
                  {selectedFilter !== 'all' && (
                    <QuickFilter
                      $active={selectedFilter !== 'all'}
                      $color={theme?.colors?.interactive?.primary || '#3b82f6'}
                      $theme={theme}
                      $designSystem={designSystem}
                    >
                      {selectedFilter}
                      <span className="count">{filterOptions.find(o => o.name === selectedFilter)?.count}</span>
                    </QuickFilter>
                  )}
                  {searchQuery && (
                    <QuickFilter
                      $active={true}
                      $color="#10b981"
                      $theme={theme}
                      $designSystem={designSystem}
                    >
                      <FiSearch style={{ width: '14px', height: '14px' }} />
                      "{searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}"
                    </QuickFilter>
                  )}
                </div>
              </div>
              <div className="toggle-icon">
                <FiChevronDown />
              </div>
            </div>
            
            <div className="filters-panel">
              <div className="panel-content" ref={panelRef}>

                
                <FiltersGrid $designSystem={designSystem}>
                  <CategoryFilter
                    $active={selectedFilter === 'all'}
                    $color={theme?.colors?.interactive?.primary || '#3b82f6'}
                    $theme={theme}
                    $designSystem={designSystem}
                    onClick={() => handleFilterChange('all')}
                  >
                    <span className="filter-text">Todos los proyectos</span>
                    <span className="filter-count">{projects.length}</span>
                  </CategoryFilter>
                  
                  {filterOptions.slice(0, 11).map(({ name, count, color }) => (
                    <CategoryFilter
                      key={name}
                      $active={selectedFilter === name}
                      $color={color}
                      $theme={theme}
                      $designSystem={designSystem}
                      onClick={() => handleFilterChange(name)}
                    >
                      <span className="filter-text">{name}</span>
                      <span className="filter-count">{count}</span>
                    </CategoryFilter>
                  ))}
                </FiltersGrid>
              </div>
            </div>
          </div>

          {/* 📱 MOBILE: Filtros ultra-compactos */}
          <div className="mobile-filters">
            <MobileFilters $theme={theme} $designSystem={designSystem}>
              {/* Categorías horizontales */}
              <div className="mobile-categories">
                <MobileCategoryChip
                  $active={selectedFilter === 'all'}
                  $color={theme?.colors?.interactive?.primary || '#3b82f6'}
                  $theme={theme}
                  $designSystem={designSystem}
                  onClick={() => handleFilterChange('all')}
                >
                  Todos
                  <span className="count">{projects.length}</span>
                </MobileCategoryChip>
                
                {filterOptions.slice(0, 8).map(({ name, count, color }) => (
                  <MobileCategoryChip
                    key={name}
                    $active={selectedFilter === name}
                    $color={color}
                    $theme={theme}
                    $designSystem={designSystem}
                    onClick={() => handleFilterChange(name)}
                  >
                    {name}
                    <span className="count">{count}</span>
                  </MobileCategoryChip>
                ))}
              </div>
            </MobileFilters>
          </div>
        </FilterSection>

        {/* Projects Section */}
        <ProjectsSection $designSystem={designSystem}>

          {filteredProjects.length > 0 ? (
            <ProjectsGrid $isFiltering={isFilteringActive} $designSystem={designSystem}>
              {filteredProjects.map(({ node }, index) => {
                const { title, slug, category, from, cover, desc, color, images } = node
                const technologies = extractTechnologies(category)
                const projectColor = getProjectColor(category, color)
                const image = null // cover es ahora un string, no un objeto con childImageSharp

                // Función helper para obtener subtítulo con las 3 primeras skills
                const getProjectSubtitle = (category?: string, from?: string): string => {
                  const cats = category?.replace(/^#/, '').split('#').filter(Boolean) || []
                  const topThreeSkills = cats.slice(0, 3).map(cat => cat.trim()).filter(Boolean)
                  
                  if (topThreeSkills.length === 0) {
                    return 'Desarrollo'
                  }
                  
                  // Mostrar las 3 primeras skills separadas por " • "
                  return topThreeSkills.join(' • ')
                }

                return (
                  <ProjectCard 
                    key={slug}
                    $delay={index}
                    $color={projectColor}
                    $theme={theme}
                    $designSystem={designSystem}
                  >
                    {/* Badge de año FUERA de ProjectCardVisual para que sobresalga */}
                    <ProjectYearBadge 
                      className="project-badge" 
                      $theme={theme} 
                      $designSystem={designSystem}
                      $year={from || '2024'}
                    >
                      {from || '2024'}
                    </ProjectYearBadge>

                    {/* Card visual con enlace */}
                    <ProjectCardVisual 
                      to={`/${slug}/`}
                      $color={projectColor}
                      $theme={theme}
                      $designSystem={designSystem}
                      className={`project-card-visual ${touchedCard === slug ? 'touched' : ''}`}
                    onTouchStart={() => handleCardTouchStart(slug)}
                    onTouchEnd={handleCardTouchEnd}
                  >

                      {/* Imagen del proyecto o Video */}
                    <ProjectImage 
                      className="project-image"
                      $color={projectColor}
                      $theme={theme} 
                      $designSystem={designSystem}
                    >
                        {(() => {
                          const videoUrl = getProjectVideo(slug, images)
                          
                          if (videoUrl) {
                            return (
                              <VideoWithPlaceholder
                                videoUrl={videoUrl}
                                theme={theme}
                                designSystem={designSystem}
                              />
                            )
                          }
                          
                          // Mostrar imagen si no hay video - RENDERIZADO LIMPIO
                          if (image) {
                            return (
                        <GatsbyImage
                          image={image}
                          alt={title}
                                loading="lazy"
                        />
                            )
                          }
                          
                          // Placeholder si no hay ni video ni imagen
                          return (
                            <div className="placeholder" />
                          )
                        })()}
                    </ProjectImage>
                    
                      {/* Overlay */}
                      <ProjectOverlay 
                        className="project-overlay" 
                        $theme={theme} 
                        $designSystem={designSystem}
                        $isDark={isDark}
                      />
                      
                      {/* Contenido en hover */}
                      <ProjectHoverContent 
                        className="project-content" 
                                $theme={theme} 
                                $designSystem={designSystem}
                        $isDark={isDark}
                      >
                        <div className="project-title">{title}</div>
                        <div className="project-subtitle">{getProjectSubtitle(category, from)}</div>
                        <div className="project-button">
                          Ver proyecto
                          <FiExternalLink size={14} />
                        </div>
                      </ProjectHoverContent>
                    </ProjectCardVisual>

                    {/* Información del proyecto debajo de la card */}
                    <ProjectInfo 
                                $theme={theme} 
                                $designSystem={designSystem}
                              >
                      <ProjectInfoTitle 
                        className="project-info-title"
                        $theme={theme} 
                        $designSystem={designSystem}
                      >
                        {title}
                      </ProjectInfoTitle>
                      <ProjectInfoRole 
                        className="project-info-role"
                        $theme={theme} 
                        $designSystem={designSystem}
                      >
                        {getProjectSubtitle(category, from)}
                      </ProjectInfoRole>
                    </ProjectInfo>
                  </ProjectCard>
                )
              })}
            </ProjectsGrid>
          ) : (
            <NoResults $theme={theme} $designSystem={designSystem}>
              <FiSearch className="icon" />
              <h3>No se encontraron proyectos</h3>
              <p>Intenta con diferentes términos de búsqueda o explora todas las categorías disponibles.</p>
            </NoResults>
          )}
        </ProjectsSection>
      </Container>
    </Layout2025>
    </>
  )
}

export default TrabajosPage

export const query = graphql`
  query TrabajosPageQuery {
    allProjectsYaml(
      sort: { from: DESC }
    ) {
      edges {
        node {
          title
          slug
          category
          from
          color
          desc
          images
          cover
        }
      }
    }
    allFile(filter: { 
      sourceInstanceName: { in: ["projects", "content"] }, 
      extension: { in: ["mp4", "webm", "mov"] }
    }) {
      nodes {
        id
        name
        extension
        relativeDirectory
        publicURL
      }
    }
  }
` 
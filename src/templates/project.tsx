import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import { FiCode, FiExternalLink } from 'react-icons/fi'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import ProjectShowcase from '../components/ProjectShowcase'
import FeaturedWorksCarousel from '../components/featured-works-carousel'
import { useTheme2025 } from '../utils/theme-context-2025'
// 🎯 ICONS ELIMINADOS: Enfoque tipográfico sin iconos
// Solo manteniendo share modal si es necesario

// 🎬 Premium animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 🏗️ Modern Container
const Container = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.$designSystem?.spacing?.[8] || '1rem'};
  
  @media (max-width: 768px) {
    padding: 0 ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
  }
`

// 🎯 Navigation Bar
const ProjectNavigation = styled.nav<{ $theme: any; $designSystem: any }>`
  position: sticky;
  top: 0;
  background: ${props => props.$theme?.colors?.bg?.primary || '#f8fafc'}95;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} 0;
  margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '1.5rem'};
  z-index: 50;
  
  .nav-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    .nav-actions {
      position: absolute;
      right: 0;
      display: flex;
      gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
      
      @media (max-width: 768px) {
        position: static;
        margin-top: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
      }
    }
  }
  
  @media (max-width: 768px) {
    .nav-content {
      flex-direction: column;
      align-items: center;
    }
  }
`

const ModernBreadcrumb = styled.nav<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  padding: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'} ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  box-shadow: 0 4px 12px ${props => props.$theme?.colors?.shadow?.primary || 'rgba(0,0,0,0.1)'}10;
  
  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
    transition: all 0.3s ease;
    
    a {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
      color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
      text-decoration: none;
      padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
      border-radius: ${props => props.$designSystem?.radius?.lg || '0.5rem'};
      transition: all 0.3s ease;
      
      &:hover {
        color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
        background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}10;
        transform: translateY(-1px);
      }
      
      .icon {
        width: 16px;
        height: 16px;
      }
    }
    
    &.current {
      color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
      background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}15;
      padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
      border-radius: ${props => props.$designSystem?.radius?.lg || '0.5rem'};
      
      .icon {
        color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      }
    }
    
    .separator {
      width: 14px;
      height: 14px;
      color: ${props => props.$theme?.colors?.text?.tertiary || '#94a3b8'};
      margin: 0 ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
    }
  }
  
  @media (max-width: 640px) {
    padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
    
    .breadcrumb-item {
      font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
      
      .text {
        display: none;
      }
    }
  }
`

// 🎯 MINIMALISTA: Navigation Ultra-Clean (Dark Mode Optimized)
const MinimalistNavigation = styled.nav<{ $theme: any; $designSystem: any }>`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${props => props.$theme?.colors?.bg?.primary || 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-bottom: 0px solid ${props => props.$theme?.colors?.border?.primary || 'rgba(226, 232, 240, 0.6)'};
  transition: all 0.3s ease;
  
  .nav-content {
  display: flex;
    justify-content: space-between;
  align-items: center;
    padding: 1rem 0;
    min-height: 60px;
  }
  
  .back-link {
    font-family: ${props => props.$designSystem?.typography?.fonts?.body || 'system-ui, sans-serif'};
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: ${props => props.$designSystem?.borderRadius?.full || '9999px'};
    border: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
      border-color: ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
      transform: translateX(-2px);
    }
  }
  
  .share-button {
    background: transparent;
    border: 1px solid ${props => props.$theme?.name === 'light' ? '#000000' : props.$theme?.colors?.border?.primary || '#e5e7eb'};
    font-size: 1.1rem;
    color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
  cursor: pointer;
    padding: 0.5rem;
    border-radius: ${props => props.$designSystem?.borderRadius?.full || '9999px'};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  
  &:hover {
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
      background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      transform: rotate(45deg) scale(1.1);
    }
  }
  
  /* 📱 MOBILE: Aún más minimalista */
  @media (max-width: 768px) {
    .nav-content {
      padding: 0.75rem 0;
      min-height: 50px;
    }
    
    .back-link {
      font-size: 0.9rem;
      padding: 0.375rem 0.75rem;
    }
    
    .share-button {
      font-size: 1rem;
      width: 36px;
      height: 36px;
    }
  }
`

// 🎯 HERO SECTION REDISEÑADO: Multimedia Protagonista
const HeroSection = styled.section<{ $theme: any; $designSystem: any }>`
  position: relative;
  margin: -2rem -2rem 0 -2rem; /* Full-bleed por defecto */
  
  /* 📱 MOBILE-FIRST: Stack vertical elegante */
  display: flex;
  flex-direction: column;
  
  /* 🖥️ DESKTOP: Mantener stack vertical para consistencia */
  @media (min-width: 969px) {
    margin: -2rem -4rem 0 -4rem; /* Más full-bleed en desktop */
  }
`



// 📝 ELEGANT CONTENT: Typography-focused
const ElegantContent = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme?.colors?.bg?.primary || '#ffffff'};
  padding: 2rem;
  
  .content-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .category-minimal {
    font-family: ${props => props.$designSystem?.typography?.fonts?.body || 'system-ui, sans-serif'};
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
    color: ${props => props.$theme?.colors?.text?.tertiary || '#9ca3af'};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }
  
  .project-title {
    font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    line-height: 1.2;
    color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .project-subtitle {
    font-family: ${props => props.$designSystem?.typography?.fonts?.body || 'system-ui, sans-serif'};
    font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
    line-height: 1.6;
    color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
    margin-bottom: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .meta-elegant {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    
    .meta-item {
      font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
      color: ${props => props.$theme?.colors?.text?.tertiary || '#9ca3af'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
    }
    
    .meta-separator {
      color: ${props => props.$theme?.colors?.text?.quaternary || '#d1d5db'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.normal || '400'};
    }
  }
  
  .primary-action {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: transparent;
    color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
    text-decoration: none;
    border-radius: ${props => props.$designSystem?.borderRadius?.full || '9999px'};
    border: 2px solid ${props => props.$theme?.name === 'light' ? '#000000' : props.$theme?.colors?.border?.primary || '#e5e7eb'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
      transition: all 0.3s ease;
      z-index: -1;
    }
    
    &:hover {
      border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      transform: translateY(-2px) scale(1.02);
      
      &::before {
        left: 0;
      }
    }
  }
  
  /* 📱 MOBILE: Ajustes específicos con padding mejorado */
  @media (max-width: 768px) {
    padding: 2rem 1rem; /* Más padding superior para evitar cortes */
    
    .content-inner {
      padding-top: 1rem; /* Espacio adicional para el título */
    }
    
    .project-title {
      font-size: clamp(1.5rem, 8vw, 2.2rem); /* Tamaño más conservador */
      line-height: 1.3; /* Mejor line-height para títulos largos */
      margin-bottom: 0.75rem; /* Menos espacio abajo */
      word-break: break-word; /* Permite romper palabras largas */
      hyphens: auto; /* Hifenado automático en idiomas que lo soporten */
    }
    
    .project-subtitle {
      font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
      line-height: 1.5; /* Mejor legibilidad */
      margin-bottom: 1rem;
    }
    
    .meta-elegant {
      gap: 0.5rem;
      font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
      margin-bottom: 1.5rem; /* Mejor espaciado */
    }
    
    .primary-action {
      padding: 0.625rem 1.5rem;
      font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    }
  }
  
  /* 📱 MOBILE EXTRA PEQUEÑO: Ajustes adicionales */
  @media (max-width: 480px) {
    padding: 2.5rem 0.75rem; /* Aún más padding superior */
    
    .content-inner {
      padding-top: 1.5rem; /* Espacio extra para pantallas muy pequeñas */
    }
    
    .project-title {
      font-size: clamp(1.25rem, 9vw, 1.8rem); /* Título más pequeño en pantallas tiny */
      line-height: 1.4;
    }
  }
`

// 📝 ELEGANT MAIN CONTENT: Typography-focused sin iconos
const ElegantMainContent = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
  
  .content-section {
    margin-bottom: 3rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .section-title {
    font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  
  .lead-text {
    font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
    line-height: 1.7;
    color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
    margin-bottom: 1rem;
    
    strong {
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    }
  }
  
  .description-text {
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    line-height: 1.6;
    color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
  }
  
  .project-details-grid {
  display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    background: ${props => props.$theme?.colors?.bg?.primary || '#ffffff'};
    border-radius: ${props => props.$designSystem?.borderRadius?.xl || '1rem'};
    border: 2px solid ${props => props.$theme?.colors?.border?.primary || '#d1d5db'};
    margin-top: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    &.technologies-item {
      grid-column: 1 / -1;
    }
  }
  
  .detail-label {
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    color: ${props => props.$theme?.colors?.text?.secondary || '#4b5563'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .detail-value {
    font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
    color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
  }
  
  .technologies-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .tech-badge {
    padding: 0.375rem 0.875rem;
    background: ${props => props.$theme?.colors?.interactive?.primary || '#1d4ed8'};
    color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
    border: 1px solid ${props => props.$theme?.colors?.interactive?.primary || '#1d4ed8'};
    border-radius: ${props => props.$designSystem?.borderRadius?.full || '9999px'};
    font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
    font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
    transition: all 0.2s ease;
    
    &:hover {
      background: ${props => props.$theme?.colors?.interactive?.hover || '#1e40af'};
      border-color: ${props => props.$theme?.colors?.interactive?.hover || '#1e40af'};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${props => props.$theme?.colors?.interactive?.primary || '#1d4ed8'}40;
    }
  }
  
  /* 📱 MOBILE: Optimizaciones específicas */
  @media (max-width: 768px) {
    padding: 1.5rem 0;
    
    .content-section {
      margin-bottom: 2rem;
    }
    
    .section-title {
      font-size: clamp(1.25rem, 4vw, 1.5rem);
    }
    
    .lead-text {
      font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    }
    
    .project-details-grid {
      padding: 1.5rem;
      gap: 1rem;
  grid-template-columns: 1fr;
    }
    
    .detail-item.technologies-item {
      grid-column: 1;
    }
    
    .tech-badge {
      font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
      padding: 0.25rem 0.75rem;
    }
  }
`

// 🖼️ Imagen hero mejorada para responsive
const HeroImageContainer = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  
  /* 🎯 ALTURA RESPONSIVE MEJORADA */
  height: clamp(50vh, 70vh, 800px); /* Altura flexible */
  min-height: 400px;
  max-height: 800px;
  
  /* 🎯 SOLUCIÓN DEFINITIVA - MÁXIMA ESPECIFICIDAD CSS */
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
    object-position: center center !important;
    display: block !important;
    
    /* Renderizado de alta calidad */
    image-rendering: optimizeQuality !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    
    /* Fix sub-pixel rendering */
    transform: translateZ(0) !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
  }
  
  /* Videos con especificidad máxima */
  video {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
    display: block !important;
    background: ${props => props.$theme?.colors?.bg?.tertiary || '#f1f5f9'} !important;
    
    /* Ocultar controles */
    &::-webkit-media-controls,
    &::-webkit-media-controls-panel,
    &::-webkit-media-controls-play-button {
      display: none !important;
      -webkit-appearance: none !important;
    }
  }
  
  /* Contenedor absoluto para cualquier media */
  > * {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  /* 📱 MOBILE OPTIMIZADO */
  @media (max-width: 968px) {
    height: clamp(40vh, 50vh, 500px); /* Altura más conservadora en mobile */
    min-height: 300px;
    max-height: 500px;
    
    /* Asegurar que la imagen se vea completa en mobile */
    .gatsby-image-wrapper img,
    video {
      object-fit: contain !important; /* Mostrar imagen completa en mobile */
      background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'} !important;
    }
  }
  
  /* 📱 MOBILE PEQUEÑO */
  @media (max-width: 640px) {
    height: clamp(35vh, 45vh, 400px);
    min-height: 250px;
    max-height: 400px;
  }
`

// 📝 Contenido del texto optimizado para mobile
const HeroTextContainer = styled.div<{ $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem?.spacing?.[8] || '1rem'} 0;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 968px) {
    text-align: center;
    padding: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  }
`

const HeroContent = styled.div<{ $theme: any; $designSystem: any }>`
  position: relative;
  z-index: 3;
  padding: ${props => props.$designSystem?.spacing?.[16] || '2rem'} ${props => props.$designSystem?.spacing?.[8] || '1rem'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 400px;
  max-width: 900px;
  
  @media (max-width: 968px) {
    text-align: center;
    align-items: center;
    padding: ${props => props.$designSystem?.spacing?.[12] || '1.5rem'} ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
    min-height: 350px;
  }
`

const HeroText = styled.div<{ $designSystem: any }>`
  animation: ${fadeInUp} 0.8s ease-out;
  
  .category-badge {
    margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '0.5rem'};
  }
`

const ProjectTitle = styled.h1<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
  font-size: clamp(2rem, 5vw, 3.5rem); /* Título más conservador */
  font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
  line-height: ${props => props.$designSystem?.typography?.leading?.tight || '1.2'};
  color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
  margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '0.5rem'};
  letter-spacing: -0.02em;
  
  @media (max-width: 968px) {
    font-size: clamp(1.75rem, 6vw, 2.5rem); /* Más pequeño en mobile */
    margin-bottom: ${props => props.$designSystem?.spacing?.[3] || '0.375rem'};
  }
`

const ProjectSubtitle = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
  color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
  line-height: ${props => props.$designSystem?.typography?.leading?.relaxed || '1.6'};
  margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
  max-width: 600px; /* Más conservador */
  font-weight: ${props => props.$designSystem?.typography?.weight?.normal || '400'};
  
  @media (max-width: 968px) {
    font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
    margin: 0 auto ${props => props.$designSystem?.spacing?.[4] || '0.5rem'} auto;
    max-width: 100%;
  }
`

const HeroMeta = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem?.spacing?.[4] || '0.5rem'};
  margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
  flex-wrap: wrap;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`

const MetaItem = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  padding: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$theme?.colors?.bg?.tertiary || '#f1f5f9'};
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
  }
  
  svg {
    color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    font-size: 16px;
  }
`

const HeroActions = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  align-items: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  }
`

const PrimaryAction = styled.a<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} ${props => props.$designSystem?.spacing?.[8] || '2rem'};
  background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
  border: none;
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'system-ui, sans-serif'};
  font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  
  &:hover {
    background: ${props => props.$theme?.colors?.interactive?.secondary || '#2563eb'};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`

const SecondaryAction = styled.button<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  background: transparent;
  color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
  border: 2px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.full || '9999px'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'system-ui, sans-serif'};
  font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    transform: translateY(-1px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`

// 📱 Contenido principal reorganizado y simplificado
const ProjectContent = styled.div<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem?.spacing?.[16] || '2rem'};
  
  /* 📱 MOBILE: Mostrar ProjectShowcase primero */
  @media (max-width: 968px) {
    .content-order-mobile {
      display: flex;
      flex-direction: column;
      
      .project-showcase {
        order: 1; /* Multimedia primero */
        margin: ${props => props.$designSystem?.spacing?.[8] || '1rem'} 0;
      }
      
      .main-content {
        order: 2; /* Texto después */
      }
    }
  }
`

const MainContent = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 800px;
  margin: 0 auto;
  
  .content-section {
    margin-bottom: ${props => props.$designSystem?.spacing?.[12] || '1.5rem'};
    
    h2 {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
      font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
      font-size: ${props => props.$designSystem?.typography?.scale?.xl || '1.25rem'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
      margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '0.5rem'};
      
      svg {
        color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
        width: 20px;
        height: 20px;
      }
    }
    
    p {
      font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
      line-height: ${props => props.$designSystem?.typography?.leading?.relaxed || '1.6'};
      color: ${props => props.$theme?.colors?.text?.secondary || '#6b7280'};
      margin-bottom: ${props => props.$designSystem?.spacing?.[4] || '0.5rem'};
      
      &.lead {
        font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
        color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
        margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
      }
    }
    
    /* 📱 MOBILE: Reducir espaciado */
    @media (max-width: 968px) {
      margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '1rem'};
      
      h2 {
        font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1.125rem'};
        margin-bottom: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
      }
      
      p {
        font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
        
        &.lead {
          font-size: ${props => props.$designSystem?.typography?.scale?.base || '1rem'};
        }
      }
    }
  }
`

const Sidebar = styled.aside<{ $theme: any; $designSystem: any }>`
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  
  .sidebar-section {
    background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
    border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
    border-radius: ${props => props.$designSystem?.radius?.['2xl'] || '0.75rem'};
    padding: ${props => props.$designSystem?.spacing?.[8] || '1rem'};
    margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '1rem'};
    position: sticky;
    top: ${props => props.$designSystem?.spacing?.[20] || '2.5rem'};
    
    h3 {
      font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
      font-size: ${props => props.$designSystem?.typography?.scale?.lg || '1rem'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
      margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
      
      svg {
        color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
      }
    }
  }
`

const TechGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'};
  margin-bottom: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
`

const TechTag = styled.span<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  padding: ${props => props.$designSystem?.spacing?.[3] || '0.75rem'} ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}15;
  color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  border: 1px solid ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}30;
  border-radius: ${props => props.$designSystem?.radius?.lg || '0.5rem'};
  font-family: ${props => props.$designSystem?.typography?.fonts?.sans || 'sans-serif'};
  font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
  font-weight: ${props => props.$designSystem?.typography?.weight?.medium || '500'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}40;
  }
`

const ProjectStats = styled.div<{ $designSystem: any }>`
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.$designSystem?.spacing?.[4] || '1rem'} 0;
    border-bottom: 1px solid ${props => props.$designSystem?.colors?.border?.secondary || '#e2e8f0'};
    
    &:last-child {
      border-bottom: none;
    }
    
    .stat-label {
      font-size: ${props => props.$designSystem?.typography?.scale?.sm || '0.875rem'};
      color: ${props => props.$designSystem?.colors?.text?.secondary || '#64748b'};
    }
    
    .stat-value {
      font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
      color: ${props => props.$designSystem?.colors?.text?.primary || '#0f172a'};
    }
  }
`

// 🔗 Navigation Between Projects
const ProjectNavControls = styled.section<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme?.colors?.bg?.secondary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.['2xl'] || '0.75rem'};
  padding: ${props => props.$designSystem?.spacing?.[8] || '1rem'};
  margin: ${props => props.$designSystem?.spacing?.[16] || '2rem'} 0;
  
  .nav-header {
    text-align: center;
    margin-bottom: ${props => props.$designSystem?.spacing?.[8] || '1rem'};
    
    h3 {
      font-family: ${props => props.$designSystem?.typography?.fonts?.display || 'system-ui, sans-serif'};
      font-size: ${props => props.$designSystem?.typography?.scale?.xl || '1.25rem'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.bold || '700'};
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
      margin-bottom: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
    }
    
    p {
      color: ${props => props.$theme?.colors?.text?.secondary || '#64748b'};
    }
  }
  
  .nav-controls {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: ${props => props.$designSystem?.spacing?.[6] || '0.75rem'};
    align-items: center;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
    }
  }
`

const ProjectNavCard = styled(Link)<{ $align: 'left' | 'right'; $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem?.spacing?.[4] || '1rem'};
  padding: ${props => props.$designSystem?.spacing?.[6] || '1.5rem'};
  background: ${props => props.$theme?.colors?.bg?.primary || '#f8fafc'};
  border: 1px solid ${props => props.$theme?.colors?.border?.primary || '#e5e7eb'};
  border-radius: ${props => props.$designSystem?.radius?.xl || '0.75rem'};
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  flex-direction: ${props => props.$align === 'right' ? 'row-reverse' : 'row'};
  text-align: ${props => props.$align === 'right' ? 'right' : 'left'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    border-color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  }
  
  .nav-icon {
    width: 40px;
    height: 40px;
    border-radius: ${props => props.$designSystem?.radius?.lg || '0.5rem'};
    background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}15;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  .nav-text {
    .nav-label {
      font-size: ${props => props.$designSystem?.typography?.scale?.xs || '0.75rem'};
      color: ${props => props.$theme?.colors?.text?.tertiary || '#94a3b8'};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: ${props => props.$designSystem?.spacing?.[1] || '0.25rem'};
    }
    
    .nav-title {
      font-size: ${props => props.$designSystem?.typography?.scale?.base || '0.875rem'};
      font-weight: ${props => props.$designSystem?.typography?.weight?.semibold || '600'};
      color: ${props => props.$theme?.colors?.text?.primary || '#000000'};
    }
  }
`

const BackToWorksButton = styled(Link)<{ $theme: any; $designSystem: any }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$designSystem?.spacing?.[2] || '0.5rem'};
  width: 60px;
  height: 60px;
  background: ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'};
  color: ${props => props.$theme?.colors?.text?.inverse || '#ffffff'};
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}40;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 30px ${props => props.$theme?.colors?.interactive?.primary || '#3b82f6'}60;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`

// 🏗️ Interfaces
interface ProjectTemplateProps {
  data: {
    projectsYaml: {
      title: string
      title_detail?: string
      slug: string
      category?: string
      from?: string
      link?: string
      desc?: string
      images?: string
      cover?: string
    } | null
    projectImages: {
      edges: Array<{
        node: {
          id: string
          name: string
          relativePath: string
          publicURL?: string
          childImageSharp?: {
            gatsbyImageData?: IGatsbyImageData
          }
          fields?: {
            projectFolder?: string
            isImage?: boolean
          }
        }
      }>
    }
    projectVideos: {
      edges: Array<{
        node: {
          id: string
          name: string
          relativePath: string
          publicURL?: string
          fields?: {
            projectFolder?: string
            isVideo?: boolean
          }
        }
      }>
    }
    projectDocuments: {
      edges: Array<{
        node: {
          id: string
          name: string
          relativePath: string
          publicURL?: string
          extension: string
          fields?: {
            projectFolder?: string
            isDocument?: boolean
          }
        }
      }>
    }
    allProjectsYaml: {
      edges: Array<{
        node: {
          title: string
          slug: string
          category?: string
          from?: string
          cover?: string
        }
      }>
    }
  }
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => {
  const { theme, designSystem } = useTheme2025()
  const project = data.projectsYaml
  const [isShareOpen, setIsShareOpen] = useState(false)
  
  if (!project) {
    return (
      <Layout2025>
        <Container $theme={theme} $designSystem={designSystem}>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Proyecto no encontrado</h1>
            <p>El proyecto que buscas no existe.</p>
          </div>
        </Container>
      </Layout2025>
    )
  }

  const { title, title_detail, slug, category, from, link, desc } = project

  // Extraer tecnologías específicas del campo category (filtrar roles/descripciones generales)
  const extractTechnologies = (category?: string): string[] => {
    if (!category) return []
    
    const allCategories = category
      .split('#')
      .map((cat: string) => cat.trim())
      .filter((cat: string) => cat.length > 0)
    
    // Filtrar tecnologías específicas (no roles generales)
    const roleKeywords = [
      'UX/UI', 'ux/ui', 'Branding', 'branding', 'Motion Graphics', 'motion graphics',
      'Full-Stack', 'full-stack', 'Entrepreneurship', 'entrepreneurship',
      'Team Leadership', 'team leadership', 'Corporate', 'corporate'
    ]
    
    const technologies = allCategories.filter(cat => {
      // Excluir roles generales pero mantener tecnologías específicas
      const isGeneralRole = roleKeywords.some(keyword => 
        cat.toLowerCase().includes(keyword.toLowerCase())
      )
      
      // Mantener tecnologías específicas y conceptos técnicos
      const isTechnology = [
        'React', 'TypeScript', 'Node.js', 'WordPress', 'PHP', 'Blockchain',
        'After Effects', 'Fintech', 'E-commerce', 'Animation', 'Healthcare',
        'Mobile', 'Responsive', 'SEO', 'Performance', 'Accessibility',
        'Data Visualization', 'Education', 'Web Development', 'CMS'
      ].some(tech => cat.includes(tech))
      
      return !isGeneralRole || isTechnology
    })
    
    return technologies
  }
  
  // Extraer rol principal del proyecto basado en las categorías
  const getProjectRole = (category?: string): string => {
    if (!category) return 'Full-Stack Developer'
    
    const categories = category.toLowerCase()
    
    // Mapeo específico basado en patrones de categorías
    if (categories.includes('motion graphics') || categories.includes('animation')) {
      return 'Motion Graphics Designer'
    }
    if (categories.includes('ux/ui') && categories.includes('full-stack')) {
      return 'UX/UI Designer & Full-Stack Developer'
    }
    if (categories.includes('ux/ui') && categories.includes('branding')) {
      return 'UX/UI Designer & Brand Strategist'
    }
    if (categories.includes('ux/ui')) {
      return 'UX/UI Designer'
    }
    if (categories.includes('full-stack')) {
      return 'Full-Stack Developer'
    }
    if (categories.includes('branding')) {
      return 'Brand Designer'
    }
    if (categories.includes('team leadership')) {
      return 'Design Lead & Full-Stack Developer'
    }
    if (categories.includes('entrepreneurship')) {
      return 'Founder & Full-Stack Developer'
    }
    
    return 'Full-Stack Developer'
  }

  // Extraer enlace de HTML embebido
  const extractLinkFromHtml = (htmlString: string): string | null => {
    if (!htmlString) return null
    const match = htmlString.match(/href=["']([^"']+)["']/)
    return match ? match[1] : null
  }

  // Obtener cliente según el proyecto
  const getProjectClient = (slug: string): string => {
    const clients: { [key: string]: string } = {
      'mediolanum': 'Banco Mediolanum',
      'ehtb': 'INS Escola d\'Hoteleria i Turisme de Barcelona',
      'vimax': 'VIMAX',
      'prats': 'PRATS',
      'tram': 'TRAM',
      'gdt': 'Galerías del Tresillo',
      'sergat': 'Sergat',
      'se': 'Sergat',
      'blockend': 'StartupPack • Metalyfe',
      'be': 'StartupPack • Metalyfe',
      'agora': 'Agora',
      'blou': 'Blou',
      'cec': 'CEC',
      'ipb': 'IPB',
      'sp': 'StartupPack • Metalyfe',
      'coinecocal': 'StartupPack • Metalyfe',
      'wc': 'WinCrypto',
      'wns': 'WNS'
    }
    
    return clients[slug] || 'Cliente Corporativo'
  }

  // Obtener agencia según el proyecto  
  const getProjectAgency = (slug: string): string => {
    const pajarracoClients = ['vimax', 'prats', 'tram', 'gdt']
    const startuppackClients = ['blockend', 'be', 'sp', 'coinecocal']
    
    if (pajarracoClients.includes(slug)) {
      return 'Pajarraco Agency'
    }
    
    if (startuppackClients.includes(slug)) {
      return 'StartupPack'
    }
    
    // Los nuevos proyectos mediolanum y ehtb son freelance
    return 'Freelance'
  }

  // 🖼️ Función para obtener la mejor imagen de fondo
  const getBestBackgroundImage = (): string | undefined => {
    // 1. Usar imagen de cover si existe y es string (URL)
    if (project.cover && typeof project.cover === 'string') {
      return project.cover
    }

    // 2. Usar la primera imagen del proyecto si existe
    if (data.projectImages.edges.length > 0) {
      const firstImage = data.projectImages.edges[0].node
      if (firstImage.childImageSharp?.gatsbyImageData?.images?.fallback?.src) {
        return firstImage.childImageSharp.gatsbyImageData.images.fallback.src
      }
    }

    return undefined
  }

  const technologies = extractTechnologies(category)
  const projectLink = extractLinkFromHtml(link || '')

  // Navegación entre proyectos
  const allProjects = data.allProjectsYaml.edges
  const currentIndex = allProjects.findIndex(edge => edge.node.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1].node : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1].node : null

  // 📊 Filtrar archivos por carpeta del proyecto
  const projectFolderName = project.images // Obtener el nombre de la carpeta del proyecto
  
  // 🐛 Debug en desarrollo - solo una vez al cargar
  React.useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`🎯 Proyecto: ${title}`)
      console.log(`📁 Carpeta del proyecto: ${projectFolderName}`)
      console.log(`📊 Total imágenes disponibles:`, data.projectImages.edges.length)
      console.log(`🎥 Total videos disponibles:`, data.projectVideos.edges.length)
      console.log(`📄 Total documentos disponibles:`, data.projectDocuments.edges.length)
    }
  }, [])
  
  const projectImages = data.projectImages.edges.filter(edge => 
    edge.node.relativePath.includes(`${projectFolderName}/`)
  )
  const projectVideos = data.projectVideos.edges.filter(edge => 
    edge.node.relativePath.includes(`${projectFolderName}/`)
  )
  const projectDocuments = data.projectDocuments.edges.filter(edge => 
    edge.node.relativePath.includes(`${projectFolderName}/`)
  )
  
  // 🐛 Debug filtros en desarrollo - solo una vez
  React.useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`📊 Después del filtro para "${projectFolderName}":`)
      console.log(`   🖼️ Imágenes filtradas: ${projectImages.length}`)
      console.log(`   🎥 Videos filtrados: ${projectVideos.length}`)
      console.log(`   📄 Documentos filtrados: ${projectDocuments.length}`)
    }
  }, [projectFolderName, projectImages.length, projectVideos.length, projectDocuments.length])

  const coverImage = null // cover es ahora un string, no un objeto con childImageSharp
  const backgroundImage = getBestBackgroundImage()

  return (
    <Layout2025>
      <SEO 
        title={`${title} - Miquel Xarau | Portfolio`}
        desc={title_detail || desc || `Proyecto ${title} - Desarrollo y diseño digital profesional.`}
      />
      
      {/* 🎯 Navigation Minimalista - Typographic Focus */}
      <MinimalistNavigation $theme={theme} $designSystem={designSystem}>
        <Container $theme={theme} $designSystem={designSystem}>
          <div className="nav-content">
            <Link to="/trabajos" className="back-link">
              ←&nbsp;&nbsp;Trabajos
                </Link>
            
            <button 
              className="share-button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    text: `Mira este proyecto: ${title}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  // TODO: Add toast notification
                }
              }}
              aria-label="Compartir proyecto"
            >
              ↗
            </button>
          </div>
        </Container>
      </MinimalistNavigation>

      <Container $theme={theme} $designSystem={designSystem}>
        {/* 🎯 HERO SIMPLIFICADO: Solo contenido */}
        <HeroSection $theme={theme} $designSystem={designSystem}>
          
          {/* 📝 CONTENIDO ELEGANTE: Typography-focused */}
          <ElegantContent className="elegant-content" $theme={theme} $designSystem={designSystem}>
            <div className="content-inner">
              {/* Categoría minimalista */}
              <div className="category-minimal">
                {technologies[0] || 'Corporate'}
              </div>
              
              {/* Título principal */}
              <h1 className="project-title">
                {title}
              </h1>
              
              {/* Subtítulo elegante */}
              <p className="project-subtitle">
                {title_detail || desc || 'Plataforma digital que combina diseño estratégico y tecnología de vanguardia.'}
              </p>
              
              {/* Meta info elegante */}
              <div className="meta-elegant">
                <span className="meta-item">{from || '2023'}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">{technologies.length} tecnologías</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">{getProjectRole(category).split(' & ')[0]}</span>
              </div>
              
              {/* Acción principal */}
                {projectLink && (
                <a 
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="primary-action"
                  >
                    Ver online
                </a>
                )}
            </div>
          </ElegantContent>
        </HeroSection>

        {/* Main Content with Mobile Reordering */}
        <ProjectContent $designSystem={designSystem}>
          <div className="content-order-mobile">
            {/* 🎨 Project Showcase - Multimedia primero en mobile */}
            <div className="project-showcase">
              <ProjectShowcase
                projectImages={projectImages}
                projectVideos={projectVideos}
                projectDocuments={projectDocuments}
                projectTitle={title}
              />
            </div>

            {/* 📝 CONTENIDO PRINCIPAL REDISEÑADO: Typography-focused */}
            <ElegantMainContent className="main-content" $theme={theme} $designSystem={designSystem}>
              {/* Sección Enfoque - Minimalista */}
            <div className="content-section">
                <h2 className="section-title">
                  Enfoque
              </h2>
                <p className="lead-text">
                  <strong>{title}</strong> representa una solución digital estratégica que combina diseño contemporáneo y tecnología de vanguardia.
              </p>
              
              {desc && (
                  <p className="description-text">{desc}</p>
              )}
            </div>
            
              {/* Detalles del Proyecto - Grid Elegante */}
            <div className="content-section">
                <h2 className="section-title">
                  Detalles del Proyecto
              </h2>
                
                <div className="project-details-grid">
                  <div className="detail-item">
                    <div className="detail-label">Año</div>
                    <div className="detail-value">{from || '2023'}</div>
                </div>
                  <div className="detail-item">
                    <div className="detail-label">Rol</div>
                    <div className="detail-value">{getProjectRole(category)}</div>
                </div>
                  <div className="detail-item">
                    <div className="detail-label">Cliente</div>
                    <div className="detail-value">{getProjectClient(slug)}</div>
                </div>
                  <div className="detail-item">
                    <div className="detail-label">Agencia</div>
                    <div className="detail-value">{getProjectAgency(slug)}</div>
                  </div>
                  
            {technologies.length > 0 && (
                    <div className="detail-item technologies-item">
                      <div className="detail-label">Stack Tecnológico</div>
                      <div className="technologies-grid">
                      {technologies.slice(0, 6).map((tech) => (
                          <span key={tech} className="tech-badge">
                      {tech}
                        </span>
                  ))}
                    </div>
              </div>
            )}
                </div>
                </div>
            </ElegantMainContent>
          </div>
        </ProjectContent>

      </Container>
      
      {/* 🎯 CARRUSEL OTROS TRABAJOS - ANCHO COMPLETO COMO HOME */}
      <div style={{ 
        marginTop: '4rem', 
        marginBottom: '2rem',
        background: theme.colors.bg.primary 
      }}>
        {/* Títulos con Container pero carrusel fuera para ancho completo */}
        <Container $theme={theme} $designSystem={designSystem}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: '600',
            color: theme.colors.text.primary 
          }}>
            Otros trabajos
          </h2>
          <p style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: theme.colors.text.secondary,
            fontSize: '1.1rem'
          }}>
            Explora otros trabajos destacados
          </p>
        </Container>
        
        {/* Carrusel fuera del Container para ocupar todo el ancho */}
        <FeaturedWorksCarousel />
      </div>
    </Layout2025>
  )
}

export default ProjectTemplate

// 🚀 QUERY GRAPHQL CORREGIDA - Solución definitiva usando relativePath
export const query = graphql`
  query ProjectQuery($slug: String!) {
    projectsYaml(slug: { eq: $slug }) {
      title
      title_detail
      slug
      category
      from
      link
      desc
      images
      cover
    }
    projectImages: allFile(
      filter: {
        sourceInstanceName: { in: ["content", "projects"] }
        relativePath: { regex: "/(^|/)projects/" }
        extension: { in: ["jpg", "jpeg", "png", "gif", "webp", "avif"] }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 85
            )
          }
        }
      }
    }
    projectVideos: allFile(
      filter: {
        sourceInstanceName: { in: ["content", "projects"] }
        extension: { in: ["mp4", "webm", "mov", "m4v"] }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          relativePath
          publicURL
        }
      }
    }
    projectDocuments: allFile(
      filter: {
        sourceInstanceName: { in: ["content", "projects"] }
        relativePath: { regex: "/(^|/)projects/" }
        extension: { in: ["pdf", "doc", "docx", "ppt", "pptx"] }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          relativePath
          publicURL
          extension
        }
      }
    }
    allProjectsYaml(sort: { from: DESC }) {
      edges {
        node {
          title
          slug
          category
          from
          cover
        }
      }
    }
  }
`

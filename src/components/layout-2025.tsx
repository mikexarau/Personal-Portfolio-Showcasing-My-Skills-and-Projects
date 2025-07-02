import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { 
  FiSun,
  FiMoon,
  FiX,
  FiMenu,
  FiMapPin,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiHome,
  FiBriefcase,
  FiCode,
  FiUser,
  FiEdit,
  FiArrowRight
} from 'react-icons/fi'
import { 
  SiGithub,
  SiLinkedin,
  SiVimeo,
  SiX
} from 'react-icons/si'
import { 
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCode,
  HiOutlineMail,
  HiOutlineExternalLink,
  HiOutlineGlobeAlt
} from 'react-icons/hi'
import { Helmet } from 'react-helmet'
// import Navbar2025 from './navbar-2025'
// import Footer2025 from './footer-2025'
// import SocialProof2025 from './social-proof-2025'
import '../styles/global-unified-2025.css'
import CustomCursor from './CustomCursor'
import CookieBanner from './CookieBanner'
import ScrollProgress from './ScrollProgress'
import { CRITICAL_A11Y_CSS } from '../utils/accessibility-performance-2025'

// 🌐 Global Styles - Modern and Clean
const GlobalStyle = createGlobalStyle<{ $theme: any; $designSystem: any }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.base};
    line-height: ${props => props.$designSystem.typography.leading.normal};
    font-weight: ${props => props.$designSystem.typography.weight.normal};
    color: ${props => props.$theme.colors.text.primary};
    background-color: ${props => props.$theme.colors.bg.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }
  
  /* Professional heading defaults */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    line-height: ${props => props.$designSystem.typography.leading.tight};
    letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
    color: ${props => props.$theme.colors.text.primary};
  }
  
  /* Professional paragraph defaults */
  p {
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    color: ${props => props.$theme.colors.text.secondary};
  }
  
  /* Custom scrollbar - modern */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.$theme.colors.bg.secondary};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.$theme.colors.border.primary};
    border-radius: ${props => props.$designSystem.radius.full};
    
    &:hover {
      background: ${props => props.$theme.colors.interactive.primary};
    }
  }
  
  /* Selection - brand colors */
  ::selection {
    background: ${props => props.$theme.colors.interactive.primary}20;
    color: ${props => props.$theme.colors.text.primary};
  }
  
  /* Focus styles - accessibility */
  *:focus-visible {
    outline: 2px solid ${props => props.$theme.colors.interactive.primary};
    outline-offset: 2px;
    border-radius: ${props => props.$designSystem.radius.full};
  }
  
  /* Remove focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Skip link accessibility - oculto por defecto, visible en focus */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 8px;
    background: ${props => props.$theme.colors.interactive.primary};
    color: #ffffff;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: ${props => props.$designSystem.radius.md};
    font-weight: ${props => props.$designSystem.typography.weight.medium};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    z-index: 99999;
    transition: all ${props => props.$designSystem.animation.duration.fast} ease;
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    
    &:focus {
      top: 8px;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
`

// 🏗️ Layout Container
const LayoutContainer = styled.div<{ $theme: any }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.$theme.colors.bg.primary};
  transition: background-color 0.3s ${props => props.$theme.animation?.easing?.smooth || 'ease'};
`

// 🧭 Navigation Header - Minimalista inspirado en Le Corre y Pangram
const Header = styled.header<{ $theme: any; $isScrolled: boolean; $designSystem: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.$designSystem.zIndex.sticky};
  padding: ${props => props.$isScrolled ? '1rem 2rem' : '2rem'};
  background: ${props => props.$theme.colors.bg.primary}${props => props.$isScrolled ? 'F8' : '00'};
  backdrop-filter: ${props => props.$isScrolled ? 'blur(20px) saturate(180%)' : 'none'};
  border-bottom: 1px solid ${props => props.$isScrolled ? props.$theme.colors.border.primary + '30' : 'transparent'};
  transition: all ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: ${props => props.$isScrolled ? '0.75rem 1rem' : '1.25rem 1rem'};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.$isScrolled ? '0.5rem 0.75rem' : '1rem 0.75rem'};
  }
`

const Nav = styled.nav<{ $theme: any; $designSystem: any }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    /* En móvil: Logo ocupa todo el espacio izquierdo, acciones se mantienen a la derecha */
    grid-template-columns: 1fr auto;
    gap: ${props => props.$designSystem.spacing[4]};
  }
`

const Logo = styled(Link)<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.xl};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  letter-spacing: ${props => props.$designSystem.typography.tracking.wide};
  position: relative;
  
  /* Efecto hover ultra-sutil y profesional */
  &:hover {
    transform: translateY(-1px);
    opacity: 0.8;
  }
  
  /* Transición suave al regresar */
  &:not(:hover) {
    transition: all ${props => props.$designSystem.animation.duration.fast} ease-out;
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale.lg};
    letter-spacing: ${props => props.$designSystem.typography.tracking.normal};
  }
`

// 📍 Contenedor del logo - siempre a la izquierda
const NavLeft = styled.div<{ $designSystem?: any }>`
  justify-self: start;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    /* En móvil ocupa toda la primera columna */
    grid-column: 1;
  }
`

// 🎯 Contenedor del menú - perfectamente centrado
const NavCenter = styled.div<{ $theme: any; $designSystem: any }>`
  justify-self: center;
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[10]};
  
  @media (max-width: 768px) {
    /* Completamente oculto en móvil para no interferir con la estructura Grid */
    display: none;
    grid-column: none;
  }
`

// ⚡ Contenedor de acciones - siempre a la derecha
const NavRight = styled.div<{ $designSystem: any }>`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[4]};
  
  @media (max-width: 768px) {
    /* En móvil ocupa la segunda columna y se mantiene a la derecha */
    grid-column: 2;
    gap: ${props => props.$designSystem.spacing[3]};
    min-width: fit-content;
  }
  
  @media (max-width: 480px) {
    gap: ${props => props.$designSystem.spacing[2]};
  }
`

// 📱 Mobile Menu - Rediseñado completamente para UX profesional
const MobileMenu = styled.div<{ $theme: any; $designSystem: any; $isOpen?: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  max-width: 90vw;
  background: ${props => props.$theme.colors.bg.primary};
  border-left: 1px solid ${props => props.$theme.colors.border.primary};
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.anticipate};
  z-index: ${props => props.$designSystem.zIndex.modal};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    display: block;
  }
  
  @media (max-width: 480px) {
    width: 100vw;
    max-width: 100vw;
  }
`

const MobileMenuContent = styled.div<{ $theme: any; $designSystem: any }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.$designSystem.spacing[8]};
  overflow-y: auto;
`

const MobileMenuHeader = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  padding-bottom: ${props => props.$designSystem.spacing[4]};
  border-bottom: 1px solid ${props => props.$theme.colors.border.primary};
  
  .logo {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale.xl};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$theme.colors.text.primary};
    text-decoration: none;
  }
  
  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid ${props => props.$theme.colors.border.primary};
    border-radius: ${props => props.$designSystem.radius.md};
    color: ${props => props.$theme.colors.text.secondary};
    cursor: pointer;
    transition: all ${props => props.$designSystem.animation.duration.fast} ease;
    
    &:hover {
      background: ${props => props.$theme.colors.bg.secondary};
      color: ${props => props.$theme.colors.text.primary};
    }
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`

const MobileNavSection = styled.div<{ $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  
  .section-title {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.sm};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    color: ${props => props.$theme.colors.text.tertiary};
    text-transform: uppercase;
    letter-spacing: ${props => props.$designSystem.typography.tracking.wider};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
  }
  
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: ${props => props.$designSystem.spacing[2]};
  }
`

const MobileNavLink = styled(Link)<{ $theme: any; $designSystem: any; $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[3]};
  padding: ${props => props.$designSystem.spacing[4]} ${props => props.$designSystem.spacing[3]};
  color: ${props => props.$isActive ? props.$theme.colors.interactive.primary : props.$theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${props => props.$designSystem.radius.lg};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$isActive ? props.$designSystem.typography.weight.semibold : props.$designSystem.typography.weight.medium};
  transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  position: relative;
  
  &:hover {
    background: ${props => props.$theme.colors.bg.secondary};
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateX(4px);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: ${props => props.$theme.colors.interactive.primary};
    border-radius: 2px;
    transition: height ${props => props.$designSystem.animation.duration.fast} ease;
  }
  
  &:hover::before,
  &.active::before {
    height: 60%;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    opacity: 0.7;
  }
  
  .label {
    flex: 1;
  }
  
  .arrow {
    width: 16px;
    height: 16px;
    opacity: 0;
    transform: translateX(-4px);
    transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  }
  
  &:hover .arrow {
    opacity: 1;
    transform: translateX(0);
  }
`

const MobileMenuFooter = styled.div<{ $theme: any; $designSystem: any }>`
  margin-top: auto;
  padding-top: ${props => props.$designSystem.spacing[6]};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  
  .contact-section {
    margin-bottom: ${props => props.$designSystem.spacing[6]};
    
    .contact-title {
      font-size: ${props => props.$designSystem.typography.scale.sm};
      font-weight: ${props => props.$designSystem.typography.weight.semibold};
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: ${props => props.$designSystem.spacing[3]};
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: ${props => props.$designSystem.spacing[2]};
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: ${props => props.$designSystem.spacing[2]};
        font-size: ${props => props.$designSystem.typography.scale.sm};
        color: ${props => props.$theme.colors.text.secondary};
        
        svg {
          width: 14px;
          height: 14px;
          color: ${props => props.$theme.colors.interactive.primary};
        }
      }
    }
  }
  
  .theme-section {
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: ${props => props.$designSystem.spacing[3]};
      width: 100%;
      padding: ${props => props.$designSystem.spacing[3]};
      background: ${props => props.$theme.colors.bg.secondary};
      border: 1px solid ${props => props.$theme.colors.border.primary};
      border-radius: ${props => props.$designSystem.radius.lg};
      color: ${props => props.$theme.colors.text.primary};
      cursor: pointer;
      transition: all ${props => props.$designSystem.animation.duration.fast} ease;
      
      &:hover {
        background: ${props => props.$theme.colors.bg.tertiary};
        transform: translateY(-1px);
      }
      
      .theme-icon {
        width: 18px;
        height: 18px;
        color: ${props => props.$theme.colors.interactive.primary};
      }
      
      .theme-label {
        font-size: ${props => props.$designSystem.typography.scale.sm};
        font-weight: ${props => props.$designSystem.typography.weight.medium};
      }
    }
  }
`

const NavLink = styled(Link)<{ $theme: any; $designSystem: any; $isActive?: boolean }>`
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  color: ${props => props.$isActive ? props.$theme.colors.interactive.primary : props.$theme.colors.text.secondary};
  text-decoration: none;
  position: relative;
  transition: all ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  padding: ${props => props.$designSystem.spacing[2]} 0;
  letter-spacing: ${props => props.$designSystem.typography.tracking.normal};
  
  &:hover {
    color: ${props => props.$theme.colors.interactive.primary};
  }
  
  &.active {
    color: ${props => props.$theme.colors.interactive.primary};
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    font-size: ${props => props.$designSystem.typography.scale['3xl']};
    font-weight: ${props => props.$designSystem.typography.weight.light};
    color: ${props => props.$theme.colors.text.primary};
    
    &:hover {
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
`



const ThemeToggle = styled.button<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.full};
  color: ${props => props.$theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  
  /* Efecto ripple sutil */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${props => props.$theme.colors.interactive.primary}15;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  }
  
  &:hover {
    background: ${props => props.$theme.colors.bg.secondary};
    border-color: ${props => props.$theme.colors.interactive.primary};
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px ${props => props.$theme.colors.interactive.primary}20;
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }
  
  /* Efecto al presionar */
  &:active {
    transform: translateY(0) scale(0.98);
    transition: all 0.1s ease;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    /* Mantener tamaño consistente en móvil */
    width: 44px;
    height: 44px;
  }
  
  @media (max-width: 480px) {
    /* Ligeramente más pequeño en pantallas muy pequeñas */
    width: 40px;
    height: 40px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const MobileMenuToggle = styled.button<{ $theme: any; $designSystem: any }>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.full};
  color: ${props => props.$theme.colors.text.primary};
  cursor: pointer;
  transition: all ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  position: relative;
  z-index: ${props => props.$designSystem.zIndex.modal + 1};
  flex-shrink: 0;
  overflow: hidden;
  
  /* Efecto ripple sutil */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${props => props.$theme.colors.interactive.primary}15;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  }
  
  &:hover {
    background: ${props => props.$theme.colors.bg.secondary};
    border-color: ${props => props.$theme.colors.interactive.primary};
    color: ${props => props.$theme.colors.interactive.primary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px ${props => props.$theme.colors.interactive.primary}20;
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }
  
  /* Efecto al presionar */
  &:active {
    transform: translateY(0) scale(0.98);
    transition: all 0.1s ease;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    display: flex;
    /* Asegurar que esté visible y bien posicionado junto al theme toggle */
  }
  
  @media (max-width: 480px) {
    /* Mismo tamaño que el theme toggle en pantallas pequeñas */
    width: 40px;
    height: 40px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`

// 📱 Mobile menu overlay
const MobileMenuOverlay = styled.div<{ $isOpen: boolean; $designSystem: any }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: opacity ${props => props.$designSystem.animation.duration.normal} ${props => props.$designSystem.animation.easing.smooth};
  z-index: ${props => props.$designSystem.zIndex.modal - 1};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    display: block;
  }
`

// 📱 Main Content Area - MOBILE UX OPTIMIZADO
const Main = styled.main<{ $theme: any; $designSystem: any }>`
  flex: 1;
  padding-top: ${props => props.$designSystem.spacing[20]};
  background: ${props => props.$theme.colors.bg.primary};
 
  /* 💻 TABLET: Ajuste intermedio */
  @media (max-width: 1024px) {
    padding-top: ${props => props.$designSystem.spacing[18]};
  }
 
  /* 📱 MOBILE: Mejor gestión del espacio superior */
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding-top: ${props => props.$designSystem.spacing[16]}; /* Menos padding en móvil */
  }
  
  @media (max-width: 480px) {
    padding-top: ${props => props.$designSystem.spacing[14]}; /* Aún menos en pantallas pequeñas */
  }
  
  @media (max-width: 360px) {
    padding-top: ${props => props.$designSystem.spacing[12]}; /* Mínimo para pantallas muy pequeñas */
  }
`

// 🦶 Footer - Minimalista y moderno
const Footer = styled.footer<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  padding: ${props => props.$designSystem.spacing[12]} 0 ${props => props.$designSystem.spacing[6]} 0;
  margin-top: auto;
`

const FooterContent = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    padding: 0 ${props => props.$designSystem.spacing[6]};
  }
`

const FooterGrid = styled.div<{ $theme: any; $designSystem: any }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${props => props.$designSystem.spacing[6]};
  margin-bottom: ${props => props.$designSystem.spacing[10]};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.xl}) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: ${props => props.$designSystem.spacing[5]};
    
    /* Fusionar Legal y Redes Sociales en desktop large */
    .footer-legal-section {
      grid-column: 3;
    }
    
    .footer-social-section {
      grid-column: 3;
      margin-top: ${props => props.$designSystem.spacing[6]};
    }
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.$designSystem.spacing[6]};
    
    .footer-brand {
      grid-column: 1 / -1;
      margin-bottom: ${props => props.$designSystem.spacing[4]};
    }
    
    .footer-links-section {
      grid-column: 1;
    }
    
    .footer-legal-section {
      grid-column: 2;
    }
    
    .footer-social-section {
      grid-column: 1 / -1;
      margin-top: ${props => props.$designSystem.spacing[4]};
      text-align: center;
    }
  }
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[6]};
    text-align: center;
    
    .footer-brand,
    .footer-links-section,
    .footer-legal-section,
    .footer-social-section {
      grid-column: 1;
      margin-top: 0;
    }
  }
`

const FooterBrand = styled.div<{ $theme: any; $designSystem: any }>`
  h3 {
    font-family: ${props => props.$designSystem.typography.fonts.display};
    font-size: ${props => props.$designSystem.typography.scale['2xl']};
    font-weight: ${props => props.$designSystem.typography.weight.bold};
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    letter-spacing: ${props => props.$designSystem.typography.tracking.tight};
  }
  
  p {
    color: ${props => props.$theme.colors.text.secondary};
    font-size: ${props => props.$designSystem.typography.scale.base};
    line-height: ${props => props.$designSystem.typography.leading.relaxed};
    max-width: 400px;
    
    @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
      max-width: none;
    }
  }
`

const FooterSection = styled.div<{ $theme: any; $designSystem: any }>`
  h4 {
    font-family: ${props => props.$designSystem.typography.fonts.sans};
    font-size: ${props => props.$designSystem.typography.scale.base};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    color: ${props => props.$theme.colors.text.primary};
    margin-bottom: ${props => props.$designSystem.spacing[4]};
    text-transform: uppercase;
    letter-spacing: ${props => props.$designSystem.typography.tracking.wider};
    font-size: ${props => props.$designSystem.typography.scale.sm};
  }
`

const FooterLinks = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$designSystem.spacing[3]};
`

const FooterLink = styled.a<{ $theme: any; $designSystem: any }>`
  color: ${props => props.$theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${props => props.$designSystem.typography.scale.sm};
  transition: color ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  
  &:hover {
    color: ${props => props.$theme.colors.interactive.primary};
  }
`

const SocialLinks = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[3]};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    justify-content: center;
  }
`

const SocialLink = styled.a<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.full};
  color: ${props => props.$theme.colors.text.secondary};
  text-decoration: none;
  transition: all ${props => props.$designSystem.animation.duration.fast} ${props => props.$designSystem.animation.easing.smooth};
  
  &:hover {
    background: ${props => props.$theme.colors.interactive.primary};
    border-color: ${props => props.$theme.colors.interactive.primary};
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`

const FooterBottom = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.$designSystem.spacing[6]};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.$designSystem.spacing[3]};
    text-align: center;
  }
`

const Copyright = styled.p<{ $theme: any; $designSystem: any }>`
  color: ${props => props.$theme.colors.text.tertiary};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  margin: 0;
`

const FooterInfo = styled.div<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[4]};
  color: ${props => props.$theme.colors.text.tertiary};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  
  @media (max-width: ${props => props.$designSystem.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.$designSystem.spacing[2]};
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: ${props => props.$designSystem.spacing[2]};
    white-space: nowrap;
    
    svg {
      width: 14px;
      height: 14px;
      color: ${props => props.$theme.colors.interactive.primary};
      flex-shrink: 0;
    }
  }
`

// 🎭 Layout Component Interface
interface LayoutProps {
  children: React.ReactNode
  location?: {
    pathname: string
  }
}

// 🏗️ Main Layout Component
function Layout2025({ children, location }: LayoutProps) {
  const { theme, designSystem, isDark, toggleTheme, isClient } = useTheme2025()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect - ONLY after hydration
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  // Handle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Check if current page is active
  const isActivePage = (path: string): boolean => {
    if (!location?.pathname) return false
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <LayoutContainer $theme={theme}>
      <GlobalStyle $theme={theme} $designSystem={designSystem} />
      {/* Estilos críticos de accesibilidad */}
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_A11Y_CSS }} />
      <Helmet>
        <title>Miquel Xarau - Portfolio</title>
        <meta name="description" content="Miquel Xarau's portfolio showcasing his skills and projects" />
        <meta name="keywords" content="Miquel Xarau, portfolio, skills, projects, UX/UI, fullstack, IA, ciberseguridad" />
        <meta name="author" content="Miquel Xarau" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://miquelxarau.com" />
      </Helmet>
      
      {/* Skip link para accesibilidad */}
      <Link to="#main-content" className="skip-link">
        Saltar al contenido principal
      </Link>
      
      <Header $theme={theme} $isScrolled={isScrolled} $designSystem={designSystem}>
        <Nav $theme={theme} $designSystem={designSystem}>
          <NavLeft $designSystem={designSystem}>
            <Logo to="/" $theme={theme} $designSystem={designSystem}>
              Miquel Xarau
            </Logo>
          </NavLeft>
          
          <NavCenter $theme={theme} $designSystem={designSystem}>
            <NavLink 
              to="/trabajos/" 
              $theme={theme} 
              $designSystem={designSystem}
              $isActive={isActivePage('/trabajos')}
            >
              Trabajos
            </NavLink>
            <NavLink 
              to="/lab/" 
              $theme={theme} 
              $designSystem={designSystem}
              $isActive={isActivePage('/lab')}
            >
              Lab
            </NavLink>
            <NavLink 
              to="/about/" 
              $theme={theme} 
              $designSystem={designSystem}
              $isActive={isActivePage('/about')}
            >
              About
            </NavLink>
            <NavLink 
              to="/blog/" 
              $theme={theme} 
              $designSystem={designSystem}
              $isActive={isActivePage('/blog')}
            >
              Blog
            </NavLink>
            <NavLink 
              to="/contact/" 
              $theme={theme} 
              $designSystem={designSystem}
              $isActive={isActivePage('/contact')}
            >
              Contacto
            </NavLink>
          </NavCenter>
          
          <NavRight $designSystem={designSystem}>
            <ThemeToggle 
              onClick={toggleTheme}
              $theme={theme}
              $designSystem={designSystem}
              aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
            
            <MobileMenuToggle 
              onClick={toggleMobileMenu}
              $theme={theme}
              $designSystem={designSystem}
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </MobileMenuToggle>
          </NavRight>
        </Nav>
      </Header>

      {/* 📱 Nuevo menú mobile con UX profesional */}
      <MobileMenu $theme={theme} $designSystem={designSystem} $isOpen={isMobileMenuOpen}>
        <MobileMenuContent $theme={theme} $designSystem={designSystem}>
          <MobileMenuHeader $theme={theme} $designSystem={designSystem}>
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              Miquel Xarau
            </Link>
            <button 
              className="close-btn" 
              onClick={closeMobileMenu}
              aria-label="Cerrar menú de navegación"
              title="Cerrar menú"
            >
              <FiX />
            </button>
          </MobileMenuHeader>

          <MobileNavSection $theme={theme} $designSystem={designSystem}>
            <div className="section-title">Navegación</div>
            <div className="nav-links">
              <MobileNavLink 
                to="/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/')}
                onClick={closeMobileMenu}
                className={isActivePage('/') ? 'active' : ''}
              >
                <FiHome className="icon" />
                <span className="label">Inicio</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
              <MobileNavLink 
                to="/trabajos/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/trabajos')}
                onClick={closeMobileMenu}
                className={isActivePage('/trabajos') ? 'active' : ''}
              >
                <FiBriefcase className="icon" />
                <span className="label">Trabajos</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
              <MobileNavLink 
                to="/lab/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/lab')}
                onClick={closeMobileMenu}
                className={isActivePage('/lab') ? 'active' : ''}
              >
                <FiCode className="icon" />
                <span className="label">Lab</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
              <MobileNavLink 
                to="/about/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/about')}
                onClick={closeMobileMenu}
                className={isActivePage('/about') ? 'active' : ''}
              >
                <FiUser className="icon" />
                <span className="label">About</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
              <MobileNavLink 
                to="/blog/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/blog')}
                onClick={closeMobileMenu}
                className={isActivePage('/blog') ? 'active' : ''}
              >
                <FiEdit className="icon" />
                <span className="label">Blog</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
              <MobileNavLink 
                to="/contact/"
                $theme={theme} 
                $designSystem={designSystem}
                $isActive={isActivePage('/contact')}
                onClick={closeMobileMenu}
                className={isActivePage('/contact') ? 'active' : ''}
              >
                <FiMail className="icon" />
                <span className="label">Contacto</span>
                <FiArrowRight className="arrow" />
              </MobileNavLink>
            </div>
          </MobileNavSection>

          <MobileMenuFooter $theme={theme} $designSystem={designSystem}>
            <div className="contact-section">
              <div className="contact-title">Información de contacto</div>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMapPin />
                  <span>Barcelona, Spain</span>
                </div>
                <div className="contact-item">
                  <FiClock />
                  <span>Disponible para proyectos</span>
                </div>
                <div className="contact-item">
                  <FiMail />
                  <span>hello@mxglab.com</span>
                </div>
              </div>
            </div>

            <div className="theme-section">
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
              >
                <div className="theme-icon">
                  {isDark ? <FiSun /> : <FiMoon />}
                </div>
                <span className="theme-label">
                  {isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
                </span>
              </button>
            </div>
          </MobileMenuFooter>
        </MobileMenuContent>
      </MobileMenu>

      <Main 
        id="main-content"
        $theme={theme} 
        $designSystem={designSystem}
        className={location?.pathname?.includes('blog') || location?.pathname?.includes('devsecops') || location?.pathname?.includes('penetration') || location?.pathname?.includes('smart-contract') || location?.pathname?.includes('threat-detection') || location?.pathname?.includes('ai-powered') || location?.pathname?.includes('application-security') ? 'blog-page' : ''}
      >
        {children}
      </Main>

      <Footer $theme={theme} $designSystem={designSystem}>
        <FooterContent $theme={theme} $designSystem={designSystem}>
          <FooterGrid $theme={theme} $designSystem={designSystem}>
            <FooterBrand 
              $theme={theme} 
              $designSystem={designSystem}
              className="footer-brand"
            >
              <h3>Miquel Xarau</h3>
              <p>
                Diseñador UX/UI y desarrollador fullstack especializado en IA y ciberseguridad.
              </p>
            </FooterBrand>
            
            <FooterSection 
              $theme={theme} 
              $designSystem={designSystem}
              className="footer-links-section"
            >
              <h4>Enlaces</h4>
              <FooterLinks $theme={theme} $designSystem={designSystem}>
                <FooterLink 
                  href="/trabajos/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Trabajos
                </FooterLink>
                <FooterLink 
                  href="/lab/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Lab
                </FooterLink>
                <FooterLink 
                  href="/about/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  About
                </FooterLink>
                <FooterLink 
                  href="/blog/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Blog
                </FooterLink>
                <FooterLink 
                  href="/contact/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Contacto
                </FooterLink>
              </FooterLinks>
            </FooterSection>
            
            <FooterSection 
              $theme={theme} 
              $designSystem={designSystem}
              className="footer-legal-section"
            >
              <h4>Legal</h4>
              <FooterLinks $theme={theme} $designSystem={designSystem}>
                <FooterLink 
                  href="/privacy-policy/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Política de Privacidad
                </FooterLink>
                <FooterLink 
                  href="/cookie-policy/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Política de Cookies
                </FooterLink>
                <FooterLink 
                  href="/legal-notice/"
                  $theme={theme}
                  $designSystem={designSystem}
                >
                  Aviso Legal
                </FooterLink>
              </FooterLinks>
            </FooterSection>
            
            <FooterSection 
              $theme={theme} 
              $designSystem={designSystem}
              className="footer-social-section"
            >
              <h4>Conecta</h4>
              <SocialLinks $theme={theme} $designSystem={designSystem}>
                <SocialLink 
                  href="https://github.com/mikexarau" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="GitHub"
                >
                  <SiGithub />
                </SocialLink>
                <SocialLink 
                  href="https://mikexarau.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="GitHub Pages"
                >
                  <HiOutlineGlobeAlt />
                </SocialLink>
                <SocialLink 
                  href="https://linkedin.com/in/miquelxarau" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="LinkedIn"
                >
                  <SiLinkedin />
                </SocialLink>
                <SocialLink 
                  href="https://x.com/miquelxarau" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="X (Twitter)"
                >
                  <SiX />
                </SocialLink>
                <SocialLink 
                  href="https://vimeo.com/miquelxarau" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="Vimeo"
                >
                  <SiVimeo />
                </SocialLink>
                <SocialLink 
                  href="mailto:hello@mxglab.com"
                  $theme={theme}
                  $designSystem={designSystem}
                  title="Email"
                >
                  <HiOutlineMail />
                </SocialLink>
              </SocialLinks>
            </FooterSection>
          </FooterGrid>
          
          <FooterBottom $theme={theme} $designSystem={designSystem}>
            <FooterInfo $theme={theme} $designSystem={designSystem}>
              <div className="info-item">
                <HiOutlineLocationMarker />
                <span>Barcelona, Spain</span>
              </div>
              <div className="info-item">
                <HiOutlineClock />
                <span>Disponible para proyectos</span>
              </div>
            </FooterInfo>
            
            <Copyright $theme={theme} $designSystem={designSystem}>
              &copy; {new Date().getFullYear()} Miquel Xarau. Todos los derechos reservados.
            </Copyright>
          </FooterBottom>
        </FooterContent>
      </Footer>

      <MobileMenuOverlay 
        $isOpen={isMobileMenuOpen} 
        $designSystem={designSystem} 
        onClick={closeMobileMenu}
      />
      
      <ScrollProgress 
        variant="default"
      />
      
      <CustomCursor />
      <CookieBanner />
    </LayoutContainer>
  )
}

export default Layout2025 
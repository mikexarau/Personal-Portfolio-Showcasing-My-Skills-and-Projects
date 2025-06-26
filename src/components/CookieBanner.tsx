import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'

// 🍪 Styled Components
const BannerContainer = styled.div<{ $isVisible: boolean; $theme: any; $designSystem: any }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.$theme.colors.bg.primary};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: ${props => props.$designSystem.spacing[6]};
  transform: translateY(${props => props.$isVisible ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[4]};
  }
`

const BannerContent = styled.div<{ $designSystem: any }>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.$designSystem.spacing[6]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.$designSystem.spacing[4]};
    text-align: center;
  }
`

const BannerText = styled.div<{ $theme: any; $designSystem: any }>`
  flex: 1;
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  color: ${props => props.$theme.colors.text.secondary};
  
  a {
    color: ${props => props.$theme.colors.interactive.primary};
    text-decoration: underline;
    
    &:hover {
      color: ${props => props.$theme.colors.interactive.secondary};
    }
  }
`

const BannerActions = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[3]};
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: ${props => props.$designSystem.spacing[2]};
  }
`

const Button = styled.button<{ $variant: 'primary' | 'secondary' | 'minimal'; $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[5]};
  border-radius: ${props => props.$designSystem.radius.lg};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' && `
    background: ${props.$theme.colors.interactive.primary};
    color: ${props.$theme.colors.text.inverse};
    
    &:hover {
      background: ${props.$theme.colors.interactive.secondary};
      transform: translateY(-1px);
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: ${props.$theme.colors.bg.secondary};
    color: ${props.$theme.colors.text.primary};
    border: 1px solid ${props.$theme.colors.border.primary};
    
    &:hover {
      background: ${props.$theme.colors.bg.tertiary};
    }
  `}
  
  ${props => props.$variant === 'minimal' && `
    background: transparent;
    color: ${props.$theme.colors.text.tertiary};
    padding: ${props.$designSystem.spacing[2]} ${props.$designSystem.spacing[3]};
    
    &:hover {
      color: ${props.$theme.colors.text.secondary};
      background: ${props.$theme.colors.bg.secondary};
    }
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[4]};
  }
`

const PreferencesModal = styled.div<{ $isOpen: boolean; $theme: any; $designSystem: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: ${props => props.$designSystem.spacing[4]};
`

const ModalContent = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: ${props => props.$designSystem.spacing[8]};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[6]};
  }
`

const ModalTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale['2xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[6]};
`

const CookieCategory = styled.div<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[6]};
  padding-bottom: ${props => props.$designSystem.spacing[4]};
  border-bottom: 1px solid ${props => props.$designSystem.colors?.border?.primary || '#e5e5e5'};
  
  &:last-child {
    border-bottom: none;
  }
`

const CategoryHeader = styled.div<{ $designSystem: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.$designSystem.spacing[3]};
`

const CategoryTitle = styled.h4<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.lg};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0;
`

const Toggle = styled.input<{ $theme: any }>`
  appearance: none;
  width: 44px;
  height: 24px;
  background: ${props => props.$theme.colors.bg.tertiary};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:checked {
    background: ${props => props.$theme.colors.interactive.primary};
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s ease;
  }
  
  &:checked:before {
    transform: translateX(20px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CategoryDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: ${props => props.$theme.colors.text.secondary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
`

// 🎯 Tipos de preferencias
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  functional: boolean
}

// 🎯 Componente Principal
const CookieBanner: React.FC = () => {
  const { theme, designSystem } = useTheme2025()
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre requeridas
    analytics: false,
    functional: false
  })

  // 🔍 Verificar si ya hay consentimiento guardado
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent')
    const savedPreferences = localStorage.getItem('cookie-preferences')
    
    if (!savedConsent) {
      // Mostrar banner solo si no hay consentimiento previo
      setIsVisible(true)
    } else if (savedPreferences) {
      // Cargar preferencias guardadas
      try {
        setPreferences(JSON.parse(savedPreferences))
      } catch (e) {
        console.warn('Error parsing saved cookie preferences')
      }
    }
  }, [])

  // 💾 Guardar preferencias
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', 'true')
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    
    // 🎯 Aplicar configuración de Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied'
      })
    }
    
    setIsVisible(false)
    setShowPreferences(false)
  }

  // ✅ Aceptar todas las cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
  }

  // ❌ Rechazar cookies opcionales
  const rejectOptional = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false
    }
    setPreferences(onlyNecessary)
    savePreferences(onlyNecessary)
  }

  // ⚙️ Guardar preferencias personalizadas
  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  // 🔄 Actualizar preferencia individual
  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!isVisible) return null

  return (
    <>
      <BannerContainer $isVisible={isVisible} $theme={theme} $designSystem={designSystem}>
        <BannerContent $designSystem={designSystem}>
          <BannerText $theme={theme} $designSystem={designSystem}>
            <strong>🍪 Respeto tu privacidad.</strong> Este sitio utiliza cookies únicamente para analíticas 
            anónimas y mejorar tu experiencia. No comparto tus datos personales. 
            <br />
            <a href="/privacy-policy" target="_blank">Ver política de privacidad</a> | 
            <a href="/cookie-policy" target="_blank"> Política de cookies</a>
          </BannerText>
          
          <BannerActions $designSystem={designSystem}>
            <Button 
              $variant="minimal" 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={() => setShowPreferences(true)}
            >
              Personalizar
            </Button>
            <Button 
              $variant="secondary" 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={rejectOptional}
            >
              Solo necesarias
            </Button>
            <Button 
              $variant="primary" 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={acceptAll}
            >
              Aceptar todas
            </Button>
          </BannerActions>
        </BannerContent>
      </BannerContainer>

      {/* Modal de Preferencias */}
      <PreferencesModal $isOpen={showPreferences} $theme={theme} $designSystem={designSystem}>
        <ModalContent $theme={theme} $designSystem={designSystem}>
          <ModalTitle $theme={theme} $designSystem={designSystem}>
            Preferencias de Cookies
          </ModalTitle>

          <CookieCategory $designSystem={designSystem}>
            <CategoryHeader $designSystem={designSystem}>
              <CategoryTitle $theme={theme} $designSystem={designSystem}>
                Cookies Necesarias
              </CategoryTitle>
              <Toggle 
                type="checkbox" 
                checked={preferences.necessary}
                disabled={true}
                $theme={theme}
              />
            </CategoryHeader>
            <CategoryDescription $theme={theme} $designSystem={designSystem}>
              Estas cookies son esenciales para el funcionamiento básico del sitio web. 
              No se pueden desactivar ya que permiten la navegación y funcionalidades básicas.
            </CategoryDescription>
          </CookieCategory>

          <CookieCategory $designSystem={designSystem}>
            <CategoryHeader $designSystem={designSystem}>
              <CategoryTitle $theme={theme} $designSystem={designSystem}>
                Cookies de Analíticas
              </CategoryTitle>
              <Toggle 
                type="checkbox" 
                checked={preferences.analytics}
                onChange={(e) => updatePreference('analytics', e.target.checked)}
                $theme={theme}
              />
            </CategoryHeader>
            <CategoryDescription $theme={theme} $designSystem={designSystem}>
              Nos ayudan a entender cómo los visitantes interactúan con el sitio web mediante 
              la recopilación y el informe de información de forma anónima. Utilizamos Google Analytics 
              con IP anonimizada y configuración privacy-first.
            </CategoryDescription>
          </CookieCategory>

          <CookieCategory $designSystem={designSystem}>
            <CategoryHeader $designSystem={designSystem}>
              <CategoryTitle $theme={theme} $designSystem={designSystem}>
                Cookies Funcionales
              </CategoryTitle>
              <Toggle 
                type="checkbox" 
                checked={preferences.functional}
                onChange={(e) => updatePreference('functional', e.target.checked)}
                $theme={theme}
              />
            </CategoryHeader>
            <CategoryDescription $theme={theme} $designSystem={designSystem}>
              Permiten al sitio web recordar tus preferencias (como modo oscuro/claro) 
              para una experiencia más personalizada.
            </CategoryDescription>
          </CookieCategory>

          <BannerActions $designSystem={designSystem}>
            <Button 
              $variant="secondary" 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={() => setShowPreferences(false)}
            >
              Cancelar
            </Button>
            <Button 
              $variant="primary" 
              $theme={theme} 
              $designSystem={designSystem}
              onClick={saveCustomPreferences}
            >
              Guardar preferencias
            </Button>
          </BannerActions>
        </ModalContent>
      </PreferencesModal>
    </>
  )
}

// 🌍 Usar gtag sin declaración conflictiva

export default CookieBanner 
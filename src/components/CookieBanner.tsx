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
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: ${props => props.$designSystem.spacing[2]};
  }
`

const BannerButton = styled.button<{ $variant: 'primary' | 'secondary'; $theme: any; $designSystem: any }>`
  padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[5]};
  border-radius: ${props => props.$designSystem.radius.md};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  font-weight: ${props => props.$designSystem.typography.weight.medium};
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.$theme.colors.interactive.primary};
    color: ${props.$theme.colors.text.inverse};
    
    &:hover {
      background: ${props.$theme.colors.interactive.hover};
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    color: ${props.$theme.colors.text.secondary};
    border: 1px solid ${props.$theme.colors.border.primary};
    
    &:hover {
      background: ${props.$theme.colors.bg.secondary};
      color: ${props.$theme.colors.text.primary};
    }
  `}
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[3]} ${props => props.$designSystem.spacing[6]};
  }
`

const PreferencesModal = styled.div<{ $isOpen: boolean; $theme: any; $designSystem: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$designSystem.spacing[4]};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`

const PreferencesContent = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.primary};
  border-radius: ${props => props.$designSystem.radius.lg};
  padding: ${props => props.$designSystem.spacing[8]};
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  
  h3 {
    margin: 0 0 ${props => props.$designSystem.spacing[6]} 0;
    color: ${props => props.$theme.colors.text.primary};
    font-size: ${props => props.$designSystem.typography.scale.xl};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
  }
`

const PreferenceGroup = styled.div<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const PreferenceLabel = styled.label<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.$designSystem.spacing[3]};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  cursor: pointer;
  
  input {
    margin-top: 2px;
    accent-color: ${props => props.$theme.colors.interactive.primary};
  }
  
  .label-content {
    flex: 1;
    
    .label-title {
      font-weight: ${props => props.$designSystem.typography.weight.medium};
      color: ${props => props.$theme.colors.text.primary};
      margin-bottom: ${props => props.$designSystem.spacing[1]};
    }
    
    .label-description {
      font-size: ${props => props.$designSystem.typography.scale.sm};
      color: ${props => props.$theme.colors.text.secondary};
      line-height: ${props => props.$designSystem.typography.leading.relaxed};
    }
  }
`

const PreferencesActions = styled.div<{ $designSystem: any }>`
  display: flex;
  gap: ${props => props.$designSystem.spacing[3]};
  margin-top: ${props => props.$designSystem.spacing[8]};
  justify-content: flex-end;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

// 🎯 Types
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  functional: boolean
}

// 🎯 Loading placeholder to prevent hydration issues
const CookieBannerPlaceholder: React.FC = () => null

// 🎯 Componente Principal - SSR Protected
const CookieBanner: React.FC = () => {
  const { theme, designSystem, isClient } = useTheme2025()
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre requeridas
    analytics: false,
    functional: false
  })

  // 🔒 SSR Protection: Only show banner after hydration
  useEffect(() => {
    if (!isClient) return

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
  }, [isClient])

  // 💾 Guardar preferencias - only on client
  const savePreferences = (prefs: CookiePreferences) => {
    if (!isClient) return

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

  // ⚙️ Mostrar preferencias
  const showPreferencesModal = () => {
    setShowPreferences(true)
  }

  // 💾 Guardar preferencias personalizadas
  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  // 🚫 Don't render during SSR
  if (!isClient) {
    return <CookieBannerPlaceholder />
  }

  // Si no está visible, no renderizar
  if (!isVisible) {
    return null
  }

  return (
    <>
      <BannerContainer $isVisible={isVisible} $theme={theme} $designSystem={designSystem}>
        <BannerContent $designSystem={designSystem}>
          <BannerText $theme={theme} $designSystem={designSystem}>
            Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. 
            Al hacer clic en "Aceptar todas", consientes el uso de todas las cookies. 
            Puedes gestionar tus preferencias en cualquier momento.{' '}
            <a href="/cookie-policy/">Política de Cookies</a> | <a href="/privacy-policy/">Privacidad</a>
          </BannerText>
          
          <BannerActions $designSystem={designSystem}>
            <BannerButton
              $variant="secondary"
              $theme={theme}
              $designSystem={designSystem}
              onClick={showPreferencesModal}
            >
              Preferencias
            </BannerButton>
            <BannerButton
              $variant="secondary"
              $theme={theme}
              $designSystem={designSystem}
              onClick={rejectOptional}
            >
              Solo necesarias
            </BannerButton>
            <BannerButton
              $variant="primary"
              $theme={theme}
              $designSystem={designSystem}
              onClick={acceptAll}
            >
              Aceptar todas
            </BannerButton>
          </BannerActions>
        </BannerContent>
      </BannerContainer>

      <PreferencesModal $isOpen={showPreferences} $theme={theme} $designSystem={designSystem}>
        <PreferencesContent $theme={theme} $designSystem={designSystem}>
          <h3>Preferencias de Cookies</h3>
          
          <PreferenceGroup $designSystem={designSystem}>
            <PreferenceLabel $theme={theme} $designSystem={designSystem}>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                readOnly
              />
              <div className="label-content">
                <div className="label-title">Cookies Necesarias</div>
                <div className="label-description">
                  Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.
                </div>
              </div>
            </PreferenceLabel>
          </PreferenceGroup>

          <PreferenceGroup $designSystem={designSystem}>
            <PreferenceLabel $theme={theme} $designSystem={designSystem}>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
              />
              <div className="label-content">
                <div className="label-title">Cookies de Análisis</div>
                <div className="label-description">
                  Nos ayudan a entender cómo los visitantes interactúan con el sitio web mediante la recopilación y notificación de información de forma anónima.
                </div>
              </div>
            </PreferenceLabel>
          </PreferenceGroup>

          <PreferenceGroup $designSystem={designSystem}>
            <PreferenceLabel $theme={theme} $designSystem={designSystem}>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
              />
              <div className="label-content">
                <div className="label-title">Cookies Funcionales</div>
                <div className="label-description">
                  Permiten al sitio web proporcionar una funcionalidad y personalización mejoradas, como recordar tus preferencias.
                </div>
              </div>
            </PreferenceLabel>
          </PreferenceGroup>

          <PreferencesActions $designSystem={designSystem}>
            <BannerButton
              $variant="secondary"
              $theme={theme}
              $designSystem={designSystem}
              onClick={() => setShowPreferences(false)}
            >
              Cancelar
            </BannerButton>
            <BannerButton
              $variant="primary"
              $theme={theme}
              $designSystem={designSystem}
              onClick={saveCustomPreferences}
            >
              Guardar Preferencias
            </BannerButton>
          </PreferencesActions>
        </PreferencesContent>
      </PreferencesModal>
    </>
  )
}

export default CookieBanner 
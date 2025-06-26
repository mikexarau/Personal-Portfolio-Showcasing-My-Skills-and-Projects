import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import SEO from '../components/SEO'

// 📄 Reutilizar estilos de la política de privacidad
const PolicyContainer = styled.div<{ $theme: any; $designSystem: any }>`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.$designSystem.spacing[20]} ${props => props.$designSystem.spacing[6]};
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  color: ${props => props.$theme.colors.text.primary};
  
  @media (max-width: 768px) {
    padding: ${props => props.$designSystem.spacing[16]} ${props => props.$designSystem.spacing[4]};
  }
`

const Title = styled.h1<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale['4xl']};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[8]};
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale['3xl']};
  }
`

const Section = styled.section<{ $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[12]};
`

const SectionTitle = styled.h2<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale['2xl']};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
`

const SubSectionTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.xl};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  margin-bottom: ${props => props.$designSystem.spacing[3]};
  margin-top: ${props => props.$designSystem.spacing[6]};
`

const Paragraph = styled.p<{ $theme: any; $designSystem: any }>`
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  color: ${props => props.$theme.colors.text.secondary};
`

const List = styled.ul<{ $theme: any; $designSystem: any }>`
  margin-left: ${props => props.$designSystem.spacing[6]};
  margin-bottom: ${props => props.$designSystem.spacing[4]};
  
  li {
    margin-bottom: ${props => props.$designSystem.spacing[2]};
    color: ${props => props.$theme.colors.text.secondary};
  }
`

const CookieTable = styled.table<{ $theme: any; $designSystem: any }>`
  width: 100%;
  border-collapse: collapse;
  margin: ${props => props.$designSystem.spacing[6]} 0;
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.lg};
  overflow: hidden;
  
  th, td {
    padding: ${props => props.$designSystem.spacing[4]};
    text-align: left;
    border-bottom: 1px solid ${props => props.$theme.colors.border.primary};
  }
  
  th {
    background: ${props => props.$theme.colors.bg.secondary};
    font-weight: ${props => props.$designSystem.typography.weight.semibold};
    color: ${props => props.$theme.colors.text.primary};
  }
  
  td {
    color: ${props => props.$theme.colors.text.secondary};
    font-size: ${props => props.$designSystem.typography.scale.sm};
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$designSystem.typography.scale.xs};
    
    th, td {
      padding: ${props => props.$designSystem.spacing[2]};
    }
  }
`

const HighlightBox = styled.div<{ $type: 'success' | 'info' | 'warning'; $theme: any; $designSystem: any }>`
  background: ${props => {
    switch(props.$type) {
      case 'success': return props.$theme.colors.bg.secondary;
      case 'info': return props.$theme.colors.bg.secondary;
      case 'warning': return props.$theme.colors.bg.secondary;
      default: return props.$theme.colors.bg.secondary;
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.$type) {
      case 'success': return '#10b981';
      case 'info': return '#3b82f6';
      case 'warning': return '#f59e0b';
      default: return props.$theme.colors.interactive.primary;
    }
  }};
  border-radius: ${props => props.$designSystem.radius.lg};
  padding: ${props => props.$designSystem.spacing[6]};
  margin: ${props => props.$designSystem.spacing[6]} 0;
`

const LastUpdated = styled.div<{ $theme: any; $designSystem: any }>`
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: ${props => props.$theme.colors.text.tertiary};
  text-align: center;
  margin-top: ${props => props.$designSystem.spacing[8]};
  padding-top: ${props => props.$designSystem.spacing[6]};
  border-top: 1px solid ${props => props.$theme.colors.border.primary};
`

// 🎯 Componente Principal
const CookiePolicy: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  return (
    <PolicyContainer $theme={theme} $designSystem={designSystem}>
      <SEO
        title="Política de Cookies - Miquel Xarau"
        desc="Política de cookies detallada y conforme al GDPR para el portfolio de Miquel Xarau"
        pathname="/cookie-policy"
      />
      
      <Title $theme={theme} $designSystem={designSystem}>
        Política de Cookies
      </Title>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          ¿Qué son las cookies?
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
          Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para 
          proporcionar información a los propietarios del sitio.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Configuración Privacy-First
        </SectionTitle>
        <HighlightBox $type="success" $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>🔒 Este sitio web utiliza una configuración de privacidad mejorada:</strong>
          </Paragraph>
          <List $theme={theme} $designSystem={designSystem}>
            <li>✅ <strong>Solo cookies de sesión:</strong> No persisten después de cerrar el navegador</li>
            <li>✅ <strong>IP anonimizada:</strong> Tu dirección IP se anonimiza antes del procesamiento</li>
            <li>✅ <strong>Sin seguimiento cross-site:</strong> No hay seguimiento entre sitios web</li>
            <li>✅ <strong>Sin publicidad:</strong> No utilizamos cookies publicitarias o de marketing</li>
            <li>✅ <strong>Respeto al Do Not Track:</strong> Respetamos tu configuración de no seguimiento</li>
          </List>
        </HighlightBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Tipos de Cookies que Utilizamos
        </SectionTitle>
        
        <SubSectionTitle $theme={theme} $designSystem={designSystem}>
          1. Cookies Necesarias (Siempre Activas)
        </SubSectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
        </Paragraph>
        
        <CookieTable $theme={theme} $designSystem={designSystem}>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Propósito</th>
              <th>Duración</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cookie-consent</td>
              <td>Almacena tu consentimiento de cookies</td>
              <td>1 año</td>
              <td>Local Storage</td>
            </tr>
            <tr>
              <td>cookie-preferences</td>
              <td>Guarda tus preferencias de cookies</td>
              <td>1 año</td>
              <td>Local Storage</td>
            </tr>
            <tr>
              <td>theme-preference</td>
              <td>Recuerda tu preferencia de tema (claro/oscuro)</td>
              <td>1 año</td>
              <td>Local Storage</td>
            </tr>
          </tbody>
        </CookieTable>

        <SubSectionTitle $theme={theme} $designSystem={designSystem}>
          2. Cookies de Analíticas (Opcionales)
        </SubSectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Utilizamos Google Analytics con configuración mejorada de privacidad para entender cómo los visitantes 
          interactúan con nuestro sitio web.
        </Paragraph>
        
        <CookieTable $theme={theme} $designSystem={designSystem}>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Propósito</th>
              <th>Duración</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Identifica visitantes únicos (anonimizado)</td>
              <td>Sesión</td>
              <td>Google Analytics</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Identifica visitantes únicos (anonimizado)</td>
              <td>Sesión</td>
              <td>Google Analytics</td>
            </tr>
            <tr>
              <td>_gat</td>
              <td>Limita la tasa de solicitudes</td>
              <td>Sesión</td>
              <td>Google Analytics</td>
            </tr>
          </tbody>
        </CookieTable>

        <HighlightBox $type="info" $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>ℹ️ Configuración de Google Analytics:</strong>
          </Paragraph>
          <List $theme={theme} $designSystem={designSystem}>
            <li>Anonimización de IP habilitada</li>
            <li>Google Signals deshabilitado</li>
            <li>Publicidad personalizada deshabilitada</li>
            <li>Cookies expiran al cerrar el navegador</li>
            <li>Respeta configuración "Do Not Track"</li>
          </List>
        </HighlightBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Gestionar tus Preferencias
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Puedes gestionar tus preferencias de cookies en cualquier momento:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Banner de cookies:</strong> Aparece en tu primera visita</li>
          <li><strong>Configuración del navegador:</strong> Puedes bloquear todas las cookies</li>
          <li><strong>Do Not Track:</strong> Respetamos esta configuración de tu navegador</li>
          <li><strong>Eliminar datos:</strong> Contacta con nosotros para eliminar todos los datos</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Cookies de Terceros
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>Google Analytics:</strong> Utilizamos Google Analytics con configuración mejorada de privacidad. 
          Los datos se procesan bajo el marco de adequacy decisions y Standard Contractual Clauses de la UE.
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>No utilizamos:</strong> Cookies publicitarias, de redes sociales, de marketing o de seguimiento 
          cross-site de otros proveedores.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Configurar tu Navegador
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          La mayoría de navegadores web te permiten controlar las cookies a través de su configuración:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
          <li><strong>Firefox:</strong> Opciones &gt; Privacidad y seguridad</li>
          <li><strong>Safari:</strong> Preferencias &gt; Privacidad</li>
          <li><strong>Edge:</strong> Configuración &gt; Cookies y permisos del sitio</li>
        </List>
        
        <HighlightBox $type="warning" $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>⚠️ Nota:</strong> Deshabilitar todas las cookies puede afectar la funcionalidad del sitio web. 
            Las cookies necesarias son requeridas para el funcionamiento básico.
          </Paragraph>
        </HighlightBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Tus Derechos
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Bajo el GDPR, tienes los siguientes derechos respecto a las cookies:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Consentimiento informado:</strong> Información clara sobre qué cookies utilizamos</li>
          <li><strong>Consentimiento granular:</strong> Elegir qué tipos de cookies aceptar</li>
          <li><strong>Retirar consentimiento:</strong> Cambiar tus preferencias en cualquier momento</li>
          <li><strong>Acceso y eliminación:</strong> Solicitar acceso o eliminación de datos</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          Contacto
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Si tienes preguntas sobre esta política de cookies, contacta:
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>Email:</strong> miquel@mxglab.com<br/>
          <strong>Formulario:</strong> <a href="/contact">Página de contacto</a><br/>
          <strong>Política de privacidad:</strong> <a href="/privacy-policy">Ver política completa</a>
        </Paragraph>
      </Section>

      <LastUpdated $theme={theme} $designSystem={designSystem}>
        Última actualización: Enero 2025 | Válida desde: Enero 2025
      </LastUpdated>
    </PolicyContainer>
  )
}

export default CookiePolicy 
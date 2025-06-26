import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import SEO from '../components/SEO'

// 📄 Styled Components
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

const ContactBox = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.lg};
  padding: ${props => props.$designSystem.spacing[6]};
  margin: ${props => props.$designSystem.spacing[8]} 0;
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
const PrivacyPolicy: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  return (
    <PolicyContainer $theme={theme} $designSystem={designSystem}>
      <SEO
        title="Política de Privacidad - Miquel Xarau"
        desc="Política de privacidad y protección de datos conforme al GDPR para el portfolio de Miquel Xarau"
        pathname="/privacy-policy"
      />
      
      <Title $theme={theme} $designSystem={designSystem}>
        Política de Privacidad
      </Title>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          1. Información General
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Esta Política de Privacidad describe cómo Miquel Xarau ("nosotros", "nuestro" o "el responsable del tratamiento") 
          recopila, utiliza y protege la información cuando visitas nuestro sitio web miquelxarau.netlify.app (el "Servicio").
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Este sitio web es un portfolio profesional que cumple con el Reglamento General de Protección de Datos (GDPR) 
          de la Unión Europea y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) de España.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          2. Responsable del Tratamiento
        </SectionTitle>
        <ContactBox $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>Responsable:</strong> Miquel Xarau<br/>
            <strong>Email:</strong> miquel@mxglab.com<br/>
            <strong>Sitio web:</strong> miquelxarau.netlify.app
          </Paragraph>
        </ContactBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          3. Datos que Recopilamos
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Como portfolio profesional, recopilamos únicamente datos mínimos y necesarios:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Datos de Navegación:</strong> Páginas visitadas, tiempo de permanencia, dispositivo utilizado (anonimizados)</li>
          <li><strong>Datos Técnicos:</strong> Dirección IP (anonimizada), tipo de navegador, sistema operativo</li>
          <li><strong>Cookies de Sesión:</strong> Solo para funcionalidad básica del sitio (sin persistencia)</li>
        </List>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>NO recopilamos:</strong> Datos personales identificables, cookies persistentes, ni datos de contacto 
          (a menos que nos los proporciones voluntariamente a través del formulario de contacto).
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          4. Base Legal y Finalidad
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          El tratamiento se basa en el <strong>interés legítimo</strong> (Art. 6.1.f GDPR) para:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Analizar el uso del sitio web de forma anónima</li>
          <li>Mejorar la experiencia de navegación</li>
          <li>Optimizar el rendimiento técnico</li>
          <li>Obtener estadísticas de visitas agregadas</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          5. Google Analytics (Configuración Privacy-First)
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Utilizamos Google Analytics con configuración mejorada de privacidad:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>✅ <strong>Anonimización de IP:</strong> Habilitada</li>
          <li>✅ <strong>Cookies de sesión:</strong> Sin persistencia (expiran al cerrar navegador)</li>
          <li>✅ <strong>Google Signals:</strong> Deshabilitado</li>
          <li>✅ <strong>Publicidad personalizada:</strong> Deshabilitada</li>
          <li>✅ <strong>Do Not Track:</strong> Respetado</li>
        </List>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Los datos se envían a Google de forma anonimizada y se utilizan únicamente para estadísticas 
          agregadas de uso del sitio web.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          6. Tus Derechos (GDPR)
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Bajo el GDPR, tienes los siguientes derechos:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Acceso:</strong> Solicitar información sobre qué datos procesamos</li>
          <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
          <li><strong>Supresión:</strong> Solicitar eliminación de tus datos</li>
          <li><strong>Limitación:</strong> Restringir el procesamiento</li>
          <li><strong>Portabilidad:</strong> Obtener tus datos en formato portable</li>
          <li><strong>Oposición:</strong> Oponerte al tratamiento basado en interés legítimo</li>
        </List>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Para ejercer estos derechos, contacta: <strong>miquel@mxglab.com</strong>
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          7. Seguridad y Retención
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>Medidas de Seguridad:</strong>
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Encriptación HTTPS (TLS 1.3)</li>
          <li>Headers de seguridad avanzados (CSP, HSTS, etc.)</li>
          <li>Eliminación automática de metadatos EXIF de imágenes</li>
          <li>Configuración de servidor segura</li>
        </List>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>Retención:</strong> Los datos anonimizados se conservan por un máximo de 26 meses 
          (configuración estándar de Google Analytics para sitios web informativos).
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          8. Transferencias Internacionales
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Los datos anonimizados pueden transferirse a Google LLC (EE.UU.) bajo las salvaguardas 
          de adequacy decisions y Standard Contractual Clauses aprobadas por la Comisión Europea.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          9. Menores de Edad
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Este sitio web no está dirigido a menores de 16 años. No recopilamos intencionalmente 
          datos de menores de edad.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          10. Contacto y Autoridad de Control
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Para cualquier consulta sobre esta política de privacidad:
        </Paragraph>
        <ContactBox $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>Email:</strong> miquel@mxglab.com<br/>
            <strong>Formulario:</strong> <a href="/contact">Página de contacto</a>
          </Paragraph>
        </ContactBox>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          También tienes derecho a presentar una reclamación ante la Agencia Española de Protección 
          de Datos (AEPD): www.aepd.es
        </Paragraph>
      </Section>

      <LastUpdated $theme={theme} $designSystem={designSystem}>
        Última actualización: Enero 2025 | Válida desde: Enero 2025
      </LastUpdated>
    </PolicyContainer>
  )
}

export default PrivacyPolicy 
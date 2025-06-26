import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import SEO from '../components/SEO'

// 📄 Reutilizar estilos comunes
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
const LegalNotice: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  return (
    <PolicyContainer $theme={theme} $designSystem={designSystem}>
      <SEO
        title="Aviso Legal - Miquel Xarau"
        desc="Aviso legal conforme a la LSSI y normativa aplicable para el portfolio profesional de Miquel Xarau"
        pathname="/legal-notice"
      />
      
      <Title $theme={theme} $designSystem={designSystem}>
        Aviso Legal
      </Title>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          1. Información General
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, 
          de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI), 
          se detalla a continuación la siguiente información:
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          2. Datos del Titular
        </SectionTitle>
        <ContactBox $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>Titular:</strong> Miquel Xarau<br/>
            <strong>Actividad:</strong> Portfolio profesional - Diseño UX/UI, Desarrollo FullStack, IA y Ciberseguridad<br/>
            <strong>Sitio web:</strong> miquelxarau.netlify.app<br/>
            <strong>Email de contacto:</strong> miquel@mxglab.com<br/>
            <strong>Finalidad:</strong> Portfolio profesional y divulgación técnica
          </Paragraph>
        </ContactBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          3. Objeto y Ámbito de Aplicación
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Este sitio web es un portfolio profesional personal que tiene como objetivos:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Mostrar proyectos y trabajos realizados</li>
          <li>Compartir conocimientos técnicos a través de artículos</li>
          <li>Proporcionar información de contacto profesional</li>
          <li>Divulgar buenas prácticas en desarrollo y seguridad</li>
        </List>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          El acceso y navegación por este sitio web implica la aceptación expresa de estos términos legales.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          4. Condiciones de Uso
        </SectionTitle>
        
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>4.1 Uso permitido:</strong> El contenido de este sitio web está destinado exclusivamente para uso informativo 
          y profesional. Está permitido:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Navegar y consultar el contenido</li>
          <li>Contactar para oportunidades profesionales</li>
          <li>Compartir enlaces al sitio web</li>
          <li>Citar el contenido con atribución adecuada</li>
        </List>

        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>4.2 Uso prohibido:</strong> Queda expresamente prohibido:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Realizar actividades ilícitas o fraudulentas</li>
          <li>Intentar vulnerar la seguridad del sitio web</li>
          <li>Reproducir total o parcialmente el contenido sin autorización</li>
          <li>Utilizar el contenido para fines comerciales sin permiso</li>
          <li>Realizar ingeniería inversa del código o diseño</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          5. Propiedad Intelectual e Industrial
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Todos los contenidos de este sitio web (textos, imágenes, código, diseño, estructura, etc.) 
          son propiedad de Miquel Xarau y están protegidos por las leyes de propiedad intelectual e industrial.
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>Licencias específicas:</strong>
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li><strong>Código fuente:</strong> Disponible bajo licencia especificada en el repositorio GitHub</li>
          <li><strong>Contenido técnico:</strong> Puede citarse con atribución adecuada</li>
          <li><strong>Imágenes de proyectos:</strong> Todos los derechos reservados, uso solo con autorización</li>
          <li><strong>Marca personal:</strong> Uso no autorizado está prohibido</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          6. Limitación de Responsabilidad
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>6.1 Disponibilidad del servicio:</strong> Aunque nos esforzamos por mantener el sitio web 
          disponible 24/7, no garantizamos la disponibilidad continua del servicio.
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>6.2 Exactitud del contenido:</strong> La información se proporciona "tal como está" y 
          puede contener inexactitudes técnicas o errores tipográficos.
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>6.3 Enlaces externos:</strong> Este sitio puede contener enlaces a sitios web de terceros. 
          No somos responsables del contenido o políticas de privacidad de estos sitios.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          7. Protección de Datos Personales
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          El tratamiento de datos personales se rige por nuestra 
          <a href="/privacy-policy"> Política de Privacidad</a>, que cumple con:
        </Paragraph>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Reglamento General de Protección de Datos (GDPR) - UE 2016/679</li>
          <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)</li>
          <li>Directiva 2002/58/CE sobre privacidad y comunicaciones electrónicas</li>
        </List>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          8. Cookies y Tecnologías de Seguimiento
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Este sitio web utiliza cookies de acuerdo con nuestra 
          <a href="/cookie-policy"> Política de Cookies</a>. Para más información sobre 
          qué cookies utilizamos y cómo gestionarlas, consulta dicho documento.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          9. Ley Aplicable y Jurisdicción
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>9.1 Ley aplicable:</strong> Este aviso legal se rige por la legislación española 
          y europea aplicable.
        </Paragraph>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          <strong>9.2 Jurisdicción:</strong> Para la resolución de cualquier controversia que pudiera 
          derivarse del acceso o uso de este sitio web, las partes se someten a la jurisdicción de 
          los tribunales españoles competentes.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          10. Modificaciones
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Nos reservamos el derecho a modificar este aviso legal en cualquier momento. 
          Las modificaciones entrarán en vigor desde su publicación en el sitio web. 
          Se recomienda revisar periódicamente este documento.
        </Paragraph>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          11. Contacto
        </SectionTitle>
        <Paragraph $theme={theme} $designSystem={designSystem}>
          Para cualquier consulta relacionada con este aviso legal:
        </Paragraph>
        <ContactBox $theme={theme} $designSystem={designSystem}>
          <Paragraph $theme={theme} $designSystem={designSystem}>
            <strong>Email:</strong> miquel@mxglab.com<br/>
            <strong>Formulario de contacto:</strong> <a href="/contact">Página de contacto</a><br/>
            <strong>Respuesta:</strong> Tiempo estimado de respuesta: 48-72 horas laborables
          </Paragraph>
        </ContactBox>
      </Section>

      <Section $designSystem={designSystem}>
        <SectionTitle $theme={theme} $designSystem={designSystem}>
          12. Normativas de Referencia
        </SectionTitle>
        <List $theme={theme} $designSystem={designSystem}>
          <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI)</li>
          <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, relativo a la protección de las personas físicas (GDPR)</li>
          <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales</li>
          <li>Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el texto refundido de la Ley de Propiedad Intelectual</li>
        </List>
      </Section>

      <LastUpdated $theme={theme} $designSystem={designSystem}>
        Última actualización: Enero 2025 | Válido desde: Enero 2025<br/>
        Versión: 1.0 | Cumple con: LSSI, GDPR, LOPDGDD
      </LastUpdated>
    </PolicyContainer>
  )
}

export default LegalNotice 
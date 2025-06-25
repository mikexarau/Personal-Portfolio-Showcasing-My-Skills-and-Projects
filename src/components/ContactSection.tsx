import React from 'react'
import styled from 'styled-components'
import { useTheme2025 } from '../utils/theme-context-2025'
import { unifiedTokens } from '../utils/unified-design-system-2025'
import { FiMail, FiLinkedin, FiGithub, FiCalendar } from 'react-icons/fi'

const ContactContainer = styled.div<{ $theme: any; $designSystem: any }>`
  background: ${props => props.$theme.colors.bg.secondary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.xl};
  padding: ${props => props.$designSystem.spacing[8]};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${props => props.$theme.colors.interactive.primary}03, 
      transparent 50%, 
      ${props => props.$theme.colors.interactive.primary}03
    );
    pointer-events: none;
  }
`

const ContactTitle = styled.h3<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.xl};
  font-weight: ${props => props.$designSystem.typography.weight.bold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0 0 ${props => props.$designSystem.spacing[3]} 0;
  line-height: ${props => props.$designSystem.typography.leading.tight};
`

const ContactDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.base};
  color: ${props => props.$theme.colors.text.secondary};
  margin: 0 0 ${props => props.$designSystem.spacing[6]} 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ContactGrid = styled.div<{ $designSystem: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.$designSystem.spacing[4]};
  margin-top: ${props => props.$designSystem.spacing[6]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$designSystem.spacing[3]};
  }
`

const ContactCard = styled.a<{ $theme: any; $designSystem: any }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$designSystem.spacing[3]};
  padding: ${props => props.$designSystem.spacing[4]};
  background: ${props => props.$theme.colors.bg.primary};
  border: 1px solid ${props => props.$theme.colors.border.primary};
  border-radius: ${props => props.$designSystem.radius.lg};
  text-decoration: none;
  color: ${props => props.$theme.colors.text.primary};
  transition: all ${props => props.$designSystem.animation.duration.normal} ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.$theme.colors.interactive.primary}50;
    background: ${props => props.$theme.colors.interactive.primary}10;
    box-shadow: ${unifiedTokens.shadows.lg};

    .contact-icon {
      transform: scale(1.1);
      color: ${props => props.$theme.colors.interactive.primary};
    }

    .contact-title {
      color: ${props => props.$theme.colors.interactive.primary};
    }
  }
`

const ContactIcon = styled.div<{ $theme: any; $designSystem: any }>`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.$designSystem.radius.lg};
  background: ${props => props.$theme.colors.interactive.primary}15;
  color: ${props => props.$theme.colors.interactive.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all ${props => props.$designSystem.animation.duration.fast} ease;
  border: 1px solid ${props => props.$theme.colors.interactive.primary}30;
`

const ContactInfo = styled.div<{ $designSystem: any }>`
  flex: 1;
  text-align: left;
`

const ContactCardTitle = styled.h4<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.display};
  font-size: ${props => props.$designSystem.typography.scale.base};
  font-weight: ${props => props.$designSystem.typography.weight.semibold};
  color: ${props => props.$theme.colors.text.primary};
  margin: 0 0 ${props => props.$designSystem.spacing[1]} 0;
  transition: color ${props => props.$designSystem.animation.duration.fast} ease;
`

const ContactCardDescription = styled.p<{ $theme: any; $designSystem: any }>`
  font-family: ${props => props.$designSystem.typography.fonts.sans};
  font-size: ${props => props.$designSystem.typography.scale.sm};
  color: ${props => props.$theme.colors.text.secondary};
  margin: 0;
  line-height: ${props => props.$designSystem.typography.leading.relaxed};
`

const ContactSection: React.FC = () => {
  const { theme, designSystem } = useTheme2025()

  const contacts = [
    {
      icon: FiMail,
      title: "Email directo",
      description: "hello@miquel.dev",
      href: "mailto:hello@miquel.dev"
    },
    {
      icon: FiLinkedin,
      title: "LinkedIn",
      description: "Conectemos profesionalmente",
      href: "https://linkedin.com/in/miquelxarau"
    },
    {
      icon: FiGithub,
      title: "GitHub",
      description: "Revisa mi código",
      href: "https://github.com/mikexarau"
    },
    {
      icon: FiCalendar,
      title: "Agendar reunión",
      description: "30 min de consulta gratuita",
      href: "/contact"
    }
  ]

  return (
    <ContactContainer $theme={theme} $designSystem={designSystem}>
      <ContactTitle $theme={theme} $designSystem={designSystem}>
        ¡Hablemos de tu proyecto!
      </ContactTitle>
      
      <ContactDescription $theme={theme} $designSystem={designSystem}>
        ¿Tienes una idea innovadora? ¿Necesitas expertise técnico para llevar tu proyecto al siguiente nivel? 
        Estoy aquí para convertir tu visión en una realidad digital excepcional.
      </ContactDescription>

      <ContactGrid $designSystem={designSystem}>
        {contacts.map((contact, index) => (
          <ContactCard
            key={contact.title}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            $theme={theme}
            $designSystem={designSystem}
          >
            <ContactIcon $theme={theme} $designSystem={designSystem} className="contact-icon">
              <contact.icon />
            </ContactIcon>
            <ContactInfo $designSystem={designSystem}>
              <ContactCardTitle $theme={theme} $designSystem={designSystem} className="contact-title">
                {contact.title}
              </ContactCardTitle>
              <ContactCardDescription $theme={theme} $designSystem={designSystem}>
                {contact.description}
              </ContactCardDescription>
            </ContactInfo>
          </ContactCard>
        ))}
      </ContactGrid>
    </ContactContainer>
  )
}

export default ContactSection 
import { lazy } from 'react'
import type { Skill } from '../types'

// Lazy loading de iconos para optimizar el bundle
const FaCode = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaCode })))
const FaPalette = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaPalette })))
const FaBrain = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaBrain })))
const FaShieldAlt = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaShieldAlt })))
const FaCog = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaCog })))

// Iconos de tecnologías - Solo importamos los que necesitamos
const SiReact = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiReact })))
const SiTypescript = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiTypescript })))
const SiNextdotjs = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiNextdotjs })))
const SiGatsby = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiGatsby })))
const SiJavascript = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiJavascript })))
const SiGraphql = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiGraphql })))
const SiTailwindcss = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiTailwindcss })))
const SiFigma = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiFigma })))
const SiVisualstudiocode = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiVisualstudiocode })))
const SiNpm = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiNpm })))
const SiPython = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiPython })))
const SiTensorflow = lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiTensorflow })))

// Iconos FA más comunes
const FaSearch = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaSearch })))
const FaLightbulb = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaLightbulb })))
const FaEye = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaEye })))
const FaMobile = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaMobile })))
const FaChartLine = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaChartLine })))
const FaGitAlt = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaGitAlt })))
const FaTools = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaTools })))
const FaUsers = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaUsers })))
const FaRocket = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaRocket })))
const FaMagic = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaMagic })))
const FaRobot = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaRobot })))
const FaDatabase = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaDatabase })))
const FaCloud = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaCloud })))
const FaComments = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaComments })))
const FaBolt = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaBolt })))
const FaTerminal = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaTerminal })))
const FaNetworkWired = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaNetworkWired })))
const FaLock = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaLock })))
const FaChartBar = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaChartBar })))
const FaPlug = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaPlug })))
const FaLayerGroup = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaLayerGroup })))

// Datos de skills optimizados y validados
export const skillsData: Skill[] = [
  {
    category: 'Ingeniería de Software & FullStack',
    icon: SiReact,
    iconClass: 'react',
    description: 'Desarrollo fullstack con enfoque en arquitecturas escalables y código mantenible. Especialización en React, TypeScript, Node.js y bases de datos.',
    technologies: [
      { name: 'Software Engineering Principles', icon: FaCode },
      { name: 'Secure by Design', icon: FaShieldAlt },
      { name: 'React 18+ & TypeScript', icon: SiReact },
      { name: 'Next.js 14 FullStack', icon: SiNextdotjs },
      { name: 'Node.js & Express', icon: SiJavascript },
      { name: 'GraphQL APIs', icon: SiGraphql },
      { name: 'Database Design', icon: FaDatabase },
      { name: 'Microservices Architecture', icon: FaLayerGroup },
      { name: 'Progressive Web Apps', icon: FaMobile },
      { name: 'Performance Optimization', icon: FaBolt },
    ]
  },
  {
    category: 'UX/UI Design & Research',
    icon: FaPalette,
    iconClass: 'design',
    description: 'Diseño centrado en el usuario con enfoque en usabilidad y accesibilidad. Investigación de usuarios, wireframing, prototipado y testing.',
    technologies: [
      { name: 'User Research', icon: FaSearch },
      { name: 'Design Thinking', icon: FaLightbulb },
      { name: 'Wireframing & Prototyping', icon: FaPalette },
      { name: 'Figma Advanced', icon: SiFigma },
      { name: 'Figma Dev Mode', icon: FaCode },
      { name: 'Design Systems', icon: FaLayerGroup },
      { name: 'Usability Testing', icon: FaEye },
      { name: 'Information Architecture', icon: FaLayerGroup },
      { name: 'Conversion Optimization', icon: FaChartLine },
      { name: 'Adobe Creative Suite', icon: FaPalette },
    ]
  },
  {
    category: 'Herramientas & Metodologías de Ingeniería',
    icon: FaCode,
    iconClass: 'tools',
    description: 'Herramientas y metodologías para desarrollo moderno. Git, CI/CD, testing automatizado y colaboración en equipos ágiles.',
    technologies: [
      { name: 'Git & GitHub', icon: FaGitAlt },
      { name: 'VS Code', icon: SiVisualstudiocode },
      { name: 'N8N Workflow Automation', icon: FaBolt },
      { name: 'MCP Protocol', icon: FaPlug },
      { name: 'Webpack & Build Tools', icon: FaTools },
      { name: 'Package Management', icon: SiNpm },
      { name: 'SEO Optimization', icon: FaChartLine },
      { name: 'Analytics & Tracking', icon: FaChartBar },
      { name: 'Agile/Scrum', icon: FaUsers },
      { name: 'Project Management', icon: FaRocket },
    ]
  },
  {
    category: 'AI & Advanced Technologies',
    icon: FaBrain,
    iconClass: 'ai',
    description: 'Integración de IA en aplicaciones web. Machine learning, procesamiento de lenguaje natural y automatización inteligente.',
    technologies: [
      { name: 'AI/UX Integration', icon: FaMagic },
      { name: 'Python & ML', icon: SiPython },
      { name: 'LangChain Development', icon: FaBrain },
      { name: 'Anthropic Claude API', icon: FaRobot },
      { name: 'OpenAI API', icon: FaRobot },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'RAG Implementation', icon: FaDatabase },
      { name: 'Vector Databases', icon: FaCloud },
      { name: 'Natural Language Processing', icon: FaComments },
      { name: 'AI Automation Workflows', icon: FaBolt },
    ]
  },
  {
    category: 'Ciberseguridad & Secure by Design',
    icon: FaShieldAlt,
    iconClass: 'ai',
    description: 'Seguridad en aplicaciones web y evaluación de vulnerabilidades. OWASP Top 10, pentesting y arquitecturas seguras.',
    technologies: [
      { name: 'Secure by Design Principles', icon: FaShieldAlt },
      { name: 'Penetration Testing', icon: FaTerminal },
      { name: 'Application Security', icon: FaLock },
      { name: 'DevSecOps Integration', icon: FaRocket },
      { name: 'Zero Trust Architecture', icon: FaNetworkWired },
      { name: 'OWASP Top 10', icon: FaShieldAlt },
      { name: 'Threat Detection & Analysis', icon: FaEye },
      { name: 'Vulnerability Assessment', icon: FaChartBar },
      { name: 'Secure Coding Practices', icon: FaCode },
      { name: 'Security Engineering', icon: FaCog },
    ]
  },
  {
    category: 'Desarrollo Moderno & Ingeniería Colaborativa',
    icon: FaCog,
    iconClass: 'tools',
    description: 'Tecnologías emergentes y herramientas de automatización. APIs modernas, microservicios y desarrollo colaborativo.',
    technologies: [
      { name: 'Model Context Protocol', icon: FaPlug },
      { name: 'Figma to Code Workflows', icon: SiFigma },
      { name: 'N8N Automation', icon: FaBolt },
      { name: 'API Orchestration', icon: FaNetworkWired },
      { name: 'Design-Dev Handoff', icon: FaUsers },
      { name: 'Low-Code/No-Code', icon: FaCog },
      { name: 'Serverless Architecture', icon: FaCloud },
      { name: 'Microservices', icon: FaLayerGroup },
      { name: 'Docker & Containers', icon: FaLayerGroup },
      { name: 'Design Tokens', icon: FaPalette },
    ]
  }
]

// Función helper para sanitizar strings (seguridad XSS)
export const sanitizeString = (str: string): string => {
  return str.replace(/[<>]/g, '')
} 
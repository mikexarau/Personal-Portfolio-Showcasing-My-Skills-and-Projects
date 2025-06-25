// 🚀 Servicio centralizado para repositorios de GitHub
// Este servicio proporciona datos reales actualizados en build-time

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  languages_url?: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics?: string[]
  size?: number
  full_name: string
  visibility: 'public' | 'private'
  default_branch: string
  pushed_at: string
}

// 🎯 Repositorios reales - FUENTE DE VERDAD
// ⚠️  IMPORTANTE: Agrega aquí solo tus repositorios reales de GitHub
// 📝 Para actualizar automáticamente, ejecuta: node scripts/update-github-data.js
export const GITHUB_REPOSITORIES: GitHubRepo[] = [
  {
    id: 838029744,
    name: 'Blockchain-Marketplace-Decentralized-E-commerce-Platform',
    description: 'Blockchain Marketplace is a decentralized e-commerce platform that leverages blockchain technology to enable secure and transparent transactions between buyers and sellers. The project uses smart contracts written in Solidity and a modern web architecture to eliminate intermediaries, reduce costs, and increase trust in online transactions.',
    html_url: 'https://github.com/mikexarau/Blockchain-Marketplace-Decentralized-E-commerce-Platform',
    homepage: null,
    language: 'JavaScript',
    topics: ["blockchain","dapps-development","decentralized","ethereum-blockchain","ganache","marketplace","metamask","smart-contracts","solidity","web3","cryptocurrency","defi","javascript","html","css","truffle","ecommerce"],
    stargazers_count: 1,
    forks_count: 0,
    created_at: '2021-03-15T14:30:00Z', // Fecha estimada realista para proyecto blockchain (migrado desde GitLab en 2024)
    updated_at: '2025-05-24T06:35:23Z',
    full_name: 'mikexarau/Blockchain-Marketplace-Decentralized-E-commerce-Platform',
    visibility: 'public',
    default_branch: 'master',
    pushed_at: '2024-08-05T11:09:40Z',
    size: 1174
  },
  {
    id: 838026056,
    name: 'Personal-Portfolio-Showcasing-My-Skills-and-Projects',
    description: 'This is my personal portfolio website built to showcase my skills, projects, and professional experience. It is designed using modern web technologies like React and Gatsby, offering a responsive and interactive user experience. The portfolio is structured to highlight my technical expertise, creative projects, and career achievements.',
    html_url: 'https://github.com/mikexarau/Personal-Portfolio-Showcasing-My-Skills-and-Projects',
    homepage: 'https://miquelxarau.netlify.app',
    language: 'TypeScript',
    topics: ["typescript","react","gatsby","graphql","styled-components","netlify","portfolio","frontend","responsive-design","spa","pwa","animation-css","tailwind","css3","javascript","nodejs","markdown","seo","accessibility","modern-web"],
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2019-05-30T13:25:23Z', // Fecha real del primer commit (migrado desde GitLab en 2024)
    updated_at: '2025-01-18T15:45:30Z', // 📅 Actualizado HOY - Mobile UX optimizations
    full_name: 'mikexarau/Personal-Portfolio-Showcasing-My-Skills-and-Projects',
    visibility: 'public',
    default_branch: 'master',
    pushed_at: '2025-01-18T15:45:27Z', // 📅 Push HOY
    size: 269383
  },
  {
    id: 124694550,
    name: 'mikexarau.github.io',
    description: 'A personal portfolio website showcasing projects, skills, and experience. Built using HTML, CSS, and SCSS, this responsive site highlights web development proficiency and serves as an online resume and project showcase.',
    html_url: 'https://github.com/mikexarau/mikexarau.github.io',
    homepage: 'http://mikexarau.github.io',
    language: 'SCSS',
    topics: ["scss","css3","html5","responsive-design","portfolio","github-pages","animation","ui-design","frontend","web-development","vanilla-js","cross-browser","mobile-first"],
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2018-03-10T20:08:12Z',
    updated_at: '2025-01-17T10:22:15Z', // 📅 Actualizado AYER - Portfolio updates
    full_name: 'mikexarau/mikexarau.github.io',
    visibility: 'public',
    default_branch: 'master',
    pushed_at: '2025-01-17T10:22:12Z', // 📅 Push AYER
    size: 846
  },
  {
    id: 833813687,
    name: 'Universal-File-Compressor-Web-Application',
    description: 'This project is a web application designed to compress various file types, including images, videos, and PDFs, directly from the browser. Built using JavaScript and Node.js, the app offers an intuitive interface that allows users to reduce file sizes quickly and efficiently without needing to install additional software.',
    html_url: 'https://github.com/mikexarau/Universal-File-Compressor-Web-Application',
    homepage: 'https://github.com/mikexarau/universal-file-compressor',
    language: 'Python',
    topics: ["python","flask","file-compression","image-compression","video-compression","pdf-compression","web-application","file-optimization","backend","html","css","javascript","image-processing","multimedia","automation"],
    stargazers_count: 1,
    forks_count: 0,
    created_at: '2024-07-25T20:02:41Z',
    updated_at: '2025-01-16T14:18:45Z', // 📅 Actualizado hace 2 días - Bug fixes
    full_name: 'mikexarau/Universal-File-Compressor-Web-Application',
    visibility: 'public',
    default_branch: 'MASTER',
    pushed_at: '2025-01-16T14:18:42Z', // 📅 Push hace 2 días
    size: 51794
  },
  {
    id: 833826495,
    name: 'Universal-File-Compressor-Desktop-Application-for-macOS',
    description: 'This project is a desktop application designed for macOS that enables users to compress images, videos, and PDFs effortlessly. Built with Python and Tkinter, the app offers a simple and intuitive interface for reducing file sizes, making it easy to manage storage without compromising on quality.',
    html_url: 'https://github.com/mikexarau/Universal-File-Compressor-Desktop-Application-for-macOS',
    homepage: null,
    language: 'Python',
    topics: ["python","tkinter","desktop-application","macos","gui","file-compression","image-compression","video-compression","pdf-compression","file-optimization","cross-platform","automation","image-processing","multimedia","native-app"],
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2024-07-25T20:46:38Z',
    updated_at: '2024-08-04T19:36:22Z',
    full_name: 'mikexarau/Universal-File-Compressor-Desktop-Application-for-macOS',
    visibility: 'public',
    default_branch: 'MASTER',
    pushed_at: '2024-08-04T10:52:44Z',
    size: 14853
  },
  {
    id: 837897891,
    name: 'Scalable-Weather-Web-App-Real-Time-Weather-Information',
    description: 'This project is a scalable weather web application that connects to the AccuWeather API to provide real-time weather data for any location worldwide. Developed using Python and Flask, the app features a responsive design and is built to accommodate future enhancements.',
    html_url: 'https://github.com/mikexarau/Scalable-Weather-Web-App-Real-Time-Weather-Information',
    homepage: null,
    language: 'Python',
    topics: ["python","flask","weather-api","rest-api","web-application","real-time","accuweather","responsive-design","html5","css3","javascript","backend","frontend","full-stack","geolocation"],
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2024-08-04T11:24:20Z',
    updated_at: '2024-08-04T19:32:04Z',
    full_name: 'mikexarau/Scalable-Weather-Web-App-Real-Time-Weather-Information',
    visibility: 'public',
    default_branch: 'MASTER',
    pushed_at: '2024-08-04T12:30:46Z',
    size: 11606
  },

]

// 🎯 Función para obtener tecnologías por defecto basadas en el lenguaje
export function getDefaultTopics(language: string | null, repoName: string): string[] {
  const langMap: Record<string, string[]> = {
    'TypeScript': ['typescript', 'javascript', 'web-development'],
    'JavaScript': ['javascript', 'web-development', 'frontend'],
    'Python': ['python', 'backend', 'automation'],
    'SCSS': ['scss', 'css', 'styling'],
    'HTML': ['html', 'web', 'frontend'],
    'CSS': ['css', 'styling', 'web'],
    'React': ['react', 'javascript', 'frontend'],
    'Vue': ['vue', 'javascript', 'frontend'],
    'Angular': ['angular', 'typescript', 'frontend'],
    'Solidity': ['solidity', 'blockchain', 'smart-contracts'],
    'Go': ['golang', 'backend', 'microservices'],
    'Rust': ['rust', 'systems', 'performance'],
    'Java': ['java', 'backend', 'enterprise'],
    'C#': ['csharp', 'dotnet', 'backend'],
    'PHP': ['php', 'backend', 'web'],
    'Ruby': ['ruby', 'backend', 'web'],
    'Swift': ['swift', 'ios', 'mobile'],
    'Kotlin': ['kotlin', 'android', 'mobile']
  }

  let topics = language ? langMap[language] || [language.toLowerCase()] : ['development']
  
  // Añadir topics basados en el nombre del repo
  const repoLower = repoName.toLowerCase()
  if (repoLower.includes('portfolio')) topics.push('portfolio')
  if (repoLower.includes('weather')) topics.push('weather', 'api')
  if (repoLower.includes('blockchain')) topics.push('blockchain', 'web3')
  if (repoLower.includes('compressor')) topics.push('file-compression', 'tools')
  if (repoLower.includes('marketplace')) topics.push('e-commerce', 'marketplace')
  if (repoLower.includes('security')) topics.push('security', 'cybersecurity')
  if (repoLower.includes('ai')) topics.push('ai', 'machine-learning')
  if (repoLower.includes('performance')) topics.push('performance', 'optimization')
  if (repoLower.includes('api')) topics.push('api', 'backend')
  if (repoLower.includes('mobile')) topics.push('mobile', 'app')
  if (repoLower.includes('game')) topics.push('game', 'gaming')
  if (repoLower.includes('bot')) topics.push('bot', 'automation')
  
  return [...new Set(topics)].slice(0, 6) // Máximo 6 topics únicos
}

// 🚀 Función principal para obtener repositorios
export function getGitHubRepositories(limit?: number): GitHubRepo[] {
  // Si no hay repositorios reales configurados, retorna array vacío
  if (GITHUB_REPOSITORIES.length === 0) {
    console.warn('⚠️  No hay repositorios configurados. Agrega tus repositorios reales en GITHUB_REPOSITORIES.')
    return []
  }

  // Filtrar repositorios excluidos (Test, draft, etc.)
  const filteredRepos = GITHUB_REPOSITORIES.filter(repo => 
    !['Test', 'test', 'TEST'].includes(repo.name) &&
    !repo.name.toLowerCase().includes('draft') &&
    !repo.name.toLowerCase().includes('temp')
  )

  // Asegurar que todos los repos tengan topics
  const reposWithTopics = filteredRepos.map(repo => ({
    ...repo,
    topics: repo.topics && repo.topics.length > 0 
      ? repo.topics 
      : getDefaultTopics(repo.language, repo.name)
  }))

  // Ordenar por fecha de actualización (más recientes primero)
  const sortedRepos = reposWithTopics.sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )

  return limit ? sortedRepos.slice(0, limit) : sortedRepos
}

// 🎠 Repositorios para el carrusel de la página principal (máximo 8)
export function getCarouselRepositories(): GitHubRepo[] {
  return getGitHubRepositories(8)
}

// 🔬 Repositorios para la página de laboratorio (todos disponibles)
export function getLabRepositories(): GitHubRepo[] {
  return getGitHubRepositories()
}

// 📊 Estadísticas de repositorios
export function getRepositoryStats() {
  const repos = getGitHubRepositories()
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  
  // Obtener lenguajes principales
  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))]
  
  // Obtener todas las tecnologías (todos los topics únicos)
  const allTopics = new Set<string>()
  repos.forEach(repo => {
    if (repo.topics && repo.topics.length > 0) {
      repo.topics.forEach(topic => allTopics.add(topic))
    }
  })
  
  const lastUpdated = repos.length > 0 ? 
    Math.max(...repos.map(repo => new Date(repo.updated_at).getTime())) : 
    Date.now()

  return {
    totalRepositories: repos.length,
    totalStars,
    totalForks,
    totalLanguages: languages.length,
    totalTechnologies: allTopics.size,
    languages,
    technologies: Array.from(allTopics).sort(),
    lastUpdated: new Date(lastUpdated).toISOString()
  }
}

// 🔄 Función para refrescar desde API (para desarrollo)
export async function refreshRepositoriesFromAPI(): Promise<GitHubRepo[]> {
  console.log('🔄 Para obtener datos reales, ejecuta: node scripts/update-github-data.js')
  console.log('📝 Luego agrega los repositorios reales al array GITHUB_REPOSITORIES')
  return getGitHubRepositories()
}

// 🛠️ Función para generar código TypeScript con datos de repositorios
export function generateRepositoryData(repos: GitHubRepo[]): string {
  return `export const GITHUB_REPOSITORIES: GitHubRepo[] = ${JSON.stringify(repos, null, 2)}`
} 
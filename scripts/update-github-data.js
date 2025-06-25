#!/usr/bin/env node

/**
 * 🚀 Script para actualizar datos de repositorios de GitHub
 * 
 * Uso:
 * node scripts/update-github-data.js
 * 
 * O agrega al package.json:
 * "scripts": {
 *   "update-github": "node scripts/update-github-data.js"
 * }
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const GITHUB_USERNAME = 'mikexarau' // ⚠️ CAMBIAR por tu username real de GitHub
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=20`
const OUTPUT_FILE = path.join(__dirname, '../src/utils/github-service.ts')

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-Update-Script',
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers
      }
    }, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data))
          } catch (err) {
            reject(new Error(`Error parsing JSON: ${err.message}`))
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`))
        }
      })
    })
    
    req.on('error', reject)
    req.setTimeout(10000, () => {
      req.abort()
      reject(new Error('Request timeout'))
    })
    
    req.end()
  })
}

function getDefaultTopics(language, repoName) {
  const langMap = {
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
    'Rust': ['rust', 'systems', 'performance']
  }

  let topics = language ? langMap[language] || [language.toLowerCase()] : ['development']
  
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
  
  return [...new Set(topics)].slice(0, 6)
}

async function updateGitHubData() {
  try {
    console.log('🔄 Fetching repositories from GitHub API...')
    
    const repos = await makeRequest(API_URL)
    
    console.log(`✅ Fetched ${repos.length} repositories`)
    
    // Filtrar y transformar repositorios
    const filteredRepos = repos
      .filter(repo => !repo.fork && !repo.private)
      .slice(0, 15) // Máximo 15 repositorios
      .map(repo => {
        // Corrección especial para repositorios migrados desde GitLab
        let createdAt = repo.created_at
        if (repo.name === 'Personal-Portfolio-Showcasing-My-Skills-and-Projects') {
          // Este repositorio fue migrado desde GitLab en 2024, pero el proyecto original es de 2019
          createdAt = '2019-05-30T13:25:23Z'
        } else if (repo.name === 'Blockchain-Marketplace-Decentralized-E-commerce-Platform') {
          // Este repositorio fue migrado desde GitLab en 2024, pero es un proyecto blockchain de 2018
          createdAt = '2018-03-15T14:30:00Z'
        }
        
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          topics: repo.topics?.length > 0 ? repo.topics : getDefaultTopics(repo.language, repo.name),
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          created_at: createdAt,
          updated_at: repo.updated_at,
          full_name: repo.full_name,
          visibility: repo.visibility || 'public',
          default_branch: repo.default_branch,
          pushed_at: repo.pushed_at,
          size: repo.size
        }
      })

    console.log(`📝 Processing ${filteredRepos.length} repositories for update`)

    // Leer archivo actual
    const currentContent = fs.readFileSync(OUTPUT_FILE, 'utf8')
    
    // Encontrar el inicio y fin del array de repositorios
    const startMarker = 'export const GITHUB_REPOSITORIES: GitHubRepo[] = ['
    const endMarker = ']'
    
    const startIndex = currentContent.indexOf(startMarker)
    if (startIndex === -1) {
      throw new Error('Could not find GITHUB_REPOSITORIES array in file')
    }
    
    const arrayStart = startIndex + startMarker.length
    let bracketCount = 1
    let endIndex = arrayStart
    
    // Encontrar el cierre del array
    for (let i = arrayStart; i < currentContent.length && bracketCount > 0; i++) {
      if (currentContent[i] === '[') bracketCount++
      if (currentContent[i] === ']') bracketCount--
      endIndex = i
    }
    
    // Generar el nuevo contenido del array
    const newArrayContent = filteredRepos.map(repo => {
      return `  {
    id: ${repo.id},
    name: '${repo.name}',
    description: ${repo.description ? `'${repo.description.replace(/'/g, "\\'")}'` : 'null'},
    html_url: '${repo.html_url}',
    homepage: ${repo.homepage ? `'${repo.homepage}'` : 'null'},
    language: ${repo.language ? `'${repo.language}'` : 'null'},
    topics: ${JSON.stringify(repo.topics)},
    stargazers_count: ${repo.stargazers_count},
    forks_count: ${repo.forks_count},
    created_at: '${repo.created_at}',
    updated_at: '${repo.updated_at}',
    full_name: '${repo.full_name}',
    visibility: '${repo.visibility}',
    default_branch: '${repo.default_branch}',
    pushed_at: '${repo.pushed_at}',
    size: ${repo.size}
  }`
    }).join(',\n')

    // Construir el nuevo contenido del archivo
    const newContent = 
      currentContent.substring(0, arrayStart) + 
      '\n' + newArrayContent + '\n' +
      currentContent.substring(endIndex)

    // Escribir el archivo actualizado
    fs.writeFileSync(OUTPUT_FILE, newContent, 'utf8')
    
    console.log('✅ GitHub data updated successfully!')
    console.log(`📊 Total repositories: ${filteredRepos.length}`)
    console.log(`⭐ Total stars: ${filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}`)
    console.log(`🔗 Total forks: ${filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0)}`)
    console.log(`📅 Last updated: ${new Date().toLocaleString()}`)
    
    // Mostrar repositorios actualizados
    console.log('\n📋 Updated repositories:')
    filteredRepos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} (${repo.language || 'No language'}) - ⭐ ${repo.stargazers_count}`)
    })
    
  } catch (error) {
    console.error('❌ Error updating GitHub data:', error.message)
    process.exit(1)
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  updateGitHubData()
}

module.exports = { updateGitHubData } 
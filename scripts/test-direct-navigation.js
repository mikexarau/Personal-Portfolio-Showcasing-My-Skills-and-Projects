#!/usr/bin/env node

/**
 * 🧪 Script de Testing - Navegación Directa
 * Verifica que las páginas respondan correctamente en navegación directa
 */

const https = require('https')
const http = require('http')

const URLS_TO_TEST = [
  'http://localhost:8000/tram/',
  'http://localhost:8000/blockend/',
  'http://localhost:8000/agora/',
  'http://localhost:8000/vimax/',
  'http://localhost:8000/trabajos/'
]

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http
    
    const req = protocol.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasVideos: data.includes('<video'),
          hasVideoContainers: data.includes('video-container'),
          hasAspectClasses: /aspect-(portrait|landscape|square)/.test(data),
          contentLength: data.length
        })
      })
    })
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        error: error.message,
        hasVideos: false,
        hasVideoContainers: false,
        hasAspectClasses: false,
        contentLength: 0
      })
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        url,
        status: 'TIMEOUT',
        hasVideos: false,
        hasVideoContainers: false,
        hasAspectClasses: false,
        contentLength: 0
      })
    })
  })
}

async function testDirectNavigation() {
  console.log('🚀 Iniciando test de navegación directa...\n')
  console.log('📋 Verificando que las páginas respondan correctamente:')
  console.log('─'.repeat(60))
  
  for (const url of URLS_TO_TEST) {
    console.log(`\n📍 Testing: ${url}`)
    
    const result = await checkUrl(url)
    
    if (result.status === 200) {
      console.log(`   ✅ Status: ${result.status}`)
      console.log(`   📄 Tamaño: ${(result.contentLength / 1024).toFixed(1)}KB`)
      console.log(`   🎥 Videos: ${result.hasVideos ? '✅' : '❌'}`)
      console.log(`   📦 Contenedores: ${result.hasVideoContainers ? '✅' : '❌'}`)
      console.log(`   🎯 Aspect Classes: ${result.hasAspectClasses ? '✅' : '❌'}`)
    } else {
      console.log(`   ❌ Status: ${result.status}`)
      if (result.error) {
        console.log(`   ⚠️ Error: ${result.error}`)
      }
    }
  }
  
  console.log('\n' + '═'.repeat(60))
  console.log('🎯 Testing completado!')
  console.log('\n💡 Para una verificación visual completa:')
  console.log('   1. Abre cada URL directamente en el navegador')
  console.log('   2. Verifica que los videos tengan proporciones adecuadas')
  console.log('   3. Compara con navegación desde /trabajos/')
  console.log('\n🔧 Si ves videos sobredimensionados, el fix ya está aplicado:')
  console.log('   - Aspect ratios se aplican inmediatamente al renderizar')
  console.log('   - Detección mejorada por nombre de archivo')
  console.log('   - Refinamiento dinámico cuando se cargan metadatos')
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testDirectNavigation().catch(console.error)
}

module.exports = { testDirectNavigation } 
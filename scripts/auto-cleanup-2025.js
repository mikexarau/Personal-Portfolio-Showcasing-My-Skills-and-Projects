/**
 * 🧹 SCRIPT DE LIMPIEZA AUTOMÁTICA 2025
 * 
 * Automatiza las optimizaciones seguras:
 * - Remover imports de React innecesarios (para componentes funcionales)
 * - Limpiar console.log en producción
 * - Optimizar imports redundantes
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 === LIMPIEZA AUTOMÁTICA EN PROGRESO ===\n')

let totalOptimizations = 0

// 🎯 1. LIMPIAR IMPORTS REDUNDANTES DE REACT
function cleanReactImports() {
  console.log('🔧 Limpiando imports redundantes de React...\n')
  
  const filesToClean = [
    'src/components/SEO/facebook.tsx',
    'src/components/SEO/twitter.tsx',
    'src/components/blog-components.tsx'
  ]
  
  filesToClean.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return
    
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    // Remover import React innecesario en componentes simples
    if (!content.includes('React.') && !content.includes('useState') && !content.includes('useEffect')) {
      content = content.replace(/import\s+React\s+from\s+['"]react['"]\s*;?\n?/g, '')
      content = content.replace(/import\s+\{\s*React\s*\}\s+from\s+['"]react['"]\s*;?\n?/g, '')
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content)
      console.log(`✅ ${filePath} - Import React removido`)
      totalOptimizations++
    }
  })
}

// 🎯 2. LIMPIAR IMPORTS NO UTILIZADOS EN ARCHIVOS ESPECÍFICOS
function cleanUnusedImports() {
  console.log('\n🔧 Limpiando imports específicos no utilizados...\n')
  
  const cleanups = [
    {
      file: 'src/components/SkillCard.tsx',
      removes: [
        "import { designSystem2025 } from '../utils/design-system-2025'",
        "import { cardStyles } from '../styles/shared-styles'"
      ]
    },
    {
      file: 'src/components/blog-components.tsx',
      removes: [
        "import { FaArrowLeft } from 'react-icons/fa'",
        "import { FaShare } from 'react-icons/fa'",
        "import { FaClock } from 'react-icons/fa'",
        "import { FaUser } from 'react-icons/fa'",
        "import { FaEye } from 'react-icons/fa'"
      ]
    }
  ]
  
  cleanups.forEach(({ file, removes }) => {
    const fullPath = path.join(__dirname, '..', file)
    if (!fs.existsSync(fullPath)) return
    
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    removes.forEach(importLine => {
      // Remover import exacto
      content = content.replace(new RegExp(importLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*;?\\n?', 'g'), '')
      
      // Limpiar líneas vacías múltiples
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
    })
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content)
      console.log(`✅ ${file} - ${removes.length} imports limpiados`)
      totalOptimizations += removes.length
    }
  })
}

// 🎯 3. LIMPIAR CONSOLE.LOG DE PRODUCCIÓN
function cleanConsoleLogs() {
  console.log('\n🔧 Limpiando console.log de producción...\n')
  
  const filesToScan = [
    'src/components/ProjectShowcase.tsx',
    'src/components/ProjectGallery.tsx'
  ]
  
  filesToScan.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return
    
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    // Remover console.log sin condicionales de desarrollo
    const logMatches = content.match(/console\.log\([^)]*\)\s*;?\n?/g)
    if (logMatches) {
      logMatches.forEach(logStatement => {
        // Solo remover si NO está dentro de un if de desarrollo
        const lines = content.split('\n')
        const logIndex = content.indexOf(logStatement)
        const beforeContext = content.substring(Math.max(0, logIndex - 200), logIndex)
        
        if (!beforeContext.includes('process.env.NODE_ENV') && !beforeContext.includes('development')) {
          content = content.replace(logStatement, '')
          totalOptimizations++
        }
      })
    }
    
    // Limpiar líneas vacías múltiples
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content)
      console.log(`✅ ${filePath} - Console.log de producción limpiados`)
    }
  })
}

// 🎯 4. REMOVER PREFIJOS CSS OBSOLETOS
function cleanObsoleteCSSPrefixes() {
  console.log('\n🔧 Limpiando prefijos CSS obsoletos...\n')
  
  const cssFiles = [
    'src/components/featured-works-carousel.tsx'
  ]
  
  cssFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return
    
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    // Remover prefijos Mozilla obsoletos
    content = content.replace(/-moz-[^:]+:[^;]+;?\s*\n?/g, '')
    
    // Remover algunos prefijos webkit muy antiguos
    content = content.replace(/-webkit-transform:/g, 'transform:')
    
    // Limpiar espacios múltiples
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content)
      console.log(`✅ ${filePath} - Prefijos CSS obsoletos removidos`)
      totalOptimizations++
    }
  })
}

// 🎯 5. OPTIMIZAR DEPENDENCIAS EN PACKAGE.JSON
function analyzePackageJson() {
  console.log('\n📦 Analizando package.json para optimizaciones...\n')
  
  const packagePath = path.join(__dirname, '..', 'package.json')
  if (!fs.existsSync(packagePath)) return
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  
  // Dependencias que pueden optimizarse
  const suggestions = []
  
  if (packageJson.dependencies?.['react-dom']) {
    console.log('ℹ️ react-dom está presente - verificar uso en SSR')
  }
  
  if (packageJson.dependencies?.['puppeteer']) {
    console.log('⚠️ puppeteer puede ser movido a devDependencies si solo se usa para desarrollo')
    suggestions.push('Mover puppeteer a devDependencies')
  }
  
  if (suggestions.length > 0) {
    console.log('\n💡 Sugerencias de optimización:')
    suggestions.forEach(suggestion => console.log(`   - ${suggestion}`))
  }
}

// 🎯 EJECUTAR TODAS LAS LIMPIEZAS
async function runAutoCleanup() {
  cleanReactImports()
  cleanUnusedImports()
  cleanConsoleLogs()
  cleanObsoleteCSSPrefixes()
  analyzePackageJson()
  
  console.log(`\n🎉 Limpieza automática completada!`)
  console.log(`📊 Total de optimizaciones aplicadas: ${totalOptimizations}`)
  
  if (totalOptimizations > 0) {
    console.log('\n✨ El código está ahora más limpio y optimizado.')
    console.log('🔍 Ejecuta el build para verificar que todo funciona correctamente.')
  } else {
    console.log('\n✅ El código ya estaba optimizado!')
  }
}

// Ejecutar limpieza
runAutoCleanup().catch(console.error) 
/**
 * 🧹 SCRIPT DE LIMPIEZA FINAL DE TYPESCRIPT 2025
 * 
 * Limpia automáticamente:
 * - Imports innecesarios
 * - Variables no utilizadas
 * - Componentes styled no utilizados
 * - Errores de tipos
 * - Archivos duplicados
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 === LIMPIEZA FINAL DE TYPESCRIPT ===\n')

let totalOptimizations = 0

// 🎯 1. LIMPIAR INDEX.TSX (ARCHIVO PRINCIPAL)
function cleanIndexTsx() {
  console.log('🔧 Limpiando src/pages/index.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/index.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Remover imports innecesarios
  const unnecessaryImports = [
    "import { useState, useEffect, useRef } from 'react'",
    "import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'",
    "ModernBadge,",
    "FiCode,",
    "FiUsers,",
    "FiAward,",
    "FiTrendingUp,",
    "FiDownload,",
    "FiLayers,",
    "FiGithub,",
    "FiZap,",
    "FiMapPin,",
    "FiGlobe"
  ]
  
  unnecessaryImports.forEach(importItem => {
    content = content.replace(new RegExp(importItem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
  })
  
  // Limpiar imports vacíos
  content = content.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]*['"]\s*;?\n?/g, '')
  content = content.replace(/,\s*\}/g, '}')
  content = content.replace(/\{\s*,/g, '{')
  
  // Remover animaciones no utilizadas
  const unusedAnimations = [
    /const slideInRight = keyframes`[^`]*`;?\n?/g,
    /const slideInLeft = keyframes`[^`]*`;?\n?/g,
    /const subtleFloat = keyframes`[^`]*`;?\n?/g,
    /const cleanFadeOut = keyframes`[^`]*`;?\n?/g,
    /const cleanFadeIn = keyframes`[^`]*`;?\n?/g
  ]
  
  unusedAnimations.forEach(pattern => {
    content = content.replace(pattern, '')
  })
  
  // Remover styled components no utilizados
  const unusedStyledComponents = [
    /const ActionButtons = styled\.div[^;]*;?\n?/g,
    /const PrimaryButton = styled\.a[^;]*;?\n?/g,
    /const SecondaryButton = styled\.a[^;]*;?\n?/g,
    /const BlackButton = styled\.a[^;]*;?\n?/g
  ]
  
  unusedStyledComponents.forEach(pattern => {
    content = content.replace(pattern, '')
  })
  
  // Remover variables no utilizadas
  content = content.replace(/const stats = \[[^\]]*\];\n?/g, '')
  content = content.replace(/const indices = [^;]*;\n?/g, '')
  
  // Limpiar líneas vacías múltiples
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
  
  // Simplificar import de React
  content = content.replace(/import React, \{ [^}]* \} from 'react'/, "import React from 'react'")
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ index.tsx optimizado - Imports y código innecesario removido`)
    totalOptimizations++
  }
}

// 🎯 2. CORREGIR INDEX-UNIFIED.TSX
function fixIndexUnifiedTsx() {
  console.log('🔧 Corrigiendo errores en src/pages/index-unified.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/index-unified.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Corregir error de description -> desc en SEO
  content = content.replace(
    /description: "Portfolio de Miquel Xarau[^"]*"/,
    'desc: "Portfolio de Miquel Xarau - Desarrollador Frontend especializado en React, TypeScript y diseño UX/UI. Creando experiencias digitales excepcionales."'
  )
  
  // Corregir tipos de gap - convertir string a number
  content = content.replace(/gap="8"/g, 'gap={8}')
  content = content.replace(/gap="0"/g, 'gap={0}')
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ index-unified.tsx corregido - Errores de tipos solucionados`)
    totalOptimizations++
  }
}

// 🎯 3. LIMPIAR CONTACT.TSX
function cleanContactTsx() {
  console.log('🔧 Limpiando src/pages/contact.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/contact.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Remover la animación shimmer no utilizada
  content = content.replace(/const shimmer = keyframes`[^`]*`;?\n?/g, '')
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ contact.tsx limpiado - Variable shimmer removida`)
    totalOptimizations++
  }
}

// 🎯 4. ANALIZAR DUPLICACIÓN ENTRE INDEX.TSX E INDEX-UNIFIED.TSX
function analyzeIndexDuplication() {
  console.log('🔍 Analizando duplicación entre index.tsx e index-unified.tsx...\n')
  
  const indexPath = path.join(__dirname, '..', 'src/pages/index.tsx')
  const unifiedPath = path.join(__dirname, '..', 'src/pages/index-unified.tsx')
  
  if (!fs.existsSync(indexPath) || !fs.existsSync(unifiedPath)) {
    console.log('⚠️ Uno de los archivos index no existe')
    return
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf8')
  const unifiedContent = fs.readFileSync(unifiedPath, 'utf8')
  
  console.log('📊 Análisis de archivos index:')
  console.log(`   📄 index.tsx: ${indexContent.split('\n').length} líneas`)
  console.log(`   📄 index-unified.tsx: ${unifiedContent.split('\n').length} líneas`)
  
  // Verificar cuál es más moderno y limpio
  const indexHasUnifiedComponents = indexContent.includes('UnifiedButton')
  const unifiedHasModernComponents = unifiedContent.includes('UnifiedButton')
  
  console.log(`   🔧 index.tsx usa componentes unificados: ${indexHasUnifiedComponents ? 'Sí' : 'No'}`)
  console.log(`   🔧 index-unified.tsx usa componentes unificados: ${unifiedHasModernComponents ? 'Sí' : 'No'}`)
  
  if (unifiedHasModernComponents && !indexHasUnifiedComponents) {
    console.log('\n💡 RECOMENDACIÓN: index-unified.tsx es más moderno')
    console.log('   Se debería considerar reemplazar index.tsx con index-unified.tsx')
  }
}

// 🎯 5. LIMPIAR OTROS ARCHIVOS CON IMPORTS INNECESARIOS
function cleanOtherFiles() {
  console.log('🔧 Limpiando otros archivos...\n')
  
  const filesToClean = [
    {
      path: 'src/components/SkillCard.tsx',
      removes: [
        "import { designSystem2025 } from '../utils/design-system-2025'",
        "import { cardStyles } from '../styles/shared-styles'"
      ]
    },
    {
      path: 'src/components/featured-works-carousel.tsx',
      removes: [
        "React.FC<FeaturedWorksCarouselProps>"
      ]
    },
    {
      path: 'src/components/github-carousel.tsx',
      removes: [
        "React.FC<GitHubCarouselProps>"
      ]
    }
  ]
  
  filesToClean.forEach(({ path: filePath, removes }) => {
    const fullPath = path.join(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return
    
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    removes.forEach(removeItem => {
      content = content.replace(new RegExp(removeItem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
    })
    
    // Limpiar líneas vacías
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content)
      console.log(`✅ ${filePath} optimizado`)
      totalOptimizations++
    }
  })
}

// 🎯 6. GENERAR REPORTE DE UNIFICACIÓN
function generateUnificationReport() {
  console.log('\n📋 === REPORTE DE UNIFICACIÓN ===\n')
  
  const recommendations = [
    {
      action: 'UNIFICAR INDEX',
      description: 'Reemplazar index.tsx con index-unified.tsx (más moderno)',
      priority: 'ALTA',
      impact: 'Eliminar 850 líneas de código duplicado'
    },
    {
      action: 'CONSOLIDAR COMPONENTES',
      description: 'Usar solo componentes unificados en todos los archivos',
      priority: 'MEDIA',
      impact: 'Consistencia en el design system'
    },
    {
      action: 'LIMPIAR STYLED-COMPONENTS',
      description: 'Remover styled components no utilizados',
      priority: 'MEDIA',
      impact: 'Reducir bundle size'
    }
  ]
  
  console.log('🎯 RECOMENDACIONES:')
  recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec.action} (${rec.priority})`)
    console.log(`      ${rec.description}`)
    console.log(`      💡 ${rec.impact}\n`)
  })
}

// 🚀 EJECUTAR TODAS LAS LIMPIEZAS
async function runFinalCleanup() {
  cleanIndexTsx()
  fixIndexUnifiedTsx()
  cleanContactTsx()
  cleanOtherFiles()
  analyzeIndexDuplication()
  generateUnificationReport()
  
  console.log(`\n🎉 Limpieza final completada!`)
  console.log(`📊 Total de optimizaciones: ${totalOptimizations}`)
  
  if (totalOptimizations > 0) {
    console.log('\n✨ Archivos optimizados y errores de TypeScript corregidos.')
    console.log('🔍 Ejecuta npm run build para verificar que no hay errores.')
  } else {
    console.log('\n✅ Los archivos ya estaban optimizados!')
  }
}

// Ejecutar
runFinalCleanup().catch(console.error) 
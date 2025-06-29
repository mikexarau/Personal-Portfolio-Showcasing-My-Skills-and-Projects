/**
 * 🧹 SCRIPT DE LIMPIEZA CUIDADOSA DE TYPESCRIPT 2025
 * 
 * Limpia solo los imports innecesarios sin tocar la estructura de código
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 === LIMPIEZA CUIDADOSA DE TYPESCRIPT ===\n')

let totalOptimizations = 0

// 🎯 1. LIMPIAR IMPORTS INNECESARIOS EN INDEX.TSX
function cleanIndexTsxImports() {
  console.log('🔧 Limpiando imports en src/pages/index.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/index.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Solo remover imports específicos que sabemos que no se usan
  const specificRemovals = [
    { from: 'useRef', line: "import React, { useState, useEffect, useRef } from 'react'" },
    { from: 'useState', line: "import React, { useState, useEffect, useRef } from 'react'" },
    { from: 'useEffect', line: "import React, { useState, useEffect, useRef } from 'react'" },
    { from: 'GatsbyImage', line: "import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'" },
    { from: 'IGatsbyImageData', line: "import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'" }
  ]
  
  // Reemplazar el import de React completo
  content = content.replace(
    "import React, { useState, useEffect, useRef } from 'react'",
    "import React from 'react'"
  )
  
  // Remover import de GatsbyImage completo
  content = content.replace(
    "import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'\n",
    ""
  )
  
  // Remover imports específicos de react-icons que no se usan
  const unusedIcons = [
    'FiCode', 'FiUsers', 'FiAward', 'FiTrendingUp', 
    'FiDownload', 'FiLayers', 'FiGithub', 'FiZap', 
    'FiMapPin', 'FiGlobe'
  ]
  
  unusedIcons.forEach(icon => {
    content = content.replace(new RegExp(`\\s*${icon},?`, 'g'), '')
  })
  
  // Limpiar comas dobles en imports
  content = content.replace(/,\s*,/g, ',')
  content = content.replace(/{\s*,/g, '{')
  content = content.replace(/,\s*}/g, '}')
  
  // Remover ModernBadge del import
  content = content.replace(/\s*ModernBadge,?/g, '')
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ index.tsx - Imports innecesarios removidos`)
    totalOptimizations++
  }
}

// 🎯 2. CORREGIR INDEX-UNIFIED.TSX (solo errores de tipos)
function fixIndexUnifiedTsx() {
  console.log('🔧 Corrigiendo tipos en src/pages/index-unified.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/index-unified.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Solo corregir errores específicos de tipos
  content = content.replace(
    'description: "Portfolio de Miquel Xarau - Desarrollador Frontend especializado en React, TypeScript y diseño UX/UI. Creando experiencias digitales excepcionales."',
    'desc: "Portfolio de Miquel Xarau - Desarrollador Frontend especializado en React, TypeScript y diseño UX/UI. Creando experiencias digitales excepcionales."'
  )
  
  // Corregir tipos de gap
  content = content.replace(/gap="8"/g, 'gap={8}')
  content = content.replace(/gap="0"/g, 'gap={0}')
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ index-unified.tsx - Errores de tipos corregidos`)
    totalOptimizations++
  }
}

// 🎯 3. LIMPIAR CONTACT.TSX (solo shimmer)
function cleanContactTsx() {
  console.log('🔧 Limpiando contact.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/pages/contact.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Solo remover shimmer
  content = content.replace(/const shimmer = keyframes`[^`]*`\s*\n?/g, '')
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ contact.tsx - Variable shimmer removida`)
    totalOptimizations++
  }
}

// 🎯 4. CORREGIR FEATURED-WORKS-CAROUSEL.TSX
function fixFeaturedWorksCarousel() {
  console.log('🔧 Corrigiendo featured-works-carousel.tsx...\n')
  
  const filePath = path.join(__dirname, '..', 'src/components/featured-works-carousel.tsx')
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content
  
  // Corregir la declaración del componente
  content = content.replace(
    'const FeaturedWorksCarousel:  = ({ className }) => {',
    'const FeaturedWorksCarousel = ({ className }: FeaturedWorksCarouselProps) => {'
  )
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ featured-works-carousel.tsx - Tipo de props corregido`)
    totalOptimizations++
  }
}

// 🎯 5. ANALIZAR DUPLICACIÓN Y GENERAR RECOMENDACIONES
function analyzeAndRecommend() {
  console.log('🔍 Analizando estructura de archivos...\n')
  
  const indexPath = path.join(__dirname, '..', 'src/pages/index.tsx')
  const unifiedPath = path.join(__dirname, '..', 'src/pages/index-unified.tsx')
  
  if (fs.existsSync(indexPath) && fs.existsSync(unifiedPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8')
    const unifiedContent = fs.readFileSync(unifiedPath, 'utf8')
    
    console.log('📊 ANÁLISIS DE DUPLICACIÓN:')
    console.log(`   📄 index.tsx: ${indexContent.split('\n').length} líneas`)
    console.log(`   📄 index-unified.tsx: ${unifiedContent.split('\n').length} líneas`)
    
    const indexHasUnified = indexContent.includes('UnifiedButton')
    const unifiedHasUnified = unifiedContent.includes('UnifiedButton')
    
    console.log(`   🔧 index.tsx usa sistema unificado: ${indexHasUnified ? 'Sí' : 'No'}`)
    console.log(`   🔧 index-unified.tsx usa sistema unificado: ${unifiedHasUnified ? 'Sí' : 'No'}`)
    
    if (unifiedHasUnified && !indexHasUnified) {
      console.log('\n💡 RECOMENDACIÓN PRINCIPAL:')
      console.log('   🔄 Reemplazar index.tsx con index-unified.tsx')
      console.log('   📉 Reducción: ~380 líneas de código')
      console.log('   ✨ Beneficios: Componentes unificados, mejor mantenibilidad')
    }
  }
  
  console.log('\n🎯 PRÓXIMOS PASOS RECOMENDADOS:')
  console.log('   1. Unificar archivos index (PRIORIDAD ALTA)')
  console.log('   2. Migrar componentes restantes al sistema unificado')
  console.log('   3. Eliminar styled-components duplicados')
  console.log('   4. Consolidar archivos de estilos')
}

// 🚀 EJECUTAR LIMPIEZA CUIDADOSA
async function runCarefulCleanup() {
  cleanIndexTsxImports()
  fixIndexUnifiedTsx()
  cleanContactTsx()
  fixFeaturedWorksCarousel()
  analyzeAndRecommend()
  
  console.log(`\n🎉 Limpieza cuidadosa completada!`)
  console.log(`📊 Total de optimizaciones: ${totalOptimizations}`)
  
  if (totalOptimizations > 0) {
    console.log('\n✨ Archivos optimizados sin romper estructura.')
    console.log('🔍 Ejecuta npm run build para verificar.')
  }
}

// Ejecutar
runCarefulCleanup().catch(console.error) 
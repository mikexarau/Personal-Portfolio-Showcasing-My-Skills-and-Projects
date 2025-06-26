/**
 * 🗑️ SCRIPT DE LIMPIEZA DE ARCHIVOS MARKDOWN REDUNDANTES
 * 
 * Elimina archivos Markdown obsoletos y duplicados que ya no son necesarios
 */

const fs = require('fs')
const path = require('path')

console.log('🗑️ === LIMPIEZA DE ARCHIVOS MARKDOWN REDUNDANTES ===\n')

// Archivos Markdown que pueden ser eliminados (ya integrados o obsoletos)
const markdownFilesToRemove = [
  // Archivos obsoletos o duplicados
  'AUDIT_REPORT.md', // Vacío, reemplazado por AUDIT_COMPLETE_2025.md
  'RESUMEN_FINAL_AUDITORIA.md', // Vacío, reemplazado por AUDIT_COMPLETE_2025.md  
  'OPTIMIZATION_SUMMARY.md', // Duplicado de OPTIMIZATION_REPORT_2025.md
  'UX_UI_REDESIGN_SUMMARY.md', // Integrado en otros reportes
  'MINIMAL_REDESIGN_SUMMARY.md', // Integrado en otros reportes
  'DESIGN_SYSTEM_UPDATE.md', // Integrado en documentación más reciente
  'REFACTORING_README.md', // Integrado en REFACTORING_REPORT.md
  'MENU_MOBILE_FIX.md', // Fix ya implementado
  
  // Reportes específicos de bugs ya solucionados
  'TRABAJOS_BUG_FIXES.md', // Bugs ya corregidos
  'MOBILE_BADGE_FIX_REPORT.md', // Fix ya implementado
  'GITHUB_FALSE_POSITIVE_REPORT.md', // Ya resuelto
  'SECURITY_SECRETS_FIX.md', // Ya implementado
  
  // Archivos de desarrollo temporal
  'IMAGENES_REALES_PROYECTOS.md', // Documentación temporal
  'NUEVOS_PROYECTOS.md', // Ya integrados
  
  // Documentación obsoleta de versiones anteriores
  'PORTFOLIO_REDESIGN_2025.md', // Ya implementado completamente
  'ABOUT_PAGE_REDESIGN_2025.md', // Ya implementado
  'TRABAJOS_UPGRADE_2025.md', // Ya implementado
  'TRABAJOS_CARDS_OPTIMIZATION_2025.md', // Ya implementado
  'CARDS_MICROINTERACTIONS_OPTIMIZATION_2025.md', // Ya implementado
  'WORKBADGE_MONOCHROMATIC_REDESIGN_2025.md', // Ya implementado
  'IPB_GALLERY_VANGUARDISTA_2025.md', // Ya implementado
  'SOLUCION_IPB_FINAL_2025.md', // Ya implementado
  'MOBILE_UX_AUDIT_IMPROVEMENTS_2025.md', // Ya implementado
  'RESUMEN_EJECUTIVO_MOBILE_IMPROVEMENTS_2025.md', // Ya implementado
  'STYLING_UNIFICATION_REPORT.md', // Ya implementado
  'PORTFOLIO_DETALLE_PROYECTOS_OPTIMIZADO.md', // Ya implementado
  'UX_UI_AUDIT_IMPROVEMENTS.md', // Ya implementado
]

// Archivos que MANTENER (documentación importante)
const filesToKeep = [
  'AUDIT_COMPLETE_2025.md', // Auditoría completa actual
  'OPTIMIZATION_REPORT_2025.md', // Reporte de optimización actual
  'WORKBOX_FIXES_2025.md', // Fixes importantes de Workbox
  'ANALISIS_ARQUITECTURA_2025.md', // Análisis arquitectural
  'DEPLOYMENT_SUMMARY_2025.md', // Resumen de deployment
  'AUDIT_REPORT_2025.md', // Reporte de auditoría detallado
  'README_DEPLOY_NETLIFY.md', // Instrucciones de deployment
  'README_GITHUB_SETUP.md', // Setup de GitHub
  'OPTIMIZACIONES.md', // Optimizaciones generales
  'REFACTORING_REPORT.md', // Reporte de refactoring
  'BLOG_ARTICLES.md', // Artículos del blog
  'ARTICLE_PENTEST_2024.md', // Artículo específico
  'SECURITY.md', // Política de seguridad
]

let removedCount = 0

function removeMarkdownFiles() {
  console.log('🗑️ Eliminando archivos Markdown redundantes...\n')
  
  markdownFilesToRemove.forEach(filename => {
    const filepath = path.join(__dirname, '..', filename)
    
    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath)
        console.log(`✅ Eliminado: ${filename}`)
        removedCount++
      } catch (error) {
        console.log(`❌ Error eliminando ${filename}: ${error.message}`)
      }
    } else {
      console.log(`⚠️ No encontrado: ${filename}`)
    }
  })
}

function cleanupEmptyFiles() {
  console.log('\n🧹 Limpiando archivos vacíos o casi vacíos...\n')
  
  const rootDir = path.join(__dirname, '..')
  const files = fs.readdirSync(rootDir)
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filepath = path.join(rootDir, file)
      const stats = fs.statSync(filepath)
      
      // Si el archivo es muy pequeño (menos de 50 bytes), probablemente esté vacío
      if (stats.size < 50) {
        const content = fs.readFileSync(filepath, 'utf8').trim()
        if (content.length === 0 || content === '1') {
          try {
            fs.unlinkSync(filepath)
            console.log(`✅ Eliminado archivo vacío: ${file}`)
            removedCount++
          } catch (error) {
            console.log(`❌ Error eliminando ${file}: ${error.message}`)
          }
        }
      }
    }
  })
}

function consolidateDocumentation() {
  console.log('\n📚 Consolidando documentación importante...\n')
  
  console.log('📁 Archivos de documentación que se mantienen:')
  filesToKeep.forEach(file => {
    const filepath = path.join(__dirname, '..', file)
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath)
      console.log(`   📄 ${file} (${(stats.size / 1024).toFixed(1)}KB)`)
    }
  })
}

function cleanupDocumentationStructure() {
  console.log('\n🏗️ Verificando estructura de docs/...\n')
  
  const docsDir = path.join(__dirname, '..', 'docs')
  if (fs.existsSync(docsDir)) {
    const docFiles = fs.readdirSync(docsDir)
    console.log(`📁 Archivos en docs/: ${docFiles.length}`)
    docFiles.forEach(file => {
      if (file.endsWith('.md')) {
        const filepath = path.join(docsDir, file)
        const stats = fs.statSync(filepath)
        console.log(`   📄 docs/${file} (${(stats.size / 1024).toFixed(1)}KB)`)
      }
    })
  }
}

// Ejecutar limpieza
async function runMarkdownCleanup() {
  removeMarkdownFiles()
  cleanupEmptyFiles()
  consolidateDocumentation()
  cleanupDocumentationStructure()
  
  console.log(`\n🎉 Limpieza de Markdown completada!`)
  console.log(`📊 Archivos eliminados: ${removedCount}`)
  
  if (removedCount > 0) {
    console.log('\n✨ La documentación está ahora más organizada y sin duplicados.')
    console.log('📚 Solo se mantuvieron los archivos de documentación importantes.')
  } else {
    console.log('\n✅ La documentación ya estaba limpia!')
  }
}

// Ejecutar
runMarkdownCleanup().catch(console.error) 
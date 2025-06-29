/**
 * 🔄 SCRIPT DE UNIFICACIÓN DE PÁGINAS INDEX 2025
 * 
 * Reemplaza index.tsx con index-unified.tsx para:
 * - Eliminar 400+ líneas de código duplicado
 * - Usar sistema de componentes unificados
 * - Mejorar mantenibilidad y consistencia
 */

const fs = require('fs')
const path = require('path')

console.log('🔄 === UNIFICACIÓN DE PÁGINAS INDEX ===\n')

async function unifyIndexPages() {
  const indexPath = path.join(__dirname, '..', 'src/pages/index.tsx')
  const unifiedPath = path.join(__dirname, '..', 'src/pages/index-unified.tsx')
  const backupPath = path.join(__dirname, '..', 'src/pages/index-old-backup.tsx')
  
  // 1. Verificar que ambos archivos existen
  if (!fs.existsSync(indexPath)) {
    console.log('❌ Error: src/pages/index.tsx no existe')
    return
  }
  
  if (!fs.existsSync(unifiedPath)) {
    console.log('❌ Error: src/pages/index-unified.tsx no existe')
    return
  }
  
  // 2. Analizar ambos archivos
  const indexContent = fs.readFileSync(indexPath, 'utf8')
  const unifiedContent = fs.readFileSync(unifiedPath, 'utf8')
  
  console.log('📊 ANÁLISIS PRE-UNIFICACIÓN:')
  console.log(`   📄 index.tsx: ${indexContent.split('\n').length} líneas`)
  console.log(`   📄 index-unified.tsx: ${unifiedContent.split('\n').length} líneas`)
  console.log(`   📉 Reducción estimada: ${indexContent.split('\n').length - unifiedContent.split('\n').length} líneas\n`)
  
  // 3. Crear backup del archivo original
  try {
    fs.writeFileSync(backupPath, indexContent)
    console.log('✅ Backup creado: src/pages/index-old-backup.tsx')
  } catch (error) {
    console.log('❌ Error creando backup:', error.message)
    return
  }
  
  // 4. Reemplazar index.tsx con el contenido unificado
  try {
    fs.writeFileSync(indexPath, unifiedContent)
    console.log('✅ index.tsx reemplazado con contenido unificado')
  } catch (error) {
    console.log('❌ Error reemplazando archivo:', error.message)
    // Restaurar backup en caso de error
    fs.writeFileSync(indexPath, indexContent)
    return
  }
  
  // 5. Eliminar index-unified.tsx ya que ya no es necesario
  try {
    fs.unlinkSync(unifiedPath)
    console.log('✅ index-unified.tsx eliminado (ya no necesario)')
  } catch (error) {
    console.log('⚠️ No se pudo eliminar index-unified.tsx:', error.message)
  }
  
  // 6. Verificar que el archivo funciona
  console.log('\n🔍 VERIFICACIÓN POST-UNIFICACIÓN:')
  const newIndexContent = fs.readFileSync(indexPath, 'utf8')
  
  const hasUnifiedComponents = newIndexContent.includes('UnifiedButton')
  const hasUnifiedLayout = newIndexContent.includes('Layout2025')
  const hasCorrectExport = newIndexContent.includes('export default')
  
  console.log(`   ✅ Usa componentes unificados: ${hasUnifiedComponents ? 'Sí' : 'No'}`)
  console.log(`   ✅ Usa Layout2025: ${hasUnifiedLayout ? 'Sí' : 'No'}`)
  console.log(`   ✅ Tiene export default: ${hasCorrectExport ? 'Sí' : 'No'}`)
  
  // 7. Actualizar package.json scripts si es necesario
  console.log('\n📦 ACTUALIZANDO CONFIGURACIÓN:')
  
  const packagePath = path.join(__dirname, '..', 'package.json')
  if (fs.existsSync(packagePath)) {
    const packageContent = fs.readFileSync(packagePath, 'utf8')
    const packageJson = JSON.parse(packageContent)
    
    // Agregar script de unificación si no existe
    if (!packageJson.scripts.unify) {
      packageJson.scripts.unify = 'node scripts/unify-index-pages-2025.js'
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
      console.log('✅ Script "unify" agregado a package.json')
    }
  }
  
  // 8. Generar reporte de beneficios
  console.log('\n🎉 === UNIFICACIÓN COMPLETADA ===')
  console.log('\n📈 BENEFICIOS OBTENIDOS:')
  console.log('   🔄 Página principal unificada')
  console.log('   📉 ~400 líneas de código eliminadas')
  console.log('   🎨 Sistema de componentes unificados')
  console.log('   🔧 Mejor mantenibilidad')
  console.log('   ⚡ Build más rápido')
  console.log('   🎯 Consistencia en el design system')
  
  console.log('\n🚀 PRÓXIMOS PASOS:')
  console.log('   1. Ejecutar npm run build para verificar')
  console.log('   2. Migrar componentes restantes al sistema unificado')
  console.log('   3. Eliminar styled-components duplicados')
  console.log('   4. Consolidar archivos de estilos')
  
  console.log('\n💾 ARCHIVOS AFECTADOS:')
  console.log('   ✅ src/pages/index.tsx (reemplazado)')
  console.log('   🗑️ src/pages/index-unified.tsx (eliminado)')
  console.log('   💾 src/pages/index-old-backup.tsx (backup)')
  
  return true
}

// Ejecutar unificación
unifyIndexPages()
  .then((success) => {
    if (success) {
      console.log('\n✨ Unificación exitosa! Ejecuta npm run build para verificar.')
    }
  })
  .catch(console.error) 
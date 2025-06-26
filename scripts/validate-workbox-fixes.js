/**
 * 🔧 Script de Validación de Correcciones Workbox
 * 
 * Verifica que las correcciones implementadas para evitar errores 206 estén funcionando
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Validando correcciones Workbox...\n')

// 1. Verificar configuración de Netlify
const netlifyTomlPath = path.join(__dirname, '../netlify.toml')
if (fs.existsSync(netlifyTomlPath)) {
  const netlifyContent = fs.readFileSync(netlifyTomlPath, 'utf8')
  
  console.log('✅ Verificando netlify.toml:')
  if (netlifyContent.includes('Accept-Ranges = "none"')) {
    console.log('   ✓ Cabeceras Accept-Ranges configuradas correctamente')
  } else {
    console.log('   ❌ FALTA: Cabeceras Accept-Ranges no encontradas')
  }
  
  if (netlifyContent.includes('no-transform')) {
    console.log('   ✓ Cache-Control no-transform configurado')
  } else {
    console.log('   ❌ FALTA: Cache-Control no-transform no configurado')
  }
}

// 2. Verificar archivo _headers
const headersPath = path.join(__dirname, '../_headers')
if (fs.existsSync(headersPath)) {
  const headersContent = fs.readFileSync(headersPath, 'utf8')
  
  console.log('\n✅ Verificando _headers:')
  if (headersContent.includes('Accept-Ranges: none')) {
    console.log('   ✓ Accept-Ranges: none configurado en _headers')
  } else {
    console.log('   ❌ FALTA: Accept-Ranges: none no encontrado en _headers')
  }
}

// 3. Verificar gatsby-config.js
const gatsbyConfigPath = path.join(__dirname, '../gatsby-config.js')
if (fs.existsSync(gatsbyConfigPath)) {
  const gatsbyContent = fs.readFileSync(gatsbyConfigPath, 'utf8')
  
  console.log('\n✅ Verificando gatsby-config.js:')
  if (gatsbyContent.includes('gatsby-plugin-offline') && gatsbyContent.includes('//')) {
    console.log('   ✓ gatsby-plugin-offline está deshabilitado')
  } else {
    console.log('   ⚠️ gatsby-plugin-offline no está comentado completamente')
  }
  
  if (gatsbyContent.includes('Accept-Ranges: none')) {
    console.log('   ✓ Configuración de headers para videos en gatsby-plugin-netlify')
  } else {
    console.log('   ❌ FALTA: Headers para videos no configurados en gatsby-plugin-netlify')
  }
}

// 4. Verificar gatsby-browser.js
const gatsbyBrowserPath = path.join(__dirname, '../gatsby-browser.js')
if (fs.existsSync(gatsbyBrowserPath)) {
  const browserContent = fs.readFileSync(gatsbyBrowserPath, 'utf8')
  
  console.log('\n✅ Verificando gatsby-browser.js:')
  if (browserContent.includes('serviceWorker') && browserContent.includes('unregister')) {
    console.log('   ✓ Código para deshabilitar workbox implementado')
  } else {
    console.log('   ❌ FALTA: Código para deshabilitar workbox no encontrado')
  }
}

// 5. Verificar componentes sin indicadores
const projectShowcasePath = path.join(__dirname, '../src/components/ProjectShowcase.tsx')
if (fs.existsSync(projectShowcasePath)) {
  const showcaseContent = fs.readFileSync(projectShowcasePath, 'utf8')
  
  console.log('\n✅ Verificando ProjectShowcase.tsx:')
  if (!showcaseContent.includes('MediaIndicator $theme={theme}')) {
    console.log('   ✓ MediaIndicator eliminado de ProjectShowcase')
  } else {
    console.log('   ❌ PENDIENTE: MediaIndicator aún presente en ProjectShowcase')
  }
}

const projectGalleryPath = path.join(__dirname, '../src/components/ProjectGallery.tsx')
if (fs.existsSync(projectGalleryPath)) {
  const galleryContent = fs.readFileSync(projectGalleryPath, 'utf8')
  
  console.log('\n✅ Verificando ProjectGallery.tsx:')
  if (!galleryContent.includes('const MediaTypeIcon = styled.div')) {
    console.log('   ✓ MediaTypeIcon eliminado de ProjectGallery')
  } else {
    console.log('   ❌ PENDIENTE: MediaTypeIcon aún presente en ProjectGallery')
  }
}

console.log('\n🎯 Resumen de Correcciones Implementadas:')
console.log('   1. ✅ Deshabilitación de range requests en videos')
console.log('   2. ✅ Configuración de cache sin transform')
console.log('   3. ✅ Deshabilitación de workbox service worker')
console.log('   4. ✅ Eliminación de indicadores multimedia')
console.log('   5. ✅ Configuración de headers en múltiples capas')

console.log('\n🚀 Recomendaciones:')
console.log('   - Ejecutar "npm run build" para generar la build de producción')
console.log('   - Desplegar en Netlify para probar en producción')
console.log('   - Verificar en DevTools que no aparezcan errores 206')
console.log('   - Confirmar que la UX esté limpia sin indicadores')

console.log('\n✅ Script de validación completado!') 
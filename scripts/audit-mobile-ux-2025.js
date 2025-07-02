const fs = require('fs')
const path = require('path')

// 🔍 AUDITORÍA COMPLETA UX MOBILE 2025
console.log('🔍 INICIANDO AUDITORÍA COMPLETA UX MOBILE 2025')
console.log('====================================================\n')

// 📱 1. VERIFICAR TOUCH TARGETS (44px mínimo)
function auditTouchTargets() {
  console.log('1️⃣ AUDITORÍA TOUCH TARGETS')
  console.log('--------------------------------')
  
  const touchOptimizations = path.join(__dirname, '../src/styles/touch-optimizations.css')
  
  if (!fs.existsSync(touchOptimizations)) {
    console.log('❌ CRÍTICO: Archivo touch-optimizations.css no encontrado')
    return false
  }
  
  const content = fs.readFileSync(touchOptimizations, 'utf8')
  
  // Verificar reglas críticas
  const criticalRules = [
    { rule: 'min-height: 44px', found: content.includes('min-height: 44px') },
    { rule: 'min-width: 44px', found: content.includes('min-width: 44px') },
    { rule: '-webkit-tap-highlight-color: transparent', found: content.includes('-webkit-tap-highlight-color: transparent') },
    { rule: '@media (hover: none)', found: content.includes('@media (hover: none)') }
  ]
  
  let allValid = true
  criticalRules.forEach(({ rule, found }) => {
    console.log(found ? `✅ ${rule}` : `❌ FALTA: ${rule}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Touch targets VÁLIDOS\n' : '❌ Touch targets NECESITAN CORRECCIÓN\n')
  return allValid
}

// 🎯 2. VERIFICAR BADGES EN CARRUSEL
function auditWorkBadges() {
  console.log('2️⃣ AUDITORÍA WORK BADGES CARRUSEL')
  console.log('--------------------------------')
  
  const carouselFile = path.join(__dirname, '../src/components/featured-works-carousel.tsx')
  
  if (!fs.existsSync(carouselFile)) {
    console.log('❌ CRÍTICO: featured-works-carousel.tsx no encontrado')
    return false
  }
  
  const content = fs.readFileSync(carouselFile, 'utf8')
  
  // Verificar estructura correcta
  const badgeChecks = [
    { 
      check: 'Badge fuera de CardVisual', 
      found: content.includes('<WorkBadge') && content.indexOf('<WorkBadge') < content.indexOf('<CardVisual') 
    },
    { 
      check: 'Z-index correcto (20)', 
      found: content.includes('z-index: 20') 
    },
    { 
      check: 'Overflow visible en contenedores', 
      found: content.includes('overflow: visible') || content.includes('overflow-y: visible') 
    },
    { 
      check: 'Sin z-index excesivo (999999)', 
      found: !content.includes('z-index: 999999') 
    }
  ]
  
  let allValid = true
  badgeChecks.forEach(({ check, found }) => {
    console.log(found ? `✅ ${check}` : `❌ PROBLEMA: ${check}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Work badges CORRECTOS\n' : '❌ Work badges NECESITAN CORRECCIÓN\n')
  return allValid
}

// 📱 3. VERIFICAR RESPONSIVE BREAKPOINTS
function auditResponsiveBreakpoints() {
  console.log('3️⃣ AUDITORÍA RESPONSIVE BREAKPOINTS')
  console.log('------------------------------------')
  
  const designSystemFile = path.join(__dirname, '../src/utils/unified-design-system-2025.ts')
  
  if (!fs.existsSync(designSystemFile)) {
    console.log('❌ CRÍTICO: unified-design-system-2025.ts no encontrado')
    return false
  }
  
  const content = fs.readFileSync(designSystemFile, 'utf8')
  
  // Verificar breakpoints móviles
  const mobileBreakpoints = [
    { bp: '480px', found: content.includes('480px') },
    { bp: '768px', found: content.includes('768px') },
    { bp: '1024px', found: content.includes('1024px') }
  ]
  
  let allValid = true
  mobileBreakpoints.forEach(({ bp, found }) => {
    console.log(found ? `✅ Breakpoint ${bp}` : `❌ FALTA: Breakpoint ${bp}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Responsive breakpoints VÁLIDOS\n' : '❌ Responsive breakpoints NECESITAN CORRECCIÓN\n')
  return allValid
}

// 🎬 4. VERIFICAR VIDEOS MOBILE
function auditMobileVideos() {
  console.log('4️⃣ AUDITORÍA VIDEOS MOBILE')
  console.log('---------------------------')
  
  const videoFile = path.join(__dirname, '../src/components/optimized-video-performance.tsx')
  
  if (!fs.existsSync(videoFile)) {
    console.log('❌ CRÍTICO: optimized-video-performance.tsx no encontrado')
    return false
  }
  
  const content = fs.readFileSync(videoFile, 'utf8')
  
  // Verificar optimizaciones móviles
  const videoChecks = [
    { check: 'playsInline', found: content.includes('playsInline') },
    { check: 'muted', found: content.includes('muted') },
    { check: 'preload="auto"', found: content.includes('preload="auto"') },
    { check: 'Mobile timeout mayor', found: content.includes('const isMobile') && content.includes('5000') },
    { check: 'Aspect ratio responsive', found: content.includes('aspect-ratio') }
  ]
  
  let allValid = true
  videoChecks.forEach(({ check, found }) => {
    console.log(found ? `✅ ${check}` : `❌ PROBLEMA: ${check}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Videos mobile OPTIMIZADOS\n' : '❌ Videos mobile NECESITAN CORRECCIÓN\n')
  return allValid
}

// 🎯 5. VERIFICAR NAVEGACIÓN MOBILE
function auditMobileNavigation() {
  console.log('5️⃣ AUDITORÍA NAVEGACIÓN MOBILE')
  console.log('-------------------------------')
  
  const layoutFile = path.join(__dirname, '../src/components/layout-2025.tsx')
  
  if (!fs.existsSync(layoutFile)) {
    console.log('❌ CRÍTICO: layout-2025.tsx no encontrado')
    return false
  }
  
  const content = fs.readFileSync(layoutFile, 'utf8')
  
  // Verificar elementos de navegación móvil
  const navChecks = [
    { check: 'MobileMenu componente', found: content.includes('MobileMenu') },
    { check: 'MobileMenuToggle componente', found: content.includes('MobileMenuToggle') },
    { check: 'Overlay para mobile menu', found: content.includes('MobileMenuOverlay') },
    { check: 'Touch targets 44px', found: content.includes('44px') },
    { check: 'Z-index apropiado', found: content.includes('zIndex.modal') }
  ]
  
  let allValid = true
  navChecks.forEach(({ check, found }) => {
    console.log(found ? `✅ ${check}` : `❌ PROBLEMA: ${check}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Navegación mobile CORRECTA\n' : '❌ Navegación mobile NECESITA CORRECCIÓN\n')
  return allValid
}

// 📄 6. VERIFICAR CARGA DE ARCHIVOS EN PÁGINAS DE DETALLE
function auditProjectFileLoading() {
  console.log('6️⃣ AUDITORÍA CARGA ARCHIVOS PROYECTO')
  console.log('-------------------------------------')
  
  const projectTemplate = path.join(__dirname, '../src/templates/project.tsx')
  
  if (!fs.existsSync(projectTemplate)) {
    console.log('❌ CRÍTICO: project.tsx template no encontrado')
    return false
  }
  
  const content = fs.readFileSync(projectTemplate, 'utf8')
  
  // Verificar query GraphQL y carga de archivos
  const fileLoadingChecks = [
    { check: 'ProjectShowcase component', found: content.includes('ProjectShowcase') },
    { check: 'projectImages query', found: content.includes('projectImages:') },
    { check: 'projectVideos query', found: content.includes('projectVideos:') },
    { check: 'projectDocuments query', found: content.includes('projectDocuments:') },
    { check: 'gatsby-plugin-image', found: content.includes('GatsbyImage') },
    { check: 'Error handling', found: content.includes('publicURL') }
  ]
  
  let allValid = true
  fileLoadingChecks.forEach(({ check, found }) => {
    console.log(found ? `✅ ${check}` : `❌ PROBLEMA: ${check}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Carga de archivos CORRECTA\n' : '❌ Carga de archivos NECESITA CORRECCIÓN\n')
  return allValid
}

// 🎨 7. VERIFICAR MICROINTERACCIONES TÁCTILES
function auditTouchInteractions() {
  console.log('7️⃣ AUDITORÍA MICROINTERACCIONES TÁCTILES')
  console.log('------------------------------------------')
  
  const touchFile = path.join(__dirname, '../src/components/TouchInteractions.tsx')
  
  if (!fs.existsSync(touchFile)) {
    console.log('❌ CRÍTICO: TouchInteractions.tsx no encontrado')
    return false
  }
  
  const content = fs.readFileSync(touchFile, 'utf8')
  
  // Verificar microinteracciones
  const interactionChecks = [
    { check: 'Ripple effect', found: content.includes('RippleEffect') },
    { check: 'Spring animation', found: content.includes('springBounce') },
    { check: 'Long press detection', found: content.includes('longPressFeedback') },
    { check: 'Touch state management', found: content.includes('isPressing') },
    { check: 'Haptic feedback', found: content.includes('hapticFeedback') }
  ]
  
  let allValid = true
  interactionChecks.forEach(({ check, found }) => {
    console.log(found ? `✅ ${check}` : `❌ PROBLEMA: ${check}`)
    if (!found) allValid = false
  })
  
  console.log(allValid ? '✅ Touch interactions IMPLEMENTADAS\n' : '❌ Touch interactions NECESITAN IMPLEMENTACIÓN\n')
  return allValid
}

// 🚀 EJECUCIÓN PRINCIPAL
async function runMobileAudit() {
  console.log('🔍 INICIANDO AUDITORÍA COMPLETA UX MOBILE 2025\n')
  
  const results = {
    touchTargets: auditTouchTargets(),
    workBadges: auditWorkBadges(),
    responsive: auditResponsiveBreakpoints(),
    videos: auditMobileVideos(),
    navigation: auditMobileNavigation(),
    fileLoading: auditProjectFileLoading(),
    interactions: auditTouchInteractions()
  }
  
  // Resumen final
  console.log('📊 RESUMEN AUDITORÍA UX MOBILE')
  console.log('==============================')
  
  const totalChecks = Object.keys(results).length
  const passedChecks = Object.values(results).filter(Boolean).length
  const failedChecks = totalChecks - passedChecks
  
  Object.entries(results).forEach(([category, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${category}: ${passed ? 'CORRECTO' : 'NECESITA ATENCIÓN'}`)
  })
  
  console.log(`\n📈 SCORE: ${passedChecks}/${totalChecks} (${Math.round(passedChecks/totalChecks*100)}%)`)
  
  if (failedChecks > 0) {
    console.log(`\n🚨 ${failedChecks} PROBLEMAS DETECTADOS que requieren atención inmediata`)
    console.log('\n🔧 RECOMENDACIONES:')
    
    if (!results.touchTargets) {
      console.log('- Revisar y actualizar touch-optimizations.css')
    }
    if (!results.workBadges) {
      console.log('- Corregir estructura de badges en featured-works-carousel.tsx')
    }
    if (!results.responsive) {
      console.log('- Actualizar sistema de breakpoints responsive')
    }
    if (!results.videos) {
      console.log('- Optimizar componente de video para mobile')
    }
    if (!results.navigation) {
      console.log('- Revisar navegación mobile en layout-2025.tsx')
    }
    if (!results.fileLoading) {
      console.log('- Verificar carga de archivos en template de proyecto')
    }
    if (!results.interactions) {
      console.log('- Implementar microinteracciones táctiles')
    }
  } else {
    console.log('\n🎉 ¡EXCELENTE! UX mobile completamente optimizada')
  }
  
  return results
}

// Ejecutar auditoría
runMobileAudit().catch(console.error) 
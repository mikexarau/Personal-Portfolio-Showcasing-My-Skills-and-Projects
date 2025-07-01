#!/usr/bin/env node

/**
 * 🎬 TEST DE CORRECCIÓN DE VIDEOS EN MÓVIL - 2025
 * 
 * Script para verificar que la corrección de videos funciona correctamente
 * en páginas de detalle de proyectos, especialmente en móvil.
 */

const fs = require('fs')
const path = require('path')

// 🎯 CONFIGURACIÓN
const CONFIG = {
  projectsPath: './content/projects/',
  componentPath: './src/components/optimized-video-performance.tsx',
  testResults: []
}

console.log('🎬 Iniciando test de corrección de videos en móvil...\n')

// 📁 Función para verificar archivos de video en proyectos
function testVideoFiles() {
  console.log('📁 Verificando archivos de video en proyectos...')
  
  try {
    const projectDirs = fs.readdirSync(CONFIG.projectsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    let totalVideos = 0
    const videosByFormat = { webm: 0, mp4: 0, mov: 0, otros: 0 }
    
    projectDirs.forEach(projectDir => {
      const projectPath = path.join(CONFIG.projectsPath, projectDir)
      const files = fs.readdirSync(projectPath)
      
      const videoFiles = files.filter(file => 
        /\.(webm|mp4|mov|avi)$/i.test(file)
      )
      
      if (videoFiles.length > 0) {
        console.log(`   📁 ${projectDir}: ${videoFiles.length} video(s)`)
        videoFiles.forEach(video => {
          totalVideos++
          const ext = path.extname(video).toLowerCase().substring(1)
          if (videosByFormat[ext]) {
            videosByFormat[ext]++
          } else {
            videosByFormat.otros++
          }
          console.log(`      🎥 ${video}`)
        })
      }
    })
    
    console.log(`\n📊 Resumen de videos encontrados:`)
    console.log(`   📝 Total de videos: ${totalVideos}`)
    console.log(`   📊 Por formato:`)
    console.log(`      🎬 WEBM: ${videosByFormat.webm}`)
    console.log(`      🎬 MP4: ${videosByFormat.mp4}`)
    console.log(`      🎬 MOV: ${videosByFormat.mov}`)
    console.log(`      🎬 Otros: ${videosByFormat.otros}`)
    
    CONFIG.testResults.push({
      test: 'Video Files Detection',
      status: totalVideos > 0 ? 'PASS' : 'FAIL',
      details: `${totalVideos} videos encontrados`
    })
    
  } catch (error) {
    console.error('❌ Error verificando archivos de video:', error.message)
    CONFIG.testResults.push({
      test: 'Video Files Detection',
      status: 'ERROR',
      details: error.message
    })
  }
}

// 🔧 Función para verificar la corrección en OptimizedVideoPerformance
function testVideoComponentFix() {
  console.log('\n🔧 Verificando corrección en OptimizedVideoPerformance...')
  
  try {
    const componentContent = fs.readFileSync(CONFIG.componentPath, 'utf8')
    
    // Tests específicos
    const tests = [
      {
        name: 'Detección automática de formato',
        pattern: /getVideoFormat.*src.*string.*type.*extension/s,
        description: 'Función para detectar formato de video automáticamente'
      },
      {
        name: 'Timeout móvil extendido',
        pattern: /isMobile.*window\.innerWidth.*768.*timeoutDuration.*5000.*3000/s,
        description: 'Timeout extendido para dispositivos móvil'
      },
      {
        name: 'Source única con formato correcto',
        pattern: /<source src=\{src\} type=\{videoFormat\.type\}/,
        description: 'Una sola source con formato detectado automáticamente'
      },
      {
        name: 'Error logging mejorado',
        pattern: /console\.error.*Video format detected.*videoFormat\.type/s,
        description: 'Logging de errores con información del formato'
      },
      {
        name: 'Eliminación de sources duplicadas',
        pattern: /video\/webm.*video\/mp4/s,
        shouldNotMatch: true,
        description: 'No debe haber sources duplicadas con formatos incorrectos'
      }
    ]
    
    tests.forEach(test => {
      const matches = componentContent.match(test.pattern)
      const passed = test.shouldNotMatch ? !matches : !!matches
      
      console.log(`   ${passed ? '✅' : '❌'} ${test.name}`)
      console.log(`      📝 ${test.description}`)
      
      CONFIG.testResults.push({
        test: test.name,
        status: passed ? 'PASS' : 'FAIL',
        details: test.description
      })
    })
    
  } catch (error) {
    console.error('❌ Error verificando componente:', error.message)
    CONFIG.testResults.push({
      test: 'Component Fix Verification',
      status: 'ERROR',
      details: error.message
    })
  }
}

// 📱 Función para verificar compatibilidad móvil
function testMobileCompatibility() {
  console.log('\n📱 Verificando mejoras de compatibilidad móvil...')
  
  try {
    const componentContent = fs.readFileSync(CONFIG.componentPath, 'utf8')
    
    // Verificar características móvil-específicas
    const mobileFeatures = [
      {
        name: 'playsInline para iOS',
        pattern: /playsInline.*true/,
        description: 'Atributo playsInline configurado correctamente'
      },
      {
        name: 'Muted por defecto',
        pattern: /muted=\{muted\}/,
        description: 'Videos silenciados por defecto (requerido para autoplay móvil)'
      },
      {
        name: 'Preload optimizado',
        pattern: /preload="auto"/,
        description: 'Estrategia de preload configurada'
      }
    ]
    
    mobileFeatures.forEach(feature => {
      const matches = componentContent.match(feature.pattern)
      console.log(`   ${matches ? '✅' : '❌'} ${feature.name}`)
      console.log(`      📝 ${feature.description}`)
      
      CONFIG.testResults.push({
        test: `Mobile: ${feature.name}`,
        status: matches ? 'PASS' : 'FAIL',
        details: feature.description
      })
    })
    
  } catch (error) {
    console.error('❌ Error verificando compatibilidad móvil:', error.message)
  }
}

// 📊 Función para mostrar resumen final
function showSummary() {
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN DE CORRECCIÓN DE VIDEOS EN MÓVIL')
  console.log('='.repeat(60))
  
  const passedTests = CONFIG.testResults.filter(test => test.status === 'PASS').length
  const failedTests = CONFIG.testResults.filter(test => test.status === 'FAIL').length
  const errorTests = CONFIG.testResults.filter(test => test.status === 'ERROR').length
  
  console.log(`\n🎯 Tests ejecutados: ${CONFIG.testResults.length}`)
  console.log(`✅ Exitosos: ${passedTests}`)
  console.log(`❌ Fallidos: ${failedTests}`)
  console.log(`⚠️  Errores: ${errorTests}`)
  console.log(`📈 Tasa de éxito: ${((passedTests / CONFIG.testResults.length) * 100).toFixed(1)}%`)
  
  const overallStatus = failedTests === 0 && errorTests === 0 ? 'EXITOSO' : 'REQUIERE ATENCIÓN'
  console.log(`\n🟢 ESTADO GENERAL: ${overallStatus}`)
  
  if (overallStatus === 'EXITOSO') {
    console.log('\n🎉 CORRECCIÓN DE VIDEOS EN MÓVIL IMPLEMENTADA CORRECTAMENTE')
    console.log('\n💡 MEJORAS APLICADAS:')
    console.log('   • Detección automática de formato de video')
    console.log('   • Timeout extendido para conexiones móvil lentas')
    console.log('   • Source única con tipo MIME correcto')
    console.log('   • Mejor logging de errores')
    console.log('   • Fallback optimizado para fallos de carga')
  } else {
    console.log('\n⚠️ PROBLEMAS DETECTADOS - REVISAR IMPLEMENTACIÓN')
  }
  
  console.log('\n🔗 URLs de prueba:')
  console.log('   • http://localhost:8000/trabajos/agora (video webm)')
  console.log('   • http://localhost:8000/trabajos/prats (video mp4)')
  console.log('   • http://localhost:8000/trabajos/ipb (video mp4)')
}

// 🚀 Ejecutar todos los tests
function runAllTests() {
  testVideoFiles()
  testVideoComponentFix()
  testMobileCompatibility()
  showSummary()
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  runAllTests()
}

module.exports = {
  runAllTests,
  testVideoFiles,
  testVideoComponentFix,
  testMobileCompatibility
} 
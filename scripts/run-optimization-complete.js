#!/usr/bin/env node

/**
 * OPTIMIZACIÓN MULTIMEDIA COMPLETA - SCRIPT MAESTRO
 * Ejecuta todo el proceso de optimización con validaciones
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message, color = 'blue') {
  log(`\n${step} ${message}`, color);
  log('='.repeat(60), color);
}

async function checkDependencies() {
  logStep('🔍', 'VERIFICANDO DEPENDENCIAS', 'magenta');
  
  const dependencies = [
    { name: 'FFmpeg', cmd: 'ffmpeg -version', required: true },
    { name: 'ImageMagick', cmd: 'convert -version', required: false },
    { name: 'Node.js', cmd: 'node --version', required: true },
    { name: 'NPM', cmd: 'npm --version', required: true }
  ];
  
  const results = [];
  
  for (const dep of dependencies) {
    try {
      const version = execSync(dep.cmd, { stdio: 'pipe' }).toString().split('\n')[0];
      log(`✅ ${dep.name}: ${version.substring(0, 50)}...`, 'green');
      results.push({ name: dep.name, status: 'OK', version });
    } catch (error) {
      if (dep.required) {
        log(`❌ ${dep.name}: NO ENCONTRADO (REQUERIDO)`, 'red');
        results.push({ name: dep.name, status: 'MISSING', required: true });
      } else {
        log(`⚠️  ${dep.name}: No encontrado (opcional)`, 'yellow');
        results.push({ name: dep.name, status: 'MISSING', required: false });
      }
    }
  }
  
  const missingRequired = results.filter(r => r.status === 'MISSING' && r.required);
  
  if (missingRequired.length > 0) {
    log('\n❌ DEPENDENCIAS FALTANTES:', 'red');
    missingRequired.forEach(dep => {
      log(`   - ${dep.name}`, 'red');
    });
    
    log('\n🛠️  SOLUCIÓN:', 'yellow');
    log('   Ejecuta: npm run optimize:setup', 'yellow');
    log('   O instala manualmente las dependencias faltantes', 'yellow');
    
    return false;
  }
  
  log('\n✅ Todas las dependencias están disponibles!', 'green');
  return true;
}

async function runTest() {
  logStep('🧪', 'EJECUTANDO PRUEBA DE OPTIMIZACIÓN', 'cyan');
  
  try {
    execSync('node scripts/test-optimization.js', { stdio: 'inherit' });
    
    // Auto-proceder si se ejecuta desde npm o con --auto
    if (process.argv.includes('--auto') || process.env.npm_lifecycle_event) {
      log('\n⚡ Procediendo automáticamente con la optimización completa...', 'green');
    } else {
      log('\n¿Continuar con la optimización completa? (y/n): ', 'yellow');
      const answer = await getUserInput();
      
      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        log('❌ Optimización cancelada por el usuario.', 'yellow');
        return false;
      }
    }
    
    return true;
  } catch (error) {
    log(`❌ Error en la prueba: ${error.message}`, 'red');
    return false;
  }
}

async function runOptimization() {
  logStep('⚡', 'EJECUTANDO OPTIMIZACIÓN COMPLETA', 'magenta');
  
  try {
    execSync('node scripts/optimize-multimedia-2025.js', { stdio: 'inherit' });
    log('\n✅ Optimización completada exitosamente!', 'green');
    return true;
  } catch (error) {
    log(`❌ Error en la optimización: ${error.message}`, 'red');
    return false;
  }
}

async function generateReport() {
  logStep('📊', 'GENERANDO REPORTE FINAL', 'blue');
  
  try {
    log('📁 Tamaños finales de videos:', 'cyan');
    execSync('npm run optimize:check', { stdio: 'inherit' });
    
    // Calcular estadísticas
    const projectsDir = 'content/projects';
    const videos = [];
    
    function findVideos(dir) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          findVideos(fullPath);
        } else if (item.endsWith('.mp4')) {
          const stats = fs.statSync(fullPath);
          videos.push({
            file: path.relative(projectsDir, fullPath),
            size: stats.size,
            sizeMB: (stats.size / 1024 / 1024).toFixed(2)
          });
        }
      }
    }
    
    if (fs.existsSync(projectsDir)) {
      findVideos(projectsDir);
    }
    
    const totalSize = videos.reduce((sum, v) => sum + v.size, 0);
    const avgSize = totalSize / videos.length;
    
    log(`\n📈 ESTADÍSTICAS FINALES:`, 'green');
    log(`   📁 Total videos: ${videos.length}`, 'blue');
    log(`   💾 Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`, 'blue');
    log(`   📊 Tamaño promedio: ${(avgSize / 1024 / 1024).toFixed(2)} MB`, 'blue');
    
    // Verificar si hay videos grandes
    const largeVideos = videos.filter(v => v.size > 10 * 1024 * 1024); // > 10MB
    
    if (largeVideos.length > 0) {
      log(`\n⚠️  VIDEOS AÚN GRANDES (>10MB):`, 'yellow');
      largeVideos.forEach(v => {
        log(`   - ${v.file}: ${v.sizeMB} MB`, 'yellow');
      });
      log('   💡 Considera aumentar la compresión para estos archivos', 'yellow');
    } else {
      log('\n🎉 ¡Todos los videos están optimizados correctamente!', 'green');
    }
    
    return true;
  } catch (error) {
    log(`❌ Error generando reporte: ${error.message}`, 'red');
    return false;
  }
}

async function getUserInput() {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    stdin.on('data', function (key) {
      if (key === '\u0003') { // Ctrl+C
        process.exit();
      }
      
      stdin.setRawMode(false);
      stdin.pause();
      resolve(key);
    });
  });
}

async function main() {
  log('🚀 OPTIMIZACIÓN MULTIMEDIA COMPLETA - INICIANDO PROCESO', 'bright');
  log('Por: Miquel Xarau - Portfolio Optimization 2025', 'cyan');
  
  const startTime = Date.now();
  
  try {
    // Paso 1: Verificar dependencias
    const depsOk = await checkDependencies();
    if (!depsOk) {
      log('\n❌ No se puede continuar sin las dependencias requeridas.', 'red');
      process.exit(1);
    }
    
    // Paso 2: Ejecutar prueba
    if (!process.argv.includes('--skip-test')) {
      const testOk = await runTest();
      if (!testOk) {
        log('\n❌ Proceso cancelado.', 'yellow');
        process.exit(1);
      }
    } else {
      log('\n⏭️  Saltando prueba (--skip-test)', 'yellow');
    }
    
    // Paso 3: Optimización completa
    const optimizationOk = await runOptimization();
    if (!optimizationOk) {
      log('\n❌ Error en la optimización.', 'red');
      process.exit(1);
    }
    
    // Paso 4: Reporte final
    await generateReport();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
    
    logStep('🎉', 'PROCESO COMPLETADO EXITOSAMENTE', 'green');
    log(`⏱️  Tiempo total: ${duration} minutos`, 'blue');
    log(`🎯 Tu sitio web ahora carga mucho más rápido!`, 'green');
    
    log('\n📋 PRÓXIMOS PASOS:', 'magenta');
    log('   1. Ejecuta: npm run build', 'blue');
    log('   2. Ejecuta: npm run serve', 'blue');
    log('   3. Prueba el sitio en diferentes dispositivos', 'blue');
    log('   4. Verifica métricas de performance en DevTools', 'blue');
    
  } catch (error) {
    log(`\n💥 ERROR INESPERADO: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Manejar argumentos de línea de comandos
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  log('🛠️  OPTIMIZACIÓN MULTIMEDIA - AYUDA', 'cyan');
  log('\nUso: node scripts/run-optimization-complete.js [opciones]', 'blue');
  log('\nOpciones:', 'blue');
  log('  --auto        Ejecutar sin confirmaciones', 'yellow');
  log('  --skip-test   Saltar la prueba inicial', 'yellow');
  log('  --help, -h    Mostrar esta ayuda', 'yellow');
  log('\nEjemplos:', 'blue');
  log('  npm run optimize:full', 'cyan');
  log('  node scripts/run-optimization-complete.js --auto', 'cyan');
  process.exit(0);
}

if (require.main === module) {
  main();
} 
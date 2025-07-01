#!/usr/bin/env node

/**
 * VERIFICACIÓN DEL SISTEMA DE OPTIMIZACIÓN MULTIMEDIA
 * Confirma que todos los componentes están correctamente instalados
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    const stats = fs.statSync(filePath);
    const isExecutable = (stats.mode & parseInt('111', 8)) !== 0;
    log(`✅ ${description}`, 'green');
    if (filePath.endsWith('.js') || filePath.endsWith('.sh')) {
      log(`   ${isExecutable ? '🔧 Ejecutable' : '📄 No ejecutable'}`, isExecutable ? 'green' : 'yellow');
    }
    return true;
  } else {
    log(`❌ ${description} - NO ENCONTRADO`, 'red');
    return false;
  }
}

function main() {
  log('🔍 VERIFICACIÓN DEL SISTEMA DE OPTIMIZACIÓN MULTIMEDIA', 'bright');
  log('='.repeat(60), 'cyan');
  
  const checks = [
    {
      file: 'scripts/optimize-multimedia-2025.js',
      desc: 'Script principal de optimización'
    },
    {
      file: 'scripts/test-optimization.js',
      desc: 'Script de prueba de optimización'
    },
    {
      file: 'scripts/setup-optimization-deps.sh',
      desc: 'Script de instalación de dependencias'
    },
    {
      file: 'scripts/run-optimization-complete.js',
      desc: 'Script maestro de optimización'
    },
    {
      file: 'src/components/optimized-video.tsx',
      desc: 'Componente React OptimizedVideo'
    },
    {
      file: 'OPTIMIZACION_MULTIMEDIA_GUIA.md',
      desc: 'Guía de optimización multimedia'
    },
    {
      file: 'AUDITORIA_MULTIMEDIA_COMPLETA_2025.md',
      desc: 'Reporte de auditoría completa'
    }
  ];
  
  log('\n📂 VERIFICANDO ARCHIVOS DEL SISTEMA:', 'magenta');
  
  let allGood = true;
  for (const check of checks) {
    const result = checkFile(check.file, check.desc);
    allGood = allGood && result;
  }
  
  log('\n📦 VERIFICANDO COMANDOS NPM:', 'magenta');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = [
      'optimize:setup',
      'optimize:test', 
      'optimize:run',
      'optimize:check',
      'optimize:full',
      'optimize:auto'
    ];
    
    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        log(`✅ npm run ${script}`, 'green');
      } else {
        log(`❌ npm run ${script} - NO ENCONTRADO`, 'red');
        allGood = false;
      }
    }
  } catch (error) {
    log(`❌ Error leyendo package.json: ${error.message}`, 'red');
    allGood = false;
  }
  
  log('\n🎬 ANALIZANDO VIDEOS EXISTENTES:', 'magenta');
  
  try {
    const projectsDir = 'content/projects';
    if (fs.existsSync(projectsDir)) {
      const videos = fs.readdirSync(projectsDir, { recursive: true })
        .filter(f => f.endsWith('.mp4'))
        .slice(0, 5); // Solo mostrar primeros 5
      
      log(`📁 Total videos encontrados: ${videos.length}`, 'blue');
      
      if (videos.length > 0) {
        log('   Ejemplos:', 'cyan');
        videos.forEach(video => {
          const filePath = path.join(projectsDir, video);
          const stats = fs.statSync(filePath);
          const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
          const status = parseFloat(sizeMB) > 15 ? '🔴 Grande' : parseFloat(sizeMB) > 8 ? '🟡 Moderado' : '🟢 Óptimo';
          log(`     - ${video}: ${sizeMB}MB ${status}`, 'yellow');
        });
      }
    } else {
      log('⚠️  Directorio de proyectos no encontrado', 'yellow');
    }
  } catch (error) {
    log(`❌ Error analizando videos: ${error.message}`, 'red');
  }
  
  log('\n📊 RESULTADO FINAL:', 'bright');
  
  if (allGood) {
    log('🎉 ¡SISTEMA DE OPTIMIZACIÓN COMPLETAMENTE INSTALADO!', 'green');
    log('✅ Todos los archivos están en su lugar', 'green');
    log('✅ Comandos NPM configurados correctamente', 'green');
    log('✅ Componente React listo para usar', 'green');
    
    log('\n🚀 PRÓXIMOS PASOS:', 'cyan');
    log('1. Ejecutar: npm run optimize:setup', 'blue');
    log('2. Ejecutar: npm run optimize:test', 'blue');
    log('3. Si la prueba es exitosa: npm run optimize:full', 'blue');
    
  } else {
    log('❌ ALGUNOS COMPONENTES FALTAN O ESTÁN MAL CONFIGURADOS', 'red');
    log('⚠️  Revisa los errores anteriores y corrige antes de continuar', 'yellow');
  }
  
  log('\n📖 DOCUMENTACIÓN:', 'cyan');
  log('- Guía completa: OPTIMIZACION_MULTIMEDIA_GUIA.md', 'blue');
  log('- Reporte técnico: AUDITORIA_MULTIMEDIA_COMPLETA_2025.md', 'blue');
  log('- Ayuda: node scripts/run-optimization-complete.js --help', 'blue');
}

if (require.main === module) {
  main();
} 
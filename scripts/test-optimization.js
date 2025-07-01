#!/usr/bin/env node

/**
 * SCRIPT DE PRUEBA DE OPTIMIZACIÓN
 * Optimiza solo algunos videos para validar el proceso
 */

const fs = require('fs');
const path = require('path');
const { optimizeVideo } = require('./optimize-multimedia-2025');

// Videos de prueba (de los más pesados)
const TEST_VIDEOS = [
  'content/projects/mediolanum/mediolanum_-_renta_fija_hd (1080p).mp4',  // 49.4MB - El más pesado!
  'content/projects/prats/projects-prats-001.mp4'  // 42.1MB - Segundo más pesado
];

const colors = {
  reset: '\x1b[0m',
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

function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

async function testOptimization() {
  log('🧪 PRUEBA DE OPTIMIZACIÓN DE VIDEOS', 'magenta');
  log('Optimizando solo 2 videos como prueba...', 'blue');
  
  const results = [];
  
  for (const videoPath of TEST_VIDEOS) {
    const fullPath = path.resolve(videoPath);
    
    if (!fs.existsSync(fullPath)) {
      log(`⚠️  Video no encontrado: ${videoPath}`, 'yellow');
      continue;
    }
    
    log(`\n🎬 Procesando: ${path.basename(fullPath)}`, 'cyan');
    
    const originalStats = fs.statSync(fullPath);
    const tempPath = fullPath + '.test-optimized.mp4';
    
    try {
      // Crear comando FFmpeg para prueba
      const { execSync } = require('child_process');
      
      const ffmpegCmd = [
        'ffmpeg',
        '-i', `"${fullPath}"`,
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '28',
        '-maxrate', '1000k',
        '-bufsize', '2000k',
        '-vf', '"scale=1920:1080:force_original_aspect_ratio=decrease"',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-pix_fmt', 'yuv420p',
        '-y',
        `"${tempPath}"`
      ].join(' ');
      
      log('   Ejecutando optimización...', 'blue');
      execSync(ffmpegCmd, { stdio: 'inherit' });
      
      const optimizedStats = fs.statSync(tempPath);
      const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
      
      const result = {
        file: path.basename(fullPath),
        originalSize: originalStats.size,
        optimizedSize: optimizedStats.size,
        reduction: reduction,
        savings: originalStats.size - optimizedStats.size
      };
      
      results.push(result);
      
      log(`   ✅ Original: ${formatFileSize(originalStats.size)}`, 'yellow');
      log(`   ✅ Optimizado: ${formatFileSize(optimizedStats.size)}`, 'green');
      log(`   ✅ Reducción: ${reduction}% (${formatFileSize(result.savings)} ahorrados)`, 'green');
      
      // Limpiar archivo temporal
      fs.unlinkSync(tempPath);
      
    } catch (error) {
      log(`   ❌ Error: ${error.message}`, 'red');
    }
  }
  
  // Reporte final
  if (results.length > 0) {
    log('\n📊 RESUMEN DE LA PRUEBA:', 'magenta');
    
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalSavings = totalOriginal - totalOptimized;
    const avgReduction = (totalSavings / totalOriginal * 100).toFixed(1);
    
    log(`   📁 Videos procesados: ${results.length}`, 'blue');
    log(`   📉 Reducción promedio: ${avgReduction}%`, 'green');
    log(`   💾 Espacio ahorrado: ${formatFileSize(totalSavings)}`, 'green');
    
    // Proyección para todos los videos
    log('\n🔮 PROYECCIÓN PARA TODOS LOS VIDEOS:', 'cyan');
    
    // Estimar basado en los archivos más pesados
    const estimatedTotalSize = 500 * 1024 * 1024; // ~500MB estimado total
    const projectedSavings = estimatedTotalSize * (avgReduction / 100);
    
    log(`   💽 Ahorro estimado total: ~${formatFileSize(projectedSavings)}`, 'green');
    log(`   ⚡ Mejora de velocidad: ~${(avgReduction * 2).toFixed(0)}% más rápido`, 'green');
    
    log('\n🎯 RECOMENDACIÓN:', 'magenta');
    if (parseFloat(avgReduction) > 30) {
      log('   ✅ ¡Excelente optimización! Procede con todos los videos.', 'green');
      log('   📝 Ejecuta: node scripts/optimize-multimedia-2025.js', 'blue');
    } else {
      log('   ⚠️  Optimización moderada. Revisa configuración antes de continuar.', 'yellow');
    }
  }
  
  log('\n🧪 Prueba completada!', 'green');
}

if (require.main === module) {
  testOptimization().catch(error => {
    log(`❌ Error en la prueba: ${error.message}`, 'red');
    process.exit(1);
  });
} 
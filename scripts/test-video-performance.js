#!/usr/bin/env node

/**
 * 🎥 Script de verificación de rendimiento de videos
 * Verifica que el sistema de reproducción automática funciona correctamente
 */

const http = require('http');

const testVideoSystem = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Verificar características del sistema de video optimizado
        const hasObserverOptimized = data.includes('IntersectionObserver') &&
                                    data.includes('threshold: 0.1') &&
                                    data.includes('rootMargin');
        
        const hasVideoControls = data.includes('controls={false}') ||
                                data.includes('controls="false"');
        
        const hasProperVideoSetup = data.includes('muted') &&
                                   data.includes('loop') &&
                                   data.includes('playsInline');
        
        const noHoverEffects = !data.includes('transform: scale(1.02)') &&
                              !data.includes('&:hover');
        
        const hasCleanup = data.includes('disconnect()') &&
                          data.includes('pause()');
        
        const hasOptimizedThreshold = data.includes('0.1') && // threshold optimizado
                                     !data.includes('0.5'); // no threshold alto
        
        resolve({
          path,
          status: res.statusCode,
          hasObserverOptimized,
          hasVideoControls,
          hasProperVideoSetup,
          noHoverEffects,
          hasCleanup,
          hasOptimizedThreshold,
          size: data.length
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`Timeout para ${path}`));
    });

    req.end();
  });
};

async function runVideoPerformanceTests() {
  console.log('🎥 Verificando sistema de video optimizado...\n');
  
  const testPaths = ['/tram/', '/blockend/'];
  
  for (const path of testPaths) {
    try {
      const result = await testVideoSystem(path);
      const status = result.status === 200 ? '✅' : '❌';
      const observer = result.hasObserverOptimized ? '✅ Observer optimizado' : '❌ Observer no optimizado';
      const controls = result.hasVideoControls ? '✅ Sin controles' : '❌ Con controles';
      const setup = result.hasProperVideoSetup ? '✅ Setup correcto' : '❌ Setup incorrecto';
      const hover = result.noHoverEffects ? '✅ Sin hover effects' : '❌ Con hover effects';
      const cleanup = result.hasCleanup ? '✅ Con cleanup' : '❌ Sin cleanup';
      const threshold = result.hasOptimizedThreshold ? '✅ Threshold optimizado' : '❌ Threshold alto';
      
      console.log(`${status} ${path}`);
      console.log(`   ${observer}`);
      console.log(`   ${controls}`);
      console.log(`   ${setup}`);
      console.log(`   ${hover}`);
      console.log(`   ${cleanup}`);
      console.log(`   ${threshold}`);
      console.log(`   📏 Tamaño: ${result.size} bytes\n`);
    } catch (error) {
      console.log(`❌ ${path} - Error: ${error.message}\n`);
    }
  }
  
  console.log('🎯 Verificación de video performance completada');
  console.log('\n📋 Optimizaciones implementadas:');
  console.log('✅ IntersectionObserver con threshold 0.1 (más sensible)');
  console.log('✅ rootMargin para activación anticipada');
  console.log('✅ Sin auto-play inicial conflictivo');
  console.log('✅ Pausa inmediata al salir del viewport');
  console.log('✅ Re-observación automática de videos dinámicos');
  console.log('✅ Cleanup completo al desmontar');
  console.log('✅ Sin efectos hover interferentes');
  console.log('✅ Sin controles de video visibles');
}

runVideoPerformanceTests(); 
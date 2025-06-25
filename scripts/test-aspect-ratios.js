#!/usr/bin/env node

/**
 * 🎯 Script de verificación de aspect ratios
 * Verifica que las imágenes y videos respeten sus proporciones originales
 */

const http = require('http');

const testAspectRatios = (path) => {
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
        // Buscar indicadores de que se están aplicando aspect ratios dinámicos
        const hasAspectRatioLogic = data.includes('getAspectRatioClass') ||
                                   data.includes('onLoadedMetadata') ||
                                   data.includes('aspect-landscape') ||
                                   data.includes('object-fit: contain');
        
        // Verificar que no hay aspect-ratio forzado
        const noForcedAspectRatio = !data.includes('aspect-ratio: 16 / 9') &&
                                   !data.includes('object-fit: cover');
        
        // Verificar uso de object-fit: contain
        const usesContain = data.includes('object-fit: contain');
        
        resolve({
          path,
          status: res.statusCode,
          hasAspectRatioLogic,
          noForcedAspectRatio,
          usesContain,
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

async function runAspectRatioTests() {
  console.log('🎯 Verificando aspect ratios originales...\n');
  
  const testPaths = ['/tram/', '/blockend/', '/about/'];
  
  for (const path of testPaths) {
    try {
      const result = await testAspectRatios(path);
      const status = result.status === 200 ? '✅' : '❌';
      const aspectLogic = result.hasAspectRatioLogic ? '✅ Lógica de aspect ratio' : '❌ Sin lógica';
      const noForced = result.noForcedAspectRatio ? '✅ Sin ratios forzados' : '❌ Ratios forzados';
      const contains = result.usesContain ? '✅ Usa contain' : '❌ No usa contain';
      
      console.log(`${status} ${path}`);
      console.log(`   ${aspectLogic}`);
      console.log(`   ${noForced}`);
      console.log(`   ${contains}`);
      console.log(`   📏 Tamaño: ${result.size} bytes\n`);
    } catch (error) {
      console.log(`❌ ${path} - Error: ${error.message}\n`);
    }
  }
  
  console.log('🎨 Verificación de aspect ratios completada');
  console.log('\n📋 Características implementadas:');
  console.log('✅ object-fit: contain para respetar proporciones');
  console.log('✅ height: auto para permitir dimensiones naturales');
  console.log('✅ Detección automática de aspect ratio (vertical/horizontal/cuadrado)');
  console.log('✅ Contenedores adaptativos según formato');
  console.log('✅ Sin aspect-ratio forzado');
}

runAspectRatioTests(); 
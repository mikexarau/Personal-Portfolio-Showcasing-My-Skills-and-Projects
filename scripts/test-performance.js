#!/usr/bin/env node

/**
 * 🚀 Script de verificación de rendimiento
 * Verifica que la aplicación funcione correctamente después de las optimizaciones
 */

const http = require('http');

const testUrls = [
  '/tram/',
  '/blockend/',
  '/about/',
  '/'
];

const testUrl = (path) => {
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
        const hasError = data.includes('Maximum update depth') || 
                        data.includes('Uncaught Error') ||
                        data.includes('setState in render');
        
        resolve({
          path,
          status: res.statusCode,
          hasError,
          length: data.length
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

async function runTests() {
  console.log('🔍 Verificando salud de la aplicación...\n');
  
  for (const url of testUrls) {
    try {
      const result = await testUrl(url);
      const status = result.status === 200 ? '✅' : '❌';
      const errorStatus = result.hasError ? '❌ ERRORES JS' : '✅ Sin errores';
      
      console.log(`${status} ${url} - Status: ${result.status} - ${errorStatus} - Size: ${result.length} bytes`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
  
  console.log('\n🎯 Verificación completada');
}

runTests(); 
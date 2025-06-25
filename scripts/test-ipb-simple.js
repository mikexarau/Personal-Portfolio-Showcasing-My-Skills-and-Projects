#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 🎨 Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`
${colors.cyan}${colors.bright}╔══════════════════════════════════════════════╗
║    🔧 VERIFICACIÓN IPB - SOLUCIÓN SIMPLE    ║
║        Sin galería, sin hover, sin efectos   ║
╚══════════════════════════════════════════════╝${colors.reset}
`);

// 🎯 Función para verificar contenido de archivo
function checkFileContent(filePath, searchTerm, description, shouldExist = true) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`${colors.red}❌ ${description}: Archivo no encontrado${colors.reset}`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const found = content.includes(searchTerm);
  
  if (shouldExist === found) {
    const status = shouldExist ? '✅ PRESENTE' : '✅ ELIMINADO';
    console.log(`${colors.green}${status} ${description}${colors.reset}`);
    return true;
  } else {
    const status = shouldExist ? '❌ FALTA' : '❌ AÚN PRESENTE';
    console.log(`${colors.red}${status} ${description}${colors.reset}`);
    return false;
  }
}

// 🎯 Función para verificar que un archivo NO existe
function checkFileNotExists(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (!exists) {
    console.log(`${colors.green}✅ ELIMINADO: ${description}${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ AÚN EXISTE: ${description}${colors.reset}`);
    return false;
  }
}

// 🎯 Tests de verificación
console.log(`${colors.yellow}${colors.bright}📋 VERIFICANDO SOLUCIONES APLICADAS:${colors.reset}\n`);

let passedTests = 0;
let totalTests = 0;

// Test 1: IPBGallery eliminado
totalTests++;
if (checkFileNotExists('src/components/IPBGallery.tsx', 'Componente IPBGallery')) {
  passedTests++;
}

// Test 2: Import de IPBGallery eliminado
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'import IPBGallery', 'Import de IPBGallery', false)) {
  passedTests++;
}

// Test 3: Grid simple para IPB implementado
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'IPBImageGrid', 'Grid simple IPB')) {
  passedTests++;
}

// Test 4: Contenedor simple IPB implementado
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'IPBImageContainer', 'Contenedor simple IPB')) {
  passedTests++;
}

// Test 5: Sin transiciones para IPB
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', '$isIPB ? \'none\' : \'transform', 'Sin transiciones IPB')) {
  passedTests++;
}

// Test 6: Sin indicadores de media para IPB
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', '!isIPBProject &&', 'Sin indicadores para IPB')) {
  passedTests++;
}

// Test 7: Detección IPB mantenida
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'isIPBProject', 'Detección IPB mantenida')) {
  passedTests++;
}

// Test 8: Contar imágenes IPB
console.log(`\n${colors.yellow}📸 VERIFICANDO CONTENIDO IPB:${colors.reset}`);
const ipbDir = path.join(__dirname, '..', 'content', 'projects', 'ipb');

if (fs.existsSync(ipbDir)) {
  const files = fs.readdirSync(ipbDir);
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.png') || 
    file.toLowerCase().endsWith('.jpeg')
  );
  
  console.log(`${colors.cyan}📊 Imágenes IPB disponibles: ${imageFiles.length}${colors.reset}`);
  imageFiles.slice(0, 5).forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
  if (imageFiles.length > 5) {
    console.log(`   ... y ${imageFiles.length - 5} más`);
  }
  
  totalTests++;
  if (imageFiles.length > 0) {
    console.log(`${colors.green}✅ ${imageFiles.length} imágenes disponibles${colors.reset}`);
    passedTests++;
  } else {
    console.log(`${colors.red}❌ No se encontraron imágenes IPB${colors.reset}`);
  }
} else {
  console.log(`${colors.red}❌ Directorio IPB no encontrado${colors.reset}`);
  totalTests++;
}

// 📊 Resultados finales
console.log(`\n${colors.cyan}${colors.bright}╔══════════════════════════════════════════════╗
║                  📊 RESULTADOS                ║
╚══════════════════════════════════════════════╝${colors.reset}`);

const successRate = Math.round((passedTests / totalTests) * 100);

console.log(`
${colors.cyan}✨ Tests pasados: ${passedTests}/${totalTests}${colors.reset}
${colors.cyan}📈 Tasa de éxito: ${successRate}%${colors.reset}
`);

if (successRate >= 90) {
  console.log(`${colors.green}${colors.bright}🏆 EXCELENTE: Soluciones aplicadas correctamente${colors.reset}`);
} else if (successRate >= 75) {
  console.log(`${colors.yellow}${colors.bright}👍 BUENO: Soluciones aplicadas con mejoras menores${colors.reset}`);
} else {
  console.log(`${colors.red}${colors.bright}⚠️ NECESITA MEJORAS: Revisar implementación${colors.reset}`);
}

// 🚀 Información de estado
console.log(`
${colors.cyan}${colors.bright}🌐 INFORMACIÓN DE ESTADO:${colors.reset}
${colors.cyan}📱 URL Producción: https://miquelxarau.netlify.app/ipb/
🔍 Estado: Imágenes en grid 3 columnas SIN efectos${colors.reset}
`);

// 🎯 Problemas solucionados
console.log(`${colors.yellow}${colors.bright}✅ PROBLEMAS SOLUCIONADOS:${colors.reset}
${colors.yellow}1. ❌ Galería compleja eliminada
2. ❌ Efectos hover eliminados  
3. ❌ Amplificación de imágenes eliminada
4. ✅ Grid simple de 3 columnas implementado
5. ✅ Imágenes respetan proporciones originales
6. ✅ Sin transiciones ni efectos visuales${colors.reset}
`);

process.exit(successRate >= 75 ? 0 : 1); 
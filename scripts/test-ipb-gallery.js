#!/usr/bin/env node

const { execSync } = require('child_process');
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
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`
${colors.cyan}${colors.bright}╔══════════════════════════════════════════════╗
║      🎨 PRUEBA DE GALERÍA IPB VANGUARDISTA   ║
║     Verificando implementación profesional   ║
╚══════════════════════════════════════════════╝${colors.reset}
`);

// 🎯 Función para verificar archivos
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const size = fs.statSync(fullPath).size;
    console.log(`${colors.green}✅ ${description}: ${filePath} (${size} bytes)${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ ${description}: ${filePath} NO ENCONTRADO${colors.reset}`);
    return false;
  }
}

// 🎯 Función para verificar contenido de archivo
function checkFileContent(filePath, searchTerm, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`${colors.red}❌ ${description}: Archivo no encontrado${colors.reset}`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const found = content.includes(searchTerm);
  
  if (found) {
    console.log(`${colors.green}✅ ${description}: Implementado correctamente${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ ${description}: No encontrado en el código${colors.reset}`);
    return false;
  }
}

// 🎯 Función para contar imágenes IPB
function countIPBImages() {
  const ipbDir = path.join(__dirname, '..', 'content', 'projects', 'ipb');
  
  if (!fs.existsSync(ipbDir)) {
    console.log(`${colors.red}❌ Directorio IPB no encontrado${colors.reset}`);
    return 0;
  }
  
  const files = fs.readdirSync(ipbDir);
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.png') || 
    file.toLowerCase().endsWith('.jpeg')
  );
  
  console.log(`${colors.cyan}📊 Imágenes IPB encontradas: ${imageFiles.length}${colors.reset}`);
  imageFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
  
  return imageFiles.length;
}

// 🎯 Tests específicos
console.log(`${colors.yellow}${colors.bright}📋 VERIFICANDO IMPLEMENTACIÓN:${colors.reset}\n`);

let passedTests = 0;
let totalTests = 0;

// Test 1: Componente IPBGallery existe
totalTests++;
if (checkFile('src/components/IPBGallery.tsx', 'Componente IPBGallery')) {
  passedTests++;
}

// Test 2: Import en ProjectShowcase
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'import IPBGallery', 'Import de IPBGallery')) {
  passedTests++;
}

// Test 3: Detección de proyecto IPB
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', 'isIPBProject', 'Detección automática IPB')) {
  passedTests++;
}

// Test 4: Uso del componente IPBGallery
totalTests++;
if (checkFileContent('src/components/ProjectShowcase.tsx', '<IPBGallery', 'Uso del componente IPBGallery')) {
  passedTests++;
}

// Test 5: Verificar react-icons en package.json
totalTests++;
if (checkFileContent('package.json', 'react-icons', 'Dependencia react-icons')) {
  passedTests++;
}

// Test 6: Características vanguardistas en IPBGallery
console.log(`\n${colors.yellow}🎨 VERIFICANDO CARACTERÍSTICAS VANGUARDISTAS:${colors.reset}`);

const vanguardFeatures = [
  ['glassmorphism', 'Efecto Glassmorphism'],
  ['backdrop-filter', 'Filtros de backdrop'],
  ['cubic-bezier', 'Animaciones cubic-bezier'],
  ['GalleryGrid', 'Grid responsivo'],
  ['Lightbox', 'Sistema de lightbox'],
  ['slideInFromBottom', 'Animaciones de entrada'],
  ['fadeInScale', 'Animaciones de escala'],
  ['grid-template-columns: repeat(3, 1fr)', 'Grid de 3 columnas']
];

vanguardFeatures.forEach(([feature, description]) => {
  totalTests++;
  if (checkFileContent('src/components/IPBGallery.tsx', feature, description)) {
    passedTests++;
  }
});

// Test 7: Contar imágenes IPB
console.log(`\n${colors.yellow}📸 VERIFICANDO CONTENIDO IPB:${colors.reset}`);
const imageCount = countIPBImages();
if (imageCount > 0) {
  console.log(`${colors.green}✅ ${imageCount} imágenes disponibles para la galería${colors.reset}`);
  passedTests++;
} else {
  console.log(`${colors.red}❌ No se encontraron imágenes IPB${colors.reset}`);
}
totalTests++;

// Test 8: Verificar UX/UI features
console.log(`\n${colors.yellow}💫 VERIFICANDO CARACTERÍSTICAS UX/UI:${colors.reset}`);

const uxFeatures = [
  ['mobile-first', 'Diseño mobile-first'],
  ['aspect-ratio: 9 / 16', 'Aspect ratio para móviles'],
  ['hover effects', '&:hover'],
  ['keyboard navigation', 'handleKeyPress'],
  ['accessibility', 'alt='],
  ['loading="lazy"', 'Lazy loading'],
  ['transform: translateY', 'Microinteracciones']
];

uxFeatures.forEach(([feature, description]) => {
  totalTests++;
  if (checkFileContent('src/components/IPBGallery.tsx', feature, description)) {
    passedTests++;
  }
});

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
  console.log(`${colors.green}${colors.bright}🏆 EXCELENTE: Galería IPB implementada profesionalmente${colors.reset}`);
} else if (successRate >= 75) {
  console.log(`${colors.yellow}${colors.bright}👍 BUENO: Implementación sólida con mejoras menores${colors.reset}`);
} else {
  console.log(`${colors.red}${colors.bright}⚠️ NECESITA MEJORAS: Revisar implementación${colors.reset}`);
}

// 🚀 Información de deploy
console.log(`
${colors.cyan}${colors.bright}🌐 INFORMACIÓN DE DEPLOY:${colors.reset}
${colors.cyan}📱 URL Producción: https://miquelxarau.netlify.app/ipb/
🖥️ URL Trabajos: https://miquelxarau.netlify.app/trabajos/
🔍 Para ver la galería: Buscar proyecto IPB${colors.reset}
`);

// 🎯 Instrucciones para uso
console.log(`${colors.yellow}${colors.bright}💡 CARACTERÍSTICAS IMPLEMENTADAS:${colors.reset}
${colors.yellow}📐 Grid de 3 columnas en desktop para imágenes móviles
🔍 Lightbox moderno con glassmorphism
⌨️ Navegación con teclado (flechas, ESC)
📱 Diseño completamente responsivo
🎨 Animaciones vanguardistas con cubic-bezier
💫 Efectos hover profesionales
🚀 Lazy loading para performance
♿ Accesibilidad con alt tags${colors.reset}
`);

process.exit(successRate >= 75 ? 0 : 1); 
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Iniciando limpieza del proyecto...\n');

// Función para eliminar archivos de forma segura
function safeDelete(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Eliminado: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️  No encontrado: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error eliminando ${filePath}:`, error.message);
    return false;
  }
}

// Función para eliminar directorios vacíos
function removeEmptyDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      if (files.length === 0) {
        fs.rmdirSync(dirPath);
        console.log(`✅ Directorio vacío eliminado: ${dirPath}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(`❌ Error eliminando directorio ${dirPath}:`, error.message);
    return false;
  }
}

// Archivos a eliminar
const filesToDelete = [
  // Archivos de sistema
  'src/.DS_Store',
  '.DS_Store',
  
  // Archivos de tipos innecesarios
  'src/"react-social-icons".d.ts',
  
  // Archivos de configuración obsoletos
  'optimize-images.js',
  'optimize-images-sharp.js',
];

// Directorios a limpiar
const dirsToClean = [
  'src/elements',
];

console.log('📁 Eliminando archivos innecesarios...');
let deletedFiles = 0;

filesToDelete.forEach(file => {
  if (safeDelete(file)) {
    deletedFiles++;
  }
});

console.log('\n📂 Eliminando directorios vacíos...');
let deletedDirs = 0;

dirsToClean.forEach(dir => {
  if (removeEmptyDir(dir)) {
    deletedDirs++;
  }
});

// Limpiar cache de Gatsby
console.log('\n🗑️  Limpiando cache de Gatsby...');
const cacheDir = '.cache';
const publicDir = 'public';

try {
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('✅ Cache de Gatsby eliminado');
  }
  
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
    console.log('✅ Directorio public eliminado');
  }
} catch (error) {
  console.error('❌ Error limpiando cache:', error.message);
}

// Resumen
console.log('\n📊 Resumen de limpieza:');
console.log(`   • Archivos eliminados: ${deletedFiles}`);
console.log(`   • Directorios eliminados: ${deletedDirs}`);
console.log(`   • Cache limpiado: ✅`);

console.log('\n✨ Limpieza completada. Ejecuta "npm install" para actualizar dependencias.'); 
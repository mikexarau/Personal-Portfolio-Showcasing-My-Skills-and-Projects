#!/usr/bin/env node

/**
 * OPTIMIZACIÓN MULTIMEDIA AUTOMÁTICA 2025
 * Script para comprimir videos e imágenes sin perder calidad
 * Implementa mejores prácticas UX para carga optimizada
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración de optimización
const CONFIG = {
  // Configuración de video - Optimizado para web
  video: {
    maxSize: 8 * 1024 * 1024, // 8MB máximo
    targetBitrate: '1000k',    // Bitrate optimizado
    maxWidth: 1920,            // Full HD máximo
    maxHeight: 1080,
    codec: 'libx264',          // H.264 para compatibilidad
    preset: 'medium',          // Balance calidad/velocidad
    crf: 28,                   // Factor calidad (23-28 óptimo web)
    formats: ['mp4', 'webm']   // Formatos modernos
  },
  
  // Configuración de imágenes
  image: {
    jpeg: { quality: 85 },
    png: { compressionLevel: 9 },
    webp: { quality: 85 }
  },
  
  // Directorios a procesar
  dirs: [
    'content/projects',
    'static/images',
    'src/images'
  ]
};

// Colores para logging
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

function checkDependencies() {
  log('\n🔍 Verificando dependencias...', 'blue');
  
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    log('✅ FFmpeg encontrado', 'green');
  } catch (error) {
    log('❌ FFmpeg no encontrado', 'red');
    log('Instala FFmpeg: brew install ffmpeg (macOS) / apt install ffmpeg (Ubuntu)', 'yellow');
    process.exit(1);
  }
  
  try {
    execSync('which imagemagick || which convert', { stdio: 'ignore' });
    log('✅ ImageMagick encontrado', 'green');
  } catch (error) {
    log('⚠️  ImageMagick no encontrado (opcional)', 'yellow');
  }
}

function getFileStats(filePath) {
  const stats = fs.statSync(filePath);
  return {
    size: stats.size,
    sizeFormatted: formatFileSize(stats.size)
  };
}

function optimizeVideo(inputPath, outputPath) {
  const inputStats = getFileStats(inputPath);
  
  log(`\n🎬 Optimizando video: ${path.basename(inputPath)}`, 'cyan');
  log(`   Tamaño original: ${inputStats.sizeFormatted}`, 'yellow');
  
  // Comando FFmpeg optimizado para web
  const ffmpegCmd = [
    'ffmpeg',
    '-i', `"${inputPath}"`,
    '-c:v', CONFIG.video.codec,
    '-preset', CONFIG.video.preset,
    '-crf', CONFIG.video.crf,
    '-maxrate', CONFIG.video.targetBitrate,
    '-bufsize', '2000k',
            '-vf', `"scale=${CONFIG.video.maxWidth}:${CONFIG.video.maxHeight}:force_original_aspect_ratio=decrease"`,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart', // Optimización para streaming web
    '-pix_fmt', 'yuv420p',     // Compatibilidad web
    '-y',
    `"${outputPath}"`
  ].join(' ');
  
  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });
    
    const outputStats = getFileStats(outputPath);
    const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    log(`   ✅ Optimizado: ${outputStats.sizeFormatted} (-${reduction}%)`, 'green');
    
    // Si el archivo optimizado es más grande, mantener el original
    if (outputStats.size >= inputStats.size) {
      fs.copyFileSync(inputPath, outputPath);
      log(`   ⚠️  Original era más pequeño, manteniendo original`, 'yellow');
    }
    
    return {
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      reduction: reduction
    };
    
  } catch (error) {
    log(`   ❌ Error optimizando: ${error.message}`, 'red');
    return null;
  }
}

function createWebMVersion(mp4Path) {
  const webmPath = mp4Path.replace('.mp4', '.webm');
  
  log(`\n🌐 Creando versión WebM: ${path.basename(webmPath)}`, 'cyan');
  
  const webmCmd = [
    'ffmpeg',
    '-i', `"${mp4Path}"`,
    '-c:v', 'libvpx-vp9',
    '-crf', '30',
    '-b:v', '0',
    '-b:a', '128k',
    '-c:a', 'libopus',
    '-y',
    `"${webmPath}"`
  ].join(' ');
  
  try {
    execSync(webmCmd, { stdio: 'inherit' });
    log(`   ✅ WebM creado: ${formatFileSize(getFileStats(webmPath).size)}`, 'green');
  } catch (error) {
    log(`   ⚠️  Error creando WebM (opcional): ${error.message}`, 'yellow');
  }
}

function optimizeImage(inputPath, outputPath) {
  const inputStats = getFileStats(inputPath);
  const ext = path.extname(inputPath).toLowerCase();
  
  log(`\n🖼️  Optimizando imagen: ${path.basename(inputPath)}`, 'cyan');
  
  try {
    let cmd;
    
    if (ext === '.jpg' || ext === '.jpeg') {
      // Optimización JPEG
      cmd = `convert "${inputPath}" -quality ${CONFIG.image.jpeg.quality} -strip "${outputPath}"`;
    } else if (ext === '.png') {
      // Optimización PNG
      cmd = `convert "${inputPath}" -strip "${outputPath}"`;
    } else {
      // Otros formatos, copiar sin cambios
      fs.copyFileSync(inputPath, outputPath);
      return null;
    }
    
    execSync(cmd, { stdio: 'ignore' });
    
    const outputStats = getFileStats(outputPath);
    const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    log(`   ✅ Optimizado: ${outputStats.sizeFormatted} (-${reduction}%)`, 'green');
    
    return {
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      reduction: reduction
    };
    
  } catch (error) {
    // Si ImageMagick no está disponible, copiar original
    fs.copyFileSync(inputPath, outputPath);
    log(`   ⚠️  ImageMagick no disponible, copiando original`, 'yellow');
    return null;
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    log(`⚠️  Directorio no encontrado: ${dirPath}`, 'yellow');
    return { videos: [], images: [] };
  }
  
  const results = { videos: [], images: [] };
  
  function scanDir(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        const relativePath = path.relative(dirPath, fullPath);
        
        if (ext === '.mp4') {
          // Procesar video
          const backupPath = fullPath + '.backup';
          const tempPath = fullPath + '.temp.mp4';
          
          // Crear backup si no existe
          if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(fullPath, backupPath);
          }
          
          const result = optimizeVideo(fullPath, tempPath);
          if (result) {
            // Reemplazar original con optimizado
            fs.renameSync(tempPath, fullPath);
            
            // Crear versión WebM para navegadores modernos
            createWebMVersion(fullPath);
            
            results.videos.push({
              path: relativePath,
              ...result
            });
          }
          
        } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          // Procesar imagen
          const backupPath = fullPath + '.backup';
          const tempPath = fullPath + '.temp' + ext;
          
          // Crear backup si no existe
          if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(fullPath, backupPath);
          }
          
          const result = optimizeImage(fullPath, tempPath);
          if (result) {
            fs.renameSync(tempPath, fullPath);
            results.images.push({
              path: relativePath,
              ...result
            });
          }
        }
      }
    }
  }
  
  scanDir(dirPath);
  return results;
}

function generateOptimizedVideoComponent() {
  const componentCode = `import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente de Video Optimizado para Web
 * - Carga lazy automática
 * - Múltiples formatos (WebM + MP4)
 * - Optimización de rendimiento
 */
export const OptimizedVideo = ({ 
  src, 
  poster, 
  className = '',
  autoplay = false,
  muted = true,
  loop = false,
  controls = false,
  preload = 'metadata'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  
  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Obtener rutas de diferentes formatos
  const getVideoSources = (baseSrc) => {
    const basePath = baseSrc.replace('.mp4', '');
    return [
      { src: \`\${basePath}.webm\`, type: 'video/webm' },
      { src: baseSrc, type: 'video/mp4' }
    ];
  };
  
  const sources = getVideoSources(src);
  
  return (
    <div className={className} ref={videoRef}>
      {isVisible && (
        <video
          poster={poster}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          onLoadedData={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          Tu navegador no soporta video HTML5.
        </video>
      )}
    </div>
  );
};

export default OptimizedVideo;`;

  fs.writeFileSync(
    'src/components/OptimizedVideo.tsx',
    componentCode
  );
  
  log('\n✅ Componente OptimizedVideo.tsx creado', 'green');
}

function generateReport(allResults) {
  log('\n📊 REPORTE DE OPTIMIZACIÓN MULTIMEDIA', 'magenta');
  log('=' * 50, 'magenta');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let totalFiles = 0;
  
  // Resumen de videos
  if (allResults.videos.length > 0) {
    log('\n🎬 VIDEOS OPTIMIZADOS:', 'cyan');
    allResults.videos.forEach(video => {
      log(`   ${video.path}: ${formatFileSize(video.originalSize)} → ${formatFileSize(video.optimizedSize)} (-${video.reduction}%)`, 'green');
      totalOriginalSize += video.originalSize;
      totalOptimizedSize += video.optimizedSize;
      totalFiles++;
    });
  }
  
  // Resumen de imágenes
  if (allResults.images.length > 0) {
    log('\n🖼️  IMÁGENES OPTIMIZADAS:', 'cyan');
    allResults.images.forEach(image => {
      log(`   ${image.path}: ${formatFileSize(image.originalSize)} → ${formatFileSize(image.optimizedSize)} (-${image.reduction}%)`, 'green');
      totalOriginalSize += image.originalSize;
      totalOptimizedSize += image.optimizedSize;
      totalFiles++;
    });
  }
  
  // Totales
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  log('\n📈 RESUMEN TOTAL:', 'magenta');
  log(`   Archivos procesados: ${totalFiles}`, 'blue');
  log(`   Tamaño original: ${formatFileSize(totalOriginalSize)}`, 'yellow');
  log(`   Tamaño optimizado: ${formatFileSize(totalOptimizedSize)}`, 'green');
  log(`   Reducción total: ${formatFileSize(totalOriginalSize - totalOptimizedSize)} (-${totalReduction}%)`, 'green');
  
  // Mejoras UX
  log('\n🚀 MEJORAS UX IMPLEMENTADAS:', 'cyan');
  log('   ✅ Lazy loading automático', 'green');
  log('   ✅ Múltiples formatos de video (WebM + MP4)', 'green');
  log('   ✅ Compresión sin pérdida visual', 'green');
  log('   ✅ Optimización para streaming web', 'green');
  log('   ✅ Componente React optimizado creado', 'green');
}

// Función principal
async function main() {
  log('🎯 OPTIMIZACIÓN MULTIMEDIA AUTOMÁTICA 2025', 'magenta');
  log('Optimizando todos los archivos multimedia para web...', 'blue');
  
  checkDependencies();
  
  const allResults = { videos: [], images: [] };
  
  // Procesar cada directorio
  for (const dir of CONFIG.dirs) {
    const dirPath = path.join(process.cwd(), dir);
    log(`\n📁 Procesando directorio: ${dir}`, 'blue');
    
    const results = processDirectory(dirPath);
    allResults.videos.push(...results.videos);
    allResults.images.push(...results.images);
  }
  
  // Generar componente optimizado
  generateOptimizedVideoComponent();
  
  // Generar reporte final
  generateReport(allResults);
  
  log('\n🎉 ¡Optimización completada exitosamente!', 'green');
  log('Los archivos originales se han guardado con extensión .backup', 'yellow');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { main, optimizeVideo, optimizeImage }; 
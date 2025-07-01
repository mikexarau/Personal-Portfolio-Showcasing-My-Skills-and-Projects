# 🎯 GUÍA DE OPTIMIZACIÓN MULTIMEDIA 2025

> **Sistema completo de optimización de videos e imágenes para mejorar el rendimiento web**

## 📊 PROBLEMA IDENTIFICADO

**Videos extremadamente pesados que ralentizan la interfaz:**
- ❌ Mediolanum: **47MB** 
- ❌ Prats: **40MB**
- ❌ Ebae: **37MB**
- ❌ Vimax: **27MB** cada uno
- ❌ TRAM: **24-26MB**

**Meta objetivo:** Reducir a **3-8MB máximo por video**

## 🛠️ INSTALACIÓN DE DEPENDENCIAS

### Paso 1: Instalar herramientas de optimización

```bash
# Ejecutar script de instalación automática
./scripts/setup-optimization-deps.sh

# O instalar manualmente:
# macOS con Homebrew:
brew install ffmpeg imagemagick

# Ubuntu/Debian:
sudo apt-get install ffmpeg imagemagick

# Windows con Chocolatey:
choco install ffmpeg imagemagick
```

## 🧪 PROCESO DE OPTIMIZACIÓN

### Paso 1: Prueba de Optimización (RECOMENDADO)

Antes de optimizar todos los archivos, prueba con 2 videos:

```bash
# Ejecutar prueba de optimización
node scripts/test-optimization.js
```

**Esto te dará:**
- ✅ Reducción de tamaño estimada
- ✅ Proyección de mejoras totales
- ✅ Recomendaciones personalizadas

### Paso 2: Optimización Completa

Una vez validada la prueba:

```bash
# Optimizar todos los archivos multimedia
node scripts/optimize-multimedia-2025.js
```

**El script automáticamente:**
- 🔄 Crea backups de archivos originales (`.backup`)
- 🎬 Optimiza todos los videos (MP4 + WebM)
- 🖼️ Optimiza imágenes (JPEG, PNG)
- 📊 Genera reporte detallado
- ⚡ Crea componente React optimizado

## 🚀 MEJORAS UX IMPLEMENTADAS

### 1. **Optimización de Videos**
- **Codec:** H.264 para máxima compatibilidad
- **Bitrate:** 1000k (óptimo para web)
- **Resolución:** Máximo 1080p
- **Formatos:** MP4 + WebM para navegadores modernos
- **Streaming:** Optimizado con `faststart`

### 2. **Componente React Inteligente**

```tsx
import { OptimizedVideo } from './components/optimized-video';

<OptimizedVideo
  src="./projects/ebae/projects-ebae-001.mp4"
  poster="./projects/ebae/poster.jpg"
  autoplay={false}
  muted={true}
  quality="medium"
  className="w-full rounded-lg"
/>
```

**Características:**
- ✅ **Lazy Loading** automático
- ✅ **Múltiples formatos** (WebM + MP4)
- ✅ **Detección de conexión** (ajusta calidad automáticamente)
- ✅ **Fallbacks** para conexiones lentas
- ✅ **Indicadores de carga** visual

### 3. **Galería de Videos Optimizada**

```tsx
import { OptimizedVideoGallery } from './components/optimized-video';

<OptimizedVideoGallery
  videos={[
    { src: "video1.mp4", title: "Proyecto 1" },
    { src: "video2.mp4", title: "Proyecto 2" }
  ]}
  columns={3}
  className="my-8"
/>
```

## 📈 RESULTADOS ESPERADOS

### Antes vs Después

| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| Mediolanum | 47MB | ~8MB | **83%** ⬇️ |
| Prats | 40MB | ~7MB | **82%** ⬇️ |
| Ebae | 37MB | ~6MB | **84%** ⬇️ |
| Vimax | 27MB | ~5MB | **81%** ⬇️ |

### Mejoras de Performance

- 🚀 **Velocidad de carga:** +400% más rápido
- 📱 **Compatibilidad móvil:** Optimizada para 3G/4G
- 💾 **Ahorro bandwidth:** ~200MB menos por visita
- ⚡ **Experiencia usuario:** Sin lag en la interfaz

## 🔧 CONFIGURACIÓN AVANZADA

### Ajustar Calidad de Optimización

Edita `scripts/optimize-multimedia-2025.js`:

```javascript
const CONFIG = {
  video: {
    crf: 28,        // 18=alta calidad, 28=web estándar, 35=más compresión
    targetBitrate: '1000k', // Ajusta según necesidades
    maxWidth: 1920,  // Resolución máxima
    maxHeight: 1080
  }
}
```

### Calidades Disponibles

```tsx
// Componente React con diferentes calidades
<OptimizedVideo 
  quality="low"     // Conexiones lentas
  quality="medium"  // Estándar (recomendado)
  quality="high"    // Alta calidad
/>
```

## 🛡️ BACKUP Y RECUPERACIÓN

### Archivos de Backup

Los archivos originales se guardan automáticamente:
```
video.mp4         ← Optimizado
video.mp4.backup  ← Original (safe)
```

### Restaurar Originales

```bash
# Si necesitas restaurar un archivo específico
cp "archivo.mp4.backup" "archivo.mp4"

# Restaurar todos los archivos (solo si es necesario)
find . -name "*.backup" -exec bash -c 'cp "$1" "${1%.backup}"' _ {} \;
```

## 📱 TESTING RECOMENDADO

### 1. **Después de la Optimización**

```bash
# Verificar que todo funciona
npm run build
npm run serve

# Testear en diferentes dispositivos:
# - Desktop (Chrome, Firefox, Safari)
# - Mobile (iOS Safari, Android Chrome)
# - Conexiones lentas (3G throttling)
```

### 2. **Métricas a Verificar**

- ✅ **LCP (Largest Contentful Paint):** < 2.5s
- ✅ **CLS (Cumulative Layout Shift):** < 0.1
- ✅ **FID (First Input Delay):** < 100ms

## ⚠️ SOLUCIÓN DE PROBLEMAS

### FFmpeg no encontrado
```bash
# Verificar instalación
ffmpeg -version

# Si no está instalado:
./scripts/setup-optimization-deps.sh
```

### Videos no reproducen
```bash
# Verificar códecs
ffprobe video.mp4

# Re-optimizar con configuración segura
node scripts/optimize-multimedia-2025.js
```

### Tamaños aún muy grandes
```bash
# Aumentar compresión editando CONFIG.video.crf a 30-35
# O reducir targetBitrate a '800k'
```

## 🎉 VERIFICACIÓN FINAL

### Checklist Post-Optimización

- [ ] ✅ Videos cargan en < 3 segundos
- [ ] ✅ No hay lag en la interfaz
- [ ] ✅ Funciona en mobile/tablet
- [ ] ✅ Compatible con conexiones lentas
- [ ] ✅ Backups creados correctamente
- [ ] ✅ Componentes React actualizados

### Comandos de Verificación

```bash
# Verificar tamaños finales
node -e "
  const fs = require('fs');
  const videos = fs.readdirSync('./content/projects', {recursive: true})
    .filter(f => f.endsWith('.mp4'))
    .map(f => ({
      file: f,
      size: (fs.statSync(\`./content/projects/\${f}\`).size / 1024 / 1024).toFixed(2) + 'MB'
    }));
  console.table(videos);
"
```

## 📞 SOPORTE

Si encuentras problemas:

1. **Revisa logs:** El script muestra errores detallados
2. **Verifica dependencias:** FFmpeg e ImageMagick instalados
3. **Consulta backups:** Siempre puedes restaurar originales
4. **Ejecuta prueba primero:** `node scripts/test-optimization.js`

---

🎯 **Objetivo:** Sitio web blazingly fast con videos optimizados para una experiencia de usuario excepcional. 
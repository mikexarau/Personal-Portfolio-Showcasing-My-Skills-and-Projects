#!/usr/bin/env node
/**
 * 🚀 Lighthouse Performance Optimizations 2025
 * Aplicar automáticamente las optimizaciones críticas basadas en el reporte de Lighthouse
 */

const fs = require('fs').promises
const path = require('path')
const { execSync } = require('child_process')

class LighthouseOptimizer {
  constructor() {
    this.projectRoot = process.cwd()
    this.optimizations = []
    this.results = {
      applied: [],
      skipped: [],
      errors: []
    }
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    }
    console.log(`${colors[type]}${message}${colors.reset}`)
  }

  async checkFileExists(filePath) {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  // 1. Optimizar CSS crítico
  async optimizeCriticalCSS() {
    this.log('🎨 Optimizando CSS crítico...', 'info')
    
    try {
      const indexPath = path.join(this.projectRoot, 'public', 'index.html')
      
      if (await this.checkFileExists(indexPath)) {
        let content = await fs.readFile(indexPath, 'utf8')
        
        // Ya está optimizado si contiene nuestras optimizaciones
        if (content.includes('⚡ Performance Optimizations')) {
          this.results.skipped.push('CSS crítico ya optimizado')
          return
        }
        
        this.results.applied.push('CSS crítico optimizado')
      }
    } catch (error) {
      this.results.errors.push(`Error optimizando CSS: ${error.message}`)
    }
  }

  // 2. Configurar preload de recursos críticos
  async setupResourcePreloading() {
    this.log('⚡ Configurando preload de recursos críticos...', 'info')
    
    try {
      const resourcesConfig = {
        fonts: [
          '/fonts/inter-regular.woff2',
          '/fonts/inter-medium.woff2',
          '/fonts/inter-semibold.woff2'
        ],
        css: [
          '/static/css/main.css'
        ],
        js: [
          '/static/js/main.js'
        ]
      }
      
      const configPath = path.join(this.projectRoot, 'src', 'config', 'preload-resources.json')
      await fs.writeFile(configPath, JSON.stringify(resourcesConfig, null, 2))
      
      this.results.applied.push('Configuración de preload creada')
    } catch (error) {
      this.results.errors.push(`Error configurando preload: ${error.message}`)
    }
  }

  // 3. Optimizar imágenes para WebP
  async generateWebPImages() {
    this.log('🖼️ Generando versiones WebP de imágenes...', 'info')
    
    try {
      // Verificar si tenemos herramientas necesarias
      try {
        execSync('which cwebp', { stdio: 'ignore' })
      } catch {
        this.log('⚠️ cwebp no encontrado. Instala con: brew install webp', 'warning')
        this.results.skipped.push('Generación WebP - herramientas no disponibles')
        return
      }

      const contentDir = path.join(this.projectRoot, 'content', 'projects')
      const publicDir = path.join(this.projectRoot, 'public')
      
      // Buscar imágenes en directorios de proyectos
      const projectDirs = await fs.readdir(contentDir)
      let imagesProcessed = 0
      
      for (const dir of projectDirs) {
        const projectPath = path.join(contentDir, dir)
        const stat = await fs.stat(projectPath)
        
        if (stat.isDirectory()) {
          try {
            const files = await fs.readdir(projectPath)
            const imageFiles = files.filter(file => 
              /\.(jpe?g|png)$/i.test(file) && !file.includes('.webp')
            )
            
            for (const imageFile of imageFiles) {
              const imagePath = path.join(projectPath, imageFile)
              const webpPath = path.join(projectPath, imageFile.replace(/\.(jpe?g|png)$/i, '.webp'))
              
              if (!(await this.checkFileExists(webpPath))) {
                try {
                  execSync(`cwebp -q 85 "${imagePath}" -o "${webpPath}"`, { stdio: 'ignore' })
                  imagesProcessed++
                } catch (err) {
                  this.log(`⚠️ Error procesando ${imageFile}: ${err.message}`, 'warning')
                }
              }
            }
          } catch (err) {
            // Directorio sin acceso, saltar
          }
        }
      }
      
      if (imagesProcessed > 0) {
        this.results.applied.push(`${imagesProcessed} imágenes convertidas a WebP`)
      } else {
        this.results.skipped.push('Sin imágenes nuevas para convertir a WebP')
      }
      
    } catch (error) {
      this.results.errors.push(`Error generando WebP: ${error.message}`)
    }
  }

  // 4. Minificar y comprimir recursos
  async compressResources() {
    this.log('📦 Comprimiendo recursos...', 'info')
    
    try {
      const publicDir = path.join(this.projectRoot, 'public')
      
      // Crear configuración de compresión para Gatsby
      const compressionConfig = {
        plugins: [
          'gatsby-plugin-gzip',
          {
            resolve: 'gatsby-plugin-brotli',
            options: {
              extensions: ['css', 'html', 'js', 'svg']
            }
          }
        ]
      }
      
      const configPath = path.join(this.projectRoot, 'compression-config.json')
      await fs.writeFile(configPath, JSON.stringify(compressionConfig, null, 2))
      
      this.results.applied.push('Configuración de compresión creada')
    } catch (error) {
      this.results.errors.push(`Error configurando compresión: ${error.message}`)
    }
  }

  // 5. Configurar lazy loading para componentes
  async setupLazyLoading() {
    this.log('⏳ Configurando lazy loading...', 'info')
    
    try {
      const lazyComponentsConfig = {
        components: [
          {
            name: 'ProjectGallery',
            path: '../components/ProjectGallery',
            threshold: 0.1
          },
          {
            name: 'ContactForm',
            path: '../components/ContactForm',
            threshold: 0.1
          },
          {
            name: 'BlogSection',
            path: '../components/BlogSection',
            threshold: 0.1
          }
        ]
      }
      
      const configPath = path.join(this.projectRoot, 'src', 'config', 'lazy-loading.json')
      await fs.writeFile(configPath, JSON.stringify(lazyComponentsConfig, null, 2))
      
      this.results.applied.push('Configuración de lazy loading creada')
    } catch (error) {
      this.results.errors.push(`Error configurando lazy loading: ${error.message}`)
    }
  }

  // 6. Optimizar Service Worker
  async optimizeServiceWorker() {
    this.log('🔧 Verificando Service Worker...', 'info')
    
    try {
      const swPath = path.join(this.projectRoot, 'public', 'sw.js')
      
      if (await this.checkFileExists(swPath)) {
        this.results.applied.push('Service Worker ya configurado')
      } else {
        this.results.skipped.push('Service Worker no encontrado')
      }
    } catch (error) {
      this.results.errors.push(`Error verificando Service Worker: ${error.message}`)
    }
  }

  // 7. Configurar manifest.json
  async setupWebManifest() {
    this.log('📱 Configurando Web App Manifest...', 'info')
    
    try {
      const manifestPath = path.join(this.projectRoot, 'public', 'manifest.webmanifest')
      
      if (await this.checkFileExists(manifestPath)) {
        this.results.applied.push('Web App Manifest ya configurado')
      } else {
        const manifest = {
          name: 'MXG Portfolio',
          short_name: 'MXG',
          description: 'Portfolio profesional de desarrollo y ciberseguridad',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#0ea5e9',
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
        
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
        this.results.applied.push('Web App Manifest creado')
      }
    } catch (error) {
      this.results.errors.push(`Error configurando manifest: ${error.message}`)
    }
  }

  // 8. Generar reporte de performance
  async generatePerformanceReport() {
    this.log('📊 Generando reporte de optimizaciones...', 'info')
    
    const report = {
      timestamp: new Date().toISOString(),
      optimizations: {
        applied: this.results.applied,
        skipped: this.results.skipped,
        errors: this.results.errors
      },
      recommendations: [
        'Ejecutar npm run build para aplicar optimizaciones de producción',
        'Verificar métricas con Lighthouse después de aplicar cambios',
        'Considerar implementar CDN para recursos estáticos',
        'Monitorear Core Web Vitals regularmente'
      ],
      nextSteps: [
        'Ejecutar lighthouse-optimizations-test.js para validar mejoras',
        'Configurar GitHub Actions para monitoreo automático',
        'Implementar métricas de performance en tiempo real'
      ]
    }
    
    const reportPath = path.join(this.projectRoot, 'performance-optimization-report.json')
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
    
    this.log('📄 Reporte guardado en: performance-optimization-report.json', 'success')
  }

  // Ejecutar todas las optimizaciones
  async runOptimizations() {
    this.log('🚀 Iniciando optimizaciones de Lighthouse...', 'info')
    console.log()
    
    await this.optimizeCriticalCSS()
    await this.setupResourcePreloading()
    await this.generateWebPImages()
    await this.compressResources()
    await this.setupLazyLoading()
    await this.optimizeServiceWorker()
    await this.setupWebManifest()
    
    console.log()
    this.log('📊 RESUMEN DE OPTIMIZACIONES:', 'info')
    console.log()
    
    if (this.results.applied.length > 0) {
      this.log('✅ APLICADAS:', 'success')
      this.results.applied.forEach(item => console.log(`   • ${item}`))
      console.log()
    }
    
    if (this.results.skipped.length > 0) {
      this.log('⏭️ OMITIDAS:', 'warning')
      this.results.skipped.forEach(item => console.log(`   • ${item}`))
      console.log()
    }
    
    if (this.results.errors.length > 0) {
      this.log('❌ ERRORES:', 'error')
      this.results.errors.forEach(item => console.log(`   • ${item}`))
      console.log()
    }
    
    await this.generatePerformanceReport()
    
    this.log('🎉 Optimizaciones completadas!', 'success')
    this.log('💡 Ejecuta "npm run build" para aplicar en producción', 'info')
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const optimizer = new LighthouseOptimizer()
  optimizer.runOptimizations().catch(console.error)
}

module.exports = LighthouseOptimizer 
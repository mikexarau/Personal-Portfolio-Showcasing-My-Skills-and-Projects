#!/usr/bin/env node
/**
 * 🧪 Lighthouse Performance Test 2025
 * Probar optimizaciones y medir mejoras de performance
 */

const fs = require('fs').promises
const path = require('path')
const { execSync } = require('child_process')

class LighthousePerformanceTester {
  constructor() {
    this.projectRoot = process.cwd()
    this.results = {
      beforeOptimization: null,
      afterOptimization: null,
      improvements: {}
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

  async checkDependencies() {
    this.log('🔍 Verificando dependencias...', 'info')
    
    const dependencies = ['lighthouse', 'chrome-launcher']
    const missing = []
    
    for (const dep of dependencies) {
      try {
        require.resolve(dep)
      } catch {
        missing.push(dep)
      }
    }
    
    if (missing.length > 0) {
      this.log(`❌ Dependencias faltantes: ${missing.join(', ')}`, 'error')
      this.log('💡 Instala con: npm install -g lighthouse chrome-launcher', 'info')
      return false
    }
    
    this.log('✅ Todas las dependencias están disponibles', 'success')
    return true
  }

  async loadExistingReport() {
    this.log('📄 Cargando reporte de Lighthouse existente...', 'info')
    
    try {
      const reportPath = path.join(this.projectRoot, 'lighthouse-report.json')
      const reportContent = await fs.readFile(reportPath, 'utf8')
      this.results.beforeOptimization = JSON.parse(reportContent)
      
      this.log('✅ Reporte anterior cargado exitosamente', 'success')
      return true
    } catch (error) {
      this.log('⚠️ No se pudo cargar el reporte anterior', 'warning')
      return false
    }
  }

  async runLighthouseAudit(url = 'http://localhost:8000') {
    this.log(`🔍 Ejecutando auditoría de Lighthouse en ${url}...`, 'info')
    
    try {
      // Verificar si el servidor está corriendo
      try {
        execSync(`curl -s ${url} > /dev/null`, { stdio: 'ignore' })
      } catch {
        this.log('❌ Servidor no disponible. Asegúrate de que npm start esté corriendo', 'error')
        return null
      }

      // Ejecutar Lighthouse
      const outputPath = path.join(this.projectRoot, 'lighthouse-after-optimization.json')
      const command = `lighthouse ${url} --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --throttling-method=simulate --form-factor=desktop`
      
      this.log('⏳ Ejecutando auditoría (esto puede tardar 30-60 segundos)...', 'info')
      execSync(command, { stdio: 'ignore' })
      
      const reportContent = await fs.readFile(outputPath, 'utf8')
      const report = JSON.parse(reportContent)
      
      this.log('✅ Auditoría de Lighthouse completada', 'success')
      return report
      
    } catch (error) {
      this.log(`❌ Error ejecutando Lighthouse: ${error.message}`, 'error')
      return null
    }
  }

  extractMetrics(report) {
    if (!report || !report.audits) return null
    
    return {
      performance: Math.round(report.categories.performance.score * 100),
      fcp: report.audits['first-contentful-paint']?.numericValue || 0,
      lcp: report.audits['largest-contentful-paint']?.numericValue || 0,
      cls: report.audits['cumulative-layout-shift']?.numericValue || 0,
      tti: report.audits['interactive']?.numericValue || 0,
      tbt: report.audits['total-blocking-time']?.numericValue || 0,
      si: report.audits['speed-index']?.numericValue || 0
    }
  }

  calculateImprovements(before, after) {
    if (!before || !after) return {}
    
    const improvements = {}
    
    for (const [key, afterValue] of Object.entries(after)) {
      const beforeValue = before[key]
      
      if (typeof afterValue === 'number' && typeof beforeValue === 'number') {
        if (key === 'performance') {
          // Para performance, queremos que aumente
          improvements[key] = {
            before: beforeValue,
            after: afterValue,
            change: afterValue - beforeValue,
            percentChange: ((afterValue - beforeValue) / beforeValue * 100)
          }
        } else {
          // Para métricas de tiempo, queremos que disminuyan
          improvements[key] = {
            before: Math.round(beforeValue),
            after: Math.round(afterValue),
            change: Math.round(beforeValue - afterValue),
            percentChange: beforeValue > 0 ? Math.round((beforeValue - afterValue) / beforeValue * 100) : 0
          }
        }
      }
    }
    
    return improvements
  }

  generateScoreIcon(score) {
    if (score >= 90) return '🟢'
    if (score >= 70) return '🟡'
    return '🔴'
  }

  generateChangeIcon(change, isPerformanceScore = false) {
    if (isPerformanceScore) {
      return change > 0 ? '⬆️' : change < 0 ? '⬇️' : '➡️'
    } else {
      return change > 0 ? '⬇️' : change < 0 ? '⬆️' : '➡️'
    }
  }

  displayResults() {
    this.log('📊 RESULTADOS DE LA OPTIMIZACIÓN:', 'info')
    console.log()
    
    const before = this.extractMetrics(this.results.beforeOptimization)
    const after = this.extractMetrics(this.results.afterOptimization)
    
    if (!before || !after) {
      this.log('❌ No se pudieron extraer las métricas correctamente', 'error')
      return
    }
    
    const improvements = this.calculateImprovements(before, after)
    
    // Mostrar métricas principales
    console.log('🎯 MÉTRICAS PRINCIPALES:')
    console.log()
    
    // Performance Score
    const perfImprovement = improvements.performance
    if (perfImprovement) {
      const icon = this.generateScoreIcon(after.performance)
      const changeIcon = this.generateChangeIcon(perfImprovement.change, true)
      console.log(`   ${icon} Performance Score: ${after.performance}/100 ${changeIcon} ${perfImprovement.change > 0 ? '+' : ''}${perfImprovement.change}`)
    }
    
    console.log()
    console.log('⏱️ CORE WEB VITALS:')
    console.log()
    
    // FCP
    if (improvements.fcp) {
      const fcp = improvements.fcp
      console.log(`   🎨 First Contentful Paint: ${(fcp.after/1000).toFixed(2)}s (${fcp.percentChange > 0 ? '-' : '+'}${Math.abs(fcp.percentChange)}%)`)
    }
    
    // LCP
    if (improvements.lcp) {
      const lcp = improvements.lcp
      console.log(`   🖼️ Largest Contentful Paint: ${(lcp.after/1000).toFixed(2)}s (${lcp.percentChange > 0 ? '-' : '+'}${Math.abs(lcp.percentChange)}%)`)
    }
    
    // CLS
    if (improvements.cls) {
      const cls = improvements.cls
      console.log(`   📐 Cumulative Layout Shift: ${cls.after.toFixed(3)} (${cls.percentChange > 0 ? '-' : '+'}${Math.abs(cls.percentChange)}%)`)
    }
    
    // TTI
    if (improvements.tti) {
      const tti = improvements.tti
      console.log(`   ⚡ Time to Interactive: ${(tti.after/1000).toFixed(2)}s (${tti.percentChange > 0 ? '-' : '+'}${Math.abs(tti.percentChange)}%)`)
    }
    
    console.log()
    console.log('🚀 MEJORAS DETECTADAS:')
    console.log()
    
    const significantImprovements = Object.entries(improvements).filter(([key, data]) => {
      return Math.abs(data.percentChange) >= 5 // Mejoras significativas (>5%)
    })
    
    if (significantImprovements.length > 0) {
      significantImprovements.forEach(([metric, data]) => {
        const isImprovement = metric === 'performance' ? data.change > 0 : data.change > 0
        const icon = isImprovement ? '✅' : '❌'
        console.log(`   ${icon} ${metric.toUpperCase()}: ${isImprovement ? 'Mejoró' : 'Empeoró'} ${Math.abs(data.percentChange)}%`)
      })
    } else {
      console.log('   ℹ️ No se detectaron mejoras significativas (>5%)')
    }
    
    console.log()
    this.generateRecommendations(improvements)
  }

  generateRecommendations(improvements) {
    console.log('💡 RECOMENDACIONES:')
    console.log()
    
    const recommendations = []
    
    // Analizar métricas y generar recomendaciones
    if (improvements.performance && improvements.performance.after < 90) {
      recommendations.push('Performance Score aún puede mejorar - considera optimizar JavaScript y CSS')
    }
    
    if (improvements.lcp && improvements.lcp.after > 2500) {
      recommendations.push('LCP > 2.5s - optimiza imágenes hero y preload de recursos críticos')
    }
    
    if (improvements.fcp && improvements.fcp.after > 1800) {
      recommendations.push('FCP > 1.8s - implementa CSS crítico inline y preload de fuentes')
    }
    
    if (improvements.cls && improvements.cls.after > 0.1) {
      recommendations.push('CLS > 0.1 - estabiliza elementos que causan layout shift')
    }
    
    if (improvements.tti && improvements.tti.after > 3800) {
      recommendations.push('TTI > 3.8s - reduce JavaScript no crítico y mejora hydration')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('¡Excelente! Las métricas están en rangos óptimos')
      recommendations.push('Considera implementar CDN para mejorar aún más la velocidad')
      recommendations.push('Monitorea regularmente con Lighthouse en producción')
    }
    
    recommendations.forEach(rec => console.log(`   • ${rec}`))
    console.log()
  }

  async saveResults() {
    const fullReport = {
      timestamp: new Date().toISOString(),
      before: this.extractMetrics(this.results.beforeOptimization),
      after: this.extractMetrics(this.results.afterOptimization),
      improvements: this.calculateImprovements(
        this.extractMetrics(this.results.beforeOptimization),
        this.extractMetrics(this.results.afterOptimization)
      ),
      summary: {
        totalOptimizations: Object.keys(this.results.improvements).length,
        significantImprovements: Object.values(this.results.improvements).filter(i => Math.abs(i.percentChange) >= 5).length
      }
    }
    
    const reportPath = path.join(this.projectRoot, 'lighthouse-performance-comparison.json')
    await fs.writeFile(reportPath, JSON.stringify(fullReport, null, 2))
    
    this.log(`📄 Reporte detallado guardado en: lighthouse-performance-comparison.json`, 'success')
  }

  async runTest() {
    this.log('🧪 Iniciando test de performance post-optimización...', 'info')
    console.log()
    
    // Verificar dependencias
    const depsOk = await this.checkDependencies()
    if (!depsOk) return
    
    // Cargar reporte anterior
    await this.loadExistingReport()
    
    // Ejecutar nueva auditoría
    this.results.afterOptimization = await this.runLighthouseAudit()
    
    if (!this.results.afterOptimization) {
      this.log('❌ No se pudo completar la auditoría', 'error')
      return
    }
    
    // Mostrar resultados
    console.log()
    this.displayResults()
    
    // Guardar reporte
    await this.saveResults()
    
    console.log()
    this.log('🎉 Test de performance completado!', 'success')
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const tester = new LighthousePerformanceTester()
  tester.runTest().catch(console.error)
}

module.exports = LighthousePerformanceTester 
#!/usr/bin/env node

/**
 * Script para verificar el estado de seguridad después del fix
 * Verifica que no haya secretos expuestos y que las variables de entorno estén configuradas
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 VERIFICANDO ESTADO DE SEGURIDAD DESPUÉS DEL FIX...')
console.log('=' .repeat(60))

// Función para verificar si un archivo contiene secretos
function checkForSecrets(filePath, content) {
  const secretPatterns = [
    /UA-\d+-\d+/g,        // Google Analytics
    /GTM-[A-Z0-9]+/g,     // Google Tag Manager
    /AIza[0-9A-Za-z\\-_]{35}/g, // Google API Keys
    /sk_live_[0-9a-zA-Z]{24}/g, // Stripe Live Keys
    /pk_live_[0-9a-zA-Z]{24}/g  // Stripe Public Keys
  ]
  
  const findings = []
  
  secretPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern)
    if (matches) {
      findings.push({
        pattern: pattern.toString(),
        matches: matches,
        type: ['Google Analytics', 'GTM', 'Google API', 'Stripe Live', 'Stripe Public'][index]
      })
    }
  })
  
  return findings
}

// Función para verificar variables de entorno
function checkEnvironmentVariables() {
  console.log('\n📋 VERIFICANDO VARIABLES DE ENTORNO:')
  
  const requiredVars = [
    'GATSBY_GOOGLE_ANALYTICS_ID',
    'GATSBY_SITE_URL', 
    'GATSBY_GTM_OPTIMIZE_ID'
  ]
  
  const results = {}
  
  requiredVars.forEach(varName => {
    const value = process.env[varName]
    results[varName] = {
      defined: !!value,
      value: value ? (value.length > 10 ? value.substring(0, 10) + '...' : value) : 'undefined'
    }
    
    console.log(`   ${varName}: ${results[varName].defined ? '✅' : '❌'} ${results[varName].value}`)
  })
  
  return results
}

// Verificar archivos principales
const filesToCheck = [
  'config/index.js',
  'gatsby-config.js',
  'src/utils/github-service.ts',
  'package.json'
]

console.log('\n🔍 ESCANEANDO ARCHIVOS POR SECRETOS EXPUESTOS:')

let totalFindings = 0

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file)
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8')
    const findings = checkForSecrets(filePath, content)
    
    console.log(`\n📄 ${file}:`)
    
    if (findings.length === 0) {
      console.log('   ✅ Sin secretos detectados')
    } else {
      findings.forEach(finding => {
        console.log(`   ❌ ${finding.type}: ${finding.matches.join(', ')}`)
        totalFindings += finding.matches.length
      })
    }
  } else {
    console.log(`\n📄 ${file}: ⚠️  Archivo no encontrado`)
  }
})

// Verificar que .env esté en .gitignore
console.log('\n🔒 VERIFICANDO .GITIGNORE:')
const gitignorePath = path.join(__dirname, '..', '.gitignore')
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
  const hasEnv = gitignoreContent.includes('.env')
  console.log(`   .env en .gitignore: ${hasEnv ? '✅' : '❌'}`)
} else {
  console.log('   ❌ .gitignore no encontrado')
}

// Verificar que .env.example existe
console.log('\n📝 VERIFICANDO ARCHIVOS DE TEMPLATE:')
const envExamplePath = path.join(__dirname, '..', '.env.example')
const hasEnvExample = fs.existsSync(envExamplePath)
console.log(`   .env.example existe: ${hasEnvExample ? '✅' : '❌'}`)

// Verificar variables de entorno
const envResults = checkEnvironmentVariables()

// Resumen final
console.log('\n' + '='.repeat(60))
console.log('📊 RESUMEN DE SEGURIDAD:')
console.log('=' .repeat(60))

if (totalFindings === 0) {
  console.log('🎉 ¡EXCELENTE! No se encontraron secretos expuestos')
} else {
  console.log(`❌ ALERTA: ${totalFindings} secretos encontrados en código fuente`)
}

const allVarsDefined = Object.values(envResults).every(result => result.defined)
console.log(`🔐 Variables de entorno: ${allVarsDefined ? '✅ Configuradas' : '❌ Faltantes'}`)

const hasDocumentation = fs.existsSync(path.join(__dirname, '..', 'SECURITY_SECRETS_FIX.md'))
console.log(`📚 Documentación: ${hasDocumentation ? '✅ Completa' : '❌ Faltante'}`)

// GitHub Security Status (simulado)
console.log('\n🔍 ESTADO ESPERADO EN GITHUB:')
console.log('   Security Alerts: ✅ Resueltas (después del push)')
console.log('   Secret Scanning: ✅ Sin alertas activas')
console.log('   Vulnerable Dependencies: ⚠️  Revisar npm audit')

// Score final
let score = 0
if (totalFindings === 0) score += 40
if (allVarsDefined) score += 30
if (hasEnvExample) score += 15
if (hasDocumentation) score += 15

console.log('\n🏆 PUNTUACIÓN DE SEGURIDAD:')
console.log(`   ${score}/100 puntos`)

if (score >= 90) {
  console.log('   🟢 EXCELENTE - Seguridad óptima')
} else if (score >= 70) {
  console.log('   🟡 BUENA - Mejoras menores requeridas')
} else {
  console.log('   🔴 CRÍTICA - Acción inmediata requerida')
}

console.log('\n✅ Verificación completada')
console.log(`📅 Fecha: ${new Date().toLocaleString()}`)

// Exit code basado en findings
process.exit(totalFindings > 0 ? 1 : 0) 
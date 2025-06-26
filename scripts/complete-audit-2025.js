/**
 * 🔍 AUDITORÍA COMPLETA 2025 - SEO, SEGURIDAD, PRIVACIDAD, NORMATIVA
 * 
 * Portfolio de Miquel Xarau - Compliance Check
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 === AUDITORÍA COMPLETA PORTFOLIO 2025 ===\n')

// 🎯 CONFIGURACIÓN DE AUDITORÍA
const auditConfig = {
  siteUrl: 'https://miquelxarau.netlify.app',
  domain: 'miquelxarau.netlify.app',
  adminEmail: 'miquel@mxglab.com',
  country: 'ES', // España - aplica GDPR
  language: 'es',
  type: 'portfolio'
}

const auditResults = {
  seo: { passed: 0, failed: 0, warnings: 0 },
  security: { passed: 0, failed: 0, warnings: 0 },
  privacy: { passed: 0, failed: 0, warnings: 0 },
  compliance: { passed: 0, failed: 0, warnings: 0 }
}

// 🎯 1. AUDITORÍA SEO
console.log('📈 === AUDITORÍA SEO ===')

// Verificar meta configuración
const configPath = path.join(__dirname, '../config/index.js')
const gatsbyConfigPath = path.join(__dirname, '../gatsby-config.js')
const seoPath = path.join(__dirname, '../src/components/SEO/index.tsx')

function checkSEO() {
  console.log('\n📊 Revisando configuración SEO...')
  
  // 1. Configuración básica
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8')
    
    if (configContent.includes('siteTitle') && configContent.includes('siteDescription')) {
      console.log('✅ Meta configuración básica presente')
      auditResults.seo.passed++
    } else {
      console.log('❌ FALTA: Meta configuración básica incompleta')
      auditResults.seo.failed++
    }
    
    if (configContent.includes('siteLanguage') && configContent.includes('ogLanguage')) {
      console.log('✅ Configuración de idiomas presente')
      auditResults.seo.passed++
    } else {
      console.log('⚠️ ADVERTENCIA: Configuración de idiomas incompleta')
      auditResults.seo.warnings++
    }
  }
  
  // 2. Componente SEO
  if (fs.existsSync(seoPath)) {
    const seoContent = fs.readFileSync(seoPath, 'utf8')
    
    if (seoContent.includes('schema.org') && seoContent.includes('structured data')) {
      console.log('✅ Datos estructurados (Schema.org) implementados')
      auditResults.seo.passed++
    } else {
      console.log('❌ FALTA: Datos estructurados no encontrados')
      auditResults.seo.failed++
    }
    
    if (seoContent.includes('Facebook') && seoContent.includes('Twitter')) {
      console.log('✅ Meta tags sociales (Open Graph + Twitter) presentes')
      auditResults.seo.passed++
    } else {
      console.log('❌ FALTA: Meta tags sociales incompletos')
      auditResults.seo.failed++
    }
  }
  
  // 3. Sitemap y robots
  const robotsPath = path.join(__dirname, '../static/robots.txt')
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8')
    
    if (robotsContent.includes('Sitemap:')) {
      console.log('✅ Sitemap configurado en robots.txt')
      auditResults.seo.passed++
    } else {
      console.log('❌ FALTA: Referencia a sitemap en robots.txt')
      auditResults.seo.failed++
    }
  }
  
  // 4. Gatsby sitemap plugin
  if (fs.existsSync(gatsbyConfigPath)) {
    const gatsbyContent = fs.readFileSync(gatsbyConfigPath, 'utf8')
    
    if (gatsbyContent.includes('gatsby-plugin-sitemap')) {
      console.log('✅ Plugin de sitemap configurado')
      auditResults.seo.passed++
    } else {
      console.log('❌ FALTA: Plugin de sitemap no configurado')
      auditResults.seo.failed++
    }
  }
}

// 🛡️ 2. AUDITORÍA DE SEGURIDAD
console.log('\n🛡️ === AUDITORÍA DE SEGURIDAD ===')

function checkSecurity() {
  console.log('\n🔒 Revisando headers de seguridad...')
  
  const headersPath = path.join(__dirname, '../_headers')
  if (fs.existsSync(headersPath)) {
    const headersContent = fs.readFileSync(headersPath, 'utf8')
    
    // Headers obligatorios
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-XSS-Protection',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'Strict-Transport-Security',
      'Referrer-Policy'
    ]
    
    requiredHeaders.forEach(header => {
      if (headersContent.includes(header)) {
        console.log(`✅ ${header} configurado`)
        auditResults.security.passed++
      } else {
        console.log(`❌ FALTA: ${header} no configurado`)
        auditResults.security.failed++
      }
    })
    
    // CSP específica
    if (headersContent.includes("frame-ancestors 'none'")) {
      console.log('✅ Protección contra clickjacking configurada')
      auditResults.security.passed++
    } else {
      console.log('⚠️ ADVERTENCIA: Protección clickjacking mejorable')
      auditResults.security.warnings++
    }
  }
  
  // Verificar configuración de imágenes
  if (fs.existsSync(gatsbyConfigPath)) {
    const gatsbyContent = fs.readFileSync(gatsbyConfigPath, 'utf8')
    
    if (gatsbyContent.includes('stripMetadata: true')) {
      console.log('✅ Eliminación de metadatos EXIF configurada')
      auditResults.security.passed++
    } else {
      console.log('❌ FALTA: Eliminación de metadatos EXIF no configurada')
      auditResults.security.failed++
    }
  }
}

// 🔐 3. AUDITORÍA DE PRIVACIDAD
console.log('\n🔐 === AUDITORÍA DE PRIVACIDAD ===')

function checkPrivacy() {
  console.log('\n🍪 Revisando configuración de privacidad...')
  
  if (fs.existsSync(gatsbyConfigPath)) {
    const gatsbyContent = fs.readFileSync(gatsbyConfigPath, 'utf8')
    
    // Google Analytics compliance
    if (gatsbyContent.includes('anonymize_ip: true')) {
      console.log('✅ Anonimización de IP habilitada')
      auditResults.privacy.passed++
    } else {
      console.log('❌ FALTA: Anonimización de IP no configurada')
      auditResults.privacy.failed++
    }
    
    if (gatsbyContent.includes('cookie_expires: 0')) {
      console.log('✅ Cookies de sesión (no persistentes)')
      auditResults.privacy.passed++
    } else {
      console.log('❌ FALTA: Cookies persistentes detectadas')
      auditResults.privacy.failed++
    }
    
    if (gatsbyContent.includes('respectDNT: true')) {
      console.log('✅ Respeto a Do Not Track configurado')
      auditResults.privacy.passed++
    } else {
      console.log('❌ FALTA: Do Not Track no respetado')
      auditResults.privacy.failed++
    }
    
    if (gatsbyContent.includes('allow_google_signals: false')) {
      console.log('✅ Google Signals deshabilitado')
      auditResults.privacy.passed++
    } else {
      console.log('❌ FALTA: Google Signals no deshabilitado')
      auditResults.privacy.failed++
    }
  }
  
  // Verificar política de privacidad
  const privacyPolicyPath = path.join(__dirname, '../src/pages/privacy-policy.tsx')
  if (fs.existsSync(privacyPolicyPath)) {
    console.log('✅ Página de política de privacidad presente')
    auditResults.privacy.passed++
  } else {
    console.log('❌ FALTA: Página de política de privacidad')
    auditResults.privacy.failed++
  }
}

// ⚖️ 4. AUDITORÍA DE CUMPLIMIENTO NORMATIVO
console.log('\n⚖️ === AUDITORÍA DE CUMPLIMIENTO NORMATIVO ===')

function checkCompliance() {
  console.log('\n📋 Revisando cumplimiento GDPR y normativas...')
  
  // GDPR Art. 13 - Información transparente
  const legalPagesRequired = [
    'privacy-policy.tsx',
    'legal-notice.tsx',
    'cookie-policy.tsx'
  ]
  
  legalPagesRequired.forEach(page => {
    const pagePath = path.join(__dirname, `../src/pages/${page}`)
    if (fs.existsSync(pagePath)) {
      console.log(`✅ ${page.replace('.tsx', '')} presente`)
      auditResults.compliance.passed++
    } else {
      console.log(`❌ FALTA: ${page.replace('.tsx', '')} requerida para GDPR`)
      auditResults.compliance.failed++
    }
  })
  
  // Verificar banner de cookies
  const cookieBannerPath = path.join(__dirname, '../src/components/CookieBanner.tsx')
  if (fs.existsSync(cookieBannerPath)) {
    console.log('✅ Banner de consentimiento de cookies presente')
    auditResults.compliance.passed++
  } else {
    console.log('❌ FALTA: Banner de consentimiento de cookies requerido para GDPR')
    auditResults.compliance.failed++
  }
  
  // Verificar contact/DPO info
  const contactPath = path.join(__dirname, '../src/pages/contact.tsx')
  if (fs.existsSync(contactPath)) {
    console.log('✅ Página de contacto presente')
    auditResults.compliance.passed++
  } else {
    console.log('⚠️ ADVERTENCIA: Página de contacto recomendada')
    auditResults.compliance.warnings++
  }
}

// 🎯 EJECUTAR AUDITORÍA
checkSEO()
checkSecurity()
checkPrivacy()
checkCompliance()

// 📊 RESUMEN FINAL
console.log('\n📊 === RESUMEN DE AUDITORÍA ===')
console.log(`
🎯 SEO:
   ✅ Aprobado: ${auditResults.seo.passed}
   ❌ Fallido: ${auditResults.seo.failed}
   ⚠️ Advertencias: ${auditResults.seo.warnings}

🛡️ SEGURIDAD:
   ✅ Aprobado: ${auditResults.security.passed}
   ❌ Fallido: ${auditResults.security.failed}
   ⚠️ Advertencias: ${auditResults.security.warnings}

🔐 PRIVACIDAD:
   ✅ Aprobado: ${auditResults.privacy.passed}
   ❌ Fallido: ${auditResults.privacy.failed}
   ⚠️ Advertencias: ${auditResults.privacy.warnings}

⚖️ CUMPLIMIENTO:
   ✅ Aprobado: ${auditResults.compliance.passed}
   ❌ Fallido: ${auditResults.compliance.failed}
   ⚠️ Advertencias: ${auditResults.compliance.warnings}
`)

// 🚀 RECOMENDACIONES
const totalFailed = auditResults.seo.failed + auditResults.security.failed + 
                   auditResults.privacy.failed + auditResults.compliance.failed

console.log('\n🚀 === RECOMENDACIONES PRIORITARIAS ===')

if (totalFailed === 0) {
  console.log('🎉 ¡EXCELENTE! El sitio cumple con todos los requisitos auditados.')
} else {
  console.log('🔧 Se requieren las siguientes implementaciones:')
  console.log('   1. Crear páginas legales (privacidad, cookies, aviso legal)')
  console.log('   2. Implementar banner de consentimiento GDPR')
  console.log('   3. Verificar configuración de analytics compliance')
  console.log('   4. Completar configuración de seguridad')
}

console.log('\n✅ Auditoría completada!')

module.exports = { auditResults, auditConfig } 
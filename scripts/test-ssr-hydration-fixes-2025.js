#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 🎯 **VALIDADOR COMPLETO DE PROTECCIONES SSR ANTI-HIDRATACIÓN**
// Verifica que todos los componentes estén protegidos contra errores de hidratación

console.log('🔒 Iniciando validación de protecciones SSR...\n')

const validationResults = {
  total: 0,
  passed: 0,
  failed: 0,
  details: []
}

// 📁 Archivos a validar
const componentsToValidate = [
  {
    file: 'src/utils/theme-context-2025.tsx',
    name: 'ThemeProvider2025',
    requiredPatterns: [
      { pattern: /const \[isClient, setIsClient\] = useState\(false\)/, description: 'Estado isClient inicializado' },
      { pattern: /useEffect\(\(\) => \{\s*setIsClient\(true\)/, description: 'useEffect para detectar hydration' },
      { pattern: /if \(!isClient\) return/, description: 'Guards de protección isClient' },
      { pattern: /isClient: boolean/, description: 'isClient en interface de contexto' }
    ]
  },
  {
    file: 'src/components/CustomCursor.tsx',
    name: 'CustomCursor',
    requiredPatterns: [
      { pattern: /const \[isClient, setIsClient\] = useState\(false\)/, description: 'Estado isClient inicializado' },
      { pattern: /useEffect\(\(\) => \{\s*setIsClient\(true\)/, description: 'useEffect para detectar hydration' },
      { pattern: /if \(!isClient \|\| isTouchDevice\(\)\) \{\s*return null/, description: 'Return null durante SSR' },
      { pattern: /if \(!isClient.*return/, description: 'Guards de protección en useEffect' }
    ]
  },
  {
    file: 'src/components/CookieBanner.tsx',
    name: 'CookieBanner',
    requiredPatterns: [
      { pattern: /const { theme, designSystem, isClient } = useTheme2025\(\)/, description: 'Uso de isClient del contexto' },
      { pattern: /if \(!isClient\) return/, description: 'Guards de protección isClient' },
      { pattern: /const CookieBannerPlaceholder.*= \(\) => null/, description: 'Placeholder para SSR' },
      { pattern: /return <CookieBannerPlaceholder \/>/, description: 'Return de placeholder durante SSR' }
    ]
  },
  {
    file: 'src/components/layout-2025.tsx',
    name: 'Layout2025',
    requiredPatterns: [
      { pattern: /const { theme, designSystem, isDark, toggleTheme, isClient } = useTheme2025\(\)/, description: 'Uso de isClient del contexto' },
      { pattern: /if \(!isClient\) return/, description: 'Guards de protección en scroll handler' },
      { pattern: /\}, \[isClient\]\)/, description: 'Dependencia isClient en useEffect' }
    ]
  }
]

// 🔍 Función para validar archivo
function validateFile(fileConfig) {
  const filePath = path.join(__dirname, '..', fileConfig.file)
  
  if (!fs.existsSync(filePath)) {
    return {
      file: fileConfig.file,
      name: fileConfig.name,
      status: 'FAILED',
      reason: 'Archivo no encontrado',
      patterns: []
    }
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const patternResults = []

  fileConfig.requiredPatterns.forEach(patternConfig => {
    const found = patternConfig.pattern.test(content)
    patternResults.push({
      description: patternConfig.description,
      found,
      pattern: patternConfig.pattern.toString()
    })
  })

  const allPatternsFound = patternResults.every(p => p.found)

  return {
    file: fileConfig.file,
    name: fileConfig.name,
    status: allPatternsFound ? 'PASSED' : 'FAILED',
    patterns: patternResults,
    score: `${patternResults.filter(p => p.found).length}/${patternResults.length}`
  }
}

// 🎯 Ejecutar validaciones
console.log('📋 Validando protecciones SSR en componentes:\n')

componentsToValidate.forEach(config => {
  validationResults.total++
  const result = validateFile(config)
  validationResults.details.push(result)
  
  if (result.status === 'PASSED') {
    validationResults.passed++
    console.log(`✅ ${result.name} (${result.score})`)
  } else {
    validationResults.failed++
    console.log(`❌ ${result.name} (${result.score})`)
  }
  
  // Mostrar detalles de patrones fallidos
  if (result.status === 'FAILED') {
    result.patterns.forEach(pattern => {
      if (!pattern.found) {
        console.log(`   ⚠️  Falta: ${pattern.description}`)
      }
    })
  }
})

console.log('\n' + '='.repeat(60))
console.log('📊 RESUMEN DE VALIDACIÓN SSR')
console.log('='.repeat(60))

console.log(`\n🎯 Componentes validados: ${validationResults.total}`)
console.log(`✅ Protecciones correctas: ${validationResults.passed}`)
console.log(`❌ Protecciones faltantes: ${validationResults.failed}`)

const successRate = ((validationResults.passed / validationResults.total) * 100).toFixed(1)
console.log(`📈 Tasa de éxito: ${successRate}%`)

// 🎨 Status final con color
if (validationResults.failed === 0) {
  console.log('\n🟢 ESTADO: TODAS LAS PROTECCIONES SSR IMPLEMENTADAS CORRECTAMENTE')
  console.log('🎉 El sistema está protegido contra errores de hidratación')
} else {
  console.log('\n🟡 ESTADO: ALGUNAS PROTECCIONES SSR NECESITAN ATENCIÓN')
  console.log('⚠️  Implementa las protecciones faltantes para evitar errores de hidratación')
}

// 📋 Verificaciones adicionales de buenas prácticas
console.log('\n📋 VERIFICACIONES ADICIONALES:')

// Verificar que no hay localStorage/window sin protección
const antiPatterns = [
  {
    pattern: /localStorage\./,
    file: 'src',
    description: 'Uso directo de localStorage sin protección isClient',
    severity: 'HIGH'
  },
  {
    pattern: /window\./,
    file: 'src', 
    description: 'Uso directo de window sin protección isClient',
    severity: 'HIGH'
  },
  {
    pattern: /document\./,
    file: 'src',
    description: 'Uso directo de document sin protección isClient', 
    severity: 'MEDIUM'
  }
]

let additionalIssues = 0

// Función para buscar archivos recursivamente
function searchInDirectory(dir, pattern, description) {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  let issueCount = 0
  
  items.forEach(item => {
    const fullPath = path.join(dir, item.name)
    
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      issueCount += searchInDirectory(fullPath, pattern, description)
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8')
        const matches = content.match(pattern)
        
        if (matches) {
          // Verificar si tiene protecciones
          const hasIsClientCheck = /if \(!isClient\)/.test(content) || 
                                 /typeof window !== 'undefined'/.test(content) ||
                                 /useEffect\(\(\) => \{/.test(content)
          
          if (!hasIsClientCheck) {
            console.log(`   ⚠️  ${path.relative(process.cwd(), fullPath)}: ${description}`)
            issueCount++
          }
        }
      } catch (e) {
        // Ignorar errores de lectura
      }
    }
  })
  
  return issueCount
}

antiPatterns.forEach(antiPattern => {
  const srcPath = path.join(__dirname, '..', antiPattern.file)
  const issues = searchInDirectory(srcPath, antiPattern.pattern, antiPattern.description)
  additionalIssues += issues
})

if (additionalIssues === 0) {
  console.log('✅ No se encontraron usos no protegidos de APIs del navegador')
} else {
  console.log(`⚠️  Se encontraron ${additionalIssues} usos potencialmente no protegidos`)
}

// 🎯 Recomendaciones finales
console.log('\n💡 RECOMENDACIONES PARA EVITAR ERRORES DE HIDRATACIÓN:')
console.log('   1. ✅ Usar isClient de useTheme2025() en todos los componentes')
console.log('   2. ✅ Proteger APIs del navegador con if (!isClient) return')
console.log('   3. ✅ Renderizar placeholders durante SSR cuando sea necesario')
console.log('   4. ✅ Mover useEffect dependientes del navegador después de hydration')
console.log('   5. ✅ Usar el mismo HTML inicial en servidor y cliente')

console.log('\n🔗 Links útiles:')
console.log('   • Gatsby SSR API: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/')
console.log('   • React Hydration: https://react.dev/reference/react-dom/client/hydrateRoot')

// Export para uso programático
if (require.main === module) {
  process.exit(validationResults.failed > 0 ? 1 : 0)
} else {
  module.exports = { validationResults, componentsToValidate }
} 
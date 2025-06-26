/**
 * 🧹 SCRIPT DE LIMPIEZA Y OPTIMIZACIÓN 2025
 * 
 * Identifica y reporta:
 * - Archivos redundantes/duplicados
 * - Código obsoleto
 * - Dependencias no utilizadas
 * - Imports innecesarios
 * - Archivos temporales
 * - Configuraciones obsoletas
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 === AUDITORÍA DE LIMPIEZA Y OPTIMIZACIÓN 2025 ===\n')

const cleanupResults = {
  redundantFiles: [],
  obsoleteCode: [],
  unusedDependencies: [],
  unnecessaryImports: [],
  temporaryFiles: [],
  duplicateStyles: [],
  optimizationOpportunities: []
}

// 🔍 1. BUSCAR ARCHIVOS REDUNDANTES Y DUPLICADOS
console.log('📂 === BÚSQUEDA DE ARCHIVOS REDUNDANTES ===\n')

function scanForRedundantFiles() {
  const srcPath = path.join(__dirname, '../src')
  const redundantPatterns = [
    // Archivos de respaldo
    /\.backup$/,
    /\.bak$/,
    /\.old$/,
    /\.orig$/,
    
    // Archivos temporales
    /\.tmp$/,
    /\.temp$/,
    /~$/,
    
    // Archivos de editor
    /\.swp$/,
    /\.swo$/,
    /#.*#$/,
    
    // Duplicados obvios
    /-copy\./,
    /-backup\./,
    /-old\./,
    
    // Archivos de desarrollo
    /\.test\.skip/,
    /\.component\.backup/
  ]
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Ignorar node_modules y .git
        if (!['node_modules', '.git', 'public', '.cache'].includes(file)) {
          scanDirectory(fullPath)
        }
      } else {
        // Verificar patrones redundantes
        redundantPatterns.forEach(pattern => {
          if (pattern.test(file)) {
            cleanupResults.redundantFiles.push({
              file: fullPath.replace(__dirname + '/../', ''),
              reason: 'Archivo temporal/backup',
              pattern: pattern.toString()
            })
          }
        })
        
        // Buscar duplicados por nombre similar
        if (file.includes('-2.') || file.includes('_copy.') || file.includes('copy-')) {
          cleanupResults.redundantFiles.push({
            file: fullPath.replace(__dirname + '/../', ''),
            reason: 'Posible duplicado por nombre',
            pattern: 'duplicate-name'
          })
        }
      }
    })
  }
  
  scanDirectory(srcPath)
  
  // También revisar root
  const rootFiles = fs.readdirSync(__dirname + '/../')
  rootFiles.forEach(file => {
    if (redundantPatterns.some(pattern => pattern.test(file))) {
      cleanupResults.redundantFiles.push({
        file,
        reason: 'Archivo temporal en root',
        pattern: 'root-temp'
      })
    }
  })
}

// 🔍 2. BUSCAR CÓDIGO OBSOLETO
console.log('🗑️ === BÚSQUEDA DE CÓDIGO OBSOLETO ===\n')

function scanForObsoleteCode() {
  const srcPath = path.join(__dirname, '../src')
  
  const obsoletePatterns = [
    // React obsoleto
    { pattern: /React\.FC</g, reason: 'React.FC es redundante en TypeScript moderno' },
    { pattern: /import \* as React from ['"]react['"]/g, reason: 'Import de React puede ser optimizado' },
    { pattern: /React\.Component/g, reason: 'Class components obsoletos' },
    
    // Styled-components obsoleto
    { pattern: /styled\(.*\)\.attrs/g, reason: 'styled.attrs puede optimizarse' },
    { pattern: /withTheme/g, reason: 'withTheme es obsoleto, usar useTheme' },
    
    // CSS obsoleto
    { pattern: /-webkit-transform/g, reason: 'Prefijos webkit innecesarios' },
    { pattern: /-moz-/g, reason: 'Prefijos mozilla innecesarios' },
    { pattern: /-ms-/g, reason: 'Prefijos IE innecesarios' },
    
    // Console.log en producción
    { pattern: /console\.log\(/g, reason: 'Console.log debe removerse en producción' },
    { pattern: /console\.warn\(/g, reason: 'Console.warn debe revisarse' },
    { pattern: /debugger;/g, reason: 'Debugger debe removerse' },
    
    // TODO/FIXME
    { pattern: /\/\/ TODO/g, reason: 'TODO pendiente' },
    { pattern: /\/\/ FIXME/g, reason: 'FIXME pendiente' },
    { pattern: /\/\/ HACK/g, reason: 'HACK debe ser refactorizado' },
    
    // Imports innecesarios
    { pattern: /import.*unused/g, reason: 'Import marcado como unused' },
  ]
  
  function scanFileForObsoleteCode(filePath) {
    if (!fs.existsSync(filePath)) return
    
    const ext = path.extname(filePath)
    if (!['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'].includes(ext)) return
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    obsoletePatterns.forEach(({ pattern, reason }) => {
      const matches = content.match(pattern)
      if (matches) {
        cleanupResults.obsoleteCode.push({
          file: filePath.replace(__dirname + '/../', ''),
          reason,
          occurrences: matches.length,
          pattern: pattern.toString()
        })
      }
    })
  }
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'public', '.cache'].includes(file)) {
          scanDirectory(fullPath)
        }
      } else {
        scanFileForObsoleteCode(fullPath)
      }
    })
  }
  
  scanDirectory(srcPath)
}

// 🔍 3. BUSCAR DEPENDENCIAS NO UTILIZADAS
console.log('📦 === BÚSQUEDA DE DEPENDENCIAS NO UTILIZADAS ===\n')

function scanForUnusedDependencies() {
  const packagePath = path.join(__dirname, '../package.json')
  if (!fs.existsSync(packagePath)) return
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
  
  const srcPath = path.join(__dirname, '../src')
  const configFiles = [
    path.join(__dirname, '../gatsby-config.js'),
    path.join(__dirname, '../gatsby-browser.js'),
    path.join(__dirname, '../gatsby-node.js'),
    path.join(__dirname, '../gatsby-ssr.js')
  ]
  
  // Obtener todo el código fuente
  let allSourceCode = ''
  
  function readAllFiles(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'public', '.cache'].includes(file)) {
          readAllFiles(fullPath)
        }
      } else {
        const ext = path.extname(file)
        if (['.tsx', '.ts', '.js', '.jsx'].includes(ext)) {
          allSourceCode += fs.readFileSync(fullPath, 'utf8') + '\n'
        }
      }
    })
  }
  
  readAllFiles(srcPath)
  
  // Leer archivos de configuración
  configFiles.forEach(configFile => {
    if (fs.existsSync(configFile)) {
      allSourceCode += fs.readFileSync(configFile, 'utf8') + '\n'
    }
  })
  
  // Verificar cada dependencia
  Object.keys(dependencies).forEach(dep => {
    // Patrones de búsqueda para la dependencia
    const patterns = [
      new RegExp(`import.*from.*['"]${dep}['"]`, 'g'),
      new RegExp(`import.*['"]${dep}['"]`, 'g'),
      new RegExp(`require\\(['"]${dep}['"]\\)`, 'g'),
      new RegExp(`'${dep}'`, 'g'),
      new RegExp(`"${dep}"`, 'g'),
      new RegExp(dep.replace(/-/g, ''), 'gi') // Sin guiones para algunos casos
    ]
    
    const isUsed = patterns.some(pattern => pattern.test(allSourceCode))
    
    if (!isUsed) {
      // Excepciones conocidas (dependencias que no aparecen directamente en código)
      const exceptions = [
        'gatsby',
        'gatsby-cli',
        '@types/',
        'eslint',
        'prettier',
        'typescript',
        'webpack',
        'babel'
      ]
      
      const isException = exceptions.some(exc => dep.includes(exc))
      
      if (!isException) {
        cleanupResults.unusedDependencies.push({
          dependency: dep,
          version: dependencies[dep],
          reason: 'No encontrado en código fuente'
        })
      }
    }
  })
}

// 🔍 4. BUSCAR IMPORTS INNECESARIOS
console.log('📥 === BÚSQUEDA DE IMPORTS INNECESARIOS ===\n')

function scanForUnnecessaryImports() {
  const srcPath = path.join(__dirname, '../src')
  
  function scanFileForImports(filePath) {
    if (!fs.existsSync(filePath)) return
    
    const ext = path.extname(filePath)
    if (!['.tsx', '.ts', '.js', '.jsx'].includes(ext)) return
    
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    
    // Buscar imports
    const imports = []
    const importRegex = /import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/g
    
    let match
    while ((match = importRegex.exec(content)) !== null) {
      const [fullMatch, namedImports, namespaceImport, defaultImport, moduleName] = match
      
      if (namedImports) {
        // Imports nombrados
        const names = namedImports.split(',').map(name => name.trim())
        names.forEach(name => {
          const isUsed = new RegExp(`\\b${name}\\b`).test(content.replace(fullMatch, ''))
          if (!isUsed) {
            cleanupResults.unnecessaryImports.push({
              file: filePath.replace(__dirname + '/../', ''),
              import: name,
              module: moduleName,
              type: 'named',
              line: fullMatch
            })
          }
        })
      }
      
      if (defaultImport) {
        const isUsed = new RegExp(`\\b${defaultImport}\\b`).test(content.replace(fullMatch, ''))
        if (!isUsed) {
          cleanupResults.unnecessaryImports.push({
            file: filePath.replace(__dirname + '/../', ''),
            import: defaultImport,
            module: moduleName,
            type: 'default',
            line: fullMatch
          })
        }
      }
      
      if (namespaceImport) {
        const isUsed = new RegExp(`\\b${namespaceImport}\\b`).test(content.replace(fullMatch, ''))
        if (!isUsed) {
          cleanupResults.unnecessaryImports.push({
            file: filePath.replace(__dirname + '/../', ''),
            import: namespaceImport,
            module: moduleName,
            type: 'namespace',
            line: fullMatch
          })
        }
      }
    }
  }
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'public', '.cache'].includes(file)) {
          scanDirectory(fullPath)
        }
      } else {
        scanFileForImports(fullPath)
      }
    })
  }
  
  scanDirectory(srcPath)
}

// 🔍 5. BUSCAR ESTILOS DUPLICADOS
console.log('🎨 === BÚSQUEDA DE ESTILOS DUPLICADOS ===\n')

function scanForDuplicateStyles() {
  const srcPath = path.join(__dirname, '../src')
  const stylePatterns = []
  
  function extractStyles(filePath) {
    if (!fs.existsSync(filePath)) return
    
    const ext = path.extname(filePath)
    if (!['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'].includes(ext)) return
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Buscar styled-components
    const styledRegex = /const\s+(\w+)\s*=\s*styled[.\w]*`([^`]+)`/g
    let match
    while ((match = styledRegex.exec(content)) !== null) {
      const [fullMatch, componentName, styles] = match
      stylePatterns.push({
        file: filePath.replace(__dirname + '/../', ''),
        component: componentName,
        styles: styles.trim(),
        type: 'styled-component'
      })
    }
    
    // Buscar CSS regular
    const cssRules = content.match(/\.[a-zA-Z-]+\s*\{[^}]+\}/g)
    if (cssRules) {
      cssRules.forEach(rule => {
        stylePatterns.push({
          file: filePath.replace(__dirname + '/../', ''),
          component: 'css-rule',
          styles: rule.trim(),
          type: 'css'
        })
      })
    }
  }
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'public', '.cache'].includes(file)) {
          scanDirectory(fullPath)
        }
      } else {
        extractStyles(fullPath)
      }
    })
  }
  
  scanDirectory(srcPath)
  
  // Buscar duplicados
  const styleMap = new Map()
  stylePatterns.forEach(pattern => {
    const key = pattern.styles
    if (styleMap.has(key)) {
      cleanupResults.duplicateStyles.push({
        styles: key,
        files: [styleMap.get(key).file, pattern.file],
        components: [styleMap.get(key).component, pattern.component]
      })
    } else {
      styleMap.set(key, pattern)
    }
  })
}

// 🔍 6. IDENTIFICAR OPORTUNIDADES DE OPTIMIZACIÓN
console.log('⚡ === OPORTUNIDADES DE OPTIMIZACIÓN ===\n')

function identifyOptimizationOpportunities() {
  const srcPath = path.join(__dirname, '../src')
  
  // Verificar estructura de archivos
  const pages = path.join(srcPath, 'pages')
  const components = path.join(srcPath, 'components')
  const utils = path.join(srcPath, 'utils')
  const styles = path.join(srcPath, 'styles')
  
  // 1. Verificar si hay páginas que podrían ser componentes
  if (fs.existsSync(pages)) {
    const pageFiles = fs.readdirSync(pages)
    pageFiles.forEach(file => {
      if (file.includes('404') || file.includes('index')) return
      
      const filePath = path.join(pages, file)
      const content = fs.readFileSync(filePath, 'utf8')
      
      // Si la página es muy pequeña, podría ser un componente
      if (content.split('\n').length < 50) {
        cleanupResults.optimizationOpportunities.push({
          type: 'small-page',
          file: `pages/${file}`,
          suggestion: 'Página pequeña que podría ser un componente reutilizable'
        })
      }
    })
  }
  
  // 2. Verificar archivos CSS grandes
  function checkLargeFiles(dir, type) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isFile()) {
        const sizeKB = stat.size / 1024
        if (sizeKB > 100) { // Archivos > 100KB
          cleanupResults.optimizationOpportunities.push({
            type: 'large-file',
            file: fullPath.replace(__dirname + '/../', ''),
            size: `${sizeKB.toFixed(1)}KB`,
            suggestion: `Archivo ${type} grande que podría dividirse`
          })
        }
      }
    })
  }
  
  checkLargeFiles(components, 'component')
  checkLargeFiles(styles, 'style')
  
  // 3. Buscar componentes con muchas props
  function checkComplexComponents(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        checkComplexComponents(fullPath)
      } else if (['.tsx', '.ts'].includes(path.extname(file))) {
        const content = fs.readFileSync(fullPath, 'utf8')
        
        // Contar props en interfaces
        const interfaceRegex = /interface\s+\w+Props\s*\{([^}]+)\}/g
        let match
        while ((match = interfaceRegex.exec(content)) !== null) {
          const props = match[1].split(';').filter(prop => prop.trim().length > 0)
          if (props.length > 10) {
            cleanupResults.optimizationOpportunities.push({
              type: 'complex-component',
              file: fullPath.replace(__dirname + '/../', ''),
              propsCount: props.length,
              suggestion: 'Componente con muchas props que podría dividirse'
            })
          }
        }
      }
    })
  }
  
  checkComplexComponents(components)
}

// 🚀 EJECUTAR TODAS LAS AUDITORÍAS
async function runCompleteCleanup() {
  console.log('🔍 Escaneando archivos redundantes...')
  scanForRedundantFiles()
  
  console.log('🔍 Buscando código obsoleto...')
  scanForObsoleteCode()
  
  console.log('🔍 Analizando dependencias...')
  scanForUnusedDependencies()
  
  console.log('🔍 Revisando imports...')
  scanForUnnecessaryImports()
  
  console.log('🔍 Buscando estilos duplicados...')
  scanForDuplicateStyles()
  
  console.log('🔍 Identificando optimizaciones...')
  identifyOptimizationOpportunities()
  
  // MOSTRAR RESULTADOS
  console.log('\n📊 === RESUMEN DE LIMPIEZA ===\n')
  
  if (cleanupResults.redundantFiles.length > 0) {
    console.log(`🗑️ ARCHIVOS REDUNDANTES (${cleanupResults.redundantFiles.length}):`)
    cleanupResults.redundantFiles.forEach(item => {
      console.log(`   ❌ ${item.file} - ${item.reason}`)
    })
    console.log()
  }
  
  if (cleanupResults.obsoleteCode.length > 0) {
    console.log(`📜 CÓDIGO OBSOLETO (${cleanupResults.obsoleteCode.length}):`)
    cleanupResults.obsoleteCode.slice(0, 10).forEach(item => {
      console.log(`   ⚠️ ${item.file} - ${item.reason} (${item.occurrences} ocurrencias)`)
    })
    if (cleanupResults.obsoleteCode.length > 10) {
      console.log(`   ... y ${cleanupResults.obsoleteCode.length - 10} más`)
    }
    console.log()
  }
  
  if (cleanupResults.unusedDependencies.length > 0) {
    console.log(`📦 DEPENDENCIAS NO UTILIZADAS (${cleanupResults.unusedDependencies.length}):`)
    cleanupResults.unusedDependencies.forEach(item => {
      console.log(`   📦 ${item.dependency}@${item.version} - ${item.reason}`)
    })
    console.log()
  }
  
  if (cleanupResults.unnecessaryImports.length > 0) {
    console.log(`📥 IMPORTS INNECESARIOS (${cleanupResults.unnecessaryImports.length}):`)
    cleanupResults.unnecessaryImports.slice(0, 10).forEach(item => {
      console.log(`   🔗 ${item.file} - ${item.import} de ${item.module}`)
    })
    if (cleanupResults.unnecessaryImports.length > 10) {
      console.log(`   ... y ${cleanupResults.unnecessaryImports.length - 10} más`)
    }
    console.log()
  }
  
  if (cleanupResults.duplicateStyles.length > 0) {
    console.log(`🎨 ESTILOS DUPLICADOS (${cleanupResults.duplicateStyles.length}):`)
    cleanupResults.duplicateStyles.forEach(item => {
      console.log(`   🎨 Duplicado en: ${item.files.join(' y ')}`)
    })
    console.log()
  }
  
  if (cleanupResults.optimizationOpportunities.length > 0) {
    console.log(`⚡ OPORTUNIDADES DE OPTIMIZACIÓN (${cleanupResults.optimizationOpportunities.length}):`)
    cleanupResults.optimizationOpportunities.forEach(item => {
      console.log(`   💡 ${item.file} - ${item.suggestion}`)
    })
    console.log()
  }
  
  const totalIssues = Object.values(cleanupResults).reduce((sum, arr) => sum + arr.length, 0)
  
  if (totalIssues === 0) {
    console.log('🎉 ¡EXCELENTE! El proyecto está limpio y optimizado.')
  } else {
    console.log(`📊 Total de elementos encontrados: ${totalIssues}`)
    console.log('\n🚀 Proceder con limpieza automática...')
  }
}

// Ejecutar auditoría
runCompleteCleanup().catch(console.error) 
/**
 * Script para corregir propiedades de typography que no existen
 */

const fs = require('fs')
const path = require('path')

const indexPath = path.join(__dirname, '..', 'src/pages/index.tsx')

console.log('🔧 Corrigiendo propiedades de typography...')

let content = fs.readFileSync(indexPath, 'utf8')

// Reemplazar letterSpacing
content = content.replace(/letterSpacing: designSystem\.typography\.letterSpacing\.wide/g, 'letterSpacing: "0.1em"')

// Reemplazar lineHeight
content = content.replace(/lineHeight: designSystem\.typography\.lineHeight\.relaxed/g, 'lineHeight: "1.6"')

fs.writeFileSync(indexPath, content, 'utf8')

console.log('✅ Propiedades de typography corregidas!') 
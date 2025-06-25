#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

// 🎨 Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 🚀 Función para ejecutar comandos con logs bonitos
function runCommand(command, description) {
  console.log(`${colors.cyan}${colors.bright}⚡ ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`${colors.green}✅ ${description} completado${colors.reset}`);
    return output;
  } catch (error) {
    console.error(`${colors.red}❌ Error en ${description}:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// 🎯 Función principal
async function deployAll() {
  console.log(`${colors.magenta}${colors.bright}
╔═══════════════════════════════════════════╗
║     🚀 DEPLOY AUTOMATIZADO COMPLETO      ║
║   GitHub + Netlify en un solo comando     ║
╚═══════════════════════════════════════════╝${colors.reset}\n`);

  // 📝 Obtener mensaje de commit personalizado
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const commitMessage = await new Promise((resolve) => {
    rl.question(`${colors.yellow}💬 Mensaje de commit (Enter para usar automático): ${colors.reset}`, (answer) => {
      rl.close();
      resolve(answer.trim() || `🚀 AUTO DEPLOY: ${new Date().toLocaleString('es-ES')}`);
    });
  });

  console.log(`\n${colors.blue}📊 Verificando estado del repositorio...${colors.reset}`);
  
  // 🔍 Verificar si hay cambios
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (!status.trim()) {
      console.log(`${colors.yellow}ℹ️  No hay cambios para commitear${colors.reset}`);
      console.log(`${colors.cyan}🚀 Procediendo solo con deploy...${colors.reset}\n`);
    } else {
      console.log(`${colors.green}📝 Cambios detectados:${colors.reset}`);
      console.log(status);
      
      // 🏷️ Git add, commit y push
      runCommand('git add .', 'Agregando archivos al staging');
      runCommand(`git commit -m "${commitMessage}"`, 'Creando commit');
      runCommand('git push origin master', 'Subiendo cambios a GitHub');
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Verificando estado del repo...${colors.reset}`);
  }

  // 🔨 Build y Deploy
  runCommand('npm run build', 'Building el proyecto');
  runCommand('npx netlify deploy --prod --dir=public', 'Deployando a Netlify');

  // 🎉 Éxito
  console.log(`${colors.green}${colors.bright}
╔═════════════════════════════════════════════╗
║            ✅ DEPLOY COMPLETADO            ║
║                                             ║
║  🌐 Sitio: https://miquelxarau.netlify.app  ║
║  📊 GitHub: Sincronizado                    ║
║  🚀 Netlify: Actualizado                    ║
╚═════════════════════════════════════════════╝${colors.reset}`);
}

// 🎬 Ejecutar
deployAll().catch(console.error); 
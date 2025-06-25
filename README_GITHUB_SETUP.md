# 📋 Configuración de Repositorios de GitHub

## ⚠️ IMPORTANTE: Datos Ficticios Eliminados

Se han eliminado todos los repositorios ficticios del portfolio. Ahora necesitas agregar tus repositorios reales.

## 🚀 Opciones para Agregar Datos Reales

### Opción 1: Actualización Automática (Recomendada)

1. **Edita el script de actualización:**
   ```bash
   # Abre el archivo scripts/update-github-data.js
   # Cambia 'TU_USUARIO_GITHUB' por tu username real de GitHub
   ```

2. **Ejecuta el script:**
   ```bash
   node scripts/update-github-data.js
   ```

3. **El script automáticamente:**
   - Obtiene tus repositorios públicos de GitHub
   - Los filtra (sin forks ni privados)
   - Actualiza el archivo `src/utils/github-service.ts`

### Opción 2: Configuración Manual

1. **Abre el archivo:** `src/utils/github-service.ts`

2. **Reemplaza el array vacío** `GITHUB_REPOSITORIES` con tus datos:

```typescript
export const GITHUB_REPOSITORIES: GitHubRepo[] = [
  {
    id: 123456789, // ID real del repo de GitHub
    name: 'mi-proyecto-real',
    description: 'Descripción real de mi proyecto',
    html_url: 'https://github.com/mi-usuario/mi-proyecto-real',
    homepage: 'https://mi-sitio.com', // o null
    language: 'TypeScript',
    topics: ['react', 'typescript', 'web'],
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    full_name: 'mi-usuario/mi-proyecto-real',
    visibility: 'public',
    default_branch: 'main',
    pushed_at: '2024-01-01T00:00:00Z',
    size: 1024
  }
  // Agrega más repositorios aquí...
]
```

## 📄 Obtener Información de Repositorios

Para obtener la información exacta de tus repositorios:

1. **Ve a GitHub API:** `https://api.github.com/users/TU_USUARIO/repos`
2. **Copia la información** que necesites
3. **Pégala en el formato** mostrado arriba

## 🎯 Estado Actual

- ✅ **Estructura preparada** para datos reales
- ✅ **Script de actualización** configurado
- ✅ **Componentes actualizados** para mostrar datos reales
- ⚠️ **Array vacío** esperando tus repositorios reales

## 🔄 Después de Configurar

Una vez agregues tus repositorios reales:

1. **Página Lab** mostrará todos tus repositorios
2. **Carrusel Home** mostrará los 8 más recientes
3. **Estadísticas** se calcularán automáticamente
4. **Todo funcionará** con tus datos reales

## 🆘 ¿Necesitas Ayuda?

Si no tienes repositorios públicos o quieres probar:

1. Crea algunos repositorios públicos en GitHub
2. O agrega repos de prueba temporalmente
3. Luego actualiza con tus proyectos reales

---

**✨ Una vez configurado, elimina este archivo README_GITHUB_SETUP.md** 
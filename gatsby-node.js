// 🚀 GATSBY NODE OPTIMIZADO - Solucion arquitectural completa
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectTemplate = require.resolve('./src/templates/project.tsx')

  const result = await wrapper(
    graphql(`
      {
        projects: allProjectsYaml {
          edges {
            node {
              slug
              images
              title
            }
          }
        }
      }
    `)
  )

  result.data.projects.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: projectTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}

// 🎯 SOLUCIÓN DEFINITIVA - Procesamiento simplificado y eficiente
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const relativePath = node.relativePath
    let projectFolder = null
    
    // 🔍 Detectar carpeta de proyecto de manera consistente
    if (relativePath.includes('projects/')) {
      const pathParts = relativePath.split('/')
      const projectsIndex = pathParts.indexOf('projects')
      
      if (projectsIndex !== -1 && pathParts.length > projectsIndex + 1) {
        projectFolder = pathParts[projectsIndex + 1]
      }
    }
    
    if (projectFolder) {
      // 📁 Crear field de carpeta de proyecto
      createNodeField({
        node,
        name: 'projectFolder',
        value: projectFolder,
      })
      
      // 🖼️ Detectar imágenes (formatos optimizados para web)
      const imageExtensions = /\.(jpg|jpeg|png|gif|webp|avif)$/i
      createNodeField({
        node,
        name: 'isImage',
        value: imageExtensions.test(node.extension || ''),
      })
      
      // 🎥 Detectar videos (formatos web optimizados)
      const videoExtensions = /\.(mp4|webm|mov|m4v)$/i
      createNodeField({
        node,
        name: 'isVideo',
        value: videoExtensions.test(node.extension || ''),
      })
      
      // 📄 Detectar documentos
      const documentExtensions = /\.(pdf|doc|docx|ppt|pptx)$/i
      createNodeField({
        node,
        name: 'isDocument',
        value: documentExtensions.test(node.extension || ''),
      })
      
      // 🐛 Log de debug solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Archivo procesado: ${relativePath}`)
        console.log(`   📁 Proyecto: ${projectFolder}`)
        console.log(`   🔧 Extensión: ${node.extension}`)
        console.log(`   🖼️ Es imagen: ${imageExtensions.test(node.extension || '')}`)
      }
    }
  }
}
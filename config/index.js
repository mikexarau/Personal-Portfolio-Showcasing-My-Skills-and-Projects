// Definir 'global' y 'module' solo si no existen (para evitar errores en lint y entornos SSR)
if (typeof global === 'undefined') {
  var global = {};
}
if (typeof module === 'undefined') {
  var module = {};
}

// Corregir uso de 'module' no definido
global.module = global.module || {};

module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Miquel Xarau', // Navigation and Site Title
  siteTitleAlt: 'mxg - Ingeniería de Software', // Alternative Site title for SEO
  siteTitleShort: 'mxg', // short_name for manifest
  siteHeadline: 'Diseñador UX/UI, desarrollador FullStack, focalizado en IA y Ciberseguridad.', // Headline for schema.org JSONLD
  siteUrl: process.env.GATSBY_SITE_URL || 'https://mxglab.com', // Domain of your site. No trailing slash!
  siteLanguage: 'es', // Language Tag on <html> element
  siteLogo: '/logos/logo.png', // Used for SEO and manifest
  siteDescription: 'Miquel Xarau - Diseñador UX/UI, desarrollador FullStack, focalizado en IA y Ciberseguridad.',
  author: 'Miquel Xarau', // Author for schema.org JSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@mxg', // Twitter Username
  ogSiteName: 'mxg', // Facebook Site Name
  ogLanguage: 'en_US', // og:language
  
  // 🔒 SECURITY FIX: Usar variable de entorno para Google Analytics
  googleAnalyticsID: process.env.GATSBY_GOOGLE_ANALYTICS_ID || '',

  // Manifest and Progress color
  themeColor: '#4AD7D1',
  backgroundColor: '#001730',
}
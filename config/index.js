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
  siteUrl: 'https://mxglab.com', // Domain of your site. No trailing slash!
  siteLanguage: 'es', // Language Tag on <html> element
  siteLogo: '/logos/logo.png', // Used for SEO and manifest
  siteDescription: 'Miquel Xarau - Diseñador UX/UI, desarrollador FullStack, focalizado en IA y Ciberseguridad.',
  author: 'Miquel Xarau', // Author for schema.org JSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@mxg', // Twitter Username
  ogSiteName: 'mxg', // Facebook Site Name
  ogLanguage: 'en_US', // og:language
  googleAnalyticsID: 'UA-27005548-1',

  // Manifest and Progress color
  themeColor: '#4AD7D1',
  backgroundColor: '#001730',
}
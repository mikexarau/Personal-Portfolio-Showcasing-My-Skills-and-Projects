require('dotenv').config({
  path: `.env`,
});

const config = require('./config');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    pathPrefix,
    title: config.siteTitle,
    titleAlt: config.siteTitleAlt,
    link: config.siteLink,
    description: config.siteDescription,
    logo: config.siteLogo,
    headline: config.siteHeadline,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.userTwitter,
    facebook: config.ogSiteName,
  },
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        height: 3,
        prependToBody: false,
        color: '#0ea5e9',
        excludePaths: ['/'],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript', 
    'gatsby-transformer-sharp', 
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [config.googleAnalyticsID],
        gtagConfig: {
          optimize_id: process.env.GATSBY_GTM_OPTIMIZE_ID || 'GTM-KSMTTTB',
          anonymize_ip: true,
          cookie_expires: 0,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: ['/preview/**', '/do-not-track/me/too/', '/404/**', '/dev-404-page/**'],
          delayOnRouteUpdate: 0,
        },
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'config',
        path: `${__dirname}/config`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
          quality: 75,
          breakpoints: [480, 768, 1024, 1366, 1920],
          backgroundColor: 'transparent',
        },
        failOnError: false,
        base64Width: 20,
        forceBase64Format: 'webp',
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === 'MOZJPEG',
        stripMetadata: true, // Security: Remove EXIF data
        defaultQuality: 75,

      },
    },
    {
      resolve: 'gatsby-plugin-image',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
          quality: 70,
          breakpoints: [480, 768, 1024, 1366, 1920],
          backgroundColor: 'transparent',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        excludes: ['/dev-404-page/', '/404/', '/404.html', '/offline-plugin-app-shell-fallback/'],
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => config.siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map(page => ({ ...page }))
        },
        serialize: ({ path }) => ({
          url: path,
          changefreq: 'daily',
          priority: path === '/' ? 1.0 : 0.7,
        }),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        link: config.siteLink,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/favicon.png',
        icons: [
          {
            src: 'favicons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        cache_busting_mode: 'query',
        crossOrigin: 'use-credentials',
      },
    },
    // Deshabilitado por vulnerabilidades de seguridad en workbox-build
    // Se reactivará cuando se actualicen las dependencias
    // {
    //   resolve: 'gatsby-plugin-offline',
    //   options: {
    //     precachePages: [`/`, `/404/`],
    //     workboxConfig: {
    //       globPatterns: ['**/offline-plugin-app-shell-fallback/index.html']
    //     }
    //   }
    // },
    'gatsby-plugin-netlify',
  ],
};

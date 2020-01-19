var plugins = [{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"id":"GTM-WW95BD8","includeInDevelopment":false,"defaultDataLayer":{"type":"object","value":{"platform":"gatsby"}},"gtmAuth":"YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING","gtmPreview":"YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME","dataLayerName":"YOUR_DATA_LAYER_NAME"},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-27005548-1"},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Miquel Xarau","short_name":"mxg","description":"Miquel Xarau - Design and development portfolio","start_url":"/","background_color":"#001730","theme_color":"#4AD7D1","display":"standalone","icon":"src/favicon.png"},
    },{
      plugin: require('/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}

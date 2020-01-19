module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-page-progress/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-WW95BD8","includeInDevelopment":false,"defaultDataLayer":{"type":"object","value":{"platform":"gatsby"}},"gtmAuth":"YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING","gtmPreview":"YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME","dataLayerName":"YOUR_DATA_LAYER_NAME"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-27005548-1"},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Miquel Xarau","short_name":"mxg","description":"Miquel Xarau - Design and development portfolio","start_url":"/","background_color":"#001730","theme_color":"#4AD7D1","display":"standalone","icon":"src/favicon.png"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    }]

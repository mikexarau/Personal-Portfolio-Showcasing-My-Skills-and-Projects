const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-project-tsx": hot(preferDefault(require("/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/src/templates/project.tsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/.cache/dev-404-page.js"))),
  "component---src-pages-about-tsx": hot(preferDefault(require("/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/src/pages/about.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/Users/MX/Documents/Web/mxglab-gatsby-react/mxg-lab/src/pages/index.tsx")))
}


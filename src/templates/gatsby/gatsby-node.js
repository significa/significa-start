/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  if (config.resolve.plugins) {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
  } else {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
  }
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          replaceAttrValues: { '#000': 'currentColor' },
        },
      },
    ],
  })

  actions.replaceWebpackConfig(config)
}

/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
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

    return config
  },
  env: {
    STAGE: process.env.STAGE,
  },
}

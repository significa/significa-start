module.exports = {
  target: 'serverless',
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          'url-loader',
        ],
      }
    )

    return config
  },
}

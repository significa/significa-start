module.exports = {
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
            options: {
              replaceAttrValues: { '#000': 'currentColor' },
            },
          },
          'url-loader',
        ],
      }
    )

    return config
  },
}

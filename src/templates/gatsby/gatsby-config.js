module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: '{{= name }}',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@significa',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '{{= name }}',
        short_name: '{{= name }}',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'BUCKET_NAME',
        region: 'eu-west-1',
        protocol: 'https',
        hostname: 'DOMAIN.COM',
      },
    },
  ],
}

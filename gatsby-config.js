module.exports = {
  siteMetadata: {
    title: `MIME Types Database`,
    description: `A comprehensive database of MIME types.`,
    author: `@yourusername`,
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mime-types`,
        path: `${__dirname}/content/mime-types/`,
      },
    },
  ],
}

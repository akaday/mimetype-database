const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "mime-types" } }) {
        edges {
          node {
            childJson {
              type
              extensions
              compressible
              charset
            }
          }
        }
      }
    }
  `);

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `/mime-types/${node.childJson.type.replace('/', '-')}`,
      component: path.resolve(`./src/templates/mime-type.js`),
      context: {
        mimeType: node.childJson,
      },
    });
  });
};

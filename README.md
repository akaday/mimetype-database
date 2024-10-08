# mimetype-database
gatsby
That sounds like a fantastic project! Here's a basic outline to get you started with creating an open-source Gatsby-based project for a comprehensive MIME types database:

### Project Setup

1. **Prerequisites**:
   - Node.js (v18 or later)
   - Gatsby CLI

2. **Initialize the Project**:
   ```bash
   # Install Gatsby CLI if you haven't already
   npm install -g gatsby-cli

   # Create a new Gatsby project
   gatsby new mimetype-database
   cd mimetype-database
   ``` 
# npm audit report

axios  0.8.1 - 0.27.2
Severity: moderate
Axios Cross-Site Request Forgery Vulnerability - https://github.com/advisories/GHSA-wf5p-g6vw-rhxx
fix available via `npm audit fix --force`
Will install gatsby-transformer-json@2.11.0, which is a breaking change
node_modules/gatsby/node_modules/axios
  gatsby  0.0.2 - 0.4.3 || >=1.0.0-alpha.3
  Depends on vulnerable versions of axios
  Depends on vulnerable versions of babel-plugin-remove-graphql-queries
  Depends on vulnerable versions of body-parser
  Depends on vulnerable versions of cookie
  Depends on vulnerable versions of express
  Depends on vulnerable versions of gatsby-plugin-page-creator
  Depends on vulnerable versions of gatsby-plugin-typescript
  Depends on vulnerable versions of gatsby-plugin-utils
  Depends on vulnerable versions of path-to-regexp
  Depends on vulnerable versions of socket.io
  Depends on vulnerable versions of webpack-dev-middleware
  node_modules/gatsby
    babel-plugin-remove-graphql-queries  >=2.17.0-next.0
    Depends on vulnerable versions of gatsby
    node_modules/babel-plugin-remove-graphql-queries
    gatsby-plugin-page-creator  >=2.11.0-next.0
    Depends on vulnerable versions of gatsby
    Depends on vulnerable versions of gatsby-plugin-utils
    node_modules/gatsby-plugin-page-creator
    gatsby-plugin-typescript  >=2.13.0-next.0
    Depends on vulnerable versions of babel-plugin-remove-graphql-queries
    Depends on vulnerable versions of gatsby
    node_modules/gatsby-plugin-typescript
    gatsby-plugin-utils  0.2.27-qod.19 - 0.2.27-qod.21 || 0.2.31-query-modules-debug-missing-sq.23 || >=0.2.35
    Depends on vulnerable versions of gatsby
    node_modules/gatsby-plugin-utils
    gatsby-source-filesystem  >=2.12.0-next.0
    Depends on vulnerable versions of gatsby
    node_modules/gatsby-source-filesystem
    gatsby-transformer-json  >=2.12.0-next.0
    Depends on vulnerable versions of gatsby
    node_modules/gatsby-transformer-json

body-parser  <1.20.3
Severity: high
body-parser vulnerable to denial of service when url encoding is enabled - https://github.com/advisories/GHSA-qwcr-r2fm-qrc7
fix available via `npm audit fix --force`
Will install gatsby-transformer-json@2.11.0, which is a breaking change
node_modules/gatsby/node_modules/body-parser

cookie  <0.7.0
cookie accepts cookie name, path, and domain with out of bounds characters - https://github.com/advisories/GHSA-pxg6-pf52-xh8x
fix available via `npm audit fix --force`
Will install express@2.5.11, which is a breaking change
node_modules/cookie
node_modules/engine.io/node_modules/cookie
node_modules/gatsby/node_modules/cookie
  engine.io  >=1.8.0
  Depends on vulnerable versions of cookie
  node_modules/engine.io
    socket.io  >=1.6.0
    Depends on vulnerable versions of engine.io
    node_modules/socket.io
  express  >=3.0.0-alpha1
  Depends on vulnerable versions of cookie
  node_modules/express

path-to-regexp  <0.1.10
Severity: high
path-to-regexp outputs backtracking regular expressions - https://github.com/advisories/GHSA-9wv6-86v2-598j
fix available via `npm audit fix --force`
Will install gatsby-transformer-json@2.11.0, which is a breaking change
node_modules/gatsby/node_modules/path-to-regexp

uglify-js  <=2.5.0
Severity: critical
Regular Expression Denial of Service in uglify-js - https://github.com/advisories/GHSA-c9f4-xj24-8jqx
Incorrect Handling of Non-Boolean Comparisons During Minification in uglify-js - https://github.com/advisories/GHSA-34r7-q49f-h37c
fix available via `npm audit fix`
node_modules/uglify-js
  move  >=0.4.6
  Depends on vulnerable versions of uglify-js
  node_modules/move

webpack-dev-middleware  <=5.3.3
Severity: high
Path traversal in webpack-dev-middleware - https://github.com/advisories/GHSA-wr3j-pwj9-hqq6
fix available via `npm audit fix --force`
Will install gatsby-transformer-json@2.11.0, which is a breaking change
node_modules/webpack-dev-middleware

17 vulnerabilities (4 low, 7 moderate, 5 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force
PS C:\Users\akade\mimetype-database>

3. **Install Necessary Packages**:
   ```bash
   npm install gatsby-source-filesystem gatsby-transformer-json
   ```

4. **Project Structure**:
   - `src/`: Contains your React components and pages.
   - `content/`: Store your MIME types data in JSON files.

5. **Add MIME Types Data**:
   Create a directory `content/mime-types` and add JSON files for different MIME types.

### Example JSON File (`content/mime-types/application-json.json`):
```json
{
  "type": "application/json",
  "extensions": [".json"],
  "compressible": true,
  "charset": "UTF-8"
}
```

### Gatsby Configuration (`gatsby-config.js`):
```javascript
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
```

### Create Pages for MIME Types:
In `gatsby-node.js`, create pages dynamically from the JSON data.

```javascript
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
```

### Create a Template for MIME Types:
Create a template file `src/templates/mime-type.js` to display MIME type details.

```javascript
import React from "react";

const MimeTypeTemplate = ({ pageContext }) => {
  const { mimeType } = pageContext;
  return (
    <div>
      <h1>{mimeType.type}</h1>
      <p>Extensions: {mimeType.extensions.join(', ')}</p>
      <p>Compressible: {mimeType.compressible ? 'Yes' : 'No'}</p>
      <p>Charset: {mimeType.charset}</p>
    </div>
  );
};

export default MimeTypeTemplate;
```

### Contributing Guidelines:
Create a `CONTRIBUTING.md` file to guide new contributors.

```markdown
# Contributing to MIME Types Database

We welcome contributions from everyone. Here are some ways you can help:

1. **Add New MIME Types**:
   - Fork the repository.
   - Create a new branch for your feature.
   - Add new MIME type JSON files in the `content/mime-types` directory.
   - Commit your changes and open a pull request.

2. **Improve Documentation**:
   - Help us improve the project documentation.

3. **Report Issues**:
   - If you find any bugs or have suggestions, please open an issue.

Thank you for contributing!
```

This should give you a solid foundation to start your project. Feel free to customize and expand it as needed. Happy coding! 🚀

If you have any specific questions or need further assistance, just let me know!

Source : conversation avec Copilot, 07/10/2024
(1) patrickmccallum/mimetype-io: The code for mimetype.io - GitHub. https://github.com/patrickmccallum/mimetype-io.
(2) GitHub - jshttp/mime-db: Media Type Database. https://github.com/jshttp/mime-db.
(3) jshttp/mime-types: The ultimate javascript content-type utility. - GitHub. https://github.com/jshttp/mime-types.
(4) undefined. https://github.com/patrickmccallum/mimetype-io.git.
(5) undefined. https://www.iana.org/assignments/media-types/media-types.xhtml.
(6) undefined. https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types.
(7) undefined. https://hg.nginx.org/nginx/raw-file/default/conf/mime.types.
(8) undefined. https://cdn.jsdelivr.net/gh/jshttp/mime-db@master/db.json.

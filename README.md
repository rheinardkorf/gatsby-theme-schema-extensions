# gatsby-theme-schema-extensions

## About <a name = "about"></a>

A simple plugin that adds new schema extensions to Gatsby's GraphQL SDL.

## Getting Started <a name = "getting_started"></a>

Add this theme to your theme using:

```
npm install gatsby-theme-schema-extensions
```

or

```
yarn add gatsby-theme-schema-extensions
```

Next add the theme to your `gatsby-config.js`.

```
module.exports = {
    plugins:['gatsby-theme-schema-extensions'],
}
```

You can now use the extensions during your schema custimizations in `gatsby-node.js`.

Example using a parent node's body resolver:
```
exports.createSchemaCustomization = ({ actions }) => {
    createTypes(`type MdxCustom implements Node & Custom {
        id: ID!
        body: String @parent(from:"body")
    }`);
}
```
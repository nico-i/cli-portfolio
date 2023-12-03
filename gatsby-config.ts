import type { GatsbyConfig } from 'gatsby';
const path = require(`path`);
const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: path.join(__dirname, `/src/`),
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;

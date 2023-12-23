import type { GatsbyConfig } from 'gatsby';
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require(`path`);

const strapiConfig = {
  apiURL: process.env.STRAPI_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [`project`, `contact-link`, `skill`, `timeline-item`],
  singleTypes: [],
  i18n: {
    locale: `all`,
  },
  maxParallelRequests: 5,
  remoteFileHeaders: {
    Referer: process.env.APP_URL,
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nico Ismaili`,
  },
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
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;

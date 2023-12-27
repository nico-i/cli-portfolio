import type { GatsbyConfig } from 'gatsby';
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require(`path`);

const strapiConfig = {
  apiURL: process.env.STRAPI_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: `project`,
      queryParams: {
        locale: `all`,
      },
    },
    {
      singularName: `contact-link`,
      queryParams: {
        locale: `all`,
      },
    },
    {
      singularName: `skill`,
      queryParams: {
        locale: `all`,
      },
    },
    {
      singularName: `section`,
      queryParams: {
        locale: `all`,
      },
    },
  ],
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;

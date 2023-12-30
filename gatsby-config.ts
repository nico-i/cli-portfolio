import type { GatsbyConfig } from 'gatsby';
const path = require(`path`);
const { join } = require(`path`);
const { readdirSync, lstatSync } = require(`fs`);

require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

const defaultLanguage = `en`;

const localesDirPath = join(__dirname, `locales`);

// based on the directories get the language codes
const languages = readdirSync(localesDirPath).filter((fileName: string) => {
  const joinedPath = join(localesDirPath, fileName);
  const isDirectory = lstatSync(joinedPath).isDirectory();
  return isDirectory;
});
// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

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
        locale: defaultLanguage,
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
  flags: {
    DEV_SSR: process.env.NODE_ENV === `development`,
    FAST_DEV: process.env.NODE_ENV === `development`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: path.join(__dirname, `/locales/`),
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        languages,
        defaultLanguage,
        siteUrl: process.env.APP_URL,
        i18nextOptions: {
          debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          keySeparator: `.`, // necessary for nested translations
          defaultNS: `common`,
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
        },
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars -- necessary var to allow JSX
const React = require(`react`);
const Layout = require(`./src/components/layout`).default;
require(`./src/styles/global.css`);

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

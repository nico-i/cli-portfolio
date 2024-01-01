import { useI18next } from 'gatsby-plugin-react-i18next';
import { Helmet } from 'react-helmet';

export const Seo = () => {
  const { i18n, t } = useI18next();
  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t(`seo.title`)}</title>
      <meta name="description" content={t(`seo.description`)} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};

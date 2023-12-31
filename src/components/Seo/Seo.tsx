import { useI18next } from 'gatsby-plugin-react-i18next';
import { Helmet } from 'react-helmet';

export const Seo = () => {
  const { i18n, t } = useI18next();
  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t(`seo.title`)}</title>
      <meta name="description" content={t(`seo.description`)} />
    </Helmet>
  );
};

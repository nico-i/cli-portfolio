import { useTranslation } from 'gatsby-plugin-react-i18next';

interface I18nErrorProps {
  error: Error;
}

export const I18nError = ({ error }: Readonly<I18nErrorProps>) => {
  const { t } = useTranslation();
  if (error instanceof Error) {
    return <div>{t(error.message)}</div>;
  }
  return <div>Error</div>;
};

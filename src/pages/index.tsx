import { Layout } from '@/components/Layout';
import { Shell } from '@/components/Shell';
import { useLocation } from '@reach/router';
import { graphql } from 'gatsby';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { useEffect, useState } from 'react';

export default function Index() {
  const [domain, setDomain] = useState(`localhost`);
  const { languages, originalPath } = useI18next();

  const location = useLocation();

  useEffect(() => {
    setDomain(location.hostname);
  }, [location]);

  return (
    <Layout>
      {languages.map((lng) => (
        <Link
          key={lng}
          to={originalPath}
          language={lng}
          id={`i18n-${lng}`}
          className="hidden -z-20 pointer-events-none"
        >
          {lng}
        </Link>
      ))}
      <Shell
        username="guest"
        domain={domain}
        initialPrompt={`clear && cat intro.html && top`}
      />
    </Layout>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["common"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

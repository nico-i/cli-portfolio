import { Layout } from '@/components/Layout';
import { Shell } from '@/components/Shell';
import { RunEvent } from '@/util/types';
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

  useEffect(() => {
    const cmdParam = new URLSearchParams(window.location.search).get(`cmd`);
    if (!cmdParam) {
      window.dispatchEvent(RunEvent(`clear && cat intro.html && top`));
    }
  }, []);

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
      <Shell username="guest" domain={domain} />
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

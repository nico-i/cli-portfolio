import { Layout } from '@/components/Layout';
import { Shell } from '@/components/Shell';
import { RunEvent } from '@/util/types';
import { graphql } from 'gatsby';
import { useEffect, useState } from 'react';

export default function Index() {
  const [domain, setDomain] = useState(`localhost`);

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  useEffect(() => {
    const cmdParam = new URLSearchParams(window.location.search).get(`cmd`);
    if (!cmdParam) {
      window.dispatchEvent(RunEvent(`clear && cat intro.html && top`));
    }
  }, []);

  return (
    <Layout>
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

import { Layout } from '@/components/Layout';
import { graphql } from 'gatsby';

export default function NotFound() {
  return (
    <Layout>
      <main>
        <p>Sorry, page not found!</p>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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

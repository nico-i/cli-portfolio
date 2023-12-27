import { parseSections } from '@/components/Cli/files/html/Section/helper';
import { Link } from '@/components/Link';
import { graphql, useStaticQuery } from 'gatsby';
import ReactMarkdown from 'react-markdown';

interface SectionProps {
  name: string;
  locale: string;
}

export const Section = ({ name, locale }: Readonly<SectionProps>) => {
  const data = useStaticQuery(graphql`
    {
      allStrapiSection {
        nodes {
          name
          locale
          text {
            data {
              text
            }
          }
          localizations {
            data {
              attributes {
                locale
                text
              }
            }
          }
        }
      }
    }
  `);

  const sectionsByLocale = parseSections(data);
  const section = sectionsByLocale[locale].find(
    (section) => section.name === name,
  );

  if (!section) throw new Error(`Section ${name} not found`);

  return (
    <div className="flex flex-col gap-4 py-4">
      <ReactMarkdown
        components={{
          a: Link,
          ol: ({ children }) => (
            <ol className="list-decimal list-inside flex flex-col gap-4">
              {children}
            </ol>
          ),
        }}
      >
        {section.text}
      </ReactMarkdown>
    </div>
  );
};

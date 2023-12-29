import {
  Section as ISection,
  SectionCollectionName,
} from '@/components/Cli/files/html/Section/types';
import { Link } from '@/components/Link';
import { parseStapiCollectionToCollectionByLocale } from '@/util/helper';
import { graphql, useStaticQuery } from 'gatsby';
import { ReactNode } from 'react';
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
        }
      }
    }
  `);

  const sectionsByLocale = parseStapiCollectionToCollectionByLocale<ISection>(
    data,
    SectionCollectionName,
    (node: any) => ({
      id: node.id,
      name: node.name,
      locale: node.locale,
      text: node.text.data.text,
    }),
  );

  const section = sectionsByLocale[locale].find(
    (section) => section.name === name,
  );

  if (!section) throw new Error(`Section ${name} not found`);

  return (
    <div className="flex flex-col gap-4 py-4">
      <ReactMarkdown
        components={{
          a: Link,
          ol: CustomOderedList,
        }}
      >
        {section.text}
      </ReactMarkdown>
    </div>
  );
};

const CustomOderedList = ({ children }: { children: ReactNode }) => (
  <ol className="list-decimal list-inside flex flex-col gap-4">{children}</ol>
);

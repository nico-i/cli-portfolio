import { CliFile } from '@/components/Cli/files/CliFile';
import { ContactLink } from '@/components/Cli/files/html/contact/types';
import { Link } from '@/components/Link';
import { graphql, useStaticQuery } from 'gatsby';

const ContactRun = () => {
  const data = useStaticQuery(graphql`
    query GetContactLinks {
      allStrapiContactLink {
        nodes {
          icon_link {
            id
            text
            url
            svgHtml
          }
        }
      }
    }
  `);

  const iconClasses = `
    inline-block
    mr-2
    w-5
    h-5
    `;

  const iconLinks: ContactLink[] = data.allStrapiContactLink.nodes.map(
    (node: any) => node.icon_link,
  );

  return (
    <div className="flex flex-col justify-start gap-1">
      {iconLinks.map((iconLink, i: number) => {
        const { svgHtml, text, url } = iconLink;
        return (
          <div key={`${text}-${i}`} className="flex items-center">
            <span
              dangerouslySetInnerHTML={{
                __html: svgHtml,
              }}
              className={iconClasses}
            />
            <Link href={url}>{text}</Link>
          </div>
        );
      })}
      <span className="mt-2.5">© Nico Ismaili, 2023</span>
    </div>
  );
};

export class Contact extends CliFile {
  get fileName(): string {
    return `contact.html`;
  }

  public run() {
    return <ContactRun />;
  }
}

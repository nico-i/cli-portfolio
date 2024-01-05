import { ContactLink } from '@/components/Cli/files/html/contact/types';
import { CliFile } from '@/components/Cli/files/types/CliFile';
import { Link } from '@/components/Link';
import { graphql, useStaticQuery } from 'gatsby';

const ContactRun = () => {
  const data = useStaticQuery(graphql`
    query GetContactLinks {
      allStrapiContactLink {
        nodes {
          username
          url
          svg {
            localFile {
              svg {
                content
              }
            }
          }
        }
      }
    }
  `);

  const iconClasses = `
    inline-block
    text-neutral-0
    mr-2
    w-5
    h-5
    `;

  const contactLinks: ContactLink[] = data.allStrapiContactLink.nodes.map(
    (node: any): ContactLink => {
      return {
        username: node.username,
        url: node.url,
        svgHtml: node.svg.localFile.svg.content,
      };
    },
  );

  return (
    <div className="flex flex-col justify-start gap-1">
      {contactLinks.map((contactLink, i: number) => {
        const { svgHtml, username, url } = contactLink;
        return (
          <div key={`${username}-${i}`} className="flex items-center">
            <span
              dangerouslySetInnerHTML={{
                __html: svgHtml,
              }}
              className={iconClasses}
            />
            <Link href={url}>{username}</Link>
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

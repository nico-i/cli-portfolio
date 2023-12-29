import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { TextButton } from '@/components/Button/TextButton/TextButton';
import { CliFile } from '@/components/Cli/files/CliFile';
import {
  Skill,
  SkillCollectionName,
} from '@/components/Cli/files/scripts/skills/types';
import { TableCell, TableRow, TableTextCell } from '@/components/Table';
import { parseStapiCollectionToCollectionByLocale } from '@/util/helper';
import { graphql, useStaticQuery } from 'gatsby';
import { Fragment, useState } from 'react';

const SkillsRun = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiSkill {
        nodes {
          id
          locale
          name
          summary
          proficiency
          icon_link {
            url
          }
        }
      }
    }
  `);
  const skillsByLocale = parseStapiCollectionToCollectionByLocale<Skill>(
    data,
    SkillCollectionName,
    (node: any) => ({
      id: node.id,
      locale: node.locale,
      name: node.name,
      summary: node.summary,
      proficiency: node.proficiency,
      url: node?.icon_link?.url,
    }),
  );

  const skills = skillsByLocale.en.toSorted((a, b) => {
    if (a.proficiency > b.proficiency) return -1;
    if (a.proficiency < b.proficiency) return 1;
    return 0;
  });
  const [currentOpenedSkill, setCurrentOpenedSkill] = useState<string | null>(
    null,
  );
  const rowClassName = `grid-cols-[8rem_auto] md:grid-cols-[10rem_minmax(10rem,1fr)]`;
  const skillsCount = skills.length;
  return (
    <table className="w-full md:w-2/3 lg:w-2/5">
      <thead>
        <TableRow isHeader={true} className={rowClassName}>
          <TableCell>Skill</TableCell>
          <TableCell>Proficiency</TableCell>
        </TableRow>
      </thead>
      <tbody>
        {skills.map((skill, index) => {
          return (
            <Fragment key={skill.id}>
              <TableRow
                className={rowClassName}
                isLast={
                  index === skillsCount - 1 && currentOpenedSkill !== skill.name
                }
              >
                <TableCell>
                  <TextButton
                    onClick={() =>
                      setCurrentOpenedSkill((prev) =>
                        prev === skill.name ? null : skill.name,
                      )
                    }
                  >
                    {skill.name}
                  </TextButton>
                </TableCell>
                <TableCell>
                  <AsciiProgressBar
                    percentage={skill.proficiency}
                    duration={200}
                  />
                </TableCell>
              </TableRow>
              {currentOpenedSkill && currentOpenedSkill === skill.name ? (
                <TableRow
                  className={rowClassName}
                  isLast={
                    index === skillsCount - 1 &&
                    currentOpenedSkill === skill.name
                  }
                >
                  <TableTextCell>{skill.summary}</TableTextCell>
                </TableRow>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export class Skills extends CliFile {
  get fileName(): string {
    return `skills.sh`;
  }

  public run = () => <SkillsRun />;
}

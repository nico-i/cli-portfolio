import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { TextButton } from '@/components/Button/TextButton/TextButton';
import {
  Skill,
  SkillCollectionName,
} from '@/components/Cli/files/scripts/skills/types';
import { CliFile } from '@/components/Cli/files/types/CliFile';
import {
  TableCell,
  TableRow,
  TableTextCell,
  TableTextRow,
} from '@/components/Table';
import { parseStrapiCollectionToCollectionByLocale } from '@/util/helper';
import { graphql, useStaticQuery } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Fragment, useState } from 'react';

const SkillsRun = () => {
  const { i18n, t } = useI18next();
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
  const skillsByLocale = parseStrapiCollectionToCollectionByLocale<Skill>(
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

  const skills = skillsByLocale[i18n.language].toSorted((a, b) => {
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
        <TableRow className={rowClassName}>
          <TableCell isHeader> {t(`components.skills.skill`)}</TableCell>
          <TableCell isHeader isLastChild>
            {t(`components.skills.proficiency`)}
          </TableCell>
        </TableRow>
      </thead>
      <tbody>
        {skills.map((skill, index) => {
          const isLastRow =
            index === skillsCount - 1 && currentOpenedSkill !== skill.name;
          return (
            <Fragment key={skill.id}>
              <TableRow className={rowClassName}>
                <TableCell isLastRow={isLastRow}>
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
                <TableCell isLastRow={isLastRow} isLastChild>
                  <AsciiProgressBar
                    percentage={skill.proficiency}
                    duration={200}
                  />
                </TableCell>
              </TableRow>
              {currentOpenedSkill && currentOpenedSkill === skill.name ? (
                <TableTextRow className={rowClassName}>
                  <TableTextCell
                    isLastRow={
                      index === skillsCount - 1 &&
                      currentOpenedSkill === skill.name
                    }
                  >
                    {skill.summary}
                  </TableTextCell>
                </TableTextRow>
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

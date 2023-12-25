import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { TextButton } from '@/components/Button/TextButton/TextButton';
import { parseSkills } from '@/components/Cli/scripts/skills/helper';
import { TableCell, TableRow, TableTextCell } from '@/components/Table';
import { graphql, useStaticQuery } from 'gatsby';
import { Fragment, useState } from 'react';

export const Skills = () => {
  const data = useStaticQuery(getAllSkillsQuery);
  const skillsByLocale = parseSkills(data);
  const skills = skillsByLocale.en.sort((a, b) => {
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
            <Fragment key={skill.name}>
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
                  <TableTextCell>{skill.description}</TableTextCell>
                </TableRow>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const getAllSkillsQuery = graphql`
  {
    allStrapiSkill {
      nodes {
        locale
        name
        summary
        proficiency
        icon_link {
          url
        }
        localizations {
          data {
            attributes {
              locale
              summary
              name
            }
          }
        }
      }
    }
  }
`;

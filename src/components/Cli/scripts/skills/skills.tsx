import { AsciiProgressBar } from '@/components/AsciiProgressBar/AsciiProgressBar';
import { Skill } from '@/components/Cli/scripts/skills/SkillTableRow';
import { Table, TableCell, TableRow, TableTextCell } from '@/components/Table';
import { Fragment, useState } from 'react';

export const Skills = () => {
  const mockSkills = [
    new Skill(
      `JavaScript`,
      90,
      `JavaScript is my main programming language. I have been using it for 3 years.`,
    ),
    new Skill(`TypeScript`, 80, `I have been using TypeScript for 2 years.`),
    new Skill(`React`, 80, `I have been using React for 2 years.`),
    new Skill(`Next.js`, 80, `I have been using Next.js for 2 years.`),
    new Skill(`Node.js`, 70, `I have been using Node.js for 2 years.`),
    new Skill(`Express`, 70, `I have been using Express for 2 years.`),
    new Skill(`MongoDB`, 70, `I have been using MongoDB for 2 years.`),
    new Skill(`PostgreSQL`, 50, `I have been using PostgreSQL for 1 year.`),
    new Skill(`GraphQL`, 50, `I have been using GraphQL for 1 year.`),
    new Skill(`Apollo`, 50, `I have been using Apollo for 1 year.`),
    new Skill(`Redis`, 50, `I have been using Redis for 1 year.`),
  ];
  const [currentOpenedSkill, setCurrentOpenedSkill] = useState<string | null>(
    null,
  );
  const rowClassName = `grid-cols-[10rem_auto] md:grid-cols-[10rem_minmax(10rem,1fr)]`;

  return (
    <Table className="w-11/12 md:w-2/3 lg:w-2/5">
      <TableRow isHeader={true} className={rowClassName}>
        <TableCell>Skill</TableCell>
        <TableCell>Proficiency</TableCell>
      </TableRow>
      {mockSkills.map((skill, index) => {
        return (
          <Fragment key={skill.name}>
            <TableRow
              className={rowClassName}
              isLast={
                index === mockSkills.length - 1 &&
                currentOpenedSkill !== skill.name
              }
            >
              <TableCell>
                <button
                  onClick={() =>
                    setCurrentOpenedSkill((prev) =>
                      prev === skill.name ? null : skill.name,
                    )
                  }
                  className="font-semibold underline decoration-2"
                >
                  {skill.name}
                </button>
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
                  index === mockSkills.length - 1 &&
                  currentOpenedSkill === skill.name
                }
              >
                <TableTextCell>{skill.description}</TableTextCell>
              </TableRow>
            ) : null}
          </Fragment>
        );
      })}
    </Table>
  );
};

import { Project, ProjectsCarousel } from '@/components/Cli/scripts/projects';

const mockProjects: Project[] = [
  {
    title: `Project 1`,
    shortSummary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
    ullamcorper, turpis eget aliquet faucibus, odio nulla aliquet
    elit, vitae molestie magna diam id nisl.`,
    fullSummary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
    ullamcorper, turpis eget aliquet faucibus, odio nulla aliquet
    elit, vitae molestie magna diam id nisl. Proin eget libero
    vitae nisl aliquam rhoncus. Nullam euismod, ipsum sed
    vestibulum ultrices, eros nisl tincidunt nisi, ut ultricies
    n
    nunc at ex. Nullam at nisl sed augue lacinia ultrices.
    Duis euismod, nunc sit amet aliquet tincidunt, nunc magna
    aliquet ipsum, nec ultricies nunc nisl sit amet purus.
    Suspendisse potenti. Fusce nec enim at leo lacinia
    ullamcorper. Sed euismod, dui euismod ultrices
    consectetur, nunc nunc volutpat ligula, a venenatis`,
    iconTitleUrlTuples: [
      {
        icon: `🔗`,
        title: `Website`,
        url: `https://google.com`,
      },
      {
        icon: `📄`,
        title: `GitHub`,
        url: `https://github.com`,
      },
    ],
  },
  {
    title: `Project 2`,
    shortSummary: `asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg `,
    fullSummary: `asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg  asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg `,
    iconTitleUrlTuples: [
      {
        icon: `🔗`,
        title: `Website`,
        url: `https://google.com`,
      },
      {
        icon: `📄`,
        title: `GitHub`,
        url: `https://github.com`,
      },
    ],
  },
  {
    title: `Project 2`,
    shortSummary: `asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg `,
    fullSummary: `asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg  asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg asda dasdf ahadfg asdf aha ga5hae gasdf aharg afg adfg adfhahaerg adfg `,
    iconTitleUrlTuples: [
      {
        icon: `🔗`,
        title: `Website`,
        url: `https://google.com`,
      },
      {
        icon: `📄`,
        title: `GitHub`,
        url: `https://github.com`,
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* <Shell username="guest" domain="localhost" /> */}
      <ProjectsCarousel
        projects={mockProjects}
        className="w-11/12 md:w-2/3 lg:w-3/5"
      />
    </>
  );
}

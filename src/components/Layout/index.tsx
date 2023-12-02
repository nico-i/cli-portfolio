import MacroBar from '@/components/MacroBar';
import { navigate } from 'gatsby';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const updateQueryStr = (cmd: string) => {
    navigate(`?cmd=${encodeURIComponent(cmd)}`, { replace: true });
  };
  const macros = {
    About: () => updateQueryStr(`viu -w 256 selfie.jpg && cat about.txt`),
    Projects: () => updateQueryStr(`gcc projects.c && a.out`),
    Skills: () => updateQueryStr(`javac skills.java && java skills`),
    Contact: () => updateQueryStr(`cat contact.txt`),
    Help: () => updateQueryStr(`help`),
  };

  return (
    <>
      <MacroBar macros={macros} />
      {children}
    </>
  );
};
export default Layout;

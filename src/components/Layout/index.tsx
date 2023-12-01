import MacroBar from '@/components/MacroBar';
import { navigate } from 'gatsby';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const macros = {
    About: () => navigate(`/#about`),
    Projects: () => navigate(`/#projects`),
    Skills: () => navigate(`/#skills`),
    Contact: () => navigate(`/#contact`),
    Help: () => navigate(`/#help`),
  };

  return (
    <>
      <MacroBar macros={macros} />
      {children}
    </>
  );
};
export default Layout;

import MacroBar from '@/components/MacroBar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const macros = {
    About: () => console.log(`About`),
    Projects: () => console.log(`Projects`),
    Skills: () => console.log(`Skills`),
    Contact: () => console.log(`Contact`),
    Help: () => console.log(`Help`),
  };

  return (
    <>
      <MacroBar macros={macros} />
      {children}
    </>
  );
};
export default Layout;

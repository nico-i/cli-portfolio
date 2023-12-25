import { TextFile } from '@/components/Cli';
import { MacroBar } from '@/components/MacroBar';
import { PromptHistoryProvider } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { RunEvent } from '@/util/types';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: Readonly<LayoutProps>) => {
  const macros = {
    About: () => {
      window.dispatchEvent(
        RunEvent(
          `clear && viu -w 256 selfie.jpg && cat ${TextFile.about} && top`,
        ),
      );
    },
    Projects: () => window.dispatchEvent(RunEvent(`clear && projects.sh`)),
    Skills: () => {
      window.dispatchEvent(RunEvent(`clear && skills.sh && top`));
    },
    Contact: () => {
      window.dispatchEvent(RunEvent(`clear && cat ${TextFile.contact} && top`));
    },
    '?': () => {
      window.dispatchEvent(RunEvent(`help`));
    },
  };

  return (
    <PromptHistoryProvider>
      <MacroBar macros={macros} />
      <div className="h-full" id="content">
        {children}
      </div>
    </PromptHistoryProvider>
  );
};

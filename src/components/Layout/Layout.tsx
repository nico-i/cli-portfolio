import { About } from '@/components/Cli/files/html/about';
import { Contact } from '@/components/Cli/files/html/contact';
import { Projects } from '@/components/Cli/files/scripts/projects';
import { Skills } from '@/components/Cli/files/scripts/skills';
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
          `clear && viu -w 256 selfie.jpg && cat ${
            new About().fileName
          } && top`,
        ),
      );
    },
    Projects: () =>
      window.dispatchEvent(RunEvent(`clear && ${new Projects().fileName}`)),
    Skills: () => {
      window.dispatchEvent(
        RunEvent(`clear && ${new Skills().fileName} && top`),
      );
    },
    Contact: () => {
      window.dispatchEvent(
        RunEvent(`clear && cat ${new Contact().fileName} && top`),
      );
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

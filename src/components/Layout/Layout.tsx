import { TextFile } from '@/components/Cli';
import { MacroBar } from '@/components/MacroBar';
import { PromptHistoryProvider } from '@/context/promptHistoryContext';
import { RunEvent } from '@/util/types';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: Readonly<LayoutProps>) => {
  const macros = {
    About: () =>
      window.dispatchEvent(
        RunEvent(`clear && viu -w 256 selfie.jpg && cat ${TextFile.about}`),
      ),
    Projects: () => window.dispatchEvent(RunEvent(`clear && projects.sh`)),
    Skills: () => {
      window.dispatchEvent(RunEvent(`clear && skills.sh`));
    },
    Contact: () =>
      window.dispatchEvent(RunEvent(`clear && cat ${TextFile.contact}`)),
    Help: () => window.dispatchEvent(RunEvent(`clear && help`)),
  };

  return (
    <PromptHistoryProvider>
      <MacroBar macros={macros} />
      <div className="flex-[1_0_auto]" id="content">
        {children}
      </div>
    </PromptHistoryProvider>
  );
};

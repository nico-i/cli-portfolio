import MacroBar from '@/components/MacroBar';
import { PromptHistoryProvider } from '@/context/promptHistoryContext';
import { TextFile } from '@/lib/cli/files';
import { RunEvent } from '@/util/types';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const macros = {
    About: () =>
      window.dispatchEvent(
        RunEvent(`viu -w 256 selfie.jpg && cat ${TextFile.about}`),
      ),
    Projects: () => window.dispatchEvent(RunEvent(`projects.sh`)),
    Skills: () => window.dispatchEvent(RunEvent(`skills.sh`)),
    Contact: () => window.dispatchEvent(RunEvent(`cat ${TextFile.contact}`)),
    Clear: () => window.dispatchEvent(RunEvent(`clear`)),
    Help: () => window.dispatchEvent(RunEvent(`help`)),
  };

  return (
    <>
      <PromptHistoryProvider>
        <div className="flex-[1_0_auto]" id="content">
          {children}
        </div>
        <MacroBar macros={macros} />
      </PromptHistoryProvider>
    </>
  );
};
export default Layout;

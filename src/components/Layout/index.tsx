import MacroBar from '@/components/MacroBar';
import { PromptHistoryProvider } from '@/context/promptHistoryContext';
import { CustomEvents } from '@/util/types';
import { navigate } from 'gatsby';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const applyMacro = async (cmd: string) => {
    const newSearchStr = `?cmd=${encodeURIComponent(cmd)}`;

    if (window.location.search === newSearchStr) {
      // If last macro was the same, dispatch custom event instead of navigating
      const customEvent = new CustomEvent(CustomEvents.macro, {
        detail: { cmd },
      });
      // Dispatch the event
      window.dispatchEvent(customEvent);
      return;
    }

    await navigate(`/?cmd=${encodeURIComponent(cmd)}`, { replace: true });
  };
  const macros = {
    About: () => applyMacro(`viu -w 256 selfie.jpg && cat about.txt`),
    Projects: () => applyMacro(`projects.sh`),
    Skills: () => applyMacro(`skills.sh`),
    Contact: () => applyMacro(`cat contact.txt`),
    Help: () => applyMacro(`help`),
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

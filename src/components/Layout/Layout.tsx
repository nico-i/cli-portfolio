import { About } from '@/components/Cli/files/html/about';
import { Contact } from '@/components/Cli/files/html/contact';
import { Intro } from '@/components/Cli/files/html/intro';
import { Projects } from '@/components/Cli/files/scripts/projects';
import { Skills } from '@/components/Cli/files/scripts/skills';
import { MacroBar } from '@/components/MacroBar';
import { Macro } from '@/components/MacroBar/Macro';
import { PromptHistoryProvider } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <PromptHistoryProvider>
      <MacroBar>
        <Macro
          name="About"
          command={`clear && viu -w 256 selfie.jpg && cat ${
            new About().fileName
          } && top`}
        />
        <Macro
          name="Projects"
          command={`clear && ${new Projects().fileName}`}
        />
        <Macro
          name="Skills"
          command={`clear && ${new Skills().fileName} && top`}
        />
        <Macro
          name="Contact"
          command={`clear && cat ${new Contact().fileName} && top`}
        />
        <Macro
          name="Intro"
          desktopOnly
          command={`clear && cat ${new Intro().fileName} && top`}
        />
        <Macro name="?" command={`help`} />
      </MacroBar>
      <div className="h-full" id="content">
        {children}
      </div>
    </PromptHistoryProvider>
  );
};

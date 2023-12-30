import { About } from '@/components/Cli/files/html/about';
import { Contact } from '@/components/Cli/files/html/contact';
import { Intro } from '@/components/Cli/files/html/intro';
import { Projects } from '@/components/Cli/files/scripts/projects';
import { Skills } from '@/components/Cli/files/scripts/skills';
import { MacroBar } from '@/components/MacroBar';
import { Macro } from '@/components/MacroBar/Macro';
import { Seo } from '@/components/Seo';
import { PromptHistoryProvider } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: Readonly<LayoutProps>) => {
  const { t } = useTranslation();

  return (
    <PromptHistoryProvider>
      <Seo />
      <MacroBar>
        <Macro
          name={t(`macros.home`)}
          command={`clear && cat ${new Intro().fileName} && top`}
        />
        <Macro
          name={t(`macros.about`)}
          command={`clear && viu -w 256 selfie.jpg && cat ${
            new About().fileName
          } && top`}
        />
        <Macro
          name={t(`macros.projects`)}
          command={`clear && ${new Projects().fileName}`}
        />
        <Macro
          name={t(`macros.skills`)}
          command={`clear && ${new Skills().fileName} && top`}
        />
        <Macro
          name={t(`macros.contact`)}
          command={`clear && cat ${new Contact().fileName} && top`}
        />
        <Macro name="?" command={`help`} />
      </MacroBar>
      <div className="h-full" id="content">
        {children}
      </div>
    </PromptHistoryProvider>
  );
};

import { CliCmd, UsageTuple } from '@/components/Cli/cmd/types/CliCmd';
import {
  PromptHistoryAction,
  PromptHistoryContext,
} from '@/context/PromptHistoryContext';
import { ReactNode, useContext, useEffect } from 'react';

const RunClear = (): ReactNode => {
  const { dispatch } = useContext(PromptHistoryContext);
  useEffect(() => {
    dispatch({ type: PromptHistoryAction.CLEAR });
  }, [dispatch]);
  return null;
};

export class Clear extends CliCmd {
  get fileName(): string {
    return `clear`;
  }

  get usages(): UsageTuple {
    return {
      usage: this.fileName,
      i18nKey: `cmd.clear`,
    };
  }

  public run = (): ReactNode => <RunClear />;
}

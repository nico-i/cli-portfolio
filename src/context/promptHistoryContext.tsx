import { PromptHistoryEntry } from '@/util/types';
import { createContext, ReactNode, useState } from 'react';

export const PromptHistoryContext = createContext<{
  history: PromptHistoryEntry[];
  insertHistory: (prompt: string, res: ReactNode, index?: number) => void;
  clearHistory: () => void;
}>({
  history: [],
  insertHistory: () => {},
  clearHistory: () => {},
});

export const PromptHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);

  const insertHistory = (prompt: string, res: ReactNode, index?: number) => {
    setHistory((history) => {
      const newHistory = [...history];
      if (index === undefined) {
        newHistory.push([prompt, res]);
        return newHistory;
      }
      newHistory[index] = [prompt, res];
      return newHistory;
    });
  };

  const clearHistory = () =>
    setHistory((history) => {
      // remove all except the last one
      return history.slice(-1);
    });

  return (
    <PromptHistoryContext.Provider
      value={{ history, insertHistory, clearHistory }}
    >
      {children}
    </PromptHistoryContext.Provider>
  );
};

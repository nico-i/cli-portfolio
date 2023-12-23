import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export const PromptHistoryContext = createContext<{
  history: PromptHistoryEntry[];
  setHistory: Dispatch<SetStateAction<PromptHistoryEntry[]>>;
}>({
  history: [],
  setHistory: () => [],
});

export const PromptHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  return (
    <PromptHistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </PromptHistoryContext.Provider>
  );
};

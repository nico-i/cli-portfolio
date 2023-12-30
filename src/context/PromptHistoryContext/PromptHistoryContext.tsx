import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export const PromptHistoryContext = createContext<{
  history: PromptHistoryEntry[];
  setHistory: Dispatch<SetStateAction<PromptHistoryEntry[]>>;
}>({
  history: [],
  setHistory: () => [],
});

interface PromptHistoryProviderProps {
  children: ReactNode;
  historyDepth?: number;
}

export const PromptHistoryProvider = ({
  children,
  historyDepth = 25,
}: Readonly<PromptHistoryProviderProps>) => {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);

  useEffect(() => {
    if (history.length > historyDepth) {
      setHistory((history) => history.slice(1));
    }
  }, [history, historyDepth]);

  return (
    <PromptHistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </PromptHistoryContext.Provider>
  );
};

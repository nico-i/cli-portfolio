import { Clear } from '@/components/Cli/cmd/clear';
import {
  promptResponseSortFn as promptResponseSortByTimeStampFn,
  updateCmdSearchParam,
} from '@/context/PromptHistoryContext/helper';
import {
  PromptHistory,
  PromptHistoryEntry,
} from '@/context/PromptHistoryContext/types';
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from 'react';

export enum PromptHistoryAction {
  INSERT = `INSERT`,
  UPDATE = `UPDATE`,
  DELETE = `DELETE`,
  CLEAR = `CLEAR`,
}

type PromptHistoryActionType =
  | { type: PromptHistoryAction.INSERT; payload: PromptHistoryEntry }
  | {
      type: PromptHistoryAction.UPDATE;
      payload: PromptHistoryEntry;
    }
  | { type: PromptHistoryAction.DELETE; payload: PromptHistoryEntry }
  | { type: PromptHistoryAction.CLEAR };

function entriesReducer(
  state: PromptHistory,
  action: PromptHistoryActionType,
): PromptHistory {
  if (action.type === PromptHistoryAction.CLEAR) {
    // hide all history entries before the last `clear` command
    let lastClearWasConsecutive = false;
    const newState = state.map((entry, i) => {
      if (
        i === state.length - 1 &&
        entry.results.some((r) => r.prompt !== new Clear().fileName)
      ) {
        lastClearWasConsecutive = true;
        return entry;
      }
      entry.hideEntry = true;
      return entry;
    });
    if (!lastClearWasConsecutive) {
      updateCmdSearchParam(``);
    }
    return newState;
  }

  switch (action.type) {
    case PromptHistoryAction.INSERT:
      updateCmdSearchParam(action.payload.fullPrompt);
      return [...state, action.payload];
    case PromptHistoryAction.UPDATE:
      return state.map((entry) => {
        if (entry.fullPrompt !== action.payload.fullPrompt) return entry;
        return { ...entry, ...action.payload };
      });
    case PromptHistoryAction.DELETE:
      return state.filter(
        (entry) => entry.fullPrompt !== action.payload.fullPrompt,
      );
    default:
      return state;
  }
}

export const PromptHistoryContext = createContext<{
  promptHistory: PromptHistory;
  dispatch: Dispatch<PromptHistoryActionType>;
}>({
  promptHistory: [],
  dispatch: () => [],
});

interface PromptHistoryProviderProps {
  children: ReactNode;
  historyDepth?: number;
}

export const PromptHistoryProvider = ({
  children,
  historyDepth = 25,
}: Readonly<PromptHistoryProviderProps>) => {
  // history reducer can be used to add and update history entries. Each insertion will also update the searchstring
  const [promptHistory, dispatch] = useReducer(entriesReducer, []);

  useEffect(() => {
    if (Object.keys(promptHistory).length > historyDepth) {
      // remove the oldest entry
      const oldestEntry = promptHistory.toSorted((a, b) =>
        promptResponseSortByTimeStampFn(`DESC`, a, b),
      )[0];
      dispatch({
        type: PromptHistoryAction.DELETE,
        payload: oldestEntry,
      });
    }
  }, [promptHistory, historyDepth]);

  return (
    <PromptHistoryContext.Provider value={{ promptHistory, dispatch }}>
      {children}
    </PromptHistoryContext.Provider>
  );
};

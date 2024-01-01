import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import { SearchParams } from '@/util/types';

export const promptResponseSortFn = (
  order: 'DESC' | 'ASC',
  a: PromptHistoryEntry,
  b: PromptHistoryEntry,
) => {
  return order === `ASC`
    ? a.results[a.results.length - 1].timestamp -
        b.results[b.results.length - 1].timestamp
    : b.results[b.results.length - 1].timestamp -
        a.results[a.results.length - 1].timestamp;
};

export const updateCmdSearchParam = (cmd: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  if (cmd !== ``) {
    newSearchParams.set(`cmd`, encodeURIComponent(cmd));
  } else {
    newSearchParams.delete(SearchParams.cmd);
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.search = newSearchParams?.toString() || ``;
  window.history.replaceState({}, ``, currentUrl);
};

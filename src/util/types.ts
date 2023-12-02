import { ReactNode } from 'react';

export type PromptHistoryEntry = [string, ReactNode];

export enum CustomEvents {
  macro = `macro`,
}

export enum SearchParams {
  cmd = `cmd`,
  clear = `clear`,
}

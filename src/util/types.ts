import { ReactNode } from 'react';

export type PromptHistoryEntry = [string, ReactNode];

export enum CustomEvents {
  run = `run`,
  clear = `clear`,
}

export const RunEvent = (prompt: string) =>
  new CustomEvent(CustomEvents.run, {
    detail: {
      prompt,
    },
  });

export const ClearEvent = new CustomEvent(CustomEvents.clear);

export enum SearchParams {
  cmd = `cmd`,
  clear = `clear`,
}

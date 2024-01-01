import { ReactNode } from 'react';

export interface PromptResult {
  prompt: string;
  timestamp: number;
  result: ReactNode;
  isStandalone: boolean;
  hideResult?: boolean;
}

export interface PromptHistoryEntry {
  fullPrompt: string;
  results: PromptResult[];
  hideEntry?: boolean;
}

export type PromptHistory = PromptHistoryEntry[];

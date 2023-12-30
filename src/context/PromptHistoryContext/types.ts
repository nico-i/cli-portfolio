import { ReactNode } from 'react';

export interface PromptHistoryEntry {
  timestamp: number;
  prompt: string;
  response: ReactNode;
  show: boolean;
  isStandalone: boolean;
}

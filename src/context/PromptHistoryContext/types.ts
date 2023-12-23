import { ReactNode } from 'react';

export interface PromptHistoryEntry {
  prompt: string;
  response: ReactNode;
}

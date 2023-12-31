import { ReactNode } from 'react';

export abstract class CliFile<T = {}> {
  abstract get fileName(): string;
  public isStandalone = false;
  public abstract run(props?: T): ReactNode;
}

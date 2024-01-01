export enum CustomEvents {
  run = `run`,
  stopStandalone = `closeStandalone`,
}

export const RunEvent = (prompt: string) =>
  new CustomEvent(CustomEvents.run, {
    detail: {
      prompt,
    },
  });

export const StopStandaloneEvent = new CustomEvent(CustomEvents.stopStandalone);

export enum SearchParams {
  cmd = `cmd`,
}

export interface StrapiCollection {
  id: string;
  locale: string;
}

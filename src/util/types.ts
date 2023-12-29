export enum CustomEvents {
  run = `run`,
  clear = `clear`,
  stopStandalone = `closeStandalone`,
  startStandalone = `startStandalone`,
}

export const RunEvent = (prompt: string) =>
  new CustomEvent(CustomEvents.run, {
    detail: {
      prompt,
    },
  });

export const StopStandaloneEvent = new CustomEvent(CustomEvents.stopStandalone);

export const StartStandaloneEvent = new CustomEvent(
  CustomEvents.startStandalone,
);

export const ClearEvent = new CustomEvent(CustomEvents.clear);

export enum SearchParams {
  cmd = `cmd`,
  clear = `clear`,
}

export interface StrapiCollection {
  id: string;
  locale: string;
}

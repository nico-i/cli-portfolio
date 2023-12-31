// error that takes the max number of arguments and the actual number of arguments

export class ArgCountError extends Error {
  public expectedInterval: [number, number];
  public actual: number;

  constructor(expectedInterval: [number, number], actual: number) {
    super(`cmd.errors.arg-count`);
    this.expectedInterval = expectedInterval;
    this.actual = actual;
  }
}

export class ValueError extends Error {
  public value: string;
  public expectedType: string;

  constructor(expectedType: string, value: string) {
    super(`cmd.errors.value`);
    this.expectedType = expectedType;
    this.value = value;
  }
}

export class UnknownFlagsError extends Error {
  public flags: string[];

  constructor(flags: string | string[]) {
    super(`cmd.errors.404-flag`);
    if (typeof flags === `string`) {
      flags = [flags];
    }
    this.flags = flags;
  }
}

export class UnknownCommandError extends Error {
  public command: string;

  constructor(command: string) {
    super(`cmd.errors.404-command`);
    this.command = command;
  }
}

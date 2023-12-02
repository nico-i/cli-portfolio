import { CmdProps } from '@/lib/cli';
import { ReactNode } from 'react';

export default function help({ flags, args }: CmdProps): ReactNode {
  if (Object.keys(flags).length > 0) {
    throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
  }
  if (args.length !== 0) {
    throw new Error(`Expected 0 arguments, got ${args.length}`);
  }
  return (
    <>
      <p>Usage: help - Prints the help text</p>
      <p>Usage: help [command] - Prints the help text for a command</p>
      <p>Usage: cat [file] - Prints the contents of a file to the terminal</p>
      <p>Usage: ls - Lists the files in the current directory</p>
      <p>Usage: pwd - Prints the current working directory</p>
      <p>Usage: clear - Clears the terminal</p>
      <p>Usage: echo [text] - Prints text to the terminal</p>
      <p>Usage: date - Prints the current date and time</p>
      <p>Usage: whoami - Prints the current user</p>
    </>
  );
}

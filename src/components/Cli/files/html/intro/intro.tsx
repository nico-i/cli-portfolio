import { CliFile } from '@/components/Cli/files/CliFile';

export class Intro extends CliFile {
  get fileName(): string {
    return `intro.html`;
  }

  public run() {
    return (
      <p>
        Hi and Welcome to my interactive portfolio! This website is built to
        simulate a Linux command line, also known as a terminal or shell. Here’s
        how to use it: Using the Command Line:Just like in a regular shell, you
        can use commands to explore this website. Type in a command and hit
        enter to see its effect! Prefer a mouse? No Problem!At the edge of the
        page, you&apos;ll find a navigation bar with navigation macros. Clicking
        on any of the defined macros will automatically fill in the
        corresponding command into the command line. Need Help?If you&apos;re
        unsure about what commands to use, simply press the “Help” macro or type
        “help” into the command line and press enter. This will display a list
        of all available commands, along with a brief description of what each
        one does. Experiment and Explore:Don&apos;t be afraid to try different
        commands. The interface is designed to be intuitive for both tech-savvy
        users and those new to a shell environment. Ludicrous Speed!Each menu
        macro can also be accessed with a keyboard shortcut following this
        format: Alt +&nbsp;
        {`<first letter of macro>`}
        Enjoy exploring my portfolio! I hope you find the interface fun and easy
        to use. If you have any questions, need assistance or have suggestions
        for improvements, feel free to reach out via the information provided on
        the Contact macro.
      </p>
    );
  }
}

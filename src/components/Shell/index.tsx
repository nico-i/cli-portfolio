import cli, { Cmd } from '@/lib/cli';
import { updateQueryString } from '@/lib/helper';
import { useLocation } from '@reach/router';
import {
  FormEventHandler,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
}

export default function Shell({ username, domain }: Readonly<ShellProps>) {
  const promptPrefix = `${username}@${domain}: ~$ `;
  const promptPrefixPlaceholder = ` `.repeat(promptPrefix.length);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busyMem, setBusyMem] = useState<string[]>([]);
  const [userTextAreaValue, setUserTextAreaValue] = useState<string>(
    promptPrefixPlaceholder,
  );
  const [history, setHistory] = useState<[string, ReactNode][]>([]);

  const location = useLocation();

  useEffect(() => {
    // Run macro if query param changes
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has(`cmd`)) return;

    const myQueryParam = searchParams.get(`cmd`);
    if (!myQueryParam) return;

    setUserTextAreaValue(
      [promptPrefixPlaceholder, decodeURIComponent(myQueryParam)].join(``),
    );
    textAreaRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [history]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    // update search string with current userInput
    if (userTextAreaValue === promptPrefixPlaceholder) {
      updateQueryString();
      return;
    }
    const userPrompt = userTextAreaValue.slice(promptPrefix.length);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(`cmd`, encodeURIComponent(userPrompt));
    updateQueryString(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTextAreaValue]);

  useEffect(() => {
    if (isBusy) {
      document.body.style.cursor = `wait`;
      return;
    }

    document.body.style.cursor = `auto`;

    if (busyMem.length === 0) return;
    const userInputDuringBusy = busyMem.join(``);
    setBusyMem([]);

    setUserTextAreaValue(
      [promptPrefixPlaceholder, userInputDuringBusy].join(``),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on isBusy change
  }, [isBusy]);

  const promptPrefixHtml = (
    <>
      <span className="text-info-500">{`${username}@${domain}`}</span>
      <span>:</span>&nbsp;
      <span className="text-log-500">~</span>
      <span>$</span>&nbsp;
    </>
  );

  const handleUserTextAreaChange: FormEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const userInput = event.currentTarget.value;

    if (userInput.length < promptPrefix.length) {
      setUserTextAreaValue(promptPrefixPlaceholder);
      return;
    }

    // Resize textarea to fit content
    event.currentTarget.style.height = `auto`;
    event.currentTarget.style.height = event.currentTarget.scrollHeight + `px`;

    setUserTextAreaValue(userInput);
  };

  const handleUserTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (isBusy) {
      if (event.key !== `Enter`) {
        // check if key is a char or whitespace
        if (event.key.length > 1) {
          return;
        }
        setBusyMem((busyMem) => [...busyMem, event.key]);
        return;
      }
      if (event.shiftKey) {
        setBusyMem((busyMem) => [...busyMem, `\n`]);
        return;
      }
      return;
    }

    switch (event.key) {
      case `Enter`:
        if (!event.shiftKey) {
          event.preventDefault();
          processCmd(userTextAreaValue.trim());
        }
        break;
      case `Tab`:
        event.preventDefault();
        // TODO: Add tab completion
        break;
      case `ArrowUp`:
        event.preventDefault();
        // TODO: Add command history
        break;
      case `ArrowDown`:
        event.preventDefault();
        // TODO: Add command history
        break;
    }
  };

  const processCmd = async (userInput: string) => {
    // TODO: handle &&
    setIsBusy(true);
    // TODO: Add real shell command handling
    let res: ReactNode = null;
    try {
      const cmd = userInput.split(` `)[0] as Cmd;
      const args = userInput.split(` `).slice(1);
      const flags: Record<string, string> = {};

      args.forEach((arg) => {
        if (arg.startsWith(`-`)) {
          if (!arg.includes(`=`)) {
            throw new Error(`Invalid flag: ${arg}`);
          }
          const flag = arg.split(`=`)[0];
          const value = arg.split(`=`)[1] || ``;
          flags[flag] = value;
        }
      });
      res = cli({ cmd, args, flags });
    } catch (e) {
      res = (e as Error).message;
    }

    setIsBusy(false);
    setHistory((history) => [...history, [userInput, res]]);
    setUserTextAreaValue(promptPrefixPlaceholder);

    updateQueryString();
    textAreaRef.current?.focus();
  };

  return (
    <main
      className={`
        px-[10px]
        pt-[10px]
        pb-8
        xl:pb-0
        h-full
        flex
        flex-col
        w-full`}
    >
      {history.length > 0 &&
        history.slice().map((entryTuple, i) => (
          <span key={i}>
            {promptPrefixHtml}
            <span>{entryTuple[0]}</span>
            <br />
            {entryTuple[1]}
          </span>
        ))}
      <div className="w-full flex h-full relative">
        <div className="absolute">{promptPrefixHtml}</div>
        <textarea
          rows={1}
          readOnly={isBusy}
          ref={textAreaRef}
          onChange={handleUserTextAreaChange}
          onKeyDown={handleUserTextAreaKeyDown}
          value={userTextAreaValue}
          className={`
          w-full
          focus:outline-none
          resize-none
          overflow-hidden`}
        />
      </div>
    </main>
  );
}

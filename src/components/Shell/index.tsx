import PromptPrefix from '@/components/Shell/PromptPrefix';
import useSearchParamsCmd from '@/hooks/useSearchParamsCmd';
import useStateWithPrefix from '@/hooks/useStateWithPrefix';
import processPrompt from '@/util/helper';
import { PromptHistoryEntry } from '@/util/types';
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
  const [userInput, setUserInput] = useStateWithPrefix(promptPrefix);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busyMem, setBusyMem] = useState<string[]>([]);

  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const stripPrefix = (input: string) => input.slice(promptPrefix.length);

  useSearchParamsCmd((cmd: string) => {
    setUserInput(cmd);
    textAreaRef.current?.focus();
  });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [history, userInput, isBusy]);

  useEffect(() => {
    // Add the current prompt to the current history index
    updatePromptHistory(stripPrefix(userInput), null, historyIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on historyIndex change
  }, [userInput]);

  useEffect(() => {
    if (isBusy) {
      document.body.style.cursor = `wait`;
      return;
    }
    document.body.style.cursor = `auto`;
    if (busyMem.length === 0) return;
    setUserInput(busyMem.join(``));
    setBusyMem([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on isBusy change
  }, [isBusy]);

  const handleUserTextAreaChange: FormEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const userPrompt = event.currentTarget.value.slice(promptPrefix.length);

    if (userPrompt.length === 0) {
      setUserInput(``);
      return;
    }

    // Resize textarea to fit content
    event.currentTarget.style.height = `auto`;
    event.currentTarget.style.height = event.currentTarget.scrollHeight + `px`;

    setUserInput(userPrompt);
  };

  const updatePromptHistory = (
    prompt: string,
    res: ReactNode,
    index: number,
  ) => {
    setHistory((history) => {
      const newHistory = [...history];
      newHistory[index] = [prompt, res];
      return newHistory;
    });
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
          setIsBusy(true);
          const cmdResTuple = processPrompt(history[historyIndex][0]);
          setIsBusy(false);
          updatePromptHistory(cmdResTuple[0], cmdResTuple[1], historyIndex);
          setUserInput(``);
          setHistoryIndex((historyIndex) => historyIndex + 1);
          textAreaRef.current?.focus();
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

  const historyWithoutCurrentPrompt = history.slice(0, historyIndex);

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
      {historyWithoutCurrentPrompt.length > 0 &&
        historyWithoutCurrentPrompt.map((entryTuple, i) => (
          <span key={i}>
            <PromptPrefix username={username} domain={domain} />
            <span>{entryTuple[0]}</span>
            <br />
            {entryTuple[1]}
          </span>
        ))}
      <div className="w-full flex h-full relative">
        <PromptPrefix
          className="absolute"
          username={username}
          domain={domain}
        />
        <textarea
          rows={1}
          readOnly={isBusy}
          ref={textAreaRef}
          onChange={handleUserTextAreaChange}
          onKeyDown={handleUserTextAreaKeyDown}
          value={userInput}
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

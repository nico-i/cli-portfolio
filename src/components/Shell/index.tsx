import PromptPrefix from '@/components/Shell/PromptPrefix';
import { PromptHistoryContext } from '@/context/promptHistoryContext';
import useSearchParamsCmd from '@/hooks/useSearchParamsCmd';
import useStateWithPrefix from '@/hooks/useStateWithPrefix';
import { processPrompt, updateCmdSearchParam } from '@/util/helper';
import { SearchParams } from '@/util/types';
import {
  KeyboardEventHandler,
  useContext,
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
  const [promptValue, setPromptValue] = useStateWithPrefix(promptPrefix);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busyMem, setBusyMem] = useState<string[]>([]);

  const { history, insertHistory, clearHistory } =
    useContext(PromptHistoryContext);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentPrompt, setCurrentPrompt] = useState<string>(``);

  const stripPrefix = (input: string) => input.slice(promptPrefix.length);

  // TODO: Handle initial cmd from search params
  useSearchParamsCmd((cmd: string) => {
    setPromptValue(cmd);
    textAreaRef.current?.focus();
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has(SearchParams.clear)) return;
    const clearQueryParam = searchParams.get(SearchParams.clear);
    if (!clearQueryParam) return;
    setHistoryIndex(-1);
    updateCmdSearchParam();
    clearHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    textAreaRef.current?.scrollIntoView();
  }, [history, promptValue, isBusy]);

  useEffect(() => {
    if (historyIndex === -1) {
      setPromptValue(currentPrompt);
      return;
    }
    console.log(historyIndex, history);
    setPromptValue(history.at(-1 - historyIndex)?.[0] || ``);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex]);

  useEffect(() => {
    if (isBusy) {
      document.body.style.cursor = `wait`;
      return;
    }
    document.body.style.cursor = `auto`;
    if (busyMem.length === 0) return;
    setPromptValue(busyMem.join(``));
    setBusyMem([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on isBusy change
  }, [isBusy]);

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
      case `Enter`: {
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        setIsBusy(true);
        const cmdResTuple = processPrompt(stripPrefix(promptValue));
        setIsBusy(false);

        insertHistory(cmdResTuple[0], cmdResTuple[1]);
        updateCmdSearchParam(cmdResTuple[0]);

        setCurrentPrompt(``);
        setHistoryIndex(-1);
        setPromptValue(``);

        textAreaRef.current?.focus();
        break;
      }
      case `Tab`:
        event.preventDefault();
        // TODO: Add tab completion
        break;
      case `ArrowDown`:
        event.preventDefault();
        if (historyIndex === -1) return; // -1 to account for the current prompt
        setHistoryIndex((historyIndex) => {
          return historyIndex - 1;
        });

        break;
      case `ArrowUp`:
        event.preventDefault();
        if (historyIndex === history.length - 1) return;
        setHistoryIndex((historyIndex) => {
          return historyIndex + 1;
        });
        break;
    }
    event.currentTarget.style.height = `auto`;
    event.currentTarget.style.height = event.currentTarget.scrollHeight + `px`;
  };

  return (
    <main
      id="shell"
      className={`
        p-2.5
        flex
        flex-col
        flex-[1_0_auto]
        relative
        w-full
        h-full`}
      onClickCapture={() => textAreaRef.current?.focus()}
    >
      {history.length > 0 &&
        history.map((entryTuple, i) => (
          <div key={i}>
            <PromptPrefix username={username} domain={domain} />
            <span>{entryTuple[0]}</span>
            <br />
            {entryTuple[1]}
          </div>
        ))}
      <div id="active-prompt" className="w-full flex relative">
        <PromptPrefix
          className="absolute"
          username={username}
          domain={domain}
        />
        <textarea
          rows={1}
          readOnly={isBusy}
          ref={textAreaRef}
          onKeyDown={handleUserTextAreaKeyDown}
          onChange={(e) => {
            const strippedValue = stripPrefix(e.target.value);
            setPromptValue(strippedValue);
            setCurrentPrompt(strippedValue);
            setHistoryIndex(-1);
          }}
          value={promptValue}
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

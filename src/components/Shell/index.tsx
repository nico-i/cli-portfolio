import PromptPrefix from '@/components/Shell/PromptPrefix';
import { PromptHistoryContext } from '@/context/promptHistoryContext';
import { CommandName, cli as runPrompt } from '@/lib/cli/cli';
import {
  CustomEvents,
  PromptHistoryEntry,
  RunEvent,
  SearchParams,
} from '@/util/types';
import { useLocation } from '@reach/router';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
}

export default function Shell({ username, domain }: Readonly<ShellProps>) {
  const promptPrefix = `${username}@${domain}: ~$ `;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busyMem, setBusyMem] = useState<string[]>([]);

  const [tAValueWithPrefix, setTAValueAndAddPrefix] = useReducer<
    (prevState: string, newState: string) => string
  >((_, newState): string => {
    if (newState === ``) return promptPrefix;
    return [promptPrefix, newState].join(``);
  }, promptPrefix);

  const { history, insertHistory, clearHistory } =
    useContext(PromptHistoryContext);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentPrompt, setCurrentPrompt] = useState<string>(``);

  const location = useLocation();

  const handleRunEvent = (event: any) => {
    console.log(event.detail.prompt);
    if (event.detail.prompt === undefined) {
      throw new Error(`No prompt provided in run event!`);
    }
    setIsBusy(true);
    const cmdResTuple = processRunRequest(event.detail.prompt);
    setIsBusy(false);

    if (cmdResTuple[0] !== CommandName.clear) {
      insertHistory(cmdResTuple[0], cmdResTuple[1]);
      updateCmdSearchParam(cmdResTuple[0]);
    }

    setTAValueAndAddPrefix(``);
    setCurrentPrompt(``);
    setHistoryIndex(-1);

    textAreaRef.current?.focus();
  };

  const handleClearEvent = () => {
    setHistoryIndex(-1);
    updateCmdSearchParam();
    clearHistory();
  };

  useEffect(() => {
    textAreaRef.current?.scrollIntoView();
  }, [history, tAValueWithPrefix, isBusy]);

  useEffect(() => {
    if (historyIndex === -1) {
      setTAValueAndAddPrefix(currentPrompt);
    } else {
      setTAValueAndAddPrefix(history.at(-1 - historyIndex)?.[0] || ``);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex]);

  useEffect(() => {
    window.addEventListener(CustomEvents.clear, handleClearEvent);
    window.addEventListener(CustomEvents.run, handleRunEvent);

    // run cmd if in search string
    const searchParams = new URLSearchParams(location.search);
    const cmdParam = searchParams.get(SearchParams.cmd);
    if (cmdParam) {
      window.dispatchEvent(RunEvent(decodeURIComponent(cmdParam)));
    }

    return () => {
      window.removeEventListener(CustomEvents.clear, handleClearEvent);
      window.removeEventListener(CustomEvents.run, handleRunEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isBusy) {
      document.body.style.cursor = `wait`;
      return;
    }
    document.body.style.cursor = `auto`;
    if (busyMem.length > 0) {
      setTAValueAndAddPrefix(busyMem.join(``));
      setBusyMem([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on isBusy change
  }, [isBusy]);

  const handleUserTextValueChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    const strippedValue = e.target.value.slice(promptPrefix.length);
    setTAValueAndAddPrefix(strippedValue);
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

    const prompt = tAValueWithPrefix.slice(promptPrefix.length);

    if (event.key.length === 1) {
      // Reset the history if user starts typing
      setCurrentPrompt([prompt, event.key].join(``));
      setHistoryIndex(-1);
    } else {
      switch (event.key) {
        case `Enter`: {
          if (event.shiftKey) {
            break;
          }
          event.preventDefault();
          window.dispatchEvent(RunEvent(prompt));
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
        <label className="sr-only" htmlFor="prompt">
          CLI prompt
        </label>
        <textarea
          id="prompt"
          rows={1}
          readOnly={isBusy}
          ref={textAreaRef}
          onKeyDown={handleUserTextAreaKeyDown}
          onChange={handleUserTextValueChange}
          value={tAValueWithPrefix}
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

const updateCmdSearchParam = (cmd?: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  if (cmd) {
    newSearchParams.set(`cmd`, encodeURIComponent(cmd));
  } else {
    newSearchParams.delete(SearchParams.cmd);
    newSearchParams.delete(SearchParams.clear);
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.search = newSearchParams?.toString() || ``;
  window.history.replaceState({}, ``, currentUrl);
};

function processRunRequest(userPrompt: string): PromptHistoryEntry {
  const res: PromptHistoryEntry = [userPrompt, null];
  const consecutivePrompts = userPrompt.split(`&&`);
  // recursively process commands
  if (consecutivePrompts.length > 1) {
    for (const cmd of consecutivePrompts) {
      const consecutiveCmdRes = processRunRequest(cmd);
      res[1] = (
        <>
          {res[1]}
          <br />
          {consecutiveCmdRes[1]}
        </>
      );
    }
    return res;
  }
  try {
    res[1] = runPrompt(userPrompt.split(` `));
  } catch (e) {
    res[1] = (e as Error).message;
  }
  res.push([userPrompt, res] as PromptHistoryEntry);
  return res;
}

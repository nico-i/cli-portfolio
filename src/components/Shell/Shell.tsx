import { CommandName, runPrompt } from '@/components/Cli';
import { PromptPrefix } from '@/components/Shell/PromptPrefix';
import { PromptHistoryContext } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import { CustomEvents, RunEvent, SearchParams } from '@/util/types';
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

export const Shell = ({ username, domain }: Readonly<ShellProps>) => {
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

  const { history, setHistory } = useContext(PromptHistoryContext);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentPrompt, setCurrentPrompt] = useState<string>(``);
  const [isProgramOpen, setIsProgramOpen] = useState(false);

  const location = useLocation();

  const handleRunEvent = (event: any) => {
    setIsProgramOpen(false);
    if (event.detail.prompt === undefined) {
      throw new Error(`No prompt provided in run event!`);
    }
    setIsBusy(true);
    const cmdResTuple = processRunRequest(event.detail.prompt);
    setIsBusy(false);

    if (cmdResTuple.prompt !== CommandName.clear) {
      setHistory((history) => [...history, cmdResTuple]);
      updateCmdSearchParam(cmdResTuple.prompt);
    }

    setTAValueAndAddPrefix(``);
    setCurrentPrompt(``);
    setHistoryIndex(-1);

    textAreaRef.current?.focus();
  };

  const handleClearEvent = () => {
    setHistoryIndex(-1);
    updateCmdSearchParam();
    setHistory([]);
  };

  const handleStartStandaloneEvent = () => {
    setIsProgramOpen(true);
  };

  const handleStopStandaloneEvent = () => {
    setIsProgramOpen(false);
    setHistory((history) => {
      const newHistory = [...history];
      newHistory[newHistory.length - 1].response = null;
      return newHistory;
    });
  };

  useEffect(() => {
    textAreaRef.current?.scrollIntoView();
  }, [history, tAValueWithPrefix, isBusy]);

  useEffect(() => {
    if (historyIndex === -1) {
      setTAValueAndAddPrefix(currentPrompt);
    } else {
      setTAValueAndAddPrefix(history.at(-1 - historyIndex)?.prompt || ``);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex]);

  useEffect(() => {
    window.addEventListener(CustomEvents.clear, handleClearEvent);
    window.addEventListener(CustomEvents.run, handleRunEvent);
    window.addEventListener(
      CustomEvents.startStandalone,
      handleStartStandaloneEvent,
    );
    window.addEventListener(
      CustomEvents.stopStandalone,
      handleStopStandaloneEvent,
    );
    // run cmd if in search string
    const searchParams = new URLSearchParams(location.search);
    const cmdParam = searchParams.get(SearchParams.cmd);
    if (cmdParam) {
      window.dispatchEvent(RunEvent(decodeURIComponent(cmdParam)));
    }

    return () => {
      window.removeEventListener(CustomEvents.clear, handleClearEvent);
      window.removeEventListener(CustomEvents.run, handleRunEvent);
      window.removeEventListener(
        CustomEvents.startStandalone,
        handleStartStandaloneEvent,
      );
      window.removeEventListener(
        CustomEvents.stopStandalone,
        handleStopStandaloneEvent,
      );
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
      setHistoryIndex(-1);
      setCurrentPrompt(prompt);
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
        hover:cursor-text
        relative
        w-full
        h-full`}
      onClickCapture={() => textAreaRef.current?.focus()}
    >
      {isProgramOpen ? (
        history[history.length - 1].response
      ) : (
        <>
          {history.length > 0 &&
            history.map((entryTuple, i) => (
              <div key={i} className="flex flex-col">
                <span>
                  <PromptPrefix username={username} domain={domain} />
                  {entryTuple.prompt}
                </span>
                {entryTuple.response !== `` ? entryTuple.response : <>&nbsp;</>}
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
              autoFocus={true}
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
        </>
      )}
    </main>
  );
};

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

const processRunRequest = (userPrompt: string): PromptHistoryEntry => {
  const res: PromptHistoryEntry = {
    prompt: userPrompt,
    response: null,
  };
  const consecutivePrompts = userPrompt.split(`&&`).map((cmd) => cmd.trim());
  // recursively process commands
  if (consecutivePrompts.length > 1) {
    for (const cmd of consecutivePrompts) {
      const consecutiveCmdRes = processRunRequest(cmd);
      res.response = (
        <>
          {res.response}
          <br />
          {consecutiveCmdRes.response}
        </>
      );
    }
    return res;
  }
  try {
    res.response = runPrompt(userPrompt.split(` `));
  } catch (e) {
    res.response = (e as Error).message;
  }
  return res;
};
